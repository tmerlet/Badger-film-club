import { expect } from 'chai';

import InMemoryDb from './';

describe('InMemoryDb', () => {

  let db;
  beforeEach(() => {
    db = InMemoryDb();
  })

  describe('.create', () => {
    it('returns a new film when creation is successful', () => {
      const title = 'Bob';
      expect(db.create(title)).to.deep.equal({ id: 1, title: 'Bob'});
      expect(db.readById(1)).to.deep.equal({ id: 1, title: 'Bob'});
    });

    it('returns a new film at an incremented id', () => {
      db.create('Hello');
      const actual = db.create('World');
      expect(actual).to.deep.equal({ id: 2, title: 'World'});
      expect(db.readById(1)).to.deep.equal({ id: 1, title: 'Hello'});
      expect(db.readById(2)).to.deep.equal({ id: 2, title: 'World'});
    });
  });

  describe('.read', () => {
    it('returns empty object when no films exist', () => {
      expect(db.read()).to.deep.equal([]);
    });

    it('returns film when only one film exists', () => {
      db.create('Hello');
      expect(db.read()).to.deep.equal([{ id: 1, title: 'Hello'}]);
    });

    it('returns all films when multiple films exist', () => {
      db.create('Hello');
      db.create(',');
      db.create('World');
      expect(db.read()).to.deep.equal([{ id: 1, title: 'Hello'}, { id: 2, title: ','}, { id: 3, title: 'World'}]);
    });
  });

  describe('.readById', () => {
    it('returns undefined when id does not exist', () => {
      expect(db.readById(1)).to.deep.equal(undefined);
    });

    it('returns film at id when id exist', () => {
      db.create('Hello');
      expect(db.readById(1)).to.deep.equal({ id: 1, title: 'Hello' });
    });

    it('returns film at id when id multiple films exist', () => {
      db.create('Hello');
      db.create(',');
      db.create('World');
      expect(db.readById(2)).to.deep.equal({ id: 2, title: ',' });
    });
  });

  describe('.update', () => {
    it('returns undefined when id does not exist', () => {
      expect(db.update(1, '')).to.deep.equal(undefined);
    });

    it('returns and persists film at id with updated title when given id exists', () => {
      const film = db.create('Hello');
      expect(db.update(film.id, '💩')).to.deep.equal({ id: 1, title: '💩'});
      expect(db.readById(film.id)).to.deep.equal({ id: 1, title: '💩'});
    });
  });

  describe('.remove', () => {
    it('returns null when id does not exist in DB', () => {
      expect(db.remove(12)).to.equal(null);
    });

    it('expects a film to be removed when passed the id of an existing film', () => {
      const title = 'Bob';
      db.create('Bob');
      expect(db.remove(1)).not.to.equal(null);
      expect(db.readById(1)).to.deep.equal(undefined);
    });
  });
});
