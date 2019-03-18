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

    test("Trying to mark an episode without providing ID throws error", async done => {
      try {
        await tvmaj.markEpisode();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to markEpisode.");
        done();
      }
    });

    test("Mark an episode", async () => {
      const resp = await tvmaj.markEpisode(episode);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("episode_id");
    });

    test("Get list of marked episodes", async () => {
      const resp = await tvmaj.getMarkedEpisodes();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Get marked episode", async () => {
      const resp = await tvmaj.getMarkedEpisodes(episode);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("episode_id");
    });

    test("Not providing ID to delete marked episode should throw error", async done => {
      try {
        await tvmaj.deleteMarkedEpisode();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to deleteMarkedEpisode.");
        done();
      }
    });

    test("Delete a marked episode", async () => {
      const resp = await tvmaj.deleteMarkedEpisode(episode);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });
  });

  describe("Followed Shows", () => {
    const show = 3182;

    test("Trying to follow a show without providing ID throws error", async done => {
      try {
        await tvmaj.followShow();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to followShow.");
        done();
      }
    });

    test("Follow a show", async () => {
      const resp = await tvmaj.followShow(show);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("show_id");
    });

    test("Get list of followed shows", async () => {
      const resp = await tvmaj.getFollowedShows();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Get followed show", async () => {
      const resp = await tvmaj.getFollowedShows(show);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("show_id");
    });

    test("Not providing ID to delete followed show should throw error", async done => {
      try {
        await tvmaj.deleteFollowedShow();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to deleteFollowedShow.");
        done();
      }
    });

    test("Delete a followed show", async () => {
      const resp = await tvmaj.deleteFollowedShow(show);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });
  });

  describe("Follow People", () => {
    const person = 7567;

    test("Trying to follow a person without providing ID throws error", async done => {
      try {
        await tvmaj.followPerson();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to followPerson.");
        done();
      }
    });

    test("Follow a person", async () => {
      const resp = await tvmaj.followPerson(person);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("person_id");
    });

    test("Get list of followed people", async () => {
      const resp = await tvmaj.getFollowedPeople();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Get followed person", async () => {
      const resp = await tvmaj.getFollowedPeople(person);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("person_id");
    });

    test("Not providing ID to delete followed person should throw error", async done => {
      try {
        await tvmaj.deleteFollowedPerson();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to deleteFollowedPerson.");
        done();
      }
    });

    test("Delete a followed person", async () => {
      const resp = await tvmaj.deleteFollowedPerson(person);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });
  });

  describe("Follow Networks", () => {
    const network = 8;

    test("Trying to follow a network without providing ID throws error", async done => {
      try {
        await tvmaj.followNetwork();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to followNetwork.");
        done();
      }
    });

    test("Follow a network", async () => {
      const resp = await tvmaj.followNetwork(network);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("network_id");
    });

    test("Get list of followed networks", async () => {
      const resp = await tvmaj.getFollowedNetworks();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Get followed network", async () => {
      const resp = await tvmaj.getFollowedNetworks(network);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("network_id");
    });

    test("Not providing ID to delete followed network should throw error", async done => {
      try {
        await tvmaj.deleteFollowedNetwork();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to deleteFollowedNetwork.");
        done();
      }
    });

    test("Delete a followed network", async () => {
      const resp = await tvmaj.deleteFollowedNetwork(network);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });
  });

  describe("Follow Webchannels", () => {
    const webchannel = 2;

    test("Trying to follow a webchannel without providing ID throws error", async done => {
      try {
        await tvmaj.followWebchannel();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to followWebchannel.");
        done();
      }
    });

    test("Follow a webchannel", async () => {
      const resp = await tvmaj.followWebchannel(webchannel);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("webChannel_id");
    });

    test("Get list of followed webchannels", async () => {
      const resp = await tvmaj.getFollowedWebchannels();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Get followed webchannels", async () => {
      const resp = await tvmaj.getFollowedWebchannels(webchannel);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("webChannel_id");
    });

    test("Not providing ID to delete followed webchannel should throw error", async done => {
      try {
        await tvmaj.deleteFollowedWebchannel();
      } catch (e) {
        expect(e.message).toEqual(
          "No ID provided to deleteFollowedWebchannel."
        );
        done();
      }
    });

    test("Delete a followed webchannel", async () => {
      const resp = await tvmaj.deleteFollowedWebchannel(webchannel);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });
  });

  describe("Tagged Shows", () => {
    const show_id = 82;
    const tag_text = "test_tag";
    let tag_id = null;

    test("Trying to create a tag without providing ID throws error", async done => {
      try {
        await tvmaj.createTag();
      } catch (e) {
        expect(e.message).toEqual("No name provided to createTag.");
        done();
      }
    });

    test("Create a tag", async () => {
      const resp = await tvmaj.createTag(tag_text);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("id");
      expect(resp).toHaveProperty("name");

      // save tag id for future test use
      tag_id = resp.id;
    });

    test("List all tags", async () => {
      const resp = await tvmaj.getTags();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Trying to update a tag without providing ID or name throws error", async done => {
      try {
        await tvmaj.updateTag();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to updateTag.");
        done();
      }

      try {
        await tvmaj.updateTag(tag_id);
      } catch (e) {
        expect(e.message).toEqual("No name provided to updateTag.");
        done();
      }
    });

    test("Update a tag", async () => {
      const newTag = "test_tag_updated";
      const resp = await tvmaj.updateTag(tag_id, newTag);
      expect(resp).toBeInstanceOf(Object);
      expect(resp.name).toEqual(newTag);
    });

    test("Trying to get shows with tag without providing ID throws error", async done => {
      try {
        await tvmaj.getShowsWithTag();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to getShowsWithTag.");
        done();
      }
    });

    test("List all shows under this tag", async () => {
      const resp = await tvmaj.getShowsWithTag(tag_id);
      expect(resp).toBeInstanceOf(Array);
    });

    test("Trying to tag a show without providing ID or name throws error", async done => {
      try {
        await tvmaj.tagShow();
      } catch (e) {
        expect(e.message).toEqual("No tag_id provided to tagShow.");
        done();
      }

      try {
        await tvmaj.tagShow(tag_id);
      } catch (e) {
        expect(e.message).toEqual("No show_id provided to tagShow.");
        done();
      }
    });

    test("Tag a show", async () => {
      const resp = await tvmaj.tagShow(tag_id, show_id);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("show_id");
    });

    test("Trying to untag a show without providing ID or name throws error", async done => {
      try {
        await tvmaj.untagShow();
      } catch (e) {
        expect(e.message).toEqual("No tag_id provided to untagShow.");
        done();
      }

      try {
        await tvmaj.untagShow(tag_id);
      } catch (e) {
        expect(e.message).toEqual("No show_id provided to untagShow.");
        done();
      }
    });

    test("Untag a show", async () => {
      const resp = await tvmaj.untagShow(tag_id, show_id);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });

    test("Trying to delete a tag without providing ID throws error", async done => {
      try {
        await tvmaj.deleteTag();
      } catch (e) {
        expect(e.message).toEqual("No ID provided to deleteTag.");
        done();
      }
    });

    test("Delete a tag", async () => {
      const resp = await tvmaj.deleteTag(tag_id);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });
  });

  describe("Vote on Shows", () => {
    const show = 3182;

    test("Vote on show", async () => {
      const resp = await tvmaj.voteOnShow(show, 5);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("vote");
    });

    test("Get list of show votes", async () => {
      const resp = await tvmaj.getShowVotes();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Get show that was voted on", async () => {
      const resp = await tvmaj.getShowVotes(show);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("vote");
    });

    test("Delete vote on show", async () => {
      const resp = await tvmaj.deleteShowVote(show);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });
  });

  describe("Vote on Episodes", () => {
    const episode = 1221415;

    test("Vote on episode", async () => {
      const resp = await tvmaj.voteOnEpisode(episode, 5);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("vote");
    });

    test("Get list of episode votes", async () => {
      const resp = await tvmaj.getEpisodeVote();
      expect(resp).toBeInstanceOf(Array);
    });

    test("Get episode that was voted on", async () => {
      const resp = await tvmaj.getEpisodeVote(episode);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toHaveProperty("vote");
    });

    test("Delete vote on episode", async () => {
      const resp = await tvmaj.deleteEpisodeVote(episode);
      expect(resp).toBeInstanceOf(Object);
      expect(resp).toEqual({});
    });
  });
});
