import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import FeatureRooms from "../components/FeatureRooms";
import Hero from "../components/Hero";
import Services from "../components/Services";

const Home = (props) => {
  return (
    <>
      <Hero>
        <Banner
          title="luxurious rooms"
          subtitle="deluxe rooms starting at $100"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>

      <Services />
      <FeatureRooms />
    </>
  );
};

export default Home;
