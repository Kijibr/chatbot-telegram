const TelegramBot = require("node-telegram-bot-api");
const dialogflow = require("./dialogflow");
const youtube = require("./youtube");

const token = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async function (msg) {
  const chatId = msg.chat.id;
  console.log(msg.text);

  const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

  let responseText = dfResponse.text;

  if (dfResponse.intent == "Pj Houdini") {
    responseText = await youtube.searchVideoURL(
      responseText,
      dfResponse.fields.Musicas.stringValue
    );
  }
  bot.sendMessage(chatId, responseText);
});
