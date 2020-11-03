import React, { useEffect, useState } from "react";
import { data } from "./data";
// import Client from "./contentful";

const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomFilters, setRoomFilters] = useState({
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  useEffect(() => {
    let rooms = formatData(data);
    let featuredRooms = rooms.filter((room) => room.featured === true);

    let maxPrice = Math.max(...rooms.map((room) => room.price));
    let maxSize = Math.max(...rooms.map((room) => room.size));

    //TODO: binding data
    setRooms(rooms);
    setFeaturedRooms(featuredRooms);
    setSortedRooms(rooms);
    setRoomFilters((roomFilters) => {
      return { ...roomFilters, price: maxPrice, maxPrice, maxSize };
    });

    // TODO: set loading state
    setLoading(false);

    // const getData = async () => {
    //   try {
    //     let response = await Client.getEntries({
    //       content_type: "beachResortRoom",
    //     });

    //     let rooms = formatData(response.items);
    //     let featuredRooms = rooms.filter((room) => room.featured === true);

    //     let maxPrice = Math.max(...rooms.map((room) => room.price));
    //     let maxSize = Math.max(...rooms.map((room) => room.size));

    //     //TODO: binding data
    //     setRooms(rooms);
    //     setFeaturedRooms(featuredRooms);
    //     setSortedRooms(rooms);
    //     setRoomFilters((roomFilters) => {
    //       return { ...roomFilters, price: maxPrice, maxPrice, maxSize };
    //     });

    //     // TODO: set loading state
    //     setLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getData();
  }, []);

  const formatData = (data) => {
    let tempData = data.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempData;
  };

  const getRoom = (slug) => {
    let tempRooms = [...rooms];
    const room = tempRooms.find((room) => room.slug === slug);

    return room;
  };

  const handleFiltersChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setRoomFilters((roomFilters) => {
      return { ...roomFilters, [name]: value };
    });
  };

  useEffect(() => {
    const filterRooms = () => {
      let {
        type,
        capacity,
        price,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
      } = roomFilters;

      let tempRooms = [...rooms];
      // transform data
      let tempCapacity = parseInt(capacity);
      let tempPrice = parseInt(price);
      // filter by type
      if (type !== "all") {
        tempRooms = tempRooms.filter((room) => room.type === type);
      }

      //filter by capacity
      if (tempCapacity !== 1) {
        tempRooms = tempRooms.filter((room) => room.capacity >= tempCapacity);
      }
      //filter by price
      if (tempPrice !== maxPrice) {
        tempRooms = tempRooms.filter((room) => room.price <= tempPrice);
      }
      //filter by room size
      tempRooms = tempRooms.filter(
        (room) => room.size >= minSize && room.size <= maxSize
      );
      // filter by breakfast
      if (breakfast) {
        tempRooms = tempRooms.filter((room) => room.breakfast === true);
      }
      // filter by pets
      if (pets) {
        tempRooms = tempRooms.filter((room) => room.pets === true);
      }
      setSortedRooms(tempRooms);
    };
    filterRooms();
  }, [roomFilters, rooms]);

  return (
    <RoomContext.Provider
      value={{
        rooms,
        sortedRooms,
        featuredRooms,
        roomFilters,
        loading,
        getRoom: getRoom,
        handleFiltersChange: handleFiltersChange,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

const RoomConsumer = RoomContext.Consumer;

export const withRoomConsumer = (Component) => {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
};

export { RoomProvider, RoomConsumer, RoomContext };
