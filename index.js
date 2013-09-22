var Domo, domo;

Domo = require('domo-kun');

domo = new Domo({
  nick: 'Domo',
  userName: 'Domo',
  realName: 'Domo the awesome IRC-bot',
  address: 'irc.freenode.org',
  channels: ['#domo'],
  users: [
    {
      username: 'riku',
      password: 'admin'
    }
  ],
  debug: true
});

domo.route('Hello Domo!', function(res) {
  this.say(res.channel, 'Hi ' + res.nick + '!');
});

domo.connect();

