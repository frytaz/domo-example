var Domo, domo;

Domo = require('domo-kun');

domo = new Domo({
  nick: 'DomoExample',
  userName: 'Domo',
  realName: 'Domo the awesome IRC-bot',
  address: 'irc.quakenet.org',
  channels: ['#h4x3d'],
  users: [
    {
      username: 'riku',
      password: 'admin'
    }
  ],
  debug: true
});

var typoFixes = {};

domo.route('!fix', function(res) {
  this.say(res.channel, "Syntax: \n!fix :typo :fix  -  register a new typo fix\n!unfix :typo  -  unregister typo fix\n");
});

domo.route('!fix :typo :fix', function(res) {
  typoFixes[res.params.typo] = res.params.fix;
  this.say(res.channel, 'Replacing "' + res.params.typo + '" with ' + res.params.fix);
});

domo.route('!unfix :typo', function(res) {
  if(typoFixes.hasOwnProperty(res.params.typo)) {
    delete typoFixes[res.params.typo];
  }
  this.say(res.channel, 'Not replacing "' + res.params.typo + '" anymore');
});

domo.route('*', function(res) {
  if(!res.splats[0]) return;

  var replaces = res.splats[0].split(' ').map(function(word) {
    if(typoFixes.hasOwnProperty(word)) {
      return typoFixes[word];
    }
    return word;
  }).join(' ');

  if(replaces === res.splats[0]) return;

  this.say(res.channel, 'Fixed ' + res.nick + ' : ' + replaces);

});

domo.connect();

