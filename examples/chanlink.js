// Links 2 servers together

var _ = require('underscore'),
    Domo = require('domo-kun');

// Base configuration
var config = {
  nick: 'Domo',
  userName: 'Domo',
  realName: 'Domo the awesome IRC-bot',
  channels: ['#domo'],
  users: [
    {
      username: 'riku',
      password: 'admin'
    }
  ],
  debug: true
};

// Initialize 2 Domo instances to 2 different servers
var domoFreenode = new Domo(_.extend({address: 'irc.freenode.net'}, config));
var domoDatnode = new Domo(_.extend({address: 'irc.datnode.net'}, config));


var linkToInstance = function(domoInstance) {
  // Returns a function that redirects all received messages to received Domo instance
  return function(res) {
    domoInstance.say(res.channel, domoInstance.config.address + ' | <' + res.nick + '> ' + res.message);
  };
};

// Route Domos to our link function
domoFreenode.route('*', linkToInstance(domoDatnode));
domoDatnode.route('*', linkToInstance(domoFreenode));

// Connect both instances
domoFreenode.connect();
domoDatnode.connect();

