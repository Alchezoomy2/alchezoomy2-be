require("dotenv").config();

const { execSync } = require("child_process");

const fakeRequest = require("supertest");
const app = require("../lib/app");
const client = require("../lib/client");
const webvtt = require("node-webvtt");

const newString = `WEBVTT

1
00:00:01.199 --> 00:00:01.620
Alright.

2
00:00:02.790 --> 00:00:04.799
Ryan Mehta: Yeah, great. This is all looking so awesome.

3
00:00:06.270 --> 00:00:11.519
Ryan Mehta: Let's take a look at your theme jazz sex from your theme layer.

4
00:00:12.599 --> 00:00:14.910
Ryan Mehta: Okay, well, we probably don't need to talk about this one.

5
00:00:15.389 --> 00:00:33.000
Thomas Stussi: Yeah, this one is just like I wasn't sure about like where exactly the provider needs to go. I guess like I was trying to get that the provider as high up as possible, but it didn't feel quite right to put it in app or index.

6
00:00:34.770 --> 00:00:36.180
Thomas Stussi: So I just made this layer.

7
00:00:37.080 --> 00:00:39.030
Ryan Mehta: Yeah, this is a good decision.`;

describe("app routes", () => {
  describe("routes", () => {
    let token;

    beforeAll(async (done) => {
      execSync("npm run setup-db");

      client.connect();

      const signInData = await fakeRequest(app).post("/auth/signup").send({
        email: "jon@user.com",
        password: "1234",
      });

      token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll((done) => {
      return client.end(done);
    });

    test("returns animals", async () => {
      const expectation = {};
      const actual = webvtt.parse(newString);

      expect(actual).toEqual(expectation);
    });
  });
});
