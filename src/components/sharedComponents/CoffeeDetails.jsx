
import { useLoaderData, useParams } from "react-router-dom";

const CoffeeDetails = () => {
  const loadedData = useLoaderData();
  const {id} = useParams() //remember useParams returns a object
console.log(loadedData)
console.log(id)

//   const { coffeeDetails} = loadedData;
  
    // console.log(coffeeDetails)
    const theData = loadedData.find(element => element._id === id);
    // console.log("dddddddd ",theData)

    // console.log("thedata: ",theData)
    // console.log(theData)
    const {_id, name, chef, taste, supplier, category, details, photo, price } =
    theData;
  return (
    <div className="flex justify-center items-center gap-32 bg-white px-44 py-20">
      <div className="col-span-3">
        <img src={photo} alt="" />
      </div >
      <div className="col-span-2 [&>*]:py-2">
        <p>Name: {name}</p>
        <p>Chef: {chef}</p>
        <p>Supplier: {supplier}</p>
        <p>Taste: {taste}</p>
        <p>Category: {category}</p>
        <p>Details: {details}</p>
      </div>
    </div>
  );
};

export default CoffeeDetails;
