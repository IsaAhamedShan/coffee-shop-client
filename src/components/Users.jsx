import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
const Users = () => {
  // const {handleDeleteUser} = useContext(AuthContext)
  const usersData = useLoaderData();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    setUserList(usersData);
  }, [usersData]);
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
            setUserList(userList.filter(eachData => eachData._id !== _id));
          })
          .catch(error => console.log(error));
      }
    });
  };

  console.log(usersData);
  return (
    <div className="overflow-x-auto bg-[#F4F3F0]">
      <table className="table ">
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
          {userList.map((eachData, index) => (
            <tr key={eachData._id} className="bg-[#F4F3F0] my-4">
              <th>{index + 1}</th>
              <td>{eachData.email}</td>
              <td>{eachData.creationTime}</td>
              <td>{eachData.lastSignInTime || null}</td>
              <td>
                <Link to={`/invoice-history/${eachData._id}`}>
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
