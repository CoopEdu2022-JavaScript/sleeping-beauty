const fs = require('fs');
const xlsx = require('xlsx');
const nodemailer = require('nodemailer');

// 读取 Excel 文件
const workbook = xlsx.readFile('email.xlsx');
const sheet = workbook.Sheets['sheet1'];

// 获取邮箱列表和邮件内容
const emails = xlsx.utils.sheet_to_json(sheet).map(row => row.email);
const contents = xlsx.utils.sheet_to_json(sheet).map(row => row.content);

// 创建邮件发送器
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // 邮件服务器主机名
  port: 465, // 邮件服务器端口号
  secure: true, // 使用 SSL
  auth: {
    user: 'your-email@example.com', // 发件人邮箱
    pass: 'your-email-authorization-code', // 发件人邮箱授权码
  },
});

// 遍历邮箱列表，发送邮件并写入结果
for (let i = 0; i < emails.length; i++) {
  const email = emails[i];
  const content = contents[i];

  // 邮件选项
  const mailOptions = {
    from: 'your-email@example.com', // 发件人邮箱
    to: email, // 收件人邮箱
    subject: '邮件标题', // 邮件标题
    text: content, // 邮件内容
  };

  // 发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`邮件发送失败: ${error}`);
      sheet[`C${i+2}`] = '失败'; // 写入失败结果
    } else {
      console.log(`邮件发送成功: ${info.response}`);
      sheet[`C${i+2}`] = '成功'; // 写入成功结果
    }

    // 写入 Excel 文件
    xlsx.writeFile(workbook, 'email.xlsx');
  });
}