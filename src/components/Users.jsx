import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
const Users = () => {
  // const {handleDeleteUser} = useContext(AuthContext)
  const usersData = useLoaderData();
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [userList, setUserList] = useState([]);
  console.log(usersData);
  useEffect(() => {
    setUserList(usersData);
    setAdmin(usersData.filter(item => item.admin === "true"));
    setUser(usersData.filter(item => item.admin !== "true"));
  }, [usersData]);
 
  console.table(user);
  const handleDeleteUser = _id => {
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
        fetch(`http://localhost:5000/user/${_id}`, {
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
            }
            setUser(prev=> prev.filter(eachData => eachData._id !== _id));
          })
          .catch(error => console.log(error));
      }
    });
  };

  console.log(usersData);
  return (
    <div className="overflow-x-auto bg-[#F4F3F0] my-20 ">
      <div>
        <p className="text-3xl text-center text-[#331A15] font-rancho mb-10">
          Admin
        </p>
      </div>
      <table className="table max-w-7xl mx-auto bg-[#e7e7e7]">
        {/* head */}
        <thead>
          <tr className="text-black">
            <th></th>
            <th>Email</th>
            <th>Creation Time</th>
            <th>Last Login</th>
            <th>User Buying Details</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        <tbody className="">
          {admin.map((eachData, index) => (
            <tr key={eachData._id} className="bg-[#e7e7e7] my-4">
              <th>{index + 1}</th>
              <td>{eachData.email}</td>
              <td>{eachData.creationTime}</td>
              <td>{eachData.lastSignInTime || null}</td>
              <td>
                <Link to={`/invoiceHistory`}>
                  <button className="btn btn-outline" onClick={() => {}}>
                    Details
                  </button>
                </Link>
              </td>
              {/* <td>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    handleDeleteUser(eachData._id);
                  }}
                >
                  Delete User
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p className="text-3xl text-center text-[#331A15] font-rancho my-10">
          User
        </p>
      </div>
      <table className="table max-w-7xl mx-auto bg-[#e7e7e7]">
        {/* head */}
        <thead>
          <tr className="text-black">
            <th></th>
            <th>Email</th>
            <th>Creation Time</th>
            <th>Last Login</th>
            <th>User Buying Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {user.map((eachData, index) => (
            <tr key={eachData._id} className="bg-[#e7e7e7] my-4">
              <th>{index + 1}</th>
              <td>{eachData.email}</td>
              <td>{eachData.creationTime}</td>
              <td>{eachData.lastSignInTime || null}</td>
              <td>
                <Link to={`/invoiceHistory`}>
                  <button className="btn btn-outline" onClick={() => {}}>
                    Details
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    handleDeleteUser(eachData._id);
                  }}
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
