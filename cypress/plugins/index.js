/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  require('cypress-log-to-output').install(on);
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}

const cucumber = require('cypress-cucumber-preprocessor').default
const path = require('path');
const fs = require('fs');

function ensureDirectoryExistence(filePath) {
  console.log(filePath);
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname);
}

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}

/**
 * @type {Cypress.PluginConfig}
 */
 module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('file:preprocessor', cucumber());

  // task definition for reports to a directory/file path. Ensures directory exists
  on('task', {
    existsSync (path) {
      return fs.existsSync(path);
    },
    writeData (arg) {
      ensureDirectoryExistence(arg.filePath);
      fs.writeFileSync(arg.filePath, arg.data, (err) => {
        console.log(err);
      });
      return null;
    }
  });

  on('task', {
    log(message) {
      console.log(message)

      return null
    },
  });
  

  require('@cypress/code-coverage/task')(on, config);

  // require('cypress-react-unit-test/plugins/react-scripts')(on, config);

  // require('react-scripts/config/env');
  // console.log('loading env variables for react from .env.'+process.env.REACT_APP_ENV);
  // console.log(process.env);
  // config.env = {...config.env, ...process.env};

  return config
};
