const sg = require('@sendgrid/mail');

module.exports = async (req, res) => {
  sg.setApiKey(process.env.VA_SENDGRID_API_KEY);
  const { body } = req
  const {
    name,
    emailFrom,
    message
  } = JSON.parse(body);

  const text = `from: ${name}\nemail: ${emailFrom}\n message: ${message}`;
  const html = `<p><strong>from:</strong> ${name}</p><p><strong>email:</strong> ${emailFrom}</p><p><strong>message:</strong> ${message}</p>`

  const msg = {
    to: 'timon.forrer@gmail.com',
    from: 'info@voltagearc.com',
    subject: `New message from ${name} via voltagearc.com`,
    text: text,
    html: html
  };

  sg
    .send(msg)
    .then(() => res.send({ message: 'success' }).status(200))
    .catch((err) => res.json({ error: err.response.body }).status(400));
}
