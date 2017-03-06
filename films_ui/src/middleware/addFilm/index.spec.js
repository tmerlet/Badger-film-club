import { expect } from 'chai';
import { spy } from 'sinon';

import { CREATE_FILM } from '../../actions/types';

import addFilm from './';

describe('addFilm middleware', () => {
  const noop = () => {};

  describe('default action', () => {
    it('calls next with given action when action type is not CREATE_FILM', () => {
      const nextSpy = spy();
      const action = { type: 'PENGUIN', payload: {}};
      addFilm(noop, '')(noop)(nextSpy)(action);
      expect(nextSpy.calledWith(action)).to.be.true;
    });
  });

  describe(CREATE_FILM, () => {
    it('calls next with given action when action type is CREATE_FILM', (done) => {
      const fetchStub = spy(() => Promise.reject(done, done()));
      const nextSpy = spy();
      const action = { type: CREATE_FILM, payload: {}};
      addFilm(fetchStub, '')(noop)(nextSpy)(action);
      expect(nextSpy.calledWith(action)).to.be.true;
    });

    it('calls fetch with given url', (done) => {
      const fetchStub = (url) => {
        expect(url).to.equal('someURL');
        done();
      };
      const action = { type: CREATE_FILM, payload: {}};
      addFilm(fetchStub, 'someURL')(noop)(noop)(action);
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
      const action = { type: CREATE_FILM, payload: {}};
      addFilm(fetchStub, 'someURL')(storeStub)(noop)(action);
    });

    it('calls json if fetch returns ok', (done) => {
      const fetchStub = () => Promise.resolve({
        ok: true,
        json: () => {
          return Promise.reject(done());
        }
      });
      const action = { type: CREATE_FILM, payload: {}};
      addFilm(fetchStub, 'someURL')(noop)(noop)(action);
    });
  });
});
