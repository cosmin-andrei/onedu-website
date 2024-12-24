"use client";

import React from "react";
import Image from "next/image";

const TransferData = () => {
    return (
        <div className="flex justify-between items-start gap-12 mt-8">
            {/* Informații bancare */}
            <div className="flex-1 pl-24">
                <p className="text-lg font-bold mb-2">Beneficiar</p>
                <p className="text-gray-600 mb-6">Asociația ONedu</p>

                <p className="text-lg font-bold mb-2">Cod fiscal</p>
                <p className="text-gray-600 mb-6">49039313</p>

                <p className="text-lg font-bold mb-2">Banca</p>
                <p className="text-gray-600 mb-6">Banca Transilvania</p>

                <p className="text-lg font-bold mb-2">IBAN (cont RON)</p>
                <p className="text-gray-600 mb-6">RO49 BTRL RONC RT0C O956 3601</p>

                <p className="text-lg font-bold mb-2">IBAN (cont EUR)</p>
                <p className="text-gray-600 mb-6">RO93 BTRL EURC RT0C O956 3601</p>

                <p className="text-lg font-bold mb-2">Detalii plată</p>
                <p className="text-gray-600">
                    Menționează emailul tău la detaliile plății pentru a ne asigura că donația ta apare în contul tău de donator. 😊
                </p>
            </div>

            {/* Imaginea din dreapta */}
            <div className="flex-1 flex justify-center items-center">
                <Image
                    width={500}
                    height={300}
                    src="/image/gvr-people.jpg"
                    alt="Imagine Transfer Bancar"
                    className="w-full max-w-[500px] h-auto object-cover rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default TransferData;
