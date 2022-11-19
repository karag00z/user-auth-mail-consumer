const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const User = require("../models/user");
const mq = require("amqplib");
const ejs = require("ejs");

const nmailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.readTemplate = async (mailtemplate, dataoption) => {
  const data = await ejs.renderFile(`./utils/mailtemplate/${mailtemplate}`, dataoption);
  return data;
};

exports.sendMail = async (type, uid) => {
  const user = await getuser(uid);
  if (!user) return false;
  const htmlfile = await this.readTemplate(type, user);
  const mail = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "User Auth System",
    html: htmlfile,
  };
  await nmailer.sendMail(mail);
  console.log("Send Mail - OK");
};

const getuser = async (uid) => {
  const user = await User.findById(uid, { password: 0 });
  if (!user) return false;
  return user;
};

exports.mongoconnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connection Success");
  } catch (error) {
    console.log(error);
  }
};

exports.mqsetup = async () => {
  const conn = await mq.connect(process.env.MQ_URL);
  console.log(`RabbitMQ Connection Success`);
  const channel = await conn.createChannel();
  return channel;
};
