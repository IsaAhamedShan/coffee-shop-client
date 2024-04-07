import React, { useEffect, useState } from "react";

const PurchaseDetailsCard = ({ item, coffeeData }) => {
  const { _id, email, CheckOutDate, purchasedItems, checkoutTotal } = item;
  //   console.log("jj", coffeeData);
  const [coffee, setCoffee] = useState([]);
  const [dd, setdd] = useState([]);
  //   console.log("pp: ",purchasedItems)
  let objArr = Object.entries(purchasedItems);
  //   console.log("🚀 ~ PurchaseDetailsCard ~ objArr:", objArr);
  //   console.log("obb: ",objArr[0][0])

  useEffect(() => {
    setdd([])
    for (let i = 0; i < objArr.length; i++) {
      for (let j = 0; j < coffeeData.length; j++) {
        if (objArr[i][0] === coffeeData[j]._id) {
          setdd(prev => [...prev, [coffeeData[j].name, objArr[i][1]]]);
        //   console.count("a");
          break;
        }
      }
    }
  }, [purchasedItems, coffeeData]);
  console.log("dd: ", dd);
  return (
    <div>
      <h1>gg</h1>
      <h1>{_id}</h1>
      <h1>{email}</h1>
      <h1>{CheckOutDate}</h1>
      <h1>{checkoutTotal}</h1>
      <h1>{dd}</h1>
    </div>
  );
};

export default PurchaseDetailsCard;
