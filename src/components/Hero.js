import React from "react";
import PropTypes from "prop-types";

const Hero = ({ children, hero }) => {
  return <header className={hero}>{children}</header>;
};

Hero.propTypes = {
  hero: PropTypes.string.isRequired,
};

Hero.defaultProps = {
  hero: "defaultHero",
};

export default Hero;
