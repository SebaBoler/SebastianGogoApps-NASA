/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../NasaNode/server");

describe("GET /pictures with error message ", () => {
  let res;
  beforeAll(async () => {
    const response = await request(app).get("/pictures");
    res = { ...response };
    console.log(res.error.text);
  });
  test("should respond with a 500 status code", () => {
    expect(res.statusCode).toBe(500);
  });
  test("should respond with a error message", () => {
    expect(res.error.text).toEqual(
      '{"type":"ValidationError","message":"Parameter end_date is required !"}'
    );
  });

  test("should specify json in the content type header", () => {
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
