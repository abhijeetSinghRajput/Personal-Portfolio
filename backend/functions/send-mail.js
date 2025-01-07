import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({path: '../.env'});

exports.handler = async (event, context) => {
    if(event.httpMethod !== "POST"){
        return {
            statusCode: 405,
            body: JSON.stringify({message: "Method Not Allowed"}),
        };
    }
   

    const {name, email, message} = JSON.parse(event.body);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_TO,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }
    try{
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({message: "email sent successfully"}),
        };
    }catch(error){
        console.error("error", error);
        return {
            statusCode: 500,
            body: JSON.stringify({message: "failed to send email"}),
        };
    }
}