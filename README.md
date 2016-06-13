# Republic

![Plato who wrote Republic](https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg)

[![npm version](https://badge.fury.io/js/republic.svg)](https://badge.fury.io/js/republic)
[![Build Status](https://travis-ci.org/lukemorton/republic.svg?branch=master)](https://travis-ci.org/lukemorton/republic)

## Goals

Republic was built to provide guidance and productivity to anyone wanting to build an application with React. Frontend development is an exciting place at the moment and there are many opinions and libraries. Republic brings together popular opinions and libraries in order to:

- Reduce boilerplate and setup time when creating an isomorphic react app
- Welcome newcomers with structure, consistency and most importantly documentation
- Encourage developers to test their applications

## Proven technology

Republic is built atop modern JavaScript libraries to provide a full framework for frontend development.

- **React** for building the UI of your application
- **Redux** for managing the state of your application
- **Mocha/Chai/Enzyme** for testing your application
- **Express** for serving your application
- **Sass** for styling your application
- **Babel** for modern JavaScript
- **Browserify** for building your application

Along with many other libraries for everything in between. Go open source! We'd especially like to say thanks to all the contributors of the npm modules we've used to build react :)

## Active development

Do you want JavaScript development to feel productive? Are you like us and get tired of wiring up JS applications? Writing the same old actions and reducers. Or perhaps you just want to help out with some open source?

We'd love you to get involved! Check out our [contribution guidelines](docs/contributing.md).

Whilst we're actively developing republic things our bound to change. We will be adhering to semantic versioning but keep changing APIs in mind.

## Getting Started

To get started you'll first want to install republic globally:

```
npm install -g republic
```

Once republic is installed you can now generate an example application with the
following command:

```
republic new example-app
```

This command will create a new directory `example-app/`, copy an example app
into it and then install dependencies.

Now you're ready to boot the application:

```
cd example-app
republic dev
```

This will boot up a server at [http://localhost:3000](http://localhost:3000).

## Roadmap

 - [x] Server side rendering
 - [x] Client side rendering
 - [x] Isomorphic routing with execution of actions based on route match
 - [x] Server side hot loading (no browser refresh tho)
 - [x] Client side hot loading of views extending React.Component
 - [x] `republic new` command for new projects
 - [ ] Promo video
 - [ ] Rewrite republic with tests (initial dev was spike)
 - [ ] Implement test runner in `republic dev`
 - [ ] `republic generate` command for new projects
 - [ ] Form action and view helpers
 - [ ] API actions
