// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/userRoutes');
const formulare230Routes = require('./routes/formulare230Routes');
const donationRoutes = require('./routes/donationRoutes');
const smartPayRoutes = require('./routes/smartPayRoutes'); // Pentru webhook-uri SmartPay
const mobilpayRoutes = require('./routes/mobilpayRoutes'); // Pentru webhook-uri Mobilpay
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger'); // Asigură-te că ai implementat un sistem de logare
require('dotenv').config();

const app = express();

// Configurarea CORS
app.use(cors({
    origin: 'http://localhost:3000', // Înlocuiește cu adresa frontend-ului tău
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());

// Rate Limiting pentru securitate
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minute
    max: 100, // Limitează la 100 de cereri per IP în fiecare window
    message: 'Prea multe cereri de la această adresă IP, încearcă mai târziu.'
});
app.use(limiter);

// Rute
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/formulare230', formulare230Routes);
app.use('/api/donations', donationRoutes);

// Utilizarea router-urilor pentru webhook-uri SmartPay și Mobilpay
app.use('/api/smartpay', smartPayRoutes);
app.use('/api/mobilpay', mobilpayRoutes);

// Endpoint protejat pentru dashboard
app.get('/api/dashboard', require('./middlewares/authenticateJWT'), (req, res) => {
    res.json({ message: `Bine ai venit, utilizatorul cu ID-ul ${req.user.userId}!` });
});

// Endpoint simplu pentru testare
app.get('/api/test', (req, res) => {
    res.json({ message: 'Serverul funcționează corect!' });
});

// Gestionarea erorilor necaptate
app.use((err, req, res, next) => {
    logger.error('Eroare necaptată:', { error: err.message, stack: err.stack });
    res.status(500).json({ message: 'A apărut o eroare!' });
});

// Sincronizarea bazei de date și pornirea serverului
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        logger.info(`Serverul rulează pe portul ${PORT}`);
    });
}).catch(err => {
    logger.error('Eroare la sincronizarea bazei de date:', { error: err.message });
});
