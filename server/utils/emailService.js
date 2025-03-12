const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Add debug logs for configuration
console.log('Email Configuration:', {
    user: process.env.EMAIL_USER,
    appPassword: process.env.EMAIL_PASS ? 'Set' : 'Not set'
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Using app password
    }
});

const sendOrderCompletionOTP = async (email, otp, orderDetails) => {
    try {
        console.log('Attempting to send email to:', email);
        
        // Verify transporter configuration
        await transporter.verify();
        console.log('Transporter verified successfully');

        const mailOptions = {
            from: `"Daily Fresh Fish & Meat" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Order Completion Verification',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0b3d5a;">Order Completion Verification</h2>
                    <p>Your order completion verification code is: <strong style="font-size: 24px; color: #107dac;">${otp}</strong></p>
                    <p>This code will expire in 10 minutes.</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                        <h3 style="color: #0b3d5a;">Order Details:</h3>
                        <p><strong>Order ID:</strong> ${orderDetails._id}</p>
                        <p><strong>Amount:</strong> ₹${orderDetails.amount}</p>
                    </div>
                    <p>Please provide this code to the delivery person to confirm delivery.</p>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error; // Propagate error for better handling
    }
};

module.exports = { sendOrderCompletionOTP }; 