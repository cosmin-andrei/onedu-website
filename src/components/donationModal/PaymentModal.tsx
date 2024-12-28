import React, {useState, useEffect} from 'react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    frequency: string;
}

export function PaymentModal({isOpen, onClose, amount, frequency}: PaymentModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');

    const banks = [
        {id: 'BCR', name: 'Banca Comercială Română'},
        {id: 'BT', name: 'Banca Transilvania'},
        {id: 'ING', name: 'ING Bank'},
        {id: 'BRD', name: 'BRD - Groupe Société Générale'},
    ];

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Formular trimis');

        const payload = {
            nume: lastName,
            prenume: firstName,
            email,
            telefon: phone,
            suma: amount,
            frecventa: frequency,
            banca: selectedBank,
            newsletter: isSubscribed,
        };

        try {
            const response = await fetch('http://localhost:5001/api/donations/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Eroare API:', errorText);
                alert('Eroare la trimiterea cererii.');
            } else {
                const data = await response.json(); // Extrage datele din răspuns
                const redirectUri = data.redirectUri; // Preia `redirectUri`

                if (redirectUri) {
                    window.location.href = redirectUri; // Redirecționează utilizatorul
                } else {
                    alert('Link-ul de redirecționare nu a fost găsit.');
                }
            }
        } catch (error) {
            console.error('Eroare la fetch:', error);
            alert('A apărut o eroare la trimiterea donației.');
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center md:items-center items-end z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={handleOverlayClick}
        >
            <div
                className={`bg-white p-4 md:p-8 rounded-t-xl md:rounded-xl w-full max-w-md md:max-w-3xl shadow-lg relative flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'} pointer-events-auto`}
                onClick={handleModalClick}
            >
                <button
                    className="absolute top-4 right-4 text-2xl bg-none border-none cursor-pointer"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    <div className="flex-1 bg-custom-blue-light p-4 rounded-xl">
                        <h3 className="text-lg font-semibold">Donația ta</h3>
                        <p className="text-base">
                            Donație: {amount} RON{frequency === 'lunar' ? ' / lună' : ''}
                        </p>
                        <small className="text-sm text-gray-600">
                            Donațiile cu cardul sunt procesate prin SmartFintech.
                        </small>
                    </div>
                    <div className="flex-2">
                        <h3 className="text-lg font-semibold">Detalii donație</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-4 flex-wrap mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Prenume</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-800 border-gray-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Nume</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-custom-blue border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-custom-blue border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Telefon (opțional)</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-custom-blue border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Selectează banca</label>
                                <select
                                    value={selectedBank}
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-custom-blue border-gray-300"
                                >
                                    <option value="">Alege o bancă...</option>
                                    {banks.map((bank) => (
                                        <option key={bank.id} value={bank.id}>
                                            {bank.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    id="subscribe"
                                    checked={isSubscribed}
                                    onChange={() => setIsSubscribed(!isSubscribed)}
                                    className="w-5 h-5 border-gray-500 focus:ring-custom-blue"
                                />
                                <label htmlFor="subscribe" className="text-sm">
                                    Da, îmi pasă și doresc să primesc vești pe email despre proiectele Asociației ONedu.
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-custom-blue text-white p-3 rounded-lg font-bold hover:bg-custom-blue-dark"
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
