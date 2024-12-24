// app/components/Contact/FormSubmission.tsx
import React from 'react';
import Link from 'next/link';

const FormSubmission: React.FC = () => {
    return (
        <section className="w-full py-12 bg-[#D2E2FF]">
            <h2 className="text-2xl font-bold text-center text-[#333] mb-8">
                Vreau să completez și să depun singur Formularul 230
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8">
                {/* Prima Coloană */}
                <div className="flex flex-col">
                    <p className="text-base text-[#555] mb-4">
                        <strong>Formularul poate fi depus în persoană</strong> la sediul ANAF de care aparții cu domiciliul sau trimis prin curier sau prin poștă cu scrisoare recomandată.
                    </p>
                    <Link href="#" className="text-[#1b0177] font-bold text-base mb-4 hover:underline">
                        Vezi aici lista administrațiilor financiare
                    </Link>
                    <p className="text-base text-[#555] mb-6">
                        Descarcă formularul pre-completat cu datele Dăruiește Viață apăsând pe butonul de mai jos. <strong>Nu este nevoie să completezi și suma.</strong>
                    </p>
                    <button className="bg-[#1b0177] text-white px-6 py-3 text-base font-bold rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#120560]">
                        Descarcă formularul 230 pre-completat
                    </button>
                </div>

                {/* A doua Coloană */}
                <div className="flex flex-col">
                    <p className="text-base text-[#555] mb-4">
                        <strong>Formularul poate fi depus și online</strong> prin <Link href="#" className="text-[#1b0177] font-bold text-base hover:underline">SPV (Spațiul Privat Virtual)</Link> în cazul în care ai cont creat pe site-ul ANAF. Completează formularul inteligent cu datele personale și datele Asociației, bifează suma de 3,5%, validează-l și încarcă-l în SPV. Vei avea nevoie de aplicația <Link href="#" className="text-[#1b0177] font-bold text-base hover:underline">Adobe Reader</Link>.
                    </p>
                    <p className="text-base text-[#555] mb-6">
                        Datele fiscale pe care trebuie să le completezi pentru noi sunt: <strong>Asociația DĂRUIEȘTE VIAȚĂ</strong>, cod identificare fiscală: <strong>30563375</strong>, cont bancar: <strong>RO08 INGB 0000 9999 0317 5286</strong>.
                    </p>
                    <button className="bg-[#1b0177] text-white px-6 py-3 text-base font-bold rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#120560]">
                        Descarcă formularul inteligent
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FormSubmission;
