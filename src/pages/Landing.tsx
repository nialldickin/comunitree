import { memo } from 'react';
import Header from '../components/landing/Header';
import HeroPanel from '../components/landing/HeroPanel';
import SecondaryPanel from '../components/landing/SecondaryPanel';
import FeaturedGardensPanel from '../components/landing/FeaturedGardens';

const Home = () => {
  return (
    <div className="home-page__container">
      <HeroPanel />
      <Header text="How it Works" />
      <SecondaryPanel />
      <Header text="Featured Gardens" />
      <FeaturedGardensPanel />
    </div>
  );
};

export default memo(Home);
