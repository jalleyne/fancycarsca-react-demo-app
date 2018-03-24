import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

/** */
import Box from 'grommet/components/Box';

/** */

import Sort from 'grommet-addons/components/Sort';
import CarInfoCard from './CarInfoCard';

/** */
export const SortDirectionAscending = 'asc';
export const SortDirectionDescending = 'desc';

/** */
export const SortAttributeDefault = 'id';

/**
 * @description
 * @export
 * @param {any} list
 * @param {any} prop
 * @param {any} [direction=SortDirectionAscending]
 * @returns
 */
export function sortByAttributeAndDirection(
  list,
  prop,
  direction = SortDirectionAscending
) {
  const sortedList = sortBy(list, [prop]);
  return direction == SortDirectionAscending
    ? sortedList
    : sortedList.reverse();
}

/**
 * @description
 * @export
 * @param {any} attribute
 * @param {any} direction
 * @returns
 */
export function cacheKeyForSort(attribute, direction) {
  return [attribute, direction].join('.');
}

/**
 * @description
 * @export
 * @class CarList
 */
export default class CarList extends React.Component {
  /**
   * @description
   * @readonly
   * @static
   * @memberof CarList
   */
  static get propTypes() {
    return {
      cars: PropTypes.arrayOf(PropTypes.shape(CarInfoCard.propTypes)),
      defaultSortAttribute: PropTypes.string,
      defaultSortDirection: PropTypes.oneOf([
        SortDirectionAscending,
        SortDirectionDescending,
      ]),
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
    };
  }
  /**
   * Creates an instance of CarList.
   * @memberof CarList
   */
  constructor() {
    super();

    /** */
    this._onSortOptionsChange = this._onSortOptionsChange.bind(this);

    /** */
    this.state = {
      sortDirection: SortDirectionAscending,
      sortAttribute: SortAttributeDefault,
      sortOptions: [],
      cachedSortedLists: {},
    };
  }
  /**
   * @description
   * @param {any} {direction, value}
   * @memberof CarList
   */
  _onSortOptionsChange({ direction, value }) {
    const cacheKey = cacheKeyForSort(value, direction);
    const { cars } = this.props;
    const { cachedSortedLists } = this.state;
    const sortedList = get(
      this.state,
      ['cachedSortedLists', cacheKey],
      sortByAttributeAndDirection(cars, value, direction)
    );

    this.setState({
      sortDirection: direction,
      sortAttribute: value,
      sortedList,
      cachedSortedLists: Object.assign(cachedSortedLists, {
        [cacheKey]: sortedList,
      }),
    });
  }
  /**
   * @description
   * @param {any} props
   * @param {any} state
   * @returns
   * @memberof CarList
   */
  _mapDefaultPropsToState(props, state) {
    const { sortDirection, sortAttribute, cachedSortedLists = {} } = state;
    const {
      cars,
      defaultSortAttribute = sortAttribute,
      defaultSortDirection = sortDirection,
    } = props;
    const sortedList = sortByAttributeAndDirection(
      cars,
      defaultSortAttribute,
      defaultSortDirection
    );
    const cacheKey = cacheKeyForSort(
      defaultSortAttribute,
      defaultSortDirection
    );
    //
    return {
      sortAttribute: defaultSortAttribute,
      sortDirection: defaultSortDirection,
      sortedList,
      cachedSortedLists: Object.assign(cachedSortedLists, {
        [cacheKey]: sortedList,
      }),
    };
  }

  /**
   * @description
   * @memberof CarList
   */
  componentDidMount() {
    //
    this.setState(this._mapDefaultPropsToState(this.props, this.state));
  }

  /**
   * @description
   * @param {any} nextProps
   * @memberof CarList
   */
  componentWillReceiveProps(nextProps) {
    //
    this.setState(
      Object.assign(this._mapDefaultPropsToState(nextProps, this.state), {
        cachedSortedLists: {},
      })
    );
  }

  /**
   * @description
   * @param {any} [cars=[]]
   * @returns
   * @memberof CarList
   */
  _renderCarList(cars = []) {
    return cars.map(car => {
      const { id } = car;
      return (
        <Box
          key={id}
          direction="row"
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          <CarInfoCard {...car} />
        </Box>
      );
    });
  }

  /**
   * @description
   * @returns
   * @memberof CarList
   */
  render() {
    const { defaultSortAttribute, defaultSortDirection, options } = this.props;
    const {
      sortedList,
      sortAttribute = defaultSortAttribute,
      sortDirection = defaultSortDirection,
    } = this.state;
    return (
      <div data-component="CarList">
        <Box
          direction="row"
          justify="start"
          align="center"
          wrap={true}
          reverse={false}
          pad="medium"
          margin="small"
          colorIndex="light-2"
        >
          <Sort
            options={options}
            value={sortAttribute}
            direction={sortDirection}
            onChange={this._onSortOptionsChange}
          />
        </Box>
        <Box
          direction="row"
          justify="start"
          align="center"
          wrap={true}
          reverse={false}
          pad="medium"
          margin="small"
          colorIndex="light-2"
        >
          {this._renderCarList(sortedList)}
        </Box>
      </div>
    );
  }
}
