# my-hapi-server
Create, configure, require and load scripts, strategies, routes, and return a Hapi server

## Example


Here we pass in server and connection options as well as describe the folder conventions.

The `server` will be created, setup, and passed back, ready for testing or for calling `start` on.

```
module.exports = require('my-hapi-server')(__dirname+'/src', {
  server: {
    connections: { routes: { cors: true } },
    //debug: { 'request': ['error', 'uncaught'] }
  },
  connection: {
    port: process.env.PORT
  },
  loader: {
    auth: {
      glob: 'auth/**/*.js',
      leaf: function(i) { return i.length === 3; }
    },
    routes: {
      glob: 'routes/**/*.js',
      leaf: function(i) { return i.handler; }
    },
    plugins: {
      glob: 'plugins/**/*.js',
      leaf: function(i) { return i.register; }
    }
  }
})
```
