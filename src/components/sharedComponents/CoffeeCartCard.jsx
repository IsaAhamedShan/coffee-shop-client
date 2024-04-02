import { RxCross2 } from "react-icons/rx";

import { deleteItemFromLocalStorage } from "../coffeeCartLocalStorage";
const CoffeeCartCard = ({ eachItem,handleDeleteCartItem }) => {
  const { _id, name, chef, taste, category, details, photo, price } = eachItem;

  return (
    <tbody className="flex justify-between  h-52">
      <div className="justify-between w-full mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start md:justify-around">
        <img src={photo} alt="product-image" className="" />
        <div className="sm:ml-4 sm:flex sm:justify-around sm:items-center sm:gap-36 sm:w-full ">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{name}</h2>
            <p className="mt-1 text-xs text-gray-700">${price}</p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                -{" "}
              </span>
              <input
                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                type="number"
                value="2"
                min="1"
              />
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                +{" "}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">${price}</p>
              <RxCross2 className="hover:scale-150 duration-150 cursor-pointer" onClick={()=>handleDeleteCartItem(_id)} />
            </div>
          </div>
        </div>
      </div>
    </tbody>
  );
};

export default CoffeeCartCard;
