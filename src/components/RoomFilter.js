import React, { useContext } from "react";
import PropTypes from "prop-types";
import { RoomContext } from "../context";
import Title from "./Title";

const RoomFilter = ({ rooms }) => {
  const context = useContext(RoomContext);

  const {
    roomFilters: {
      type,
      capacity,
      minPrice,
      maxPrice,
      price,
      minSize,
      maxSize,
      pets,
      breakfast,
    },
    handleFiltersChange,
  } = context;

  const getUnique = (items, value) => {
    return [...new Set(items.map((item) => item[value]))];
  };

  // type filter
  const types = ["all", ...getUnique(rooms, "type")];
  const typeOptions = types.map((type, index) => (
    <option key={index} value={type}>
      {type}
    </option>
  ));

  // capacity filter
  const guests = getUnique(rooms, "capacity");
  const capacityOptions = guests.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  return (
    <section className="filter-container">
      <Title title="Search Rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">Room Type</label>
          <select
            className="form-control"
            name="type"
            id="type"
            value={type}
            onChange={handleFiltersChange}
          >
            {typeOptions}
          </select>
        </div>
        {/* end select type */}
        {/* capacity */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            className="form-control"
            name="capacity"
            id="capacity"
            value={capacity}
            onChange={handleFiltersChange}
          >
            {capacityOptions}
          </select>
        </div>
        {/* end capacity */}
        {/* price */}
        <div className="form-group">
          <label htmlFor="price">Room Price $ {price}</label>
          <input
            className="form-control"
            name="price"
            id="price"
            type="range"
            value={price}
            min={minPrice}
            max={maxPrice}
            onChange={handleFiltersChange}
          />
        </div>
        {/* end price */}
        {/* room size */}
        <div className="form-group">
          <label htmlFor="size">Room Size</label>
          <div className="size-inputs">
            <input
              type="number"
              className="size-input"
              name="minSize"
              value={minSize}
              onChange={handleFiltersChange}
            />
            <input
              type="number"
              className="size-input"
              name="maxSize"
              value={maxSize}
              onChange={handleFiltersChange}
            />
          </div>
        </div>
        {/* end room size */}
        {/* extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleFiltersChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleFiltersChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
      </form>
    </section>
  );
};

RoomFilter.propTypes = {
  rooms: PropTypes.array.isRequired,
};

export default RoomFilter;
