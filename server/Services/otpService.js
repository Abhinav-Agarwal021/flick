const crypto = require('crypto');
const HashService = require('./HashService');
const sendEmail = require("../Utils/SendEmail");

class OtpService {

    async generateOtp() {
        const otp = crypto.randomInt(100000, 999999)
        return otp;
    }

    async sendByEmail(email, otp) {
        const subject = "Please verify your device";
        const send_to = email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = "agarwalabhinav309@gmail.com";
        const template = "SendOtp";
        const name = "moto";
        const code = otp;

        try {
            await sendEmail(
                subject,
                send_to,
                sent_from,
                reply_to,
                template,
                name,
                code
            );
        } catch (error) {
            res.status(500);
            throw new Error("Email not sent, please try again");
        }
    }

    verifyOtp(data, hash) {
        return (hash === HashService.hashOtp(data))
    }

}

module.exports = new OtpService();