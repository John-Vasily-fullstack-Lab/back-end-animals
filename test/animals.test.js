require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const Animal = require('../lib/models/Animal');
const mongoose = require('mongoose');

describe('contact routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('create an animal', () => {
    return request(app)
      .post('/api/v1/animals')
      .send({
        name: 'bilbo',
        animal: 'goat',
        age: 45,
        color: 'white',
        image: 'image url'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'bilbo',
          animal: 'goat',
          age: 45,
          color: 'white',
          image: 'image url'
        });
      });
  });

  it('can get all animals', async() => {
    const data = [
      {
        name: 'bilbo',
        animal: 'goat',
        age: 45,
        color: 'white',
        image: 'image url'
      },
      {
        name: 'shmilbo',
        animal: 'shmoat',
        age: 15,
        color: 'black',
        image: 'image urllll'
      }
    ];

    await Animal
      .create(data);

    return request(app)
      .get('/api/v1/animals/all')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: expect.any(String),
            name: 'bilbo',
            animal: 'goat',
            age: 45,
            color: 'white',
            image: 'image url'
          },
          {
            _id: expect.any(String),
            name: 'shmilbo',
            animal: 'shmoat',
            age: 15,
            color: 'black',
            image: 'image urllll'
          }
        ]);
      });
  });

  it('get animal by id', async() => {
    const animal = JSON.parse(JSON.stringify(
      await Animal
        .create({
          name: 'bob',
          animal: 'boat',
          age: 4,
          color: 'whitish',
          image: 'image urlss'
        })
    ));

    return request(app)
      .get(`/api/v1/animals/${animal._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'bob',
          animal: 'boat',
          age: 4,
          color: 'whitish',
          image: 'image urlss'
        });
      });
  });

  it('removes animal by id', async() => {
    const animal = JSON.parse(JSON.stringify(
      await Animal
        .create({
          name: 'to delete',
          animal: 'throat',
          age: 40000,
          color: 'itish',
          image: 'image shmurlss'
        })
    ));

    return request(app)
      .get(`/api/v1/animals/${animal._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'to delete',
          animal: 'throat',
          age: 40000,
          color: 'itish',
          image: 'image shmurlss'
        });
      });
  });

});
