import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { getItem } from "./coffeeCartLocalStorage";
import CoffeeCartCard from "./sharedComponents/CoffeeCartCard";

const Cart = () => {
  const { cartItem } = useContext(AuthContext);
  console.log(cartItem);

  const [filteredData, setFilteredData] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const cartItemsFromLocalStorage = getItem();
    fetch("http://localhost:5000/coffee")
      .then(res => res.json())
      .then(data => {
        const filteredData = data.filter(eachItem =>
          cartItemsFromLocalStorage.includes(eachItem._id)
        );
        setFilteredData(filteredData);
        let sum = 0;
        filteredData.forEach(
          eachItem => (sum = sum + parseInt(eachItem.price))
        );
        setTotal(sum);
      });

    console.log("total ", total);
  }, []);

  console.log("filterData: ", filteredData);
  return (
    
    <div className="">
      <div className="flex justify-center items-center"><p className="font-bold pt-4 md:pt-6 lg:pt-8 md:text-xl lg:text-3xl text-black">My Cart</p></div>
      <div className="grid grid-cols-3 h-[100dvh] bg-[#F4F3F0] max-w-7xl mx-auto my-4 md:my-6 xl:my-12">
        <div className="col-span-2 p-4">
          <table className="table flex py-4 bg-[#e7e7e7] rounded-md">
            {/* head */}
            <thead>
              <tr className="text-black grid grid-cols-4 py-4">
                <th className="grid-span-1 p-0 text-center md:text-xl">Image</th>
                <th className="grid-span-1 p-0 text-center md:text-xl">Name</th>
                <th className="grid-span-1 p-0 text-center md:text-xl">price</th>
                <th className="grid-span-1 p-0 text-center md:text-xl">Delete</th>
              </tr>
            </thead>
            {filteredData.map(eachItem => (
              <CoffeeCartCard
                key={eachItem._id}
                eachItem={eachItem}
              ></CoffeeCartCard>
            ))}
          </table>
        </div>
        <div className="col-span-1 p-8 flex justify-end ">
          <div className="bg-[#e7e7e7] h-min p-8 rounded-md">
            <h1 className="text-2xl mb-8 text-black">Order Summery</h1>
            <div>
              <p className="py-4">Total Amount: {total}</p>
              <button className="btn btn-outline btn-md">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
