const TeleBot = require('telebot');
const googleTrends = require('google-trends-api');
const bot = new TeleBot({

	token : 'BOT-API-KEY',
	usePlugins: ['askUser']

	});


// googleTrends.relatedTopics({keyword: 'india republic day'})
// 	.then(function(results) {
// 	var data = {};
// 	data = JSON.parse(results);
// 	console.log(results);
  	
// 	})

bot.on(['/start', '/back'], msg => {

    let replyMarkup = bot.keyboard([
        ['/keyword', '/related_query'],
        ['/related_topic', '/hide']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Select the Type of search you would like to perform.', {replyMarkup});

});



bot.on('/keyword', msg => {

    const id = msg.from.id;
    return bot.sendMessage(id, 'Enter the keyword you would like to search', {ask: 'search_keyword'});
});

// Ask name event
bot.on('ask.search_keyword', msg => {

    const id = msg.from.id;
    const search_keyword = msg.text;
    var json_result;

    
    msg.reply.text('Top 5 Results', { asReply: true });


   googleTrends.relatedTopics({keyword: search_keyword})
	.then(function(results) {
	var data = {};
	data = JSON.parse(results);
	var final_msg = "";
	
	for (var i = 0; i < 5; i++) {
		var message = `Related Keyword : ${data.default.rankedList[0].rankedKeyword[i].topic.title}\nType : ${data.default.rankedList[0].rankedKeyword[i].topic.type}\nTrend Value : ${data.default.rankedList[0].rankedKeyword[i].value}\n\n`;
		final_msg = final_msg + message;
		
	}
	msg.reply.text(final_msg, { asReply: false });
	final_msg = "";
  	
	})
	.catch(function(err) {
  	console.error(err);
	})

	

});

//related query

bot.on('/related_query', msg => {

    const id = msg.from.id;
    return bot.sendMessage(id, 'Enter the query for which you would like to do a search', {ask: 'search_related_query'});
});

// Ask name event
bot.on('ask.search_related_query', msg => {

    const id = msg.from.id;
    const search_related_query = msg.text;
    var json_result;

    
    msg.reply.text('Top 5 Results', { asReply: true });


    googleTrends.relatedQueries({keyword: search_related_query})
	.then(function(results) {
	var data = {};
	data = JSON.parse(results);
	console.log(data);
	var final_msg = "";

	
	for (var i = 0; i < 5; i++) {
		var message = `Related Query : ${data.default.rankedList[1].rankedKeyword[i].query}\nHits : ${data.default.rankedList[1].rankedKeyword[i].value}\n\n`;
		final_msg = final_msg + message;
	}
  	msg.reply.text(final_msg, { asReply: false });
  	final_msg = "";

	})
	.catch(function(err) {
  	console.error(err);
	})

	

});


bot.on('/related_topic', msg => {

    const id = msg.from.id;
    return bot.sendMessage(id, 'Enter the query for which you would like find related topics', {ask: 'search_related_topic'});
});

// Ask name event
bot.on('ask.search_related_topic', msg => {

    const id = msg.from.id;
    const search_related_topic = msg.text;
    var json_result;

    
    msg.reply.text('Top 5 Results', { asReply: true });


    googleTrends.relatedTopics({keyword: search_related_topic})
	.then(function(results) {
	var data = {};
	data = JSON.parse(results);
	var final_msg = "";

	
	for (var i = 0; i < 5; i++) {
		var message = `Related Search Title : ${data.default.rankedList[1].rankedKeyword[i].topic.title}\nType : ${data.default.rankedList[1].rankedKeyword[i].topic.type}\nTopic Code : ${data.default.rankedList[1].rankedKeyword[i].topic.mid}\nHits : ${data.default.rankedList[1].rankedKeyword[i].value}\n\n`;
		final_msg = final_msg + message;
	}
  	msg.reply.text(final_msg, { asReply: false });
  	final_msg = "";

	})
	.catch(function(err) {
  	console.error(err);
	})

	

});

// Hide keyboard
bot.on('/hide', msg => {
    return bot.sendMessage(
        msg.from.id, 'Shortcut Keyboard Hidden. Type /back to show keyboard.', {replyMarkup: 'hide'}
    );
});

bot.on('edit', (msg) => {
    return msg.reply.text('I saw it! You edited message!', { asReply: true });
});

bot.start();