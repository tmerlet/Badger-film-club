import { expect } from 'chai';

import InMemoryDb from './InMemoryDb';

describe('InMemoryDb', () => {

  describe('.create', () => {
    let db;
    beforeEach(() => {
      db = InMemoryDb();
    })
    it('returns a new film when creation is successful', () => {
      const film = { title: 'Bob' };
      expect(db.create(film)).to.deep.equal({ id: 1, title: 'Bob'});
    });

    it('returns a new film at an incremented id', () => {
      db.create({ title: 'Hello' });
      const actual = db.create({ title: 'World' });
      expect(actual).to.deep.equal({ id: 2, title: 'World'});
    });
  });

  describe('.read', () => {
    let db;
    beforeEach(() => {
      db = InMemoryDb();
    })

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
});
