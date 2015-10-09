# Twitter (or LX Twit)

[![Codecrystal](https://img.shields.io/badge/code-crystal-5CB3FF.svg)](http://codecrystal.herokuapp.com/crystalise/liberty-x/twitter/master) [![Build Status](https://travis-ci.org/liberty-x/twitter.svg?branch=master)](https://travis-ci.org/liberty-x/twitter)  [![Code Climate](https://codeclimate.com/github/liberty-x/twitter/badges/gpa.svg)](https://codeclimate.com/github/liberty-x/twitter) [![Test Coverage](https://codeclimate.com/github/liberty-x/twitter/badges/coverage.svg)](https://codeclimate.com/github/liberty-x/twitter/coverage) [![bitHound Score](https://www.bithound.io/github/liberty-x/twitter/badges/score.svg)](https://www.bithound.io/github/liberty-x/twitter) ![devDependencies](https://david-dm.org/liberty-x/twitter.svg) [![devDependency Status](https://david-dm.org/liberty-x/twitter/dev-status.svg)](https://david-dm.org/liberty-x/twitter#info=devDependencies) [![codecov.io](http://codecov.io/github/liberty-x/twitter/coverage.svg?branch=master)](http://codecov.io/github/liberty-x/twitter?branch=master)

[![forthebadge](http://forthebadge.com/images/badges/uses-html.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com)

Please find our site [here](https://ancient-tundra-9548.herokuapp.com/).

## Who?

Liberty-X, a project team in the 6th iteration of the Founders & Coders academy. Members: Justen Barget, Rachel Black, Huw Davies and Ruth Uwemedimo.

## What?

LX Twit will be a simple twitter-esque page to post 'tweets' on. We are hosting this on Heroku. We are conducting this project during our 4th week of the course.

## Why?

We are experimenting with the use of Redis as our backend database. Our users' 'tweets' will be stored there and displayed on our page.

### Our opening whiteboard plan! (with wireframe)

![whiteboard plan](https://files.gitter.im/RachelBLondon/libert-x/aOR8/DSC_0600.JPG "Logo Title Text 1")


### Functionality

Users input their username and tweet in a form box that will then appear below. Through using local storage, they and only they will be able to delete their own tweets.

### Depedencies

* Redis (database)
* Env2 (enviroment variables)
* Pre-commit

#### Dev Dependencies

* QUnit (frontend testing)
* Tape (backend testing)
* Shot (backend testing)
* Istanbul
* Codeclimate

### Testing

Link [here](https://ancient-tundra-9548.herokuapp.com/test/test.html) to our frontend tests, conducted with QUnit.

For backend testing, please download our repo and run our backend.js file, having used the command ``npm install`` to download our dependencies shown above.
