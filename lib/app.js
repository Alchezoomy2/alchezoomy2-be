const express = require("express");
const cors = require("cors");
const client = require("./client.js");
const app = express();
const morgan = require("morgan");
const ensureAuth = require("./auth/ensure-auth");
const createAuthRoutes = require("./auth/create-auth-routes");
const fetch = require("superagent");
const https = require("https");
const fs = require("fs");
const nfetch = require("node-fetch");

const fakeData = require("../data/fakedata.js");
const filterMeetingsForDownloadUrls = require("./utils/filterMeetingsForDownloadURLs.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev")); // http logging

const zoom_token = process.env.zoom_token;

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route.
// each requires a POST body with a .email and a .password
app.use("/auth", authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use("/api", ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get("/api/test", (req, res) => {
  res.json({
    message: `in this protected route, we get the user's id like so: ${req.userId}`,
  });
});

app.get("/meetings", async (req, res) => {
  try {
    const zoom_url =
      "https://api.zoom.us/v2/users/Wq3hOAd6QsSDGuYInNBdyw/recordings/?from=2020-10-15";

    const returnedObject = await fetch
      .get(zoom_url)
      .set("Authorization", `Bearer ${zoom_token}`);

    res.json(returnedObject.body);

    const urls = filterMeetingsForDownloadUrls(returnedObject.body);
    const formattedUrls = urls.map(
      (url) => `${url}?access_token=${zoom_token}`
    );

    formattedUrls.forEach((file) => {
      nfetch(file).then((response) => {
        response.body.pipe(
          fs.createWriteStream("lib/testingUrlGetter.txt", { flags: "a" })
        );
      });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/animals", async (req, res) => {
  try {
    const data = await client.query("SELECT * from animals");

    res.json(data.rows);
    r;
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require("./middleware/error"));

module.exports = app;
