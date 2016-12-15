import { expect } from 'chai';

import InMemoryDb from './InMemoryDb';

describe('InMemoryDb', () => {

  let db;
  beforeEach(() => {
    db = InMemoryDb();
  })

  describe('.create', () => {
    it('returns a new film when creation is successful', () => {
      const film = { title: 'Bob' };
      expect(db.create(film)).to.deep.equal({ id: 1, title: 'Bob'});
      expect(db.readById(1)).to.deep.equal({ id: 1, title: 'Bob'});
    });

    it('returns a new film at an incremented id', () => {
      db.create({ title: 'Hello' });
      const actual = db.create({ title: 'World' });
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
      db.create({ title: 'Hello' });
      expect(db.read()).to.deep.equal([{ id: 1, title: 'Hello'}]);
    });

    it('returns all films when multiple films exist', () => {
      db.create({ title: 'Hello' });
      db.create({ title: ',' });
      db.create({ title: 'World' });
      expect(db.read()).to.deep.equal([{ id: 1, title: 'Hello'}, { id: 2, title: ','}, { id: 3, title: 'World'}]);
    });
  });

  describe('.readById', () => {
    it('returns undefined when id does not exist', () => {
      expect(db.readById(1)).to.deep.equal(undefined);
    });

    it('returns film at id when id exist', () => {
      db.create({ title: 'Hello' });
      expect(db.readById(1)).to.deep.equal({ id: 1, title: 'Hello' });
    });

    it('returns film at id when id multiple films exist', () => {
      db.create({ title: 'Hello' });
      db.create({ title: ',' });
      db.create({ title: 'World' });
      expect(db.readById(2)).to.deep.equal({ id: 2, title: ',' });
    });
  });

  describe('.update', () => {
    it('returns undefined when id does not exist', () => {
      expect(db.update(1, { title: '' })).to.deep.equal(undefined);
    });

    it('returns and persists film at id with updated title when given id exists', () => {
      const film = db.create({ title: 'Hello' });
      expect(db.update(film.id, { title: '💩'})).to.deep.equal({ id: 1, title: '💩'});
      expect(db.readById(film.id)).to.deep.equal({ id: 1, title: '💩'});
    });
  });
});
