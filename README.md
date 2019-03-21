# tvmaj

Node.js wrapper for TVmaze.com API.

To use their API you need to sign up for a premium account. There are three levels of premium but any will do.
To use this package, you will need to prove your username and api key that is provided to you in your TVmaze dashboard. 

Example usage:

```javascript
const Tvmaj = require("tvmaj");

async function test() {
  let tvmaj = new Tvmaj(TVMAZE_USER, TVMAZE_API_KEY);
  let resp = await tvmaj.getFollowedShows();

  console.log(resp);
}

test();

#response:
#[ { show_id: 3083 }, { show_id: 4 }, { show_id: 82 } ]
```

