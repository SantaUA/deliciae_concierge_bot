const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
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