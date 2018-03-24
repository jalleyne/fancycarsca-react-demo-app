const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
  host: process.env.interface || 'localhost',
  port: process.env.PORT || 8000,
});

// Start the server
async function start() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Http server running at:', server.info.uri);
}

start();
