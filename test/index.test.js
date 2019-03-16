const Tvmaj = require("../src/index");
require("dotenv").config();

const tvmaj = new Tvmaj(process.env.TEST_USERNAME, process.env.TEST_KEY);

describe("tvmaj", () => {
  test("starting without username or key should throw error", () => {
    expect(() => {
      new Tvmaj();
    }).toThrow();
  });
});
