const Tvmaj = require("../src/index");
require("dotenv").config();

const tvmaj = new Tvmaj(process.env.TEST_USERNAME, process.env.TEST_KEY);

describe("tvmaj", () => {
  test("starting without username or key should throw error", () => {
    expect(() => {
      new Tvmaj();
    }).toThrow();
  });

  test("_encode should return a base64 encoded string", () => {
    const testEncode = new Tvmaj("test", "testKey");
    const encoded = Buffer.from("test:testKey").toString("base64");

    expect(testEncode.authorization).toMatch(encoded);
  });

  test("invalid request path should return 404 status and throw error", () =>
    expect(tvmaj._request("/test/route")).rejects.toEqual(
      new Error("404: Page not found.")
    ));

  test("unauthorized request should return 401 status and throw error", () => {
    const testmaj = new Tvmaj("testUser", "testKey");
    expect(testmaj._request("user/follows/shows")).rejects.toEqual(
      new Error("401: Invalid username or API key")
    );
  });

  test("successful requests should return object", async () => {
    const resp = await tvmaj._request("user/follows/shows");
    expect(resp).toBeInstanceOf(Object);
  });
});
