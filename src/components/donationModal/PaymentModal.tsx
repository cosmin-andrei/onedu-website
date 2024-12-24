import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    frequency: string;
}

export function PaymentModal({ isOpen, onClose, amount, frequency }: PaymentModalProps) {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsSubscribed(true);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-white p-8 rounded-xl w-full max-w-3xl shadow-lg relative"
                onClick={handleModalClick}
            >
                <button
                    className="absolute top-4 right-4 text-2xl bg-none border-none cursor-pointer"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="flex gap-6">
                    <div className="flex-1 bg-blue-100 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold">Donația ta</h3>
                        <p className="text-base">
                            Donație: {amount} RON{frequency === 'lunar' ? ' / lună' : ''}
                        </p>
                        <small className="text-sm text-gray-600">
                            Donațiile cu cardul procesate prin SmartFintech.
                        </small>
                    </div>
                    <div className="flex-2">
                        <h3 className="text-lg font-semibold">Detalii donație</h3>
                        <form>
                            <div className="flex gap-4 flex-wrap mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Prenume</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-800 border-gray-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Nume</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-800 border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-800 border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Telefon (opțional)</label>
                                <input
                                    type="tel"
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-800 border-gray-300"
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    id="subscribe"
                                    checked={isSubscribed}
                                    onChange={() => setIsSubscribed(!isSubscribed)}
                                    className="w-5 h-5 border-gray-500 focus:ring-blue-800"
                                />
                                <label htmlFor="subscribe" className="text-sm">
                                    Da, îmi pasă și doresc să primesc vești pe email despre proiectele Asociației ONedu.
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-800 text-white p-3 rounded-lg font-bold hover:bg-blue-700"
                            >
                                Donează acum
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PaymentModal;