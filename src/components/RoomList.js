import React from "react";
import PropTypes from "prop-types";
import Room from "./Room";

const RoomList = ({ rooms }) => {
  if (rooms.length === 0)
    return (
      <div className="empty-search">
        <h3>Unfortunately No Rooms Matched Your Search Parameters</h3>
      </div>
    );

  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
};

RoomList.propTypes = {
  rooms: PropTypes.array.isRequired,
};

export default RoomList;
