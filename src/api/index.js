const router = require("express").Router();
const axios = require("axios");
const validation = require("../middlewares/validationMiddleware");
const pictureSchema = require("../validation/pictureValidation");
const {
  createArrayDates,
  divideArray,
  getUrlApi,
} = require("../helpers/index");

router.get("/pictures", validation(pictureSchema), async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const urlNasaApi = getUrlApi();
    const arrDays = createArrayDates(start_date, end_date);
    const daysConcurrently = divideArray(arrDays);
    let result = [];

    for (const dates of daysConcurrently) {
      const queries = dates.map((date) => `${urlNasaApi}&date=${date}`);
      const requests = queries.map((url) => axios.get(url));

      result.push(
        await axios
          .all(requests)
          .then(
            axios.spread((...responses) =>
              responses.map((item) => item.data.url)
            )
          )
          .catch((_e) => {
            throw _e;
          })
      );
    }

    return res.status(200).json({ urls: result.flat() });
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.log(`err: ${err.response}`);
      res.status(err.response.status).json({ error: "response error" });
    } else if (err.request) {
      res.status(400).send({ message: "Bad request" });
    } else {
      res.status(500).send({ message: "Internal server error" });
    }
  }
});

router.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).json(data);
});

module.exports = router;
