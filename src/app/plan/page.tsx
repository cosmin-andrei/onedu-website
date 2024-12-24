// components

"use client";
import {Navbar, Footer, Hero} from "@/components";
import React, {useState} from "react";
import ContentSection from "@/components/pageContent/content-section";
import ceFacem from "@/data/ceFacem.json";
import ColumnSection from "@/components/pageContent/column-section";
import DigitalSolutionsSection from "@/app/plan/digitalsolutions-section";
import SolutionPopup from "@/app/plan/SolutionPopup";
import solutii from '@/data/solutions.json';

export default function Homepage() {
    const [selectedSolution, setSelectedSolution] = useState<{
        title: string;
        category: string;
        image: string;
        description: string;
        link: string;
        id: string;
        status: string;
    } | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = (solution: {
        title: string;
        category: string;
        image: string;
        description: string;
        link: string;
        id: string;
        status: string;
    }) => {
        setSelectedSolution(solution);
        setShowPopup(true);
    };

    const closePopup = () => {
        setSelectedSolution(null);
        setShowPopup(false);
    };

    return (
        <>
            <Navbar/>
            <Hero
                background="/image/hero-bg.jpg"
                title="Planul nostru pentru educația din România"
                subtitle=""
            />

            <ContentSection
                images={['/image/tedx_principalphoto.jpg']}
                altTexts={['tedx2024']}
                title="Investitori în educație"
                text="Sistemul educațional este învechit și are nevoie de modernizare pe toate planurile: digitalizare, planuri de învățământ, spații de învățare și multe altele. Am fondat Comunitatea ONedu România, în 2019, din dorința de a digitaliza educația din școli și licee. Am început pas cu pas și am considerat oportun să susținem și voluntariatul în comunitate, mișcarea noastră pornind prin inițiativă civică. Alături de Cosmin și Denisa, fondatorii organizației, s-au alăturat sute de tineri din toată țară și străinătate. Hai și tu!"
                layout="left"
            />

            <ColumnSection
                sectionTitle="Ce facem pentru România"
                cards={ceFacem}
                backgroundColor="bg-[#d2e2ff]"
            />



            <ContentSection
                images={['/image/tedx_principalphoto.jpg']}
                altTexts={['scoalaonedu']}
                title="Școala ONedu: școala secolului 21"
                text="Sistemul educațional este învechit și are nevoie de modernizare pe toate planurile: digitalizare, planuri de învățământ, spații de învățare și multe altele. Am fondat Comunitatea ONedu România, în 2019, din dorința de a digitaliza educația din școli și licee. Am început pas cu pas și am considerat oportun să susținem și voluntariatul în comunitate, mișcarea noastră pornind prin inițiativă civică. Alături de Cosmin și Denisa, fondatorii organizației, s-au alăturat sute de tineri din toată țară și străinătate. Hai și tu!"
                layout="right"
                buttonText="Vezi conceptul"
                buttonLink="/scoala"
            />

            <DigitalSolutionsSection solutions={solutii.solutii} openPopup={openPopup}/>

            {showPopup && selectedSolution && (
                <SolutionPopup solution={selectedSolution} closePopup={closePopup}/>
            )}

            <ContentSection
                images={['/image/tedx_principalphoto.jpg']}
                altTexts={['Centrul iVoluntar']}
                title="Centrul iVoluntar"
                text="Sistemul educațional este învechit și are nevoie de modernizare pe toate planurile: digitalizare, planuri de învățământ, spații de învățare și multe altele. Am fondat Comunitatea ONedu România, în 2019, din dorința de a digitaliza educația din școli și licee. Am început pas cu pas și am considerat oportun să susținem și voluntariatul în comunitate, mișcarea noastră pornind prin inițiativă civică. Alături de Cosmin și Denisa, fondatorii organizației, s-au alăturat sute de tineri din toată țară și străinătate. Hai și tu!"
                layout="left"
                buttonText="Vezi activitatea"
                buttonLink="https://ivoluntar.org"
            />

            <Footer/>
        </>
    );
}
