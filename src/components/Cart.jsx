import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import {
  deleteItemFromLocalStorage,
  getItem,
  getTotalCartValue,
} from "./coffeeCartLocalStorage";
import useCart from "./hooks/useCart";
import CoffeeCartCard from "./sharedComponents/CoffeeCartCard";
const Cart = () => {
  const { cartItem, user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  // console.log(cartItem);
  const [filteredData, setFilteredData] = useState([]);
  let addedToDbSuccess = () => toast.success("Ordered Successfully");
  let unsuccessful = () => toast.error("Couldn't Order Item.Try Again");
  const [total, setTotal] = useState(getTotalCartValue());
  // console.log(total)
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
  let goToCheckout = () => {
    let coffeeCartItems = getItem();
    // console.log("🚀 ~ goToCheckout ~ coffeeCartItems:", coffeeCartItems)
    let totalValue = getTotalCartValue();
    let coffeeCartItemsObj = {};
    for (let i = 0; i < coffeeCartItems.length; i++) {
      coffeeCartItemsObj[coffeeCartItems[i]] =
        (coffeeCartItemsObj[coffeeCartItems[i]] || 0) + 1;
    }
    let userCheckOut = {
      email: user?.email,
      CheckOutDate: format(new Date(), "MM/dd/yyyy"),
      purchasedItems: coffeeCartItemsObj,
      checkoutTotal: totalValue,
    };
    axios
      .post("http://localhost:5000/saveCart", userCheckOut)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          addedToDbSuccess();
          localStorage.setItem("coffeeCart", "");
          localStorage.setItem("totalValue",JSON.stringify(0));
          refetch()
        } else {
          unsuccessful();
        }
      })
      .catch(err => {
        console.log(err);
        unsuccessful();
      });
    // console.log(userCheckOut);

    // console.log("🚀 ~ goToCheckout ~ totalValue:", totalValue)
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
        setTotal(getTotalCartValue());
      });

    // console.log("total ", total);
  }, [cart]);

  console.log("filterData: ", filteredData);
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center">
        <p className="font-bold pt-4 md:pt-6 lg:pt-8 md:text-xl lg:text-3xl text-[#1F0E0B] font-rancho">
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
                  setTotal={setTotal}
                  handleDeleteCartItem={handleDeleteCartItem}
                ></CoffeeCartCard>
              ))}
          </table>
        </div>

        <div className="col-span-1 p-4 flex justify-end ">
          <div className=" flex flex-col h-min max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 dark:divide-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
            <h2 className="text-2xl font-semibold">Order Summery</h2>
            <ul className="flex flex-col pt-4 space-y-2">
              <span className="font-semibold">
                Sub Total: ${total.toFixed(2)}
              </span>
            </ul>
            <ul className="flex flex-col pt-4 space-y-2">
              <span className="font-semibold">
                Vat(5%): ${(total * 1.05 - total).toFixed(2)}
              </span>
            </ul>
            <ul className="flex flex-col pt-4 space-y-2">
              <span className="font-semibold">
                Shipping Cost (3%): ${(total * 1.03 - total).toFixed(2)}
              </span>
            </ul>

            <div className="pt-4 space-y-2">
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-semibold">
                    ${(total * 1.08).toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full py-2 font-semibold border rounded bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50 border-violet-400 dark:border-violet-600"
                  onClick={() => goToCheckout()}
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
