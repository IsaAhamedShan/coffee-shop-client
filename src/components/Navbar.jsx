import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
const Navbar = () => {
  const logo = "../../public/logo1.png";
  const bg = "../../public/Rectangle 1.png";
  const {user, signInSuccess, logOut, setSignInSuccess, userDetails } =
    useContext(AuthContext);
  const handleLogOut = () =>
    logOut()
      .then(successLogOut => {
        console.log(successLogOut);
        setSignInSuccess(false);
      })
      .catch(error => console.log(error));
  useEffect(() => {
    console.log("signinsuccessis ", signInSuccess);
  }, [user]);
  const navList = (
    <>
      <li className="px-2 ">
        <NavLink to="/">
          <p className="font-raleway ">Home</p>
        </NavLink>
      </li>
      {user ? null : (
        <li className="px-2">
          <NavLink to="/signin">
            <p className="font-raleway">Sign In</p>
          </NavLink>
        </li>
      )}
      {user ? (
        <li className="px-2">
          <NavLink to="/cart">
            <p className="font-raleway">My Cart</p>
          </NavLink>
        </li>
      ) : null}
      {userDetails.data && userDetails.data.admin ? (
        <li className="px-2">
          <NavLink to="/users">
            <p className="font-raleway">Users</p>
          </NavLink>
        </li>
      ) : null}
    </>
  );
  return (
    <div className="navbar bg-[#1F0E0B] px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
          >
            {navList}
          </ul>
        </div>
        <div className="navbar-start w-full">
          <div className="dropdown">
            <div
              className={`flex gap-8 justify-center items-center bg-[#1F0E0B]`}
              style={{ backgroundImage: `url(${bg})` }}
            >
              <img className="w-[75px] h-[75px]" src={logo} alt="" />
              <h1 className="font-rancho text-4xl">Espresso Emporium</h1>
            </div>
          </div>
        </div>
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navList}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <p className="pr-4">{user.displayName}</p>
            <NavLink>
              <button className="btn btn-outline" onClick={handleLogOut}>
                <p className="font-raleway">Log Out</p>
              </button>
            </NavLink>
          </>
        ) : (
          <NavLink to="/signup">
            <p className="font-raleway">Sign Up</p>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
