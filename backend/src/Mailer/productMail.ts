import nodemailer from 'nodemailer';

export const productPostedEmail = async (
  userEmail: string,
  userName: string,
  productName: string
) => {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `Usella Mail ${process.env.email}`,
    to: userEmail,
    subject: 'Product posted successfully',
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    
    <body style="display: flex; align-items: center; justify-content: center">
        <div style="width: 600px ;max-width: 800px; border: solid; border-width: 1px; border-color: grey; padding: 15px; ">
            <div style="display: flex; align-items: center;flex-direction: column;">
                <img src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/about02-removebg-preview.png?alt=media&token=f464f698-cfe6-4940-bc24-f6737c7b1a9b"
                    alt="Usella Logo" style="width: 150px; height: 100px;">
                <h3 style="font-size:30px; margin-top: 0px;">Usella</h3>
            </div>
            <hr style="border: solid grey 0.5px; margin: 0px; margin-bottom: 10px;">
            <div>
                <h5 style="font-weight:normal; font-size: 18px;">Hi ${userName},</h5>
                <h5 style="font-weight:normal; font-size: 16px;margin-bottom: 8px; margin-top: 0px;">Thank you for trusting Usella to find your customer</h5>
            <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 8pxpx; margin-top: 0px;">Your product <span
                        style="font-weight: bold;">${productName}</span>
                    has been added
                    successfully to the Usella website </h5>
    
                <h5 style="font-weight:normal; font-size: 16px;">You can now start receiving offers from our customers as
                    soon
                    as possible and you will receive a notification once the item(s) have been ordered.</h5>
    
                <div style="display: flex; align-items: center; border: solid grey 1px; ">
                    <img src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/samantha-ram-Ha5_JcYArf0-unsplash.jpg?alt=media&token=c5e2b9ab-08af-4d7b-80c2-d9c6716b9dce"
                        alt="Usella Logo" style="width: 35%; height: 100px; object-fit: cover;">
                    <div style="margin-left: 5px">
                        <h5 style="font-weight:bold; margin: 0px; margin-bottom: 4px; font-size: 14px;">${productName}</h5>
                        <h5
                            style="font-weight:normal;  margin: 0px;font-size: 14px;margin-bottom: 10px ;letter-spacing: 0.4px">
                            This is an iphone product used but no scratches on the screen and it comes unlocked</h5>
                        <h5
                            style="font-weight:medium; font-family: 'Times New Roman', Times, serif; margin: 0px;font-size: 13px; letter-spacing: 1px;">
                            <span style="font-weight: bold;">KSH</span> 1342
                        </h5>
                    </div>
                </div>
                <h5 style="font-weight:normal; font-size: 16px;">If you would like to know more, please visity our <a
                        href="www.google.com">help Center</a></h5>
                <h5 style="font-weight:normal; font-size: 16px;">Please don’t forget to review Usella, which is providing
                    this awesome services! You can also encourage them through our <a
                        href="https://twitter.com/EG_Kariuki">Twitter</a> page using the #Usella
                    flag. Stay safe & stay healthy.</h5>
                <img style="width:600px"
                    src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed.png?alt=media&token=6f0bcfeb-f69c-4441-a404-e4abb1c3616c">
                <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;">Happy Shopping!</a></h5>
                <h5 style="font-weight:normal; font-size: 16px; margin-top: 8px; margin-bottom: 5px;">Warm Regards,</a></h5>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed(2).png?alt=media&token=9514f497-0e09-467c-8e9f-58bc6d830b1e">
                <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;margin-top: 8px;">Usella Kenya Team</a>
                </h5>
            </div>
        </div>
    </body>
    
    </html>`
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

// verify email
export const verifyEmail = async (
  userEmail: string,
  userId: string,
  userName: string
) => {
  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  // Define the email options
  const mailOptions = {
    from: `Usella  ${process.env.email}`,
    to: userEmail,
    subject: 'Verify your Usella',
    html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      
          <style>
              #myButton {
                  background-color: orange;
                  height: 50px;
                  width: 140px;
                  border: none;
                  border-radius: 20px;
                  color: white;
              }
      
              #myButton.loading {
                  background-color: grey;
                  color: black;
                  cursor: wait;
              }
      
              #myButton.verified {
                  background-color: green;
                  color: white;
                  cursor: default;
              }
      
              #myButton.failed {
                  background-color: red;
                  color: white;
                  cursor: default;
              }
          </style>
      
          
      </head>
      
      <body style="display: flex; align-items: center; justify-content: center">
          <div style="width: 600px ;max-width: 800px; border: solid; border-width: 1px; border-color: grey; padding: 15px; ">
              <div style="display: flex; align-items: center;flex-direction: column;">
                  <img src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/about02-removebg-preview.png?alt=media&token=f464f698-cfe6-4940-bc24-f6737c7b1a9b"
                      alt="Usella Logo" style="width: 150px; height: 100px;">
                  <h3 style="font-size:30px; margin-top: 0px;">Usella</h3>
              </div>
              <hr style="border: solid grey 0.5px; margin: 0px; margin-bottom: 10px;">
              <div>
                  <h5 style="font-weight:normal; font-size: 18px;">Hi ${userName},</h5>
                  <h5 style="font-weight:normal; font-size: 16px;margin-bottom: 8px; margin-top: 0px;">Thank you for creating
                      an account with <span style="font-size: 20px;font-weight: bold;">Usella</span></h5>
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 8pxpx;">Please click on the button to verify
                      your email</h5>
                      <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 8pxpx;">Your verification code is: <span style="font-weight: bold">1234</span></h5>
      
                  <a href="https://usellar.up.railway.app/users/verify/${userEmail}/${userId}"><button id="myButton">Click to Verify</button></a>
    
                  <h5 style="font-weight:normal; font-size: 16px;">After you click on the verify button you can go back to the app or website to continue browsing<a
                          href="www.google.com">help Center</a></h5>
                  <h5 style="font-weight:normal; font-size: 16px;">If you would like to know more, please visity our <a
                          href="www.google.com">help Center</a></h5>
      
                  <h5 style="font-weight:normal; font-size: 16px;">Please don’t forget to review Usella, which is providing
                      this awesome services! You can also encourage them through our <a
                          href="https://twitter.com/EG_Kariuki">Twitter</a> page using the #Usella
                      flag. Stay safe & stay healthy.</h5>
                  <img style="width:600px"
                      src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed.png?alt=media&token=6f0bcfeb-f69c-4441-a404-e4abb1c3616c">
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;">Happy Shopping!</a></h5>
                  <h5 style="font-weight:normal; font-size: 16px; margin-top: 8px; margin-bottom: 5px;">Warm Regards,</a></h5>
                  <img
                      src="https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/unnamed(2).png?alt=media&token=9514f497-0e09-467c-8e9f-58bc6d830b1e">
                  <h5 style="font-weight:normal; font-size: 16px; margin-bottom: 0px;margin-top: 8px;">Usella Kenya Team</a>
                  </h5>
      
              </div>
      
      
          </div>
        
      
      
      
      </body>
      
      </html>`
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
