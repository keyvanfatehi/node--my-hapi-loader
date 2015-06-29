var Hapi = require('hapi');

module.exports = function(root, config) {
  var loader = require('my-loader')(root);
  var server = new Hapi.Server(config.server);
  server.connection(config.connection);
  loader.configure(config.loader);
  loader.load('plugins').then(function(plugins) {
    server.register(plugins, function(err) {
      if (err) throw err;
      loader.load('auth').map(function(strategy) {
        server.auth.strategy.apply(this, strategy);
      });
      loader.load('routes').then(function(routes) {
        server.route(routes);
      });
    })
  })
  return server;
}
