// controllers/donationController.js

const { User, DonationOneTime, DonationLunar } = require('../models');
const smartPayService = require('../services/smartPayService');
const mobilpayService = require('../services/mobilpayService');
const Joi = require('joi');
const logger = require('../utils/logger');

/**
 * Schema de validare pentru donație
 */
const donationSchema = Joi.object({
    nume: Joi.string().required(),
    prenume: Joi.string().required(),
    email: Joi.string().email().required(),
    telefon: Joi.string().pattern(/^[0-9]{10}$/).required(),
    suma: Joi.number().positive().required(),
    frecventa: Joi.string().valid('OneTime', 'Lunar').required(),
    banca: Joi.string().required(),
    newsletter: Joi.boolean().required(),
});

/**
 * Controller pentru trimiterea și procesarea donației
 */
exports.submitDonation = async (req, res) => {
    const { error } = donationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const {
        nume,
        prenume,
        email,
        telefon,
        suma,
        frecventa, // 'OneTime' sau 'Lunar'
        banca,
        newsletter,
    } = req.body;

    // Începe o tranzacție pentru a asigura consistența datelor
    const { sequelize } = require('../models');
    const transaction = await sequelize.transaction();

    try {
        // 1. Crearea sau găsirea utilizatorului
        let user = await User.findOne({ where: { email }, transaction });

        if (!user) {
            user = await User.create({
                nume,
                prenume,
                email,
                telefon,
            }, { transaction });
        }

        if(newsletter===true){

        }

        // 2. Crearea donației în baza de date
        let donation;
        if (frecventa === 'OneTime') {
            donation = await DonationOneTime.create({
                idUser: user.id,
                suma,
                stare: 'pending',
            }, { transaction });
        } else if (frecventa === 'Lunar') {
            donation = await DonationLunar.create({
                idUser: user.id,
                suma,
                stare: 'pending',
            }, { transaction });
        }

        // 3. Procesarea plății în funcție de frecvență
        if (frecventa === 'OneTime') {
            // Procesare prin SmartPay
            // 3a. Autentificare la SmartPay
            const authResponse = await smartPayService.authenticate();
            const { access_token, refresh_token, paymentId } = authResponse;

            // 3b. Crearea plății One-Time prin SmartPay
            const paymentData = {
                userId: user.id,
                amount: parseFloat(suma),
                currency: process.env.CURRENCY, // 'RON'
                frequency: 'one-time',
                bank: banca,
                email: email,
                phone: telefon,
            };

            const smartPayResponse = await smartPayService.createOneTimePayment(paymentData);

            // 3c. Inițializarea plății prin SmartPay
            const initPaymentResponse = await smartPayService.initPayment(paymentId, banca);

            if (initPaymentResponse.status === 'success') {
                // Actualizează starea donației în baza de date
                donation.stare = 'completed';
                donation.paymentId = paymentId; // Salvează ID-ul plății
                await donation.save({ transaction });

                // Commit tranzacția
                await transaction.commit();

                return res.status(200).json({ message: 'Donație unică procesată cu succes' });
            } else {
                // Dacă inițializarea plății nu a fost realizată cu succes, setează starea ca 'failed'
                donation.stare = 'failed';
                donation.paymentId = paymentId || null;
                await donation.save({ transaction });

                // Commit tranzacția
                await transaction.commit();

                return res.status(500).json({ message: 'Eroare la inițializarea donației unice' });
            }
        } else if (frecventa === 'Lunar') {
            // Procesare prin Mobilpay
            // 4a. Autentificare la Mobilpay
            const accessToken = await mobilpayService.authenticate();

            // 4b. Crearea plății recurente prin Mobilpay
            const paymentData = {
                userId: user.id,
                amount: parseFloat(suma),
                currency: process.env.CURRENCY, // 'RON'
                frequency: 'monthly',
                bank: banca,
                email: email,
                phone: telefon,
                // Alte câmpuri necesare conform documentației Mobilpay
            };

            const mobilpayResponse = await mobilpayService.initPayment(paymentData, banca, accessToken);

            if (mobilpayResponse.status === 'success') {
                // Actualizează starea donației în baza de date
                donation.stare = 'completed';
                donation.paymentId = mobilpayResponse.paymentId; // Salvează ID-ul plății
                await donation.save({ transaction });

                // Commit tranzacția
                await transaction.commit();

                return res.status(200).json({ message: 'Donație recurentă procesată cu succes' });
            } else {
                // Dacă inițializarea plății nu a fost realizată cu succes, setează starea ca 'failed'
                donation.stare = 'failed';
                donation.paymentId = mobilpayResponse.paymentId || null;
                await donation.save({ transaction });

                // Commit tranzacția
                await transaction.commit();

                return res.status(500).json({ message: 'Eroare la inițializarea donației recurente' });
            }
        } else {
            throw new Error('Tip de frecvență invalid.');
        }
    } catch (error) {
        // Rollback tranzacția în caz de eroare
        await transaction.rollback();

        logger.error('Eroare la trimiterea donației:', {
            error: error.message,
            details: error.response ? error.response.data : null
        });

        // Actualizează starea donației în cazul unei erori, dacă donația a fost creată
        if (donation) {
            try {
                await donation.update({ stare: 'failed' });
            } catch (updateError) {
                logger.error('Eroare la actualizarea stării donației:', { error: updateError.message });
            }
        }

        res.status(500).json({ message: 'A apărut o eroare la trimiterea donației.', error: error.message });
    }
};
