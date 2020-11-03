import React from "react";
import { FaBeer, FaCocktail, FaHiking, FaShuttleVan } from "react-icons/fa";
import Title from "./Title";

const Services = () => {
  const services = [
    {
      icon: <FaCocktail />,
      title: "free cocktail",
      info:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, natus?",
    },
    {
      icon: <FaHiking />,
      title: "endless hiking",
      info:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, natus?",
    },
    {
      icon: <FaShuttleVan />,
      title: "free shuttle",
      info:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, natus?",
    },
    {
      icon: <FaBeer />,
      title: "strongest beer",
      info:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, natus?",
    },
  ];

  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map((service, index) => (
          <article key={index} className="service">
            <span>{service.icon}</span>
            <h6>{service.title}</h6>
            <p>{service.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
