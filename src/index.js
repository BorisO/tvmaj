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
  async _request(path, version = "v1") {
    const url = `https://api.tvmaze.com/${version}/${[path]}`;
    const headers = {
      Authorization: `Basic ${this.authorization}`,
      Accept: "application/json"
    };

    // Fetch result and parse it as JSON
    const body = await fetch(url, { headers });
    const result = await body.json();

    // Handle errors
    if (result.status && result.status !== 200)
      throw new Error(`${result.status}: ${result.message}`);

    return result;
  }
};
