import React from "react";
import asset from "../../assets/assets";
import { useRef } from "react";

import Course from '../../components/home/CategoryTable'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const Home: React.FC = () => {
  
  const coursesSectionRef = useRef<HTMLDivElement>(null);

const handleScrollToCourses = () => {
  coursesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
};
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
                <button  onClick={handleScrollToCourses} className="click_course bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full animate-pulse">
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
       
      <div  ref={coursesSectionRef} className="topCourse bg-[#f9eded] ml-auto mr-auto mt-9">
        <h2 className="text-center mb-11 relative text-3xl sm:text-5xl font-bold">Courses</h2>
        <Course/>
      </div>
      <section className="w-screen flex flex-col justify-center m-auto items-center sm:w-[90%] md:px-[64px] pt-[64px] pb-[40px] md:pb-[129px] bg-glass h-auto default-spacing-section">
        <div className="container">
          <h2 className="heading2 text-7xl inline-block ml-[27px] lg:ml-[115px] relative text-fl-black after:block after:content-[''] after:w-20 after:h-[7px] after:bg-fl-pink-700 after:mt-4 after:ml-0">How does it work?</h2>
            <div className="mt-[44px] relative">
              <div className="w-full grid gap-5 px-[24px] md:px-0 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                <div className="flex flex-col">
                  <span className="text-[33px] font-[700] mb-[16px] leading-[41.25px]">1</span>
                    <h3 className="heading2 text-3xl inline-block text-[22px] mb-[32px] md:mb-[40px] leading-[33px] text-fl-black font-normal">Find your degree</h3>
                      <p className="text-[16px] leading-[24px] text-fl-black">From undergraduate certificates to full masters degrees, browse our range of subjects and find a degree that can be completed 100% online.</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[33px] font-[700] mb-[16px] leading-[41.25px]">2</span>
                    <h3 className="heading2 text-3xl inline-block text-[22px] mb-[32px] md:mb-[40px] leading-[33px] text-fl-black font-normal">Apply to study with a world-class university</h3>
                      <p className="text-[16px] leading-[24px] text-fl-black">Like the look of a degree? Request more info by filling in our form or click ‘Apply now’ to apply via the university’s own systems.</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[33px] font-[700] mb-[16px] leading-[41.25px]">3</span>
                    <h3 className="heading2 text-3xl inline-block text-[22px] mb-[32px] md:mb-[40px] leading-[33px] text-fl-black font-normal">Learn flexibly online</h3>
                      <p className="text-[16px] leading-[24px] text-fl-black">Work through your degree in your own time, whenever and wherever suits you. All you need is access to the internet and a device to learn on.</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[33px] font-[700] mb-[16px] leading-[41.25px]">4</span>
                    <h3 className="heading2 text-3xl inline-block text-[22px] mb-[32px] md:mb-[40px] leading-[33px] text-fl-black font-normal">Gain your degree</h3>
                      <p className="text-[16px] leading-[24px] text-fl-black"> Complete all the programs, pass the assessments and exams, and you’ll be the proud owner of an internationally recognised qualification.</p>
                </div>
              </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;