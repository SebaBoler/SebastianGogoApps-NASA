const yup = require("yup");

const pictureSchema = yup.object({
  query: yup.object({
    start_date: yup
      .date()
      .max(yup.ref("end_date"), "Start date cannot be greater than end date !")
      .required("Parameter start_date is required !"),
    end_date: yup
      .date()
      .min(yup.ref("start_date"), "End date cannot be less than start date !")
      .required("Parameter end_date is required !"),
  }),
});

module.exports = pictureSchema;
