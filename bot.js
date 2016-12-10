var twit = require('twit');
var config = require('./config.js');
var Secrets = new twit(config);



// ==== retweet bot ====
var retweet = function(){
	var based_on = {
		q: 'cake, #cake',
		result_type: 'recent',
		lang: 'en'	
	}

	Secrets.get('search/tweets', based_on, function(err, data){
		if (!err) {
			// get id of tweet.
			var retweetId = data.statuses[0].id_str;
			// tell twit to do its thing . retweet.
			Secrets.post('statuses/retweet/:id', {
				id: retweetId
			}, function(err, response) {
				if (response) {
					console.log("!! YES RT !!");
				}
				if (err) {
					console.log("xx NO RT xx");
				}
			});
		}
		else {
			console.log("it was the search...");
		}
	});
}
retweet();
// RT every 50 mins
setInterval(retweet, 3000000);
