
const Footer = () => {
  return (
    <footer className="footer p-10 bg-[#F4F3F0] text-base-content flex flex-col w-full">
        <img src="../../public/logo1.png" className="w-[75px] h-[90px]" alt="" />
        <div className="grid grid-cols-2">

      <div className="">
        <div className="flex flex-col justify-start">
            <h2 className="text-5xl text-start py-6 font-rancho text-[#331A15]">Espresso Emporium</h2>
            <p className="text-start py-6 font-raleway text-[#1B1A1A] mb-6">Always ready to be your friend. Come & Contact with us to share your memorable moments, to share with your best companion.</p>
        </div>
        <div className="flex justify-start items-center gap-8 mb-10">
            <img src="../../public/facebook-3-2 1.png" alt="" />
            <img src="../../public/Group 24.png" alt="" />
            <img src="../../public/Group 25.png" alt="" />
            <img src="../../public/Group 26.png" alt="" />
        </div>
        <div>
            <h2 className="text-4xl text-start py-4 font-rancho text-[#331A15]">Get in Touch</h2>
            <div>
                <div className="flex items-center justify-start gap-2">
                    <img src="../../public/phone.svg" className="h-[24px] w-[24px]" alt="" />
                    <p className="font-raleway text-[#1B1A1A]">01625337883</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <img src="../../public/email.svg" className="h-[24px] w-[24px]" alt="" />
                    <p className="font-raleway text-[#1B1A1A]">isaahmedshan190138@gmail.com</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <img src="../../public/location.svg" className="h-[24px] w-[24px]" alt="" />
                    <p className="font-raleway text-[#1B1A1A]">b-37,172 no road, Khalishpur, Khulna</p>
                </div>
            </div>
        </div>
      </div>
      <form className="m-auto">
      <header className="text-4xl text-start py-8 font-rancho text-[#331A15]">Connect with Us</header>
        <fieldset className="form-control w-80 [&>*]:mb-4">
          <label className="label ">
            {/* <span className="label-text">Enter your email address</span> */}
          </label>
          <div className="join gap-6 ">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered join-item bg-white w-full"
            />
            {/* <button className="btn btn-primary join-item">Subscribe</button> */}
          </div>
          <div className="join">
            <input
              type="email"
              placeholder="username@site.com"
              className="input input-bordered join-item bg-white  w-full"
            />
            {/* <button className="btn btn-primary join-item">Subscribe</button> */}
          </div>
          <div className="join">
            <textarea placeholder="Comment.." className="input input-bordered join-item bg-white h-24 w-full">

            </textarea>
\
          </div>
            {/* <button className="btn btn-primary join-item ">Send Message</button> */}
            <button className="btn btn-outline mb-0 font-rancho rounded-md hover:rounded-3xl hover:duration-500 text-xl text-[#331A15] hover:text-white hover:bg-[#331A15]">Send Message</button>
        </fieldset>
      </form>
        </div>
    </footer>
  );
};

export default Footer;
