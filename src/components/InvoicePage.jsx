import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import PurchaseDetailsCard from "./sharedComponents/PurchaseDetailsCard";
const InvoicePage = () => {
  //HERE ID IS EMAIL;
  const coffeeData = useLoaderData();
  //   let { email } = useParams();
  //   console.log("ee :", email);
  const [userPurchaseData, setUserPurchaseData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/userInvoiceHistory/`)
      .then(res => {
        setUserPurchaseData(res.data.filter(item=> item.email === user?.email));
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  }, [user?.email]);
  console.log("uu:", userPurchaseData);
  //   let { data, error, isLoading } = useQuery({
  //     queryKey: [user.email],
  //     queryFn: async () => {
  //       let res = await axios.get(
  //         `http://localhost:5000/userInvoiceHistory/${user.email}`
  //       );
  //       return res.data;
  //     },
  //   });
  // //   console.log("user purchase data: ", data);
  //   if(isLoading) return <div className="text-7xl text-center">loading.......</div>

  return (
    <div>
      <h1>invoice page</h1>
      {userPurchaseData.length > 0 &&
        userPurchaseData?.map(item => (
          <PurchaseDetailsCard
            key={item._id}
            item={item}
            coffeeData={coffeeData}
          ></PurchaseDetailsCard>
        ))}
    </div>
  );
};

export default InvoicePage;
