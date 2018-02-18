const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = '540538250:AAGxKmYZCFEtpDH6nmVApC8WZ7MXB0MCv5I';
// Включить опрос сервера
var bot = new TelegramBot(token, {
	polling: true
});


var selectedRooms = [];

bot.on('message', msg => {
	if (selectedRooms.length > 0) {
		// for (let i = 0; i < selectedRooms.length; i++) {
		// 	if (selectedRooms[i].userId === msg.chat.id && selectedRooms[i].name.length > 1) {
		// 		bot.sendMessage(msg.chat.id, `Добрий день, ${selectedRooms[i].name}.Чим можу вам допомогти ?"`)
		// 		selectedRooms[i].type = msg.text;
		// 		return;
		// 	}
		// }
	}

	switch (msg.text) {
		case 'Добрий день':
			bot.sendMessage(msg.chat.id, `Добрий день, Себаст\'єн. Мене звати Притчард, чи я можу вам допомогти ?`)
			// bot.sendMessage(msg.chat.id, `Добрий день, ${msg.from.first_name}. Мене звати Притчард, чи я можу вам допомогти ?`)
			break;

		case 'Я бажаю замовити в вашому готелі номер з 19.02 до 28.02':
			selectedRooms.push({
				date: '19.02 - 28.02',
				userId: msg.chat.id,
				name: '',
				type: '',
				roomNumber: null
			})
			bot.sendMessage(msg.chat.id, `Оберіть одну з категорій номеру: Апартаменти, Люкс, Стандарт (одномістний)`)
			break;

		case 'Люкс':
		case 'Апартаменти':
		case 'Стандарт':
			if (selectedRooms.length > 0) {
				for (let i = 0; i < selectedRooms.length; i++) {
					if (selectedRooms[i].userId === msg.chat.id) {
						selectedRooms[i].type = msg.text;
					}
				}
			}
			bot.sendMessage(msg.chat.id, `Скажіть прізвище та ім'я, на яке буде оформлений номер`)
			break;

		case msg.text.substring(1, 4) === 'Васи':
			var currentRoom;
			if (selectedRooms.length > 0) {
				for (let i = 0; i < selectedRooms.length; i++) {
					if (selectedRooms[i].userId === msg.chat.id) {
						currentRoom = selectedRooms[i];
						selectedRooms[i].name = 'Василець Себаст\'єн';
						selectedRooms[i].roomNumber = Math.floor(Math.random() * (81 - 1)) + 1;
					}
				}
			}
			bot.sendMessage(msg.chat.id, `Себаст'єн, за вами заброньований номер ${currentRoom.type} №${currentRoom.roomNumber}, на період ${currentRoom.date}`)
			// bot.sendMessage(msg.chat.id, `${msg.from.first_name}, за вами заброньований номер ${currentRoom.type} №${currentRoom.roomNumber}, на період ${currentRoom.date}`)
			break;
		case 'Мій номер':
			var status = false;
			if (selectedRooms.length > 0) {
				var currentRoom;
				for (let i = 0; i < selectedRooms.length; i++) {
					if (selectedRooms[i].userId == msg.chat.id && selectedRooms[i].userId) {
						status = true;
						currentRoom = selectedRooms[i];
						bot.sendMessage(msg.chat.id, `Добрий день, ${currentRoom.name}. Ваш номер №${currentRoom.roomNumber} ${currentRoom.type}`)
					} else {
						status = false;
					}
				}
			} else {
				status = false;
			}
			if (status === false) {
				bot.sendMessage(msg.chat.id, `Нажаль в нашому готелі за вами не має заброньованого номеру`);
			}
			break;
		default:
			bot.sendMessage(msg.chat.id, `Нажаль я не розумію, що ви маєте на увазі. Спробуйте ще раз, або зверніться на стійку адміністрації за тел. 044-456-12-23`);
			break;
	}
});