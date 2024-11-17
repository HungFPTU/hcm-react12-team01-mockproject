import { lazy } from "react";
import React from "react";
import asset from "../../assets/assets";


const Course = lazy (() => import("../../components/home/CategoryTable"))
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const Home: React.FC = () => {
  
  return (
    <div className="main mt-7">
      {/* Carousel */}
      <div className="container mx-auto mt-[65px] bg-white rounded-b-3xl rounded-tr-3xl p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Column for Text */}
            <div className="lg:col-span-5">
              <h1 className="text-4xl sm:text-5xl ml-3 sm:ml-7 mt-4 font-bold">
                <span className="text-[#e673d4]">Online </span>
                <span className="text-[#ff8a55]">Course</span>
              </h1>
              <p className="text-base sm:text-xl ml-3 sm:ml-7 mt-6 sm:mt-8 font-normal leading-6 sm:leading-9">
                Find the right study abroad programme with FLearn. Get expert guidance and support every step of the way 
                from our trusted partners and take the first step to unlocking global academic, social, and career opportunities.
                Enquire now to open up your world of learning.
              </p>

              <div className="toCourse flex justify-center sm:justify-start w-full sm:w-[500px] mt-[30px] sm:mt-[50px] ml-7">
                <button className="click_course bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full animate-pulse">
                  Go To Course
                </button>
              </div>
            </div>

            {/* Right Column for Image */}
            <div className="lg:col-span-7">
              <img 
                src={asset.banner} 
                alt="online course" 
                className="banner w-full rounded-tl-[80px] sm:rounded-tl-[150px] rounded-bl-[80px] sm:rounded-bl-[150px]"
              />
            </div>

          </div>
      </div>
       
      <div className="topCourse rounded-[50px] bg-[#f9eded] ml-auto mr-auto mt-9">
        <h2 className="text-center mb-11 relative text-3xl sm:text-5xl font-bold">Update Latest</h2>
        <Course/>
      </div>
      

    </div>
  );
};

export default Home;