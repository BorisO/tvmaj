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
};
