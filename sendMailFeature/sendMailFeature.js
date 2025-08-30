const nodemailer = require("nodemailer");

// connect with the smtp.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "gsja8294@gmail.com",
    pass: "bnykpybcfthbrgzs",
  },
});

//send mail
module.exports.sendMail = async ({to, subject, html, curentUsername}) => {
    try {
        console.log(subject);
        await transporter.sendMail({
            from:`${curentUsername}"<gsja8294@gmail.com>"`,
            to,
            subject,
            html
        })
        console.log("mail send done");
        
    } catch (err) {
        console.log(err)        
    }
}
