const validation = (schema) => async (req, res, next) => {
  const query = req.query;
  console.log("Validating schema ...");
  try {
    await schema.validate({
      query: query,
    });
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

module.exports = validation;
