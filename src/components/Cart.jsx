import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { getItem } from "./coffeeCartLocalStorage";
import CoffeeCartCard from "./sharedComponents/CoffeeCartCard";

const Cart = () => {
  const { cartItem } = useContext(AuthContext);
  console.log(cartItem);

  const [filteredData,setFilteredData] = useState([]);
  const [total,setTotal] = useState(null)

  useEffect(() => {
    const cartItemsFromLocalStorage = getItem();
    fetch("http://localhost:5000/coffee")
      .then(res => res.json())
      .then(data =>{
        const filteredData = data.filter(eachItem => cartItemsFromLocalStorage.includes(eachItem._id))
        setFilteredData(filteredData)
        let sum =0;
        filteredData.forEach(eachItem=> sum = sum + parseInt(eachItem.price))
        setTotal(sum)
      }
      );
     
console.log("total ",total)
    }, []);

    console.log("filterData: ",filteredData)
  return (
    <div className="grid grid-cols-3 h-[100dvh] bg-[#F4F3F0]">
      <div className="col-span-2">
      <table className="table flex  py-4">
        {/* head */}
        <thead>
          <tr className="text-black grid grid-cols-4 py-4">
            <th className="grid-span-1 p-0 text-center">Image</th>
            <th className="grid-span-1 p-0 text-center">Name</th>
            <th className="grid-span-1 p-0 text-center">price</th>
            <th className="grid-span-1 p-0 text-center">Delete</th>
          </tr>
        </thead>
        {
        filteredData.map(eachItem=>
          <CoffeeCartCard key={eachItem._id} eachItem = {eachItem}></CoffeeCartCard>
           )
      }
      </table>
      
      </div>
      
       <div className="col-span-1 p-8 ">
        <h1 className="text-2xl">Order Summery</h1>
        <div>
          <p>Total Amount: {total}</p>
          <button className="btn btn-outline">PLACE ORDER</button>
        </div>
       </div>
    </div>
  );
};

export default Cart;
