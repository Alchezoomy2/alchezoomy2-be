require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
// const webvtt = require('node-webvtt');
const seedMeetingData =require('../data/seed-meetings');
const transcriptData = require('../data/transcripts');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    beforeAll(async(done) => {
      execSync('npm run setup-db');

      client.connect();

      const signInData = await fakeRequest(app).post('/auth/signup').send({
        email: 'jon@user.com',
        password: '1234',
      });

      token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll((done) => {
      return client.end(done);
    });

    test('returns ALL zoom api meeting data', async() => {
      const expectation = {
        ...seedMeetingData
      };

      const returnedObject = await fakeRequest(app)
        .get('/seed_meetings')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(returnedObject.body).toEqual(expectation);
    });
  });

  test('returns a transcripts array for uuid specfic meeting', async() => {

    const expectation = [
      ...transcriptData
    ];

    const returnedObject = await fakeRequest(app)
      .get('/transcripts')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(returnedObject.body).toEqual(expectation);
  });


});
