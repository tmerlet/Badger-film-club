import { expect } from 'chai';
import { spy } from 'sinon';

import { INIT_FETCH } from '../../actions/types';

import init from './';

describe('init middleware', () => {
  const noop = () => {};

  describe('default action', () => {
    it('calls next with given action when action type is not INIT_FETCH', () => {
      const nextSpy = spy();
      const action = { type: 'PENGUIN', payload: {}};
      init(noop, '')(noop)(nextSpy)(action);
      expect(nextSpy.calledWith(action)).to.be.true;
    });
  });

  describe(INIT_FETCH, () => {
    it('calls next with given action when action type is INIT_FETCH', (done) => {
      const fetchStub = spy(() => Promise.reject(done, done()));
      const nextSpy = spy();
      const action = { type: INIT_FETCH, payload: {}};
      init(fetchStub, '')(noop)(nextSpy)(action);
      expect(nextSpy.calledWith(action)).to.be.true;
    });

    it('calls fetch with given url', (done) => {
      const fetchStub = (url) => {
        expect(url).to.equal('someURL');
        done();
      };
      const action = { type: INIT_FETCH, payload: {}};
      init(fetchStub, 'someURL')(noop)(noop)(action);
    });

    it('calls store dispatch with failure action and error when fetch fails', (done) => {
      const fetchStub = () => Promise.reject('penguins');
      const storeStub = {
        dispatch: (action) => {
          expect(action).to.eql({
            type: 'FAILURE',
            payload: {
              error: 'penguins'
            }
          });
          done();
        }
      };
      const action = { type: INIT_FETCH, payload: {}};
      init(fetchStub, 'someURL')(storeStub)(noop)(action);
    });

    it('calls json if fetch returns ok', (done) => {
      const fetchStub = () => Promise.resolve({
        ok: true,
        json: () => {
          return Promise.reject(done());
        }
      });
      const action = { type: INIT_FETCH, payload: {}};
      init(fetchStub, 'someURL')(noop)(noop)(action);
    });

    it('store dispatch is called with getFilms', (done) => {
      const fetchStub = () => Promise.resolve({
        ok: true,
          json: () => Promise.resolve('eagles')
      });
      const storeStub = {
        dispatch: (action) => {
          expect(action).to.eql({
            type: 'GET_FILMS',
            payload: {
              json: 'eagles'
            }
          });
          done();
        }
      };
      const action = { type: INIT_FETCH, payload: {}};
      init(fetchStub, 'someURL')(storeStub)(noop)(action);
    });
  });
});
