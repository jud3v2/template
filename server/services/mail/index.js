const { Resend } = require('resend');
const config = require('../../config');

module.exports.sendMail = async (to, subject, html, timeOut = 0) => {
        const resend = new Resend(config.resendApiKey);

        const recipients = !Array.isArray(to) ? [to] : to; // Ensure 'to' is always an array

        const emailBatch = recipients.map((recipient) => ({
                from: 'DreamServices Newsletter <dreamservices@jud3v.fr>',
                to: recipient,
                subject: subject,
                html: html,
        }));

        const { data, error } = await resend.batch.send(emailBatch);

        if (error) {
                console.error("Error sending batch emails:", error);
        } else {
                console.log("Emails sent successfully:", data);
        }
        return { data, error };
}