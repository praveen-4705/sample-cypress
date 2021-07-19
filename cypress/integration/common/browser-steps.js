import { When, And, Before, Then, After } from 'cypress-cucumber-preprocessor/steps';
import { config } from './configuration';
import { createHtmlReport } from 'axe-html-reporter';

/**
 * Display violations by page and then write to a json file for reports
 *
 * @param violations
 */
function terminalLog(violations) {
  cy.log(violations);
  cy.log(config.accessibilityReportPath);
  cy.task('writeData', {
    filePath: config.accessibilityReportPath + config.pageName + '.json',
    data: JSON.stringify(violations, null, 2),
  });
}

When('I open {string} application', async function (application) {
  let myConfig = Cypress.config();
  let uri = myConfig.baseUrl;

  cy.visit(myConfig.baseUrl, { failOnStatusCode: false });
  cy.injectAxe();
});

Then(/^My "(.*?)" page passes accessibility$/, async function (pageName) {
  if (config.checkAccessibility) {
    cy.log('checkA11y on ' + pageName);
    config.pageName = pageName;
    cy.checkA11y(null, null, terminalLog, { skipFailures: true });
  }
});

When('I open {string} url', async function (url) {
  cy.clearCookies();
  try {
    cy.request(url);
  } catch (error) {
    cy.log("Test =================");
  }
});

When('I invoke api', async function () {
  cy.request({
    method: 'GET',
    url: 'http://dummy.restapiexample.com/api/v1/employees',
    headers: {
      'accept': 'application/json'
  }
  }).then(function(response) {
    cy.log("Print To Console")
    cy.log(JSON.parse(JSON.stringify(response.body)));
    expect(response.body).have.property('status');
  });
});
``
After(() => {
  cy.screenshot();
});