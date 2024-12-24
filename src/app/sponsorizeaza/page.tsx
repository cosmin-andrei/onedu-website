// components

"use client";
import { Navbar, Footer } from "@/components";
import React from "react";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import studentsStories from "../../data/studentsStories.json";
import HeroSection from "@/app/sponsorizeaza/hero";
import InvestmentSection from "@/app/sponsorizeaza/redirectCalculation";
import SponsorshipCalculator from "@/app/sponsorizeaza/redirectCalculation";


export default function Homepage() {
    return (
        <>
            <Navbar />
            <HeroSection />

            <ContentSection
                images={['/image/team-group/bkm_centru.jpg', '/image/team-group/tgmures_abc.jpg']}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Manifestul nostru"
                text="Am pornit ca o mișcare civică în 2019 la inițiativa a doi elevi gălățeni, din dorința de a digitaliza educația din România. Din 2025 modernizăm educația pe toate planurile: infrastructură, resurse materiale și resurse digitale. Construim împreună soluții digitale pentru elevi, părinți, tineri, profesori, școli și modernizăm școlile României. Construim România educată."
                layout="left"
            />

            <ColumnSection
                sectionTitle="Poveștile elevilor din România"
                cards={studentsStories}
                backgroundColor="bg-[#d2e2ff]"
            />

            <ContentSection
                images={['/image/team-group/bkm_centru.jpg', '/image/team-group/tgmures_abc.jpg']}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Unde merge investiția ta"
                text="Am pornit ca o mișcare civică în 2019 la inițiativa a doi elevi gălățeni, din dorința de a digitaliza educația din România. Din 2025 modernizăm educația pe toate planurile: infrastructură, resurse materiale și resurse digitale. Construim împreună soluții digitale pentru elevi, părinți, tineri, profesori, școli și modernizăm școlile României. Construim România educată."
                layout="right"
            />

            <SponsorshipCalculator/>

            <Footer />
        </>
    );
}
