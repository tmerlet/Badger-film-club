import { expect } from 'chai';
import { spy } from 'sinon';

import { GET_FILMS } from '../../actions/types';

import init from './';

describe('get films middleware', () => {
  const noop = () => {};

  describe('default action', () => {
    it('calls next with given action when action type is not GET_FILMS', () => {
      const nextSpy = spy();
      const action = { type: 'PENGUIN', payload: {}};
      init(noop, '')(noop)(nextSpy)(action);
      expect(nextSpy.calledWith(action)).to.be.true;
    });
  });

  describe(GET_FILMS, () => {
    it('calls next with given action when action type is GET_FILMS', (done) => {
      const fetchStub = spy(() => Promise.reject(done, done()));
      const nextSpy = spy();
      const action = { type: GET_FILMS, payload: {}};
      init(fetchStub, '')(noop)(nextSpy)(action);
      expect(nextSpy.calledWith(action)).to.be.true;
    });

    it('calls fetch with given url', (done) => {
      const fetchStub = (url) => {
        expect(url).to.equal('someURL');
        done();
      };
      const action = { type: GET_FILMS, payload: {}};
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
      const action = { type: GET_FILMS, payload: {}};
      init(fetchStub, 'someURL')(storeStub)(noop)(action);
    });

    it('calls json if fetch returns ok', (done) => {
      const fetchStub = () => Promise.resolve({
        ok: true,
        json: () => {
          return Promise.reject(done());
        }
      });
      const action = { type: GET_FILMS, payload: {}};
      init(fetchStub, 'someURL')(noop)(noop)(action);
    });

    it('store dispatch is called with getFilmsSuccess', (done) => {
      const fetchStub = () => Promise.resolve({
        ok: true,
          json: () => Promise.resolve('eagles')
      });
      const storeStub = {
        dispatch: (action) => {
          expect(action).to.eql({
            type: 'GET_FILMS_SUCCESS',
            payload: {
              films: 'eagles'
            }
          });
          done();
        }
      };
      const action = { type: GET_FILMS, payload: {}};
      init(fetchStub, 'someURL')(storeStub)(noop)(action);
    });
  });
});
