var _ = require('underscore'),
    Domo = require('domo-kun');

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

var linkToInstance = function(domoInstance) {
  return function(res) {
    if(config.channels.indexOf(res.channel) === -1) return;
    domoInstance.say(res.channel, domoInstance.config.address + ' | <' + res.nick + '> ' + res.message);
  };
};

var domoFreenode = new Domo(_.extend({address: 'irc.freenode.net'}, config));
var domoDatnode = new Domo(_.extend({address: 'irc.datnode.net'}, config));

domoFreenode.route('*', linkToInstance(domoDatnode));
domoDatnode.route('*', linkToInstance(domoFreenode));

domoFreenode.connect();
domoDatnode.connect();

