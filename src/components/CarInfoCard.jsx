import React from 'react';
import PropTypes from 'prop-types';

import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';

/**
 * @description
 * @export
 * @class CarInfoCard
 * @extends {Component}
 */
export default class CarInfoCard extends React.Component {
  /**
   * @description
   * @readonly
   * @static
   * @memberof CarInfoCard
   */
  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      make: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      available: PropTypes.oneOf([
        'In Dealership',
        'Out of Stock',
        'Unavailable',
      ]),
    };
  }

  /**
   * @description
   * @readonly
   * @memberof CarInfoCard
   */
  get availableInDealership() {
    return this.props.available === 'In Dealership';
  }
  /**
   * @description
   * @readonly
   * @memberof CarInfoCard
   */
  get label() {
    const { name, year } = this.props;
    return `${name} ${year}`;
  }
  /**
   * @description
   * @readonly
   * @memberof CarInfoCard
   */
  get heading() {
    const { make, model } = this.props;
    return `${make} ${model}`;
  }

  /**
   * @description
   * @returns
   * @memberof CarInfoCard
   */
  render() {
    const { id, img, available } = this.props;
    return (
      <div data-component="CarInfoCard" key={id}>
        <Card
          thumbnail={img}
          label={this.label}
          heading={this.heading}
          description={available}
          link={
            this.availableInDealership ? (
              <Anchor href="#" label="Buy This Fancy Car" />
            ) : null
          }
        />
      </div>
    );
  }
}
