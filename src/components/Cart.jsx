import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteItemFromLocalStorage } from "./coffeeCartLocalStorage";
import useCart from "./hooks/useCart";
import CoffeeCartCard from "./sharedComponents/CoffeeCartCard";
const Cart = () => {
  const { cartItem } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  console.log(cartItem);
  const [filteredData, setFilteredData] = useState([]);
  const [total, setTotal] = useState(null);
  let handleDeleteCartItem = _id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#104f8a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        deleteItemFromLocalStorage(_id);
        refetch();
      }
    });
  };
  useEffect(() => {
    fetch("http://localhost:5000/coffee")
      .then(res => res.json())
      .then(data => {
        console.log("dd: ", data);
        const filteredData = data.filter(eachItem =>
          cart.includes(eachItem._id)
        );
        console.log("fil: ", filteredData);
        setFilteredData(filteredData);
        let sum = 0;
        filteredData.forEach(
          eachItem => (sum = sum + parseInt(eachItem.price))
        );
        setTotal(sum);
      });

    console.log("total ", total);
  }, [cart, total]);

  console.log("filterData: ", filteredData);
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <p className="font-bold pt-4 md:pt-6 lg:pt-8 md:text-xl lg:text-3xl text-black">
          My Cart
        </p>
      </div>
      <div className="grid grid-cols-3 h-[100dvh] bg-[#F4F3F0] max-w-7xl mx-auto my-4 md:my-6 xl:my-12">
        <div className="col-span-2 p-4">
          <table className="table flex py-4  rounded-md">
            {/* head */}

            {filteredData?.length > 0 &&
              filteredData?.map(eachItem => (
                <CoffeeCartCard
                  key={eachItem._id}
                  eachItem={eachItem}
                  handleDeleteCartItem={handleDeleteCartItem}
                ></CoffeeCartCard>
              ))}
          </table>
        </div>

        {/* <div className="col-span-1 p-8 flex justify-end ">
          <div className="bg-[#e7e7e7] h-min p-8 rounded-md">
            <h1 className="text-2xl mb-8 text-black">Order Summery</h1>
            <div>
              <p className="py-4">Total Amount: {total}</p>
              <button className="btn btn-outline btn-md">PLACE ORDER</button>
            </div>
          </div>
        </div> */}
        <div className="col-span-1 p-4 flex justify-end ">
          <div className=" flex flex-col h-min max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 dark:divide-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
            <h2 className="text-2xl font-semibold">Order items</h2>
            <ul className="flex flex-col pt-4 space-y-2">
              <li className="flex items-start justify-between">
                <h3>
                  Hard taco, chicken
                  <span className="text-sm text-violet-400 dark:text-violet-600">
                    x3
                  </span>
                </h3>
                <div className="text-right">
                  <span className="block">$7.50</span>
                </div>
              </li>
              <li className="flex items-start justify-between">
                <h3>
                  Hard taco, beef
                  <span className="text-sm text-violet-400 dark:text-violet-600">
                    x3
                  </span>
                </h3>
                <div className="text-right">
                  <span className="block">$8.25</span>
                </div>
              </li>
              <li className="flex items-start justify-between">
                <h3>
                  Curly fries
                  <span className="text-sm text-violet-400 dark:text-violet-600">
                    x1
                  </span>
                </h3>
                <div className="text-right">
                  <span className="block">$1.75</span>
                </div>
              </li>
              <li className="flex items-start justify-between">
                <h3>
                  Large soda
                  <span className="text-sm text-violet-400 dark:text-violet-600">
                    x2
                  </span>
                </h3>
                <div className="text-right">
                  <span className="block">$4.00</span>
                </div>
              </li>
            </ul>

            <div className="pt-4 space-y-2">
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">${total}</span>
                </div>
                <button
                  type="button"
                  className="w-full py-2 font-semibold border rounded bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50 border-violet-400 dark:border-violet-600"
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
