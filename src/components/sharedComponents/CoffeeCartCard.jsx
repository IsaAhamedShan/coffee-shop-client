import React from "react";

const CoffeeCartCard = ({ eachItem }) => {
  const { _id, name, chef, taste, category, details, photo, price } = eachItem;

  return (
    
      <tbody className="grid grid-cols-4 py-4">
        <img
          src={photo}
          className="w-[64px] h-[64px] grid-span-1 m-auto"
          alt=""
        />
        <p className="grid-span-1 text-center">{name}</p>
        <p className="grid-span-1 text-center">{price}</p>
        <div className="grid-span-1 flex justify-center items-center">
          <button className="btn btn-outline">Delete</button>
        </div>
      </tbody>
  );
};

export default CoffeeCartCard;
