import nodemailer from 'nodemailer';

export const sendMail = async (userEmail: string, productName: string) => {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email, // Replace with your Gmail address
      pass: process.env.password // Replace with your Gmail password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `Usella ${process.env.email}`, // Replace with your Gmail address
    to: userEmail,
    subject: 'Product posted successfully',
    text: `Your product "${productName}" has been posted successfully.`
  };

  // Send the email
  try {
    const sent = await transporter.sendMail(mailOptions);
    if (!sent) {
      throw new Error('Email could not be sent');
    }

    console.log('Email sent');
  } catch (e: any) {
    throw new Error(e.message);
  }
};
