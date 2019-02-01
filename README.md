# karma-base
 A base configuration for running Karma browser tests locally and on Sauce Labs.

## Installation

Install as a development dependency.

`npm install @author.io/karma-base -D`

## Usage

This module uses [localenvironment](https://github.com/coreybutler/localenvironment) internally to determine whether an environment variable called `SAUCE_USERNAME` exists. If this exists, it is assumed to be running on a CI service. Since localenvironment will allow users to use a `env.json` file, it is possible to mimic this on your local development workstation. If you set SauceLabs environment variables, it will always run the Karma tests on Sauce Labs. However; sometimes you just want to test in a local browser. In these circumstances, use the `--local` flag to force tests to run locally: `karma start karma.conf.js --local`.

An example `env.json` file, placed in the same folder as `package.json`, looks like:

```
{
  "SAUCE_USERNAME": "username",
  "SAUCE_ACCESS_KEY": "key"
}
```
