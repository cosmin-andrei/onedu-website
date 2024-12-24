"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import './carousel.scss';

interface ContentSectionProps {
    images: string[];
    altTexts: string[];
    title: string;
    text: string; // Poți include HTML aici
    layout?: "left" | "right"; // Poziția layout-ului
    buttonText?: string; // Textul butonului (opțional)
    buttonLink?: string; // Link-ul la care duce butonul (opțional)
}

export function ContentSection({
                                   images,
                                   altTexts,
                                   title,
                                   text,
                                   layout = "left",
                                   buttonText,
                                   buttonLink,
                               }: ContentSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setActiveIndex(selectedIndex);
    };

    return (
        <section className="w-full py-12 bg-[#fdfdff]">
            <div className="container mx-auto">
                <div
                    className={`flex gap-8 items-center flex-wrap justify-center ${
                        layout === "left" ? "flex-row" : "flex-row-reverse"
                    }`}
                >
                    <div className="relative flex-1 max-w-[500px]">
                        <Carousel
                            activeIndex={activeIndex}
                            onSelect={handleSelect}
                            interval={null}
                            indicators={false}
                            controls={false}
                        >
                            {images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <div className="relative w-full h-80">
                                        <Image
                                            src={image}
                                            alt={altTexts[index]}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>

                        {/* Butoane Next/Prev */}
                        {activeIndex < images.length - 1 && (
                            <button
                                className="carousel-control-next"
                                onClick={() => setActiveIndex(activeIndex + 1)}
                                aria-label="Next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                        )}

                        {activeIndex > 0 && (
                            <button
                                className="carousel-control-prev"
                                onClick={() => setActiveIndex(activeIndex - 1)}
                                aria-label="Previous"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            </button>
                        )}
                    </div>

                    <div className="flex-1 max-w-[500px] px-4">
                        <h2 className="text-3xl font-bold mb-4">{title}</h2>
                        <div
                            className="text-base leading-6"
                            dangerouslySetInnerHTML={{ __html: text }}
                        ></div>

                        {/* Butonul Opțional */}
                        {buttonText && buttonLink && (
                            <a
                                href={buttonLink}
                                className="inline-block mt-5 px-3 py-2 bg-[#16366d] text-white font-semibold text-sm rounded-lg transition-all duration-300 hover:bg-[#13528f]"
                            >
                                {buttonText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContentSection;
