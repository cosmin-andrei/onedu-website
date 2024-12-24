// src/app/components/SolutionPopup.tsx

"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Solution {
    title: string;
    category: string;
    image: string;
    description: string;
    link: string;
    id: string;
    status: string;
}

interface SolutionPopupProps {
    solution: Solution;
    closePopup: () => void;
}

const SolutionPopup: React.FC<SolutionPopupProps> = ({ solution, closePopup }) => {
    const statusColor =
        solution.status === 'Soluție live'
            ? 'bg-green-500'
            : solution.status === 'Soluție în lucru'
                ? 'bg-yellow-500'
                : 'bg-custom-blue'; // Folosește 'bg-custom-blue' definit în Tailwind

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closePopup}
        >
            <div
                className="bg-white rounded-lg p-6 w-11/12 max-w-3xl relative flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
                    onClick={closePopup}
                >
                    &times;
                </button>
                {/* Left Column with Image */}
                <div className="md:w-1/3 flex justify-center items-center mb-4 md:mb-0">
                    <Image
                        width={150}
                        height={150}
                        src={solution.image}
                        alt={solution.title}
                        className="rounded-lg"
                    />
                </div>

                {/* Right Column with Text and Buttons */}
                <div className="md:w-2/3 flex flex-col">
                    <div className="flex items-center mb-2">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColor}`}></span>
                        <span className="font-semibold text-gray-700">{solution.status}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-custom-blue mb-4">{solution.title}</h2> {/* Folosește 'text-custom-blue' */}
                    <p className="text-gray-600 flex-grow">{solution.description}</p>
                    <div className="mt-4 flex space-x-4">
                        {solution.link ? (
                            <Link
                                href={solution.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-custom-blue-dark transition-colors"
                            >
                                Vezi soluția &rarr;
                            </Link>
                        ) : (
                            <Link
                                href="/contact"
                                className="px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-custom-blue-dark transition-colors"
                            >
                                Hai să o facem realitate
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionPopup;
