import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { addItemToLocalStorage } from "../coffeeCartLocalStorage";
import toast, { Toaster } from 'react-hot-toast';
const CoffeeCard = ({ eachData,userDetails, handleDelete }) => {
  const { _id, name, chef, taste, supplier, category, details, photo, price } =
    eachData;
  const { addToCart, user } = useContext(AuthContext);
  console.log("userDetails: ",userDetails)
  console.log("eachData: ",eachData)
 let addedSuccessfully = ()=> toast.success("Added to Cart")
  return (
    <div className="grid grid-cols-6">
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div className="col-span-2">
        <img src={photo} alt="" />
      </div>
      <div className="col-span-2 flex flex-col justify-center items-center gap-4 [&>*]:font-raleway [&>*]:text-[#1B1A1A]">
        <p>Name: {name}</p>
        <p>Chef: {chef}</p>
        <p>Price: {price}</p>
      </div>
      <div className="col-span-2 flex flex-col gap-4 justify-center items-center [&>*]:hover:cursor-pointer<Link>">
        {userDetails.data? (
          <Link>
            {" "}
            <img
              src="../../../public/Group10.png"
              className="w-[40px] h-[40px] bg-slate-300 rounded-lg p-2 hover:scale-105"
              onClick={() => {
                addItemToLocalStorage(_id);
                addedSuccessfully()
              }}
              alt=""
            />
          </Link>
        ) : null}
        { userDetails.data.admin? (
          <Link to={`/update/${_id}`}>
            {" "}
            <img
              src="../../../public/Group 12.png"
              className="w-[40px] h-[40px] hover:scale-105"
              alt=""
            />
          </Link>
        ) : null}
        <Link to={`/details/${_id}`}>
          {" "}
          <img
            src="../../../public/Group 14.png"
            className="w-[40px] h-[40px] hover:scale-105"
            alt=""
          />
        </Link>
        {userDetails.data.admin? (
          <Link to="/" onClick={() => handleDelete(_id)}>
            {" "}
            <img
              src="../../../public/Group 13.png"
              className="w-[40px] h-[40px] hover:scale-105"
              alt=""
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default CoffeeCard;
