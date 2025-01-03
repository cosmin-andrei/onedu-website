// components
import { Navbar, Footer } from "@/components";
import Hero from "@/components/pageContent/hero";
import DonationForm from "@/components/donationForm";
import React from "react";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import studentsStories from "../../data/studentsStories.json";
import ceFacem from "@/data/ceFacem.json";
import TeamSection from "@/app/despre/echipa";
import DigitalizationSection from "@/app/despre/steps";
import TransparencySection from "@/app/despre/TransparencySection";


export default function Homepage() {
    return (
        <>
            <Navbar />
            <Hero
                background="/image/gvr-people.jpg"
                title="Modernizăm educația împreună. Pas cu pas."
                subtitle=""
            >
            </Hero>

            <ContentSection
                images={['/image/team-group/bkm_centru.jpg', '/image/team-group/tgmures_abc.jpg']}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Povestea noastră"
                text="Am pornit ca o mișcare civică în 2019 la inițiativa a doi elevi gălățeni, din dorința de a digitaliza educația din România. Din 2025 modernizăm educația pe toate planurile: infrastructură, resurse materiale și resurse digitale. Construim împreună soluții digitale pentru elevi, părinți, tineri, profesori, școli și modernizăm școlile României. Construim România educată."
                layout="left"
            />

            <ColumnSection
                sectionTitle="Ce facem pentru România"
                cards={ceFacem}
                backgroundColor="bg-[#d2e2ff]"
            />

            <DigitalizationSection />
            <TeamSection />
            <TransparencySection
                buttonLink="/rapoarte"
                buttonText="Vezi rapoartele noastre"
            />

            <Footer />
        </>
    );
}
