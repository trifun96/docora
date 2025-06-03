require('dotenv').config();

const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());

app.post('/api/send-report', upload.single('pdf'), async (req, res) => {
  const { email } = req.body;
  const pdfBuffer = req.file?.buffer;

  if (!email || !pdfBuffer) {
    return res.status(400).send('Nedostaju podaci');
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      logger: true,
      debug: true,
    });

    const info = await transporter.sendMail({
      from: `"Alta Medica" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Medicinski izveštaj',
      text: 'U prilogu je Vaš medicinski izveštaj.',
      attachments: [
        {
          filename: 'izvestaj.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    console.log('✅ Mejl poslat, ID:', info.messageId);
    res.send('Mejl uspešno poslat');
  } catch (error) {
    console.error('❌ Greška pri slanju mejla:', error.message);
    if (error.responseCode) console.error('Kod greške:', error.responseCode);
    res.status(500).send('Greška pri slanju mejla');
  }
});

// Pokretanje servera
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend server radi na http://localhost:${PORT}`));
