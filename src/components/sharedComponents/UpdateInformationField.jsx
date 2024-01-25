import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";

const UpdateInformationField = () => {
  const loadedData = useLoaderData();

  const { id } = useParams();
  console.log("loaderData:", loadedData, id);
  const theData = loadedData.find(element => element._id === id) || "";

  const { _id, name, supplier, chef, category, taste, details, photo, price } =
    theData;

  //   console.log("theData:", theData);
  const location = useLocation();
  console.log(location.pathname);

  const handleUpdateSubmit = e => {
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
    const idd = id;
    const updatedCoffee = {
      name,
      supplier,
      chef,
      category,
      taste,
      details,
      photo,
      price,
      idd,
    };
    console.log(name, supplier, chef, category, taste, details, photo, price);

    fetch(`http://localhost:5000/update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedCoffee),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert("Updated successfully...");
        }
      });
  };

  return (
    <div className="bg-[#F4F3F0]">
      <Link to="/">
        <button className="font-rancho text-2xl py-8 text-[#331A15]">
          Back to Home
        </button>
      </Link>
      <form className=" " onSubmit={handleUpdateSubmit}>
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
                defaultValue={supplier}
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
                defaultValue={category}
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
                  defaultValue={photo}
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
                defaultValue={chef}
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
                defaultValue={taste}
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
                defaultValue={details}
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
                defaultValue={price}
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

export default UpdateInformationField;
