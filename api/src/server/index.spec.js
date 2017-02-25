import { expect } from 'chai';
import request from 'supertest';

import app from './';
import InMemoryDb from '../persistence/InMemoryDb';

describe('films', () => {

  describe('GET /films', () => {
    let db;
    let server;

    beforeEach(() => {
      db = InMemoryDb();
    });

    afterEach(() => {
      server.close()
    });

    it('responds with content type json', (done) => {
      server = app(db, 8080);
      request(server)
        .get('/films')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    it('responds with status 200 and empty array when no films exist', (done) => {
      server = app(db, 8080);
      request(server)
        .get('/films')
        .expect(200, [])
        .end(done);
    });

    it('responds with status 200 and array of existing films', (done) => {
      db.create('The Wizard of Oz (1939)');
      db.create('All About Eve (1950)');
      db.create('Inside Out (2015)');
      server = app(db, 8080);
      request(server)
        .get('/films')
        .expect(200, [
          { id: 1, title: 'The Wizard of Oz (1939)' },
          { id: 2, title: 'All About Eve (1950)' },
          { id: 3, title: 'Inside Out (2015)' }
        ])
        .end(done);
    });
  });

  describe('GET /films/:id', () => {
    let server;
    let req;

    before(() => {
      const db = InMemoryDb();
      db.create('The Wizard of Oz (1939)');
      db.create('All About Eve (1950)');
      db.create('Inside Out (2015)');
      server = app(db, 8080);
      req = request(server);
    });

    after(() => server.close());

    it('responds with status code 400 when title is not supplied', (done) => {
      req
        .get('/films/100')
        .expect('Content-Type', /json/)
        .expect(404, { message: '100 not found' })
        .end(done);
    });

    it('responds with status code 200 and film', (done) => {
      req
        .get('/films/1')
        .expect('Content-Type', /json/)
        .expect(200, { id: 1, title: 'The Wizard of Oz (1939)' })
        .end(done);
    });
  });

  describe('PUT /films/:id', () => {
    let server;
    let req;
    let db;

    before(() => {
      db = InMemoryDb();
      db.create('The Wizard of Oz (1939)');
      db.create('All About Eve (1950)');
      db.create('Inside Out (2015)');
      server = app(db, 8080);
      req = request(server);
    });

    after(() => server.close());

    it('responds with status code 200 and updated film', (done) => {
      req
        .put('/films/1')
        .send({ title: 'Hello, world!' })
        .expect('Content-Type', /json/)
        .expect('Location', 'films/1')
        .expect(200, { id: 1, title: 'Hello, world!' })
        .end((e) => {
          if (e) { return done(e) };
          expect(db.readById(1)).to.eql({ id: 1, title: 'Hello, world!' });
          done();
        });
    });

    it('responds with status code 404 when film id does not exist', (done) => {
      req
        .put('/films/100')
        .send({ title: 'Hello, world!' })
        .expect('Content-Type', /json/)
        .expect(404, { message: '100 not found' })
        .end(done);
    });

    it('responds with status code 400 when film request body does not include title', (done) => {
      req
        .put('/films/1')
        .send({ t: 'Hello, world!' })
        .expect('Content-Type', /json/)
        .expect(400, { message: `No title supplied to update film: 1` })
        .end(done);
    });
  });

  describe('POST /films', () => {
    let server;
    let req;
    let db;

    before(() => {
      db = InMemoryDb();
      db.create('The Wizard of Oz (1939)');
      db.create('All About Eve (1950)');
      db.create('Inside Out (2015)');
      server = app(db, 8080);
      req = request(server);
    });

    after(() => server.close());

    it('responds with status code 201 and newly created film', (done) => {
      req
        .post('/films')
        .send({ title: 'Hello, world!' })
        .expect('Location', 'films/4')
        .expect('Content-Type', /json/)
        .expect(201, { id: 4, title: 'Hello, world!' })
        .end((e) => {
          if (e) { return done(e) };
          expect(db.readById(4)).to.eql({ id: 4, title: 'Hello, world!' });
          done();
        });
    });

    it('responds with status code 400 when title is not supplied', (done) => {
      req
        .post('/films')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400, { message: 'No title supplied' })
        .end(done);
    });
  });
});
