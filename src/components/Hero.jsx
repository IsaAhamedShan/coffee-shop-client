import React from 'react';

const Hero = () => {
    const bgHero = 'https://i.ibb.co/TmRX98F/Rectangle-2.png';

    const divStyle = {
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        // Add other background properties if necessary
    };

    return (
        <div className="hero min-h-screen " style={divStyle} >
            <div className=" pl-[40rem] flex-col lg:flex-row">
                <div className='[&>*]:text-white'>
                    <h1 className="text-5xl font-bold">Would you like a Cup of Delicious Coffee?</h1>
                    <p className="py-6 max-w-lg">It&apos;s coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!! Your companion of every moment!!! Enjoy the beautiful moments and make them memorable.</p>
                    <button className="btn btn-outline btn-neutral hover:bg-white hover:text-black text-white rounded-sm text-xl">Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
