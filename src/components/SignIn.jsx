import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
// import { useHistory } from 'react-router-dom';
const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const { login, setSignInSuccess, logInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const successfulLogin = () => toast.success("Login Successful");
  const unsuccessfulLogin = () => toast.error("Email/Password mismatch");
  // const history = useHistory();
  const handleGoogleSignIn = () => {
    setSignInSuccess(false);
    logInWithGoogle()
      .then(result => {
        const lastSignInTime = result.user?.metadata?.lastSignInTime;
        const email = result.user?.email;
        const user = {
          email,
          lastSignInTime,
        };

        setSignInSuccess(true);
        console.log(result);
        fetch("http://localhost:5000/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            successfulLogin();
          });
        setSignInSuccess(true);
        navigate("/");
        // history.push('/');
      })
      .catch(error => console.log(error));
  };
  const handleSignIn = e => {
    setSignInSuccess(false);

    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    login(email, password)
      .then(result => {
        const lastSignInTime = result.user?.metadata?.lastSignInTime;
        const user = {
          email,
          lastSignInTime,
        };
        console.log(result);
        //update signin time
        fetch("http://localhost:5000/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            successfulLogin();
          });
        setSignInSuccess(true);

        navigate("/");
      })
      .catch(error => {
        console.log(error);
        unsuccessfulLogin();
      });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-100 min-h-screen font-raleway">
      <Toaster />
      <div className="hero min-h-[50vh] h-auto lg:min-h-screen">
        <Toaster />
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full md:min-w-[350px] md:p-6 lg:min-w-[400px]  lg:p-8 shadow-2xl rounded-none  bg-white">
            <form className="card-body " onSubmit={handleSignIn}>
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
                  className="input rounded-none px-1 w-full bg-white text-[#442c28] border-b-slate-300 border-x-0 border-t-0 placeholder-[#a1a1a1]"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-[#1F0E0B]">
                    PASSWORD
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="input rounded-none px-1 w-full bg-white text-[#442c28] border-b-slate-300 border-x-0 border-t-0 placeholder-[#a1a1a1]"
                    required
                  />
                  <div
                    className="absolute top-1/3 right-3"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <FaEye className="cursor-pointer"></FaEye>
                    ) : (
                      <FaEyeSlash className="cursor-pointer"></FaEyeSlash>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn rounded-sm bg-[#1F0E0B] text-[#f4f3f0] hover:bg-[#f4f3f0] hover:border-[#1F0E0B] hover:text-[#1F0E0B]">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-10 md:py-0 justify-center items-center gap-6 [&>*]:w-[300px] bg-white">
        <div className="border flex justify-between items-center  px-10 py-4 hover:cursor-pointer  hover:translate-x-6 duration-300 ease-in-out hover:scale-105 bg-[#f4f3f0] text-[#f4f3f0] hover:bg-white hover:border-[#1F0E0B] hover:text-[#1F0E0B] hover:font-bold">
          <FaGithub className="text-[#1F0E0B]"></FaGithub>
          <p className="text-[#1F0E0B]">Continue with github</p>
        </div>
        <div
          className="border flex justify-between items-center  px-10 py-4 hover:cursor-pointer  hover:translate-x-6 duration-300 ease-in-out hover:scale-105 bg-[#f4f3f0] text-[#f4f3f0] hover:bg-white hover:border-[#1F0E0B] hover:text-[#1F0E0B] hover:font-bold"
          onClick={handleGoogleSignIn}
        >
          <FaGoogle className="text-[#1F0E0B]"></FaGoogle>
          {/* <FaGoogle /> */}
          <p className="text-[#1F0E0B]">Continue with google</p>
        </div>
        <div className="border flex justify-between items-center  px-10 py-4 hover:cursor-pointer  hover:translate-x-6 duration-300 ease-in-out hover:scale-105 bg-[#f4f3f0] text-[#f4f3f0] hover:bg-white hover:border-[#1F0E0B] hover:text-[#1F0E0B] hover:font-bold">
          <FaFacebook className="text-[#1F0E0B]"></FaFacebook>
          <p className="text-[#1F0E0B]">Continue with facebook</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
