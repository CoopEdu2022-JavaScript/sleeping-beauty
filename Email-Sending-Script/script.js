const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// 调用Google Sheets API读取电子邮件列表和邮件内容
async function readEmails() {
  // 构造OAuth2客户端凭据
  const auth = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  auth.setCredentials({
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN,
    scope: SCOPE
  });

  // 创建Google Sheets API客户端
  const sheets = google.sheets({ version: 'v4', auth });

  // 从Google Sheets中读取数据
  const spreadsheetId = 'your_spreadsheet_id_here';
  const range = 'Sheet1!A1:B';
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  const rows = response.data.values;

  // 将电子邮件地址和邮件内容添加到列表中
  const recipients = [];
  let message = '';
  if (rows.length) {
    rows.forEach((row) => {
      recipients.push(row[0]);
      message = row[1];
    });
  }

  // 打印出要发送的电子邮件内容
  console.log(message);

  // 设置发件人电子邮件地址、SMTP服务器和端口
  const senderEmail = 'youremail@example.com';
  const smtpServer = 'smtp.example.com';
  const smtpPort = 587;

  // 创建Nodemailer transport对象并设置SMTP服务器的参数
  const transporter = nodemailer.createTransport({
    host: smtpServer,
    port: smtpPort,
    secure: false, // 如果端口为465，则将其设置为true
    auth: {
      user: senderEmail,
      pass: 'your_password_here',
    },
  });

  // 创建邮件选项对象并设置主题、发件人和收件人等信息
  const mailOptions = {
    from: senderEmail,
    to: recipients.join(','),
    subject: 'Your subject line here',
    text: message,
  };

  // 使用transporter.sendMail方法发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
}

// 调用函数以读取电子邮件列表和邮件内容，并尝试发送电子邮件
readEmails();
