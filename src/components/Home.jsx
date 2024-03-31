import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "./Footer";
import CoffeeCard from "./sharedComponents/CoffeeCard";
import axios from 'axios';
import { AuthContext } from "../../providers/AuthProvider";
const Home = () => {
  const coffeeImageData = useLoaderData();
  const [coffeeData, setCoffeeData] = useState([]);
  const [userDetails,setUserDetails] = useState([])
  const {user} = useContext(AuthContext)
  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${user?.email}`)
    .then(res=>{
        console.log("user details: ",res)
        setUserDetails(res)
    })
    .catch(err=>{
        console.log('err')
    })
  },[user])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCoffeeData(coffeeImageData);
    }, 1000);
    return () => clearTimeout(timer);
  }, [coffeeImageData]);

  const handleDelete = _id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setCoffeeData(coffeeData.filter(item => item._id !== _id));
              // window.location.reload();
            }
          });
      }
    });
    console.log(_id);
  };

  const [coffeeImage, setCoffeeImage] = useState([]);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/6554f2940574da7622c70a79")
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        setCoffeeImage(data.record)
      } );
  }, []);

  

  // console.log("dd",coffeeData,userDetails);
  return (
    <div className="font-rancho bg-white max-w-7xl m-auto">
      {/* <Header></Header> */}
      {/* <h1>home</h1> */}
      <div className="flex justify-center items-center flex-col gap-4 py-14">
        <p className="font-raleway text-[#331A15]">--- Sip & Savor ---</p>
        <h3 className="font-rancho text-3xl text-[#331A15]">
          Out Popular Products
        </h3>
        <Link to="/insert">
          <button className="btn rounded-sm bg-[#E3B577] border-[#331A15] text-[#331A15] border-2 hover:bg-[#331A15] hover:text-[#E3B577]  btn-xs sm:btn-sm md:btn-md">
            Add Coffee
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-20 px-32">
        {userDetails && coffeeData?.map(eachData => (
          <CoffeeCard
         key={eachData._id}
         eachData={eachData}
         userDetails={userDetails}
         handleDelete={handleDelete}
       ></CoffeeCard>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center my-8">
        <p className="font-raleway text-[#1b1a1acc]">Follow us now</p>
        <h3 className="text-4xl font-rancho text-[#1b1a1acc]">
          Follow on Instagram
        </h3>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {coffeeImage?.map(eachData => (
          <img
            key={eachData?.key}
            className="w-[312px] h-[350px]"
            src={eachData?.image}
            alt=""
          />
        ))}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
