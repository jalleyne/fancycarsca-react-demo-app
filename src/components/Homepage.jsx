import React from 'react';

/**
 * @description
 * @export
 * @class Homepage
 */
export default class Homepage extends React.Component {
  /**
   * @description
   * @readonly
   * @static
   * @memberof Homepage
   */
  static get propTypes() {
    return {};
  }

  /**
   * @description
   * @returns
   * @memberof Homepage
   */
  render() {
    return (
      <main>
        <h1>Fancy Cars!</h1>
      </main>
    );
  }
}
