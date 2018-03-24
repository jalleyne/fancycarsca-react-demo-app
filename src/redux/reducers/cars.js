import { List, Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { listCarsSuccess, listCarsError } from '../actions/cars';

const defaultState = Map({
  items: List(),
  _indexed: Map({}),
  _metadata: Map({
    isFetching: false,
  }),
});

export default handleActions(
  {
    /** List Cars */
    [listCarsSuccess](state, { payload: items, meta: { isFetching } }) {
      return state.set('items', List(fromJS(items))).mergeDeep({
        _metadata: Map({
          isFetching: isFetching,
          updatedOn: new Date(),
        }),
      });
    },
    [listCarsError](state, { payload, meta: { isFetching } }) {
      return state.mergeDeep({
        error: payload,
        _metadata: state.get('_metadata').set('isFetching', isFetching),
      });
    },
  },
  defaultState
);
