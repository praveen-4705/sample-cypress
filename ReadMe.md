 ### OCAT Js Automation code with Cucumber BDD
 
### Installation
This project is tested on ***Node v10.17.0*** and Above.  While earlier versions of node may be compatible, they have not been tested or verified.

`Node.JS:` Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally.

Once installation is done - open terminal (MAC OSX) or command prompt (for windows OS) and type below command to verify NodeJS has been installed properly.

        node --version
        npm --version
Above command should print out the version that you have installed.

Now navigate to the framework's package.json folder and run `npm install` to grab all dependencies.

### Cypress

  To run your test You must have cypress server up and running to execute any cypress cucumber tests, or it will fail fast with an error.

  Once all the node dependency modules are installed (through `npm install`) then for development, you can run  `npm run cy:open`  to open the cypress. From the cypress ide we can select the require test and the browser to execute the test
  
### Run Tests

To execute the smoke test suite in local development, you can use any one of the options mentioned below

        npm run test:smoke`

To execute the regression test suite in local development, you can use any one of the options mentioned below

        npm run regression`        

This executes all features in the [`./test/features/*.feature`]  directory with a html reporter by default and references the `web.conf.js` file. Refer to the ./test/config of ocat-js-automation

### Config Files
WebdriverIO uses configuration files to setup and execute tests in specific ways.  The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files can be found in the `/test/config/` directory and all end with `*.conf.js`.

### Reporters

##### HTML Reporter
A reporter for webdriver.io which generates a HTML report.

Compatible with webdriverio version 6, with a typescript type file.

## Sample Output:

![Report Screenshot](readme/html-reporter-1.png)

### Develop automation scripts

You can write test by using Cucumber BDD framework. You can choose javascript based design pattern or ES6 based. This project is ES6 friendly (via babel-register)

##### Using Cucumber JavaScript framework

Tests are written in the Cucumber framework using the Gherkin Syntax. More about Gherkin & Cucumber can be found at https://cucumber.io/docs/reference

Tests are place in `*.feature` files in the `/test/features/` directory. A typical test will look similar to this:

```
Feature: Employment Current Activities - Exit Button

  Scenario: Navigate to questionnaire page
    Given I open ocat app
    When I login to to ocat app
    When I click on first client name
    When I click on 'Initiate New Appraisal' link
    Then Validate questionnaire page header

  Scenario: Verify the exit button functionality in Employment Current Activities page
    When I expand 'Employment' section from left navigation
    When I click on 'Current Activities' link from left navigation
    When I update textarea fields with random value in current activities page
    When I click on 'Exit' button
    When I click on 'Initiate New Appraisal' link
    When I pause '10' seconds
    Then Validate questionnaire page header
    When I expand 'Employment' section from left navigation
    When I click on 'Current Activities' link from left navigation
    Then Validate textarea values in current activities page

```

### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath' etc.) up to date with the latest version of your code.  The next challenge is to keep the code you write nice and DRY (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  Instead of including our selectors in our step definitions(in cucumber), we instead place them in a `<pagename>.js` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When A test fails, it fails on a individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern.  This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.js`.  These will require the basic `page.js` prototype construct / abstract class and create new objects for each individual page.

For more information on the implementation of `Page Object Design Pattern`, refer to the `/test/pageobjects` directory. A typical page class using ES6 syntax will look similar to this:

```
import BasePage from './basepage.js'

class LoginPage extends BasePage {

    /**
     * Define Elements
     */

    get tbUsername()   { return $('#username'); }
    get tbPassword()   { return $('#password'); }
    get btnLogin()     { return $('//button[contains(normalize-space(), "SIGN IN")]'); }
    get cbTermsOfService() { return $('//input[@type = \'checkbox\']'); }
    get headerText() {return '//h6[@class = \'MuiTypography-root MuiTypography-h6\']'};

    login (username, password) {
        this.tbUsername.setValue(username);
        this.tbPassword.setValue(password);
        this.cbTermsOfService.click();
        this.btnLogin.click();
    }

    open() {
        browser.maximizeWindow();
        super.open('http://test.ocat.calsaws.net/');
    }
}

export default new LoginPage()

```
