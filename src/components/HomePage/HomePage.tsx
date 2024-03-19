import React from 'react';
import { Header } from '../Header/Header';
import { LandingPage } from '../LandingBanner/LandingPage';

const HomePage: React.FC = ()  => {
    return (
        <>
            <Header />
            <LandingPage />
        </>
    );
}

export default HomePage;