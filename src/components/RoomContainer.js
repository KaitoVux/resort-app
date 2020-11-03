import React from "react";
import PropTypes from "prop-types";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import { withRoomConsumer } from "../context";
import { Loading } from "./Loading";

RoomContainer.propTypes = {
  context: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    rooms: PropTypes.array.isRequired,
    sortedRooms: PropTypes.array.isRequired,
  }),
};

function RoomContainer({ context }) {
  const { loading, rooms, sortedRooms } = context;

  if (loading) return <Loading />;
  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomContainer);
