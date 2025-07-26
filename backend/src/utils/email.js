import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Attach the Handlebars plugin
transporter.use('compile', hbs({
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./src/emails/'),
    layoutsDir:  path.resolve('./src/emails/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/emails/'),
  extName: '.hbs',
}));

export const sendEmail = async ({ to, subject, template, context }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    template,   // name of your .hbs file (without extension)
    context,    // data for the template
  });
};
