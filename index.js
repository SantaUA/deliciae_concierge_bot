// @ts-nocheck
var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = '540538250:AAGxKmYZCFEtpDH6nmVApC8WZ7MXB0MCv5I';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

// Простая команда без параметров.
bot.on('message', msg => {
	bot.sendMessage(msg.chat.id, `Hello from heroku, bot says: "hi, ${msg.from.first_name}"`)
});