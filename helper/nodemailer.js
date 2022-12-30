// const nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');

// // Use sensible defaults for SMTP connection pooling
// var emailConfig = {
//     host: process.env.SMTP_HOST,
//     secureConnection: process.env.SMTP_SECURE_CONNECTION === 'true' ? true : false,
//     port: parseInt(process.env.SMTP_PORT),
//     auth: {
//         user: 'meerakardani0410@gmail.com',
//         pass: 'zzxcvxlglemmrgjx'
//     }
// };

// const SOURCE_EMAIL = process.env.SMTP_SOURCE_EMAIL;

// const transporter = nodemailer.createTransport(smtpTransport(emailConfig));

// module.exports.sendMail = async (data) => {
//     let fromEmail = `<${SOURCE_EMAIL}>`;

//     let mailOptions = {
//         from: 'meerakardani0410@gmail.com', // Default From recipient [String]
//         //to: data.to, // Email To recipient [Array or String]
//         to: data.to,
//         subject: data.subject, // Email subject [String]
//         text: data.text, // Renderer text data [String]
//         html: data.html, // Renderer Html data [String]
//         // replyTo: data.replyTo,
//         ses: {
//             // Optional extra arguments for SendRawEmail
//             // Not necessary for the now
//         },
//         attachments: [] //Default empty attachment [Array[{}]]
//     };

//     if (data.cc) {
//         //If email cc available
//         mailOptions.cc = data.cc; //Email cc recipient [Array or String]
//     }
//     if (data.bcc) {
//         //If email bcc available
//         mailOptions.bcc = data.bcc; //Email bcc recipient [Array or String]
//     }
//     // send mail with defined transport object
//     return await transporter.sendMail(mailOptions);
// };


const nodemailer = require('nodemailer');


//  let emailConfig=nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         mailto:user:"demonode1234@gmail.com",
//         pass:"demo@1234"
//     }
//  });

var smtpTransport = require('nodemailer-smtp-transport');

var emailConfig = {
    host: "smtp.gmail.com",
    secureConnection: true,
    port: 587,
    auth: {
        user: "meerakardani0410@gmail.com",
        pass: "zzxcvxlglemmrgjx"
    }
};

// // const SOURCE_EMAIL = process.env.SMTP_SOURCE_EMAIL;

const transporter = nodemailer.createTransport(emailConfig);

module.exports.sendMail = async (data) => {
    let fromEmail = "mailto:meerakardani0410@gmail.com";

    let mailOptions = {
        from: "mailto:meerakardani0410@gmail.com", // Default From recipient [String]
        //to: data.to, // Email To recipient [Array or String]
        to: data.to,
        subject: data.subject, // Email subject [String]
        text: data.text, // Renderer text data [String]
        html: data.html, // Renderer Html data [String]
        // replyTo: data.replyTo,

    };

    

        if (data.cc) {
            //If email cc available
            mailOptions.cc = data.cc; //Email cc recipient [Array or String]
        }
        if (data.bcc) {
            //If email bcc available
            mailOptions.bcc = data.bcc; //Email bcc recipient [Array or String]
        }
    //     // send mail with defined transport object
    return await transporter.sendMail(mailOptions);
};