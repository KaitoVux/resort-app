import React, { useContext } from "react";
import { RoomContext } from "../context";
import { Loading } from "./Loading";
import Room from "./Room";
import Title from "./Title";

const FeatureRooms = (props) => {
  const contextTypes = RoomContext;

  const { featuredRooms, loading } = useContext(contextTypes);

  const rooms = featuredRooms.map((room) => <Room key={room.id} room={room} />);

  return (
    <section className="featured-rooms">
      <Title title="Featured Rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : rooms}
      </div>
    </section>
  );
};

export default FeatureRooms;
