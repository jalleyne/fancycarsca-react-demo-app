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
          lookupCompressed: true,
        },
      },
    },
  ];
}

/** */
module.exports = localRoutes;
