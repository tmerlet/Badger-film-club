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
});
