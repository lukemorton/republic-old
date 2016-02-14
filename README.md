# Republic

![Plato who wrote Republic](https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg)

[![npm version](https://badge.fury.io/js/republic.svg)](https://badge.fury.io/js/republic)
[![Build Status](https://travis-ci.org/lukemorton/republic.svg?branch=master)](https://travis-ci.org/lukemorton/republic)

## Goals

Republic was built to provide guidance and productivity to JavaScript developers. Frontend development is an exciting place at the moment and there are many opinions and libraries, Republic brings particularly good ones together for you to:

- Make developers more productive
- Welcome newcomers with structure and consistency
- Prefer serverless, offline first approaches
- Provide isomorphic support for first page load
- Encourage testing

## Proven technology

Republic is built atop modern JavaScript libraries to provide a full framework for frontend development.

- **React** for building the views of your application
- **Redux** for managing state or data of your application
- **Mocha/Chai/Enzyme** for testing your application
- **Express** for serving your applications first page load
- **Sass** for styling your application
- **Babel** for providing modern JavaScript
- **Browserify** for building your application

Along with many other libraries for everything in between. Go open source!

## Active development

Do you want JavaScript development to feel productive? Are you like us and get
tired of wiring up JS applications? Writing the same old actions and reducers.
Or perhaps you just want to help out with some open source?

We'd love you to get involved! Check out our [contribution guidelines](docs/contributing.md).

Whilst we're actively developing republic things our bound to change. We will
be adhering to semantic versioning but keep changing APIs in mind.

## Running example app

You can currently boot up the server from an application. Your application should look like [`examples/`](examples/).

Change into your application directory then run the following:

```
npm install -g republic
republic dev
```

If you have cloned this repository and are working on it you may instead want to:

```
npm install && sudo npm link && republic dev
```

This will boot up a server at http://localhost:3000

## Roadmap

 - [x] Server side rendering
 - [x] Client side rendering
 - [x] Isomorphic routing with execution of actions based on route match
 - [x] Server side hot loading (no browser refresh tho)
 - [ ] Client side hot loading (need help: https://github.com/lukemorton/republic/pull/12)
 - [ ] `republic new` command for new projects
 - [ ] Rewrite republic with tests (initial dev was spike)
 - [ ] Promo video
 - [ ] Implement test runner in `republic dev`
 - [ ] Form action and view helpers
 - [ ] API actions
