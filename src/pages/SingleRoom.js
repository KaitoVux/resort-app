import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";
import { RoomContext } from "../context";
import defaultBcg from "../images/room-1.jpeg";

const SingleRoom = (props) => {
  const context = useContext(RoomContext);
  const { roomId } = useParams();

  const { getRoom } = context;
  const room = getRoom(roomId);

  if (!room) {
    return (
      <div className="error">
        <h3>no room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    price,
    size,
    extras,
    breakfast,
    pets,
    images,
  } = room;

  console.log(room);

  const [heroImg, ...defaultImgs] = images;

  return (
    <>
      <StyledHero img={heroImg || defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImgs.map((img, index) => (
            <img key={index} src={img} alt={name} />
          ))}
        </div>
        <article className="single-room-info">
          <div className="desc">
            <h3>Details</h3>
            <p>{description}</p>
          </div>
          <div className="info">
            <h3>Info</h3>
            <h6>price: {price}</h6>
            <h6>size: {size} SQFT</h6>
            <h6>
              max capacity: {capacity} {capacity > 1 ? "people" : "person"}
            </h6>
            <h6>{pets ? "Pets Allowed " : "No Pets Allowed"}</h6>
            <h6>{breakfast && "Free Breakfast Included"}</h6>
          </div>
        </article>
      </section>

      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {extras.map((extra, index) => (
            <li key={index}>- {extra}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

SingleRoom.propTypes = {};

export default SingleRoom;
