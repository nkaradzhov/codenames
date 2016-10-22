module.exports = function(httpServer) {
  var io = require('socket.io').listen(httpServer);

  require('./gamerooms')(io)

};
