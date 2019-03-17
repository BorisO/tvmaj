const fetch = require("node-fetch");

module.exports = class tvmaj {
  constructor(username, accessKey) {
    if (!username) throw new Error("No username provided to tvmaj.");
    if (!accessKey) throw new Error("No access key provided to tvmaj.");
    this.accessKey = accessKey;
    this.username = username;
    this.authorization = this._encode();
  }

  _encode() {
    // TVmaze uses base64 encoding
    const authorization = Buffer.from(
      `${this.username}:${this.accessKey}`
    ).toString("base64");
    return authorization;
  }

  // request function for api calls
  async _request({ path, version = "v1", method = "GET", body }) {
    const url = `https://api.tvmaze.com/${version}/${path}`;
    const opts = {
      method,
      headers: {
        Authorization: `Basic ${this.authorization}`,
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };
    if (method === "PUT" || method === "POST" || method === "PATCH") {
      opts.headers["Content-Type"] = "application/json";
    }
    return fetch(url, opts)
      .then(response => {
        return response.text();
      })
      .then(result => {
        result = result ? JSON.parse(result) : {};
        if (result.status && result.status !== 200)
          throw new Error(
            `${result.status}: ${
              result.message ? result.message : result.name
            }${result.errors ? ". " + result.errors.name : ""}`
          );
        else return result;
      });
  }

  // MARKED EPISODES API
  async getMarkedEpisodes(id) {
    const path = `user/episodes/${id ? id : ""}`;
    const resp = await this._request({ path });
    return resp;
  }

  async deleteMarkedEpisode(id) {
    if (!id) throw new Error("No ID provided to deleteMarkedEpisode.");
    const path = `user/episodes/${id}`;
    const resp = await this._request({ path, method: "DELETE" });
    return resp;
  }

  async markEpisode(id, time, type) {
    if (!id) throw new Error("No ID provided to markEpisode.");
    const body = {
      episode_id: id,
      marked_at: time ? time : 0,
      type: type ? type : 0
    };

    const path = `user/episodes/${id}`;
    const resp = await this._request({ path, method: "PUT", body });
    return resp;
  }

  // FOLLOWED SHOWS API
  async getFollowedShows(id) {
    const path = `user/follows/shows/${id ? id : ""}`;
    const resp = await this._request({ path });
    return resp;
  }

  async deleteFollowedShow(id) {
    if (!id) throw new Error("No ID provided to deleteFollowedShow.");
    const path = `user/follows/shows/${id}`;
    const resp = await this._request({ path, method: "DELETE" });
    return resp;
  }

  async followShow(id) {
    if (!id) throw new Error("No ID provided to followShow.");
    const path = `user/follows/shows/${id}`;
    const resp = await this._request({ path, method: "PUT" });
    return resp;
  }

  // FOLLOWED PEOPLE API
  async getFollowedPeople(id) {
    const path = `user/follows/people/${id ? id : ""}`;
    const resp = await this._request({ path });
    return resp;
  }

  async deleteFollowedPerson(id) {
    if (!id) throw new Error("No ID provided to deleteFollowedPerson.");
    const path = `user/follows/people/${id}`;
    const resp = await this._request({ path, method: "DELETE" });
    return resp;
  }

  async followPerson(id) {
    if (!id) throw new Error("No ID provided to followPerson.");
    const path = `user/follows/people/${id}`;
    const resp = await this._request({ path, method: "PUT" });
    return resp;
  }

  // FOLLOWED NETWORKS API
  async getFollowedNetworks(id) {
    const path = `user/follows/networks/${id ? id : ""}`;
    const resp = await this._request({ path });
    return resp;
  }

  async followNetwork(id) {
    if (!id) throw new Error("No ID provided to followNetwork.");
    const path = `user/follows/networks/${id}`;
    const resp = await this._request({ path, method: "PUT" });
    return resp;
  }

  async deleteFollowedNetwork(id) {
    if (!id) throw new Error("No ID provided to deleteFollowedNetwork.");
    const path = `user/follows/networks/${id}`;
    const resp = await this._request({ path, method: "DELETE" });
    return resp;
  }

  // FOLLOWED WEBCHANNELS API
  async getFollowedWebchannels(id) {
    const path = `user/follows/webchannels/${id ? id : ""}`;
    const resp = await this._request({ path });
    return resp;
  }

  async followWebchannel(id) {
    if (!id) throw new Error("No ID provided to followWebchannel.");
    const path = `user/follows/webchannels/${id}`;
    const resp = await this._request({ path, method: "PUT" });
    return resp;
  }

  async deleteFollowedWebchannel(id) {
    if (!id) throw new Error("No ID provided to deleteFollowedWebchannel.");
    const path = `user/follows/webchannels/${id}`;
    const resp = await this._request({ path, method: "DELETE" });
    return resp;
  }

  // TAGGED SHOWS API
  async getTags() {
    const path = "user/tags/";
    const resp = await this._request({ path });
    return resp;
  }

  async createTag(name) {
    if (!name) throw new Error("No name provided to createTag.");
    const body = {
      id: 0,
      name
    };

    const path = "user/tags/";
    const resp = await this._request({ path, method: "POST", body });
    return resp;
  }

  async deleteTag(id) {
    if (!id) throw new Error("No ID provided to deleteTag.");
    const path = `user/tags/${id}`;
    const resp = await this._request({ path, method: "DELETE" });
    return resp;
  }

  async updateTag(id, name) {
    if (!id) throw new Error("No ID provided to updateTag.");
    if (!name) throw new Error("No name provided to updateTag.");
    const body = {
      name
    };
    const path = `user/tags/${id}`;
    const resp = await this._request({ path, method: "PATCH", body });
    return resp;
  }

  async getShowsWithTag(id) {
    if (!id) throw new Error("No ID provided to getShowsWithTag.");
    const path = `user/tags/${id}/shows`;
    const resp = await this._request({ path });
    return resp;
  }

  async untagShow(tag_id, show_id) {
    if (!tag_id) throw new Error("No tag_id provided to untagShow.");
    if (!show_id) throw new Error("No show_id provided to untagShow.");
    const path = `user/tags/${tag_id}/shows/${show_id}`;
    const resp = await this._request({ path, method: "DELETE" });
    return resp;
  }

  async tagShow(tag_id, show_id) {
    if (!tag_id) throw new Error("No tag_id provided to tagShow.");
    if (!show_id) throw new Error("No show_id provided to tagShow.");
    const path = `user/tags/${tag_id}/shows/${show_id}`;
    const resp = await this._request({ path, method: "PUT" });
    return resp;
  }

  // VOTED SHOWS API
  async getShowVotes(id) {
    const path = `user/votes/shows/${id ? id : ""}`;
    const resp = await this._request({ path });
    return resp;
  }

  async voteOnShow(id, vote) {
    if (!id) throw new Error("No id provided to voteOnShow.");
    const path = `user/votes/shows/${id}`;
    const body = {
      show_id: id,
      voted_at: 0,
      vote
    };
    const resp = await this._request({ path, method: "PUT", body });
    return resp;
  }

  async deleteVote(id) {
    if (!id) throw new Error("No show id provided to deleteVote.");
    const path = `user/votes/shows/${id}`;
    const resp = await this._request({ path, method: "DELETE" });
    return resp;
  }
};
