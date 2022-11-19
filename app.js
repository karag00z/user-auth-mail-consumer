require("dotenv").config();
const { mongoconnection, mqsetup, sendMail } = require("./utils/helper");

(async () => {
  try {
    const queue = "send-mail";
    await mongoconnection();
    const channel = await mqsetup();
    await channel.assertQueue(queue);
    channel.consume(queue, async (msg) => {
      const message = JSON.parse(msg.content.toString());
      await sendMail(message.type, message.uid);
      channel.ack(msg);
      const date = Date.now();
      console.log("ACK OK" + date);
    });
  } catch (error) {
    console.log(error);
  }
})();
