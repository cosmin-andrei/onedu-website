// services/smartPayService.js

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

// Obține variabilele de mediu
const {
    SMARTPAY_BASE_URI,
    SMARTPAY_AUTH_ENDPOINT,
    SMARTPAY_INIT_PAYMENT_ENDPOINT,
    SMARTPAY_CLIENT_ID,
    SMARTPAY_CERT_PATH,
    SMARTPAY_KEY_PATH
} = process.env;

// Creează un agent HTTPS cu certificatele client
const httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, '../', SMARTPAY_CERT_PATH)),
    key: fs.readFileSync(path.resolve(__dirname, '../', SMARTPAY_KEY_PATH)),
    rejectUnauthorized: true, // Asigură-te că serverul SmartPay folosește un certificat valid
});

// Mapează băncile la header-ele specifice
const bankHeadersMap = {
    'Banca Transilvania': {
        'Bank-Header-1': 'Value1',
        'Bank-Header-2': 'Value2',
        // Adaugă alte header-e specifice acestei bănci
    },
    'Banca Comerciala Romana': {
        'Bank-Header-A': 'ValueA',
        'Bank-Header-B': 'ValueB',
        // Adaugă alte header-e specifice acestei bănci
    },
    // Adaugă alte băncile și header-ele lor aici
};

/**
 * Autentificare la SmartPay pentru a obține token-uri și paymentId
 * @returns {Object} { access_token, refresh_token, paymentId }
 */
const authenticate = async () => {
    try {
        const url = `${SMARTPAY_BASE_URI}${SMARTPAY_AUTH_ENDPOINT}`;
        const response = await axios.post(url, {
            client_id: SMARTPAY_CLIENT_ID
        }, {
            httpsAgent,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { access_token, refresh_token, paymentId } = response.data.result;

        if (!access_token || !refresh_token || !paymentId) {
            throw new Error('Răspuns incomplet de la SmartPay la autentificare.');
        }

        return { access_token, refresh_token, paymentId };
    } catch (error) {
        console.error('Eroare la autentificarea cu SmartPay:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Inițializează o plată folosind paymentId și banca specificată
 * @param {string} paymentId - ID-ul plății
 * @param {string} banca - Numele băncii
 * @returns {Object} Răspunsul API-ului SmartPay
 */
const initPayment = async (paymentId, banca) => {
    try {
        const bankHeaders = bankHeadersMap[banca];

        if (!bankHeaders) {
            throw new Error(`Header-ele pentru banca "${banca}" nu sunt configurate.`);
        }

        const url = `${SMARTPAY_BASE_URI}${SMARTPAY_INIT_PAYMENT_ENDPOINT}/${paymentId}`;

        const response = await axios.post(url, {}, {
            httpsAgent,
            headers: {
                'Content-Type': 'application/json',
                ...bankHeaders,
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Eroare la inițializarea plății pentru banca ${banca}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Verifică starea unei plăți
 * @param {string} paymentId - ID-ul plății
 * @returns {Object} Răspunsul API-ului SmartPay
 */
const checkPaymentStatus = async (paymentId) => {
    try {
        const url = `${SMARTPAY_BASE_URI}/payments/${paymentId}/status`;
        const response = await axios.get(url, {
            httpsAgent,
            headers: {
                'Content-Type': 'application/json',
                // Alte headere necesare conform documentației SmartPay
            },
        });
        return response.data;
    } catch (error) {
        console.error('Eroare la verificarea stării plății:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    authenticate,
    initPayment,
    checkPaymentStatus,
};
