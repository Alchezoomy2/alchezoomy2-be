require('dotenv').config();

const { execSync } = require('child_process');
jest.setTimeout(120000);
const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
// const webvtt = require('node-webvtt');
const seedMeetingData = require('../data/seed-meetings');
const meetingsData = require('../data/meetings');
const transcriptData = require('../data/transcripts');
const chatData = require('../data/chats');
// const favoritesData = require('../data/favorites');

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

    test('GET an array of ALL zoom api meeting data and seeds frontend', async() => {
      const expectation = {
        ...seedMeetingData,

      };

      const returnedObject = await fakeRequest(app)
        .get('/seed_meetings')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(returnedObject.body).toEqual(expectation);
    });
  

    test('GET an array of ALL current zoom meetings', async() => {

      const expectation = [
        ...meetingsData
      ];

      const returnedObject = await fakeRequest(app)
        .get('/api/meetings')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(returnedObject.body).toEqual(expectation);
    });

    test('GET an array of data for a specfic meeting based on the uuid', async() => {

      const expectation  = {
        'id': 1,
        'uuid': 'Won0eAuoTPKxsybU0rGkag==',
        'host_id': 'Wq3hOAd6QsSDGuYInNBdyw',
        'topic': 'september-2020--Class 38: Full-Stack Auth #full-stack #react #sql #express',
        'start_time': '2020-11-09T17:56:05Z',
        'share_url': expect.any(String),
        'video_play_url': expect.any(String),
        'audio_play_url': expect.any(String),
        'meeting_views': 0,
        'meeting_fav': 0,
        'duration': 127
      };

      const returnedObject = await fakeRequest(app)
        .get('/api/meetings/Won0eAuoTPKxsybU0rGkag==')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(returnedObject.body).toEqual(expectation);
    });

    test('GET an array of transcripts data for a specfic meeting based on the uuid', async() => {

      const expectation = [
        ...transcriptData
      ];

      const returnedObject = await fakeRequest(app)
        .get('/api/transcripts/Won0eAuoTPKxsybU0rGkag==')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(returnedObject.body).toEqual(expectation);
    });

    test('GET an array of chat data for a specfic meeting based on the uuid', async() => {

      const expectation = [
        ...chatData
      ];

      const returnedObject = await fakeRequest(app)
        .get('/api/chats/Won0eAuoTPKxsybU0rGkag==')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(returnedObject.body).toEqual(expectation);
    });

    // test('POSTS an array of user specific favorites', async() => {

    //   const expectation = [
    //     {
    //       uuid: 3,
    //       host_id: 'host_id1',
    //       topic: 'topic1',
    //       start_time: 3,
    //       timestamp: 1000,
    //       speaker: 'speaker1',
    //       text: 'text1',
    //       owner_id: 1
    //     }];
  
    //   const returnedObject = await fakeRequest(app)
    //     .post('/api/favorites')
    //     .send([
    //       {
    //         uuid: 3,
    //         host_id: 'host_id1',
    //         topic: 'topic1',
    //         start_time: 3,
    //         timestamp: 1000,
    //         speaker: 'speaker1',
    //         text: 'text1',
    //         owner_id: 1
    //       }])
    //     .set('Authorization', token)
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(returnedObject.body).toEqual(expectation);
    // });

   // test('GET an array of user specific favorites', async() => {

    //   const expectation = [
    //     {
    //       ...favoritesData
    //     }];
  
    //   const returnedObject = await fakeRequest(app)
    //     .post('/api/favorites')
    //     .send(...favoritesData)
    //     .set('Authorization', token)
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(returnedObject.body).toEqual(expectation);
    // });

    // test('DELETES an array of user specific favorites /:id', async() => {

    //   const expectation = [
    //     {
    //       uuid: 2,
    //       host_id: 'host_id1',
    //       topic: 'topic1',
    //       start_time: 2,
    //       timestamp: 1000,
    //       speaker: 'speaker1',
    //       text: 'text1',
    //       owner_id: 1
    //     }
    //   ];

    //   const returnedObject = await fakeRequest(app)
    //     .delete('/api/favorites/2')
    //     .set('Authorization', token)
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(returnedObject.body).toEqual(expectation);
    // });

    // add test for /api/chat
    // add test for /api/chat/:id
    // add test for /new_meetings


  });
});
