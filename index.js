var io = require('socket.io-client');
const chalk = require('chalk').constructor({ enabled: true, level: 3 });;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var id = "";
var buffer = "";

rl.question(`AD: katsms.kathool.repl.co is an KATSMS powered server made by Kathool\nwhy use KATSMS you ask?\nKATSMS is simple and easy to host and requires barely any CPU Ussage!\n\nType in Server CURL/IP\n\n `, (serverip) => {
  var socket = io(serverip);

  socket.on('connect', () => {
    rl.question(`\nWhat is your name?\n\n `, (answer) => {
      socket.emit("message", `${chalk.green(answer)} has joined the chat`);
      id = answer;
      chat(socket);
    });
  });

  socket.on('msg', function(data){
    if(buffer!=data){
      console.log("\n" + data);
      chat(socket);
    }
  });
});

function chat(socket) {
  rl.question(chalk.magenta("» "), (answer) => {
      buffer = `${chalk.cyan(id)} : ${chalk.blue(answer)}`;
      socket.emit("message", buffer);
      chat(socket);
    });
}