import { useLoaderData, useParams } from "react-router-dom";

const CoffeeDetails = () => {
  const loadedData = useLoaderData();
  const { id } = useParams(); //remember useParams returns a object
  console.log(loadedData);
  console.log(id);

  const theData = loadedData.find(element => element._id === id);

  const { _id, name, chef, taste, supplier, category, details, photo, price } =
    theData;
  return (
    
    <div className="flex flex-col h-dvh">
      <div><p className="text-center text-[#1F0E0B] text-3xl font-bold font-rancho py-16">Coffee Details</p></div>
      <div className="flex justify-center items-center gap-8 md:gap-32 max-w-5xl mx-auto bg-white p-10 lg:px-44 lg:py-20 ">
        <div className="min-h-60 min-w-40">
          <img src={photo} className="w-full h-full" alt="" />
        </div>
        <div className=" [&>*]:py-2">
          <p>Name: {name}</p>
          <p>Chef: {chef}</p>
          <p>Supplier: {supplier}</p>
          <p>Taste: {taste}</p>
          <p>Category: {category}</p>
          <p>Details: {details}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
