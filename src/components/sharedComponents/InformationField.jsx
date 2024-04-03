import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
const InformationField = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const supplier = form.supplier.value;
    const chef = form.chef.value;
    const category = form.category.value;
    const taste = form.taste.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const price = form.price.value;
    const coffee = {
      name,
      supplier,
      chef,
      category,
      taste,
      details,
      photo,
      price,
    };
    console.log(name, supplier, chef, category, taste, details, photo);
    fetch("http://localhost:5000/insert", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(coffee),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          [
            Swal.fire({
              title: 'Success!!',
              text: 'Inserted Successfully',
              icon: 'success',
              confirmButtonText: 'Continue'
            })
            //  form.reset()
          ];
        }
      });
  };
  return (
    <div className="bg-[#F4F3F0] max-w-7xl m-auto h-screen">
      <Link to="/"><button className="font-rancho text-2xl py-8 text-[#331A15]">Back to Home</button></Link>
      <form
        className="py-8"
        onSubmit={
          handleSubmit
        }
      >
        <p className="text-3xl text-center text-[#331A15] pb-20 font-rancho">Add Coffee</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="[&>*]:pb-3">
            <div className=" flex flex-col gap-3  ">
              <p className="text-start font-bold font-raleway text-[#1b1a1acc] ">
                Name
              </p>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                className="input w-full  bg-white  "
                // value={name ?? ''}
                defaultValue={name}
              />
            </div>
            <div className=" flex flex-col gap-3 ">
              <p className="text-start font-bold font-raleway text-[#1b1a1acc]">
                Supplier
              </p>
              <input
                type="text"
                placeholder="Enter Supplier"
                name="supplier"
                className="input w-full  bg-white"
              />
            </div>
            <div className=" flex flex-col gap-3 ">
              <p className="text-start font-bold font-raleway text-[#1b1a1acc]">
                category
              </p>
              <input
                type="text"
                placeholder="Enter Category"
                name="category"
                className="input w-full  bg-white"
              />
              <div className=" flex flex-col gap-3 ">
                <p className="text-start font-bold font-raleway text-[#1b1a1acc]">
                  Photo
                </p>
                <input
                  type="text"
                  placeholder="Enter Photo url"
                  name="photo"
                  className="input w-full  bg-white"
                />
              </div>
            </div>
          </div>
          <div className="[&>*]:pb-3">
            <div className=" flex flex-col gap-3">
              <p className="text-start font-bold font-raleway text-[#1b1a1acc]">
                Chef
              </p>
              <input
                type="text"
                placeholder="Enter Chef's Name"
                name="chef"
                className="input w-full  bg-white"
              />
            </div>
            <div className=" flex flex-col gap-3 ">
              <p className="text-start font-bold font-raleway text-[#1b1a1acc]">
                Taste
              </p>
              <input
                type="text"
                placeholder="Enter Taste"
                name="taste"
                className="input w-full  bg-white"
              />
            </div>
            <div className=" flex flex-col gap-3 ">
              <p className="text-start font-bold font-raleway text-[#1b1a1acc]">
                Details
              </p>
              <input
                type="text"
                placeholder="Enter Details"
                name="details"
                className="input w-full  bg-white"
              />
            </div>
            <div className=" flex flex-col gap-3 ">
              <p className="text-start font-bold font-raleway text-[#1b1a1acc]">
                price
              </p>
              <input
                type="text"
                placeholder="Enter price"
                name="price"
                className="input w-full  bg-white"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-neutral w-full rounded-sm border-[#331A15]  bg-[#D2B48C] text-[#331A15] text-xl font-rancho hover:bg-[#331A15] hover:text-[#D2B48C]"
        >
          Add Coffee
        </button>
      </form>
    </div>
  );
};

export default InformationField;
