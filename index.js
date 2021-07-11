const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// получение запроса от клиента и отправка письма
app.post('/api/form', (req,res) =>{
    console.log(req.body)
    nodemailer.createTestAccount((err,account) => {
        const mail = `
        <h3></h3>
        <ul>
        <li>Валюта: ${req.body.before} ${req.body.currency}</li>
        <li>После обмена: ${req.body.after}р.</li>
        <li>Оставил заявку: ${req.body.email}р.</li>
        </ul>
        `
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: "465",
            secure: true,
            auth: {
              user: "testovytesting",
              pass: "ogjplhajsgsksknb",
            }
        })
        let mailOptions = {
            from: "testovytesting@yandex.ru",
            to: req.body.email,
            replyTo: "testovytesting@yandex.ru",
            subject: "Запрос на обмен валюты",
            text: "",
            html: mail
        }
        transporter.sendMail(mailOptions,(err, info) =>{
            if(err){
                return console.log(err)
            }
            console.log('message sent')
        })
    })
})

const PORT = process.env.PORT||3001
// настройка на порт сервера
app.listen(PORT, () => {
    console.log(`server listen port ${PORT}`)
})