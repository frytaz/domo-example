// Resolve titles of the received URLs

var _ = require('underscore'),
    request = require('request'),
    cheerio = require('cheerio'),
    Domo = require('domo-kun');

var urlRegex = /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;

var domo = new Domo({
  nick: 'Domo',
  userName: 'Domo',
  realName: 'Domo the awesome IRC-bot',
  address: 'irc.datnode.net',
  channels: ['#domo'],
  users: [
    {
      username: 'riku',
      password: 'admin'
    }
  ],
  debug: true
});

domo.route(urlRegex, function(res) {
  if(!res.splats[0]) return;

  request(res.splats[0], function(error, response, body) {
    if(error || response.statusCode !== 200) return;
    var $ = cheerio.load(body);
    var title = $('title').text();
    if(title !== '') {
      return domo.say(res.channel, title);
    }
  });
});

domo.connect();

