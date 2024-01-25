import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const coffeeContext = useContext(AuthContext);
  const { createUser, auth } = coffeeContext;
  const navigate = useNavigate()
  const goToSignIn = ()=>{
    navigate("/signin")
  }
  const createSuccessful = () => toast.success("Account Created Successfully");
  const createUnsuccessful = () => toast.error("Something is wrong.Try again");
  const passwordValidationError = () =>
    toast.error(
      "Password Length should be at least 6 character Long & includes 1 Special letter,1 Capital Letter"
    );
  const handleSignup = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const passwordValidationPattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    if (!passwordValidationPattern.test(password)) {
      passwordValidationError();
      return;
    }
    console.log(username, password, email);
    createUser(email, password)
      .then(result => {
        const creationTime = result.user?.metadata?.creationTime;
        const user = { email, creationTime };
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });

        console.log(auth.currentUser.displayName);

        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            console.log("display name set successfully");
            console.log(auth.currentUser.displayName);
          })
          .catch(() =>
            console.log("display name couldn't set, something is wrong")
          );
        console.log(
          "after singin display name :",
          auth.currentUser.displayName
        );
        createSuccessful();
        setTimeout(goToSignIn,2000)
        // console.log("success");
      })
      .catch(error => {
        createUnsuccessful();
        // console.log(error);
      });
  };
  return (
    <div className="hero min-h-[50vh] h-auto lg:min-h-screen font-raleway">
      <Toaster />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full md:min-w-[350px] md:p-6 lg:min-w-[400px]  lg:p-8 shadow-2xl rounded-none  bg-white">
          <form className="card-body " onSubmit={handleSignup}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-[#1F0E0B]">
                  USERNAME
                </span>
              </label>
              <input
                type="text"
                placeholder="username"
                name="username"
                className="input rounded-none px-1 w-full bg-white text-[#442c28] border-b-slate-300 border-x-0 border-t-0 placeholder-[#a1a1a1]"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-[#1F0E0B]">
                  EMAIL
                </span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                name="email"
                className="input px-1 rounded-none w-full text-[#442c28] bg-white border-b-slate-300 border-x-0 border-t-0 placeholder-[#a1a1a1]"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-[#1F0E0B] ">
                  PASSWORD
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input px-1 w-full rounded-none text-[#442c28] bg-white border-b-slate-300 border-x-0 border-t-0 placeholder-[#a1a1a1]"
                  required
                />
                <div
                  className="absolute top-1/3 right-3"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <FaEye className="cursor-pointer "></FaEye>
                  ) : (
                    <FaEyeSlash className="cursor-pointer"></FaEyeSlash>
                  )}
                </div>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn rounded-sm bg-[#1F0E0B] text-[#f4f3f0] hover:bg-[#f4f3f0] hover:border-[#1F0E0B] hover:text-[#1F0E0B]">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
