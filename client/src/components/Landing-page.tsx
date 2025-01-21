import React from 'react';
import Navbar from './base/Navbar';
import HeroSection from './base/HeroSection';
import FeatureSection from './base/FeatureSection';
import UserReview from './base/UserReview';
import Footer from './base/Footer';

interface Props {
    // define your props here
}

const LandingPage: React.FC<Props> = () => {
    // window.crypto.subtle
    return (
        <div className="min-h-screen flex flex-col ">
            <Navbar/>
            <HeroSection/>
            <FeatureSection/>
            <UserReview/>
            <Footer/>
        </div>
    );
};

export default LandingPage;