import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

import Button from 'grommet/components/Button';

/**
 * AsyncError - Description
 * @extends Component
 */
export default class AsyncError extends Component {
  /**
   * @static propTypes - Description
   *
   * @return {type} Description
   */
  static get propTypes() {
    return {
      fetch: PropTypes.func,
    };
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { fetch } = this.props;
    const { reload } = window.location;

    return (
      <div data-component="AsyncError">
        <h4>Oops, You got an error!</h4>

        {isFunction(fetch) ? (
          <div>
            <p>Something went wrong, please try again.</p>
            <p>
              <Button onClick={() => fetch()}>Try again</Button>
            </p>
          </div>
        ) : (
          <div>
            <p>Something went wrong, refresh the page.</p>
            <p>
              <Button onClick={() => reload()}>Reload</Button>
            </p>
          </div>
        )}
      </div>
    );
  }
}
