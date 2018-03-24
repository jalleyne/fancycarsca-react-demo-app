/**
 * @description
 * @returns
 */
function localRoutes() {
  return [
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: './dist',
          redirectToSlash: true,
          index: true,
        },
      },
    },
  ];
}

/** */
module.exports = localRoutes;
