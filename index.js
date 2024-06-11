const mineflayer = require('mineflayer');
const express = require('express');
const autoauth = require('autoauth');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// Create an autoauth instance
const auth = autoauth({
  // Your Minecraft username (not email)
  username: 'your_minecraft_username',
  // Your Minecraft password (not required, but recommended for security)
  // password: 'your_minecraft_password',
});

// Create a Minecraft bot using the autoauth instance
const bot = mineflayer.createBot({
  host: 'your.aternos.server.ip',
  port: 25565,
  auth: auth,
  version: '1.18.1', // adjust to your server version
});

bot.on('spawn', () => {
  console.log('Bot spawned!');
  // teleport to a safe location to avoid death
  bot.teleport(0, 64, 0);
  bot.setGameMode('creative');
});

bot.on('kicked', (reason) => {
  console.log(`Kicked from server: ${reason}`);
  // try to reconnect after 10 seconds
  setTimeout(() => {
    bot.connect();
  }, 10000);
});

bot.on('error', (err) => {
  console.log(`Error: ${err}`);
});

// Create an HTTP server to respond to UptimeRobot.com requests
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<html><body>Bot is running!</body></html>');
});

server.listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});
