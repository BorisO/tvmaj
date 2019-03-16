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
    expect(tvmaj._request({ path: "test/route" })).rejects.toEqual(
      new Error("404: Page not found.")
    ));

  test("unauthorized request should return 401 status and throw error", () => {
    const testmaj = new Tvmaj("testUser", "testKey");
    expect(testmaj._request({ path: "user/follows/shows" })).rejects.toEqual(
      new Error("401: Invalid username or API key")
    );
  });

  test("successful requests should return object", async () => {
    const resp = await tvmaj._request({ path: "user/follows/shows" });
    expect(resp).toBeInstanceOf(Object);
  });

  describe("Marked Episodes", () => {
    const episode = 1519312;

    test("Get list of marked episodes", async () => {
      const resp = await tvmaj.getMarkedEpisodes();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Mark an episode", async () => {
      const resp = await tvmaj.markEpisode(episode);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("episode_id");
    });

    test("Delete a marked episode", async () => {
      const resp = await tvmaj.deleteMarkedEpisode(episode);
      expect(resp).toBeInstanceOf(Object);
    });
  });
});
