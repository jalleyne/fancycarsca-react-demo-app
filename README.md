# FancyCars.ca

React.js application used as the homepage on fancycars.ca website.

## Dependencies

High level development dependencies:

* Node Version Manager
* Nodejs
* React

## Setup

To setup and run the application follow the steps below, once the

```bash
$ git clone jalleyne/fancycarsca-react-demo-app.git
$ nvm use
$ yarn install # install with yarn
$ npm i # install with npm
```

## Development

* Run the React and Hapi servers simultaniously for development purposes.

  ```bash
  $ npm run dev
  ```

* Startup the backend server only, this will server whatever files are in the dist folder. You should run build before this unless you are testing an existing artifact.

  ```bash
  $ npm run dev:server
  ```

* Startup the frontend server to bundle and reload the React client side files.

  ```bash
  $ npm run dev:react
  ```

## Production

Production build and deployment steps.

```bash
$ npm run build # outputs production build to ./dist folder
$ npm start # starts up a Hapi server instance to server static files and act as a backend for frontend react code.
```
