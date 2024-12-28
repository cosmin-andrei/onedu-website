// services/mobilpayService.js

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

const {
    MOBILPAY_BASE_URI,
    MOBILPAY_AUTH_ENDPOINT,
    MOBILPAY_PAYMENT_ENDPOINT,
    MOBILPAY_CLIENT_ID,
    MOBILPAY_CLIENT_SECRET
} = process.env;

// Creează un agent HTTPS dacă Mobilpay necesită mTLS
const httpsAgent = new https.Agent({
    // Dacă Mobilpay necesită certificate, adaugă-le aici similar cu SmartPay
    // cert: fs.readFileSync(path.resolve(__dirname, '../', SMARTPAY_CERT_PATH)),
    // key: fs.readFileSync(path.resolve(__dirname, '../', SMARTPAY_KEY_PATH)),
    rejectUnauthorized: true, // Asigură-te că serverul Mobilpay folosește un certificat valid
});

/**
 * Autentificare la Mobilpay pentru a obține token-uri
 * @returns {string} access_token
 */
const authenticate = async () => {
    try {
        const url = `${MOBILPAY_BASE_URI}${MOBILPAY_AUTH_ENDPOINT}`;
        const response = await axios.post(url, {
            client_id: MOBILPAY_CLIENT_ID,
            client_secret: MOBILPAY_CLIENT_SECRET,
            grant_type: 'client_credentials'
        }, {
            httpsAgent,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { access_token } = response.data;
        if (!access_token) {
            throw new Error('Token-ul de acces nu a fost returnat de Mobilpay.');
        }

        return access_token;
    } catch (error) {
        console.error('Eroare la autentificarea cu Mobilpay:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Inițializează o plată Mobilpay
 * @param {Object} paymentData - Datele plății
 * @param {string} accessToken - Token-ul de acces
 * @returns {Object} Răspunsul API-ului Mobilpay
 */
const initPayment = async (paymentData, accessToken) => {
    try {
        const url = `${MOBILPAY_BASE_URI}${MOBILPAY_PAYMENT_ENDPOINT}`;
        const response = await axios.post(url, paymentData, {
            httpsAgent,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                // Alte headere necesare conform documentației Mobilpay
            },
        });
        return response.data;
    } catch (error) {
        console.error('Eroare la inițializarea plății Mobilpay:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Verifică starea unei plăți Mobilpay
 * @param {string} paymentId - ID-ul plății
 * @param {string} accessToken - Token-ul de acces
 * @returns {Object} Răspunsul API-ului Mobilpay
 */
const checkPaymentStatus = async (paymentId, accessToken) => {
    try {
        const url = `${MOBILPAY_BASE_URI}/payments/${paymentId}/status`;
        const response = await axios.get(url, {
            httpsAgent,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                // Alte headere necesare conform documentației Mobilpay
            },
        });
        return response.data;
    } catch (error) {
        console.error('Eroare la verificarea stării plății Mobilpay:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    authenticate,
    initPayment,
    checkPaymentStatus,
};
