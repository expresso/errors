# Errors

> Error middleware for expresso

## Summary

- [Errors](#errors)
  - [Summary](#summary)
  - [how this works](#how-this-works)
  - [Basic usage](#basic-usage)

## how this works

The error middleware will receive all errors from `@expresso/app` (and every other error thrown inside any routes) and it is going to sanitize it to a default response pattern with `message`, `code` and `stack` informations. It'll also catch any unknown error messages and parse it as HTTP 500 error.

## Basic usage

Install it:

```sh
$ npm i @expresso/errors
```

Import and use it:

```ts
import route from './route'
import { privKey } from './config'
import expresso from '@expresso/app'
import server from '@expresso/server'
import errors from '@expresso/errors'
import { IExpressoConfigOptions } from '@expresso/app'

interface IAppConfig extends IAuthConfig, IExpressoConfigOptions {}

const appFactory = expresso((app, config: IAppConfig, environment) => {

    app.get('/', route)

    app.use(errors(environment))
})

const options = {
  name: 'myApp',
  jwt: {
    algorithms: ['HS256'],
    audience: 'your-audience',
    issuer: 'your-issuer',
    secret: 'shhhhh'
  }
}

server.start(appFactory, options)
```

The error middleware receives a string declaring the current environment for your application. If this environment is different from `production`, then all the error stack will also be displayed.
