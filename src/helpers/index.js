const moment = require("moment");
const apiNASAURL =
  process.env.NASA_API_URL || "https://api.nasa.gov/planetary/apod?api_key=";
const apiKey = process.env.API_KEY || "DEMO_KEY";
const conRequest = process.env.CONCURRENT_REQUESTS || 5;

function createArrayDates(startDate, endDate) {
  const dates = [];
  const start = moment(startDate);
  const end = moment(endDate);
  while (start <= end) {
    dates.push(moment(start).format("YYYY-MM-DD"));
    start.add(1, "days");
  }
  return dates;
}

function divideArray(arr) {
  // eslint-disable-next-line no-unused-vars
  return [...Array(Math.ceil(arr.length / conRequest))].map((_) =>
    arr.splice(0, conRequest)
  );
}

function getUrlApi() {
  return apiNASAURL + apiKey;
}

module.exports = { createArrayDates, divideArray, getUrlApi };
