import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../providers/AuthProvider.jsx";
import { getItem } from "../coffeeCartLocalStorage.js";
const useCart = () => {
  //if i use useState to set data then refetch wont work cause that useState's [date,setData] is not connected to useQuery
    // const [cart, setCart] = useState();

  const {user} = useContext(AuthContext)
  const {refetch,data:cart=[]} = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const response = await getItem()
    //   console.log("re :",response)
      // setCart(response.data)
      return response
    },
  });
  return [cart,refetch];
};

export default useCart;
