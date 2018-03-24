import { connect } from 'react-redux';
import { List } from 'immutable';
import size from 'lodash/size';
import withAsyncState from 'react-with-async-state';

import { listCars } from '../redux/actions/cars';

import AsyncWait from '../components/AsyncWait';
import AsyncError from '../components/AsyncError';
import CarList from '../components/CarList';

/**
 * anonymous function - description
 *
 * @param  {type} state description
 * @return {type}       description
 */
const mapStateToProps = function(state) {
  const { cars } = state;
  return {
    cars: cars.get('items', List()).toJS(),
    isFetching: cars.getIn(['_metadata', 'isFetching'], false),
  };
};

/**
 * mapDispatchToProps - Description
 *
 * @param {type} dispatch Description
 *
 * @return {type} Description
 */
const mapDispatchToProps = function(dispatch) {
  return {
    fetch: function() {
      dispatch(listCars());
    },
  };
};

/**
 *
 */
export default connect(mapStateToProps, mapDispatchToProps)(
  withAsyncState(CarList, AsyncWait, AsyncError, function({ cars }) {
    return !!size(cars);
  })
);
