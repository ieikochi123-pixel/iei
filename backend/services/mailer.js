const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendAdminNotification(booking) {

    console.log("EMAIL FUNCTION CALLED");

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Booking Request - ${booking.facility}`,
        html: `
            <h2>New Booking Request</h2>

            <p><b>Reference:</b> ${booking.booking_ref}</p>
            <p><b>Facility:</b> ${booking.facility}</p>
            <p><b>Name:</b> ${booking.name}</p>
            <p><b>Email:</b> ${booking.email}</p>
            <p><b>Phone:</b> ${booking.phone}</p>
            <p><b>Status:</b> ${booking.status}</p>
        `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT:", info.response);
}

module.exports = {
    sendAdminNotification
};