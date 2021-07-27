export const config = {
  testUrl: 'http://localhost:3000',
  timeout: 250000,
  username: process.env.DASHBOARD_USERNAME | 'mock',
  password: process.env.DASHBOARD_PASSWORD | 'password',
  accessibilityReportPath: './cypress/reports/axe-report-',
  checkAccessibility: Cypress.env('checkAccessibility'),
  browserName: Cypress.browserName,
};