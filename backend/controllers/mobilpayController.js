// controllers/mobilpayController.js

const { DonationLunar } = require('../models');
const crypto = require('crypto');
const logger = require('../utils/logger');

/**
 * Controller pentru gestionarea webhook-urilor Mobilpay
 */
exports.handleWebhook = async (req, res) => {
    const signature = req.headers['x-mobilpay-signature'];
    const payload = JSON.stringify(req.body);
    const { MOBILPAY_WEBHOOK_SECRET } = process.env;

    // Verificarea semnăturii pentru securitate
    const expectedSignature = crypto
        .createHmac('sha256', MOBILPAY_WEBHOOK_SECRET)
        .update(payload)
        .digest('hex');

    if (signature !== expectedSignature) {
        logger.error('Webhook Mobilpay semnătură invalidă.');
        return res.status(400).json({ message: 'Invalid signature' });
    }

    const { paymentId, status, frequency } = req.body;

    try {
        if (frequency === 'monthly') {
            const donation = await DonationLunar.findOne({ where: { paymentId } });
            if (donation) {
                donation.stare = status;
                await donation.save();
                logger.info(`Donație Lunar actualizată: ${paymentId} -> ${status}`);
            } else {
                logger.warn(`Donație Lunar nu a fost găsită pentru paymentId: ${paymentId}`);
            }
        }

        res.status(200).json({ message: 'Webhook Mobilpay procesat cu succes' });
    } catch (error) {
        logger.error('Eroare la procesarea webhook-ului Mobilpay:', { error: error.message });
        res.status(500).json({ message: 'Eroare la procesarea webhook-ului' });
    }
};
