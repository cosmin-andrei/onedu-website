import React from 'react';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
}

export function TransferModal({ isOpen, onClose, amount }: TransferModalProps) {
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
                className="bg-white p-8 rounded-xl w-full max-w-3xl shadow-lg relative flex flex-col"
                onClick={handleModalClick}
            >
                <button
                    className="absolute top-4 right-4 text-2xl bg-none border-none cursor-pointer"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="flex gap-6">
                    <div className="flex-1">
                        <div className="bg-blue-100 p-4 rounded-xl mb-4">
                            <h3 className="text-lg font-semibold">Donația ta</h3>
                            <p className="text-base">
                                Donație: <strong>{amount} RON</strong>
                            </p>
                        </div>
                        <p className="text-sm italic text-gray-600">
                            Menționează emailul tău la detaliile plății pentru a ne asigura că donația ta apare în contul tău de donator. 😊
                        </p>
                    </div>
                    <div className="flex-2">
                        <div className="text-sm leading-relaxed">
                            <p className="mb-2"><strong>Beneficiar:</strong> Asociația ONedu</p>
                            <p className="mb-2"><strong>Cod fiscal:</strong> 49039313</p>
                            <p className="mb-2"><strong>Banca:</strong> Banca Transilvania</p>
                            <p className="mb-2"><strong>IBAN (Cont RON):</strong> RO49 BTRL RONC RT0C O956 3601</p>
                            <p className="mb-2"><strong>IBAN (Cont EURO):</strong> RO93 BTRL EURC RT0C O956 3601</p>
                        </div>
                        <button
                            className="w-full mt-4 bg-blue-800 text-white p-3 rounded-lg font-bold hover:bg-blue-700"
                            onClick={onClose}
                        >
                            Am înțeles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransferModal;