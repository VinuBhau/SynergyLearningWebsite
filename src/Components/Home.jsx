import React, { useEffect, useRef, useState } from 'react';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { Link } from 'react-router-dom';
import LogOut from '../pages/LogOut/Logout';
import ComparisonTable from './ComparisonTable';
import InstagramIcon from '/instagram-logo-instagram-icon-transparent-free-png 1.svg';
import LinkedInIcon from '/linkedin-logo-linkedin-icon-transparent-free-png 1.svg';
import SynergyIcon from '/LogoSynergy.jpeg';
import YoutubeIcon from '/youtube-icon-512x511-vupixj7v-removebg-preview 1.svg';
const Home = () => {

  

  const [menuOpen,setMenuOpen] = useState(false)

  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  
  


  
  const [position, setPosition] = useState(0);

  useEffect(() => {
   
    const scrollImages = () => {
      setPosition((prevPosition) => {
        // Check if the last image is fully off-screen
        if (prevPosition <= -(Images.length) * 100) {
          // When the last image is out of view, reset to top immediately
          return 0;
        }
        // Scroll the images upwards by a small amount to create slow movement
        return prevPosition - 0.5; 
      });
    };

    const interval = setInterval(scrollImages, 30); // Adjust time interval to control speed
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);


  const Images = [
    {src:'/features/12thCourses1.png'},
    {src:'/features/coursespage11.png'},
    {src:'/features/pdfviewer.png'},
    {src:'/features/SampleVideos.png'},
    {src:'/features/Sessions.png'},

  ]
 




  

  const imageListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    animation: 'scrollImages 120s linear infinite',  // 10s for the animation duration, adjust to control speed
  };

 

  const animationStyle = `
  @keyframes scrollImages {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }`;


  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/faculty/AbhinavSir.jpg",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
  ];


  const goToNext = () => {

      setCurrentIndex((prevIndex) => (prevIndex !== 2) ? (prevIndex + 1) % images.length : 0);
  };

  const goToPrevious = () => {

      setCurrentIndex(
        (prevIndex) =>  (prevIndex!==0) ?  (prevIndex - 1 + images.length) % images.length : 0
      );
    
  };

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const Testimonials = [
    {image:"/testimonials/RuhiShanbag.png",text:"I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers."},
    {image:"/testimonials/RuhiShanbag.png",text:"I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers."},
    {image:"/testimonials/RuhiShanbag.png",text:"I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers."},
    {image:"/testimonials/RuhiShanbag.png",text:"I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers."},
    {image:"/testimonials/RuhiShanbag.png",text:"I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers."},
    {image:"/testimonials/RuhiShanbag.png",text:"I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers."},
  
  ];

  const goToNextTestimonial = () => {

      
      setCurrentTestimonial((prevIndex) => (prevIndex!==4) ? (prevIndex + 1) % images.length : 0);
  };

  const goToPreviousTestimonial = () => {

    setCurrentTestimonial(
        (prevIndex) =>  (prevIndex!==0) ?  (prevIndex - 1 + images.length) % images.length : 0
      );
    
  };



  return (

    <div className="bg-[#090707] w-screen min-h-screen lg:min-h-screen flex flex-col items-center overflow-hidden px-4">
    
    <div className="w-full flex flex-row justify-between items-center mt-4">
      <img src={SynergyIcon}  className="ml-0 rounded-full lg:ml-2 lg:mt-2 w-20 h-20 " />

       {/* Desktop Navigation */}
      <div className=" md:flex flex-row gap-10 justify-center items-center mr-5">
      <Link to="/courses" className="text-white text-lg font-semibold" >
            <div className='w-[200px] h-[50px] flex flex-row gap-3 items-center justify-center p-2 rounded-3xl bg-[#1c2e95]'>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-ui-checks-grid w-[20px] h-[20px]" viewBox="0 0 16 16">
              <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z"/>
            </svg>
                <h1 className='text-white text-center font-medium text-xl'>Dashboard</h1>
            </div>
      </Link>

      <div className='flex flex-row gap-2'>
            
            <LogOut className="cursor-pointer "  />
      </div>

      </div>

      


    

    </div>

    <div className='text-center text-white  text-2xl mt-5 md:text-4xl max-w-full md:max-w-4xl font-mono mb-6 md:mb-10 h-[80px] md:h-[100px]'>
          Together We Believe, Together We Achieve
    </div>

    <div className='flex flex-col  w-[1200px] h-[550px] bg-[#110b0b] rounded-2xl'>
      <h1 className='text-white mt-10  font-bold text-2xl text-center'>Meet Our Mentors from IIT'S and NIT'S</h1>
      
        <div className='flex flex-row w-[1187px] h-10 justify-between'>
          <button
              onClick={goToPrevious}
              className=" bg-black text-white p-2 ml-5 self-start rounded-full w-10 h-10 "
            >
              &#60;
          </button>
          <button
              onClick={goToNext}
              className=" bg-black text-white p-2 self-end rounded-full w-10 h-10 "
            >
              &#62;
          </button>
        </div>

        <div className='flex flex-row gap-5 w-[1087px]  ml-10 self-start overflow-hidden'>
            
          
          <div
            className="flex  transition-transform duration-500  mt-5"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                className="w-[300px] mt-10 h-[300px] rounded-2xl mx-5"
                alt={`Faculty ${index}`}
              />
            ))}
          </div>

          
          </div>
    </div>


      <style>
        {animationStyle}
      </style>
      
      <div className='flex flex-row gap-44 w-[1200px] mt-28 h-[500px] rounded-2xl bg-[#120c0c] justify-center items-center'>
        <div className='flex flex-col gap-10'>
          <h1 className='text-[#f03232] font-semibold text-2xl  text-left'>Features</h1>
          <div className='flex flex-col gap-4'>
            <span className='text-white font-medium  text-sm text-left'>Curated Lectures and Notes</span>
            <span className='text-white font-medium text-sm text-left'>In-Depth Explanation in the Articles</span>
            <span className='text-white font-medium text-sm text-left'>Session Videos Bi-Weekly</span>
            <span className='text-white font-medium text-sm text-left'>Mentoring Sessions</span>
            <span className='text-white font-medium text-sm text-left'>11th and 12th Dedicated Live Classes</span>
            <span className='text-white font-medium text-sm text-left'>Doubt Support</span>
            <span className='text-white font-medium text-sm text-left'>Discord Community</span>
          </div>
        </div>

        <div className='flex flex-col w-[600px] h-[400px]  '>
            <div className=' mt-2 overflow-hidden relative justify-center'>
                <div  style={imageListStyle}>
                  {Images.concat(Images).map((image, index) => ( // Duplicate the images for the continuous loop
                    <img key={index} src={image.src} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                  ))}
                </div>

                
            </div>
        </div>
      </div>

    <h1 className='text-white font-bold text-2xl text-center mt-32'>Student Reviews and Testimonials</h1>
    <div className='flex flex-row w-[1400px] justify-between'>
      <button
          onClick={goToPreviousTestimonial}
          className=" bg-black text-white p-2 self-start rounded-full w-10 h-10 "
        >
          &#60;
      </button>
      <button
          onClick={goToNextTestimonial}
          className=" bg-black text-white p-2 self-end rounded-full w-10 h-10 "
        >
          &#62;
      </button>
    </div>
    <div className='flex flex-row mt-10 gap-10 w-[1400px] h-[290px] overflow-hidden'>
      
      {Testimonials.map((testimonial, index) => (

      <div className='bg-[#12161b]   flex flex-col gap-5 rounded-2xl transition-transform duration-500   ' style={{
        transform: `translateX(-${currentTestimonial * 100}%)`,
      }}>
        <div className='flex flex-row w-[440px]  gap-16'>

          <img src={testimonial.image} className='w-[70px] h-[70px] mt-5 ml-5 rounded-full' />
          <div className='flex flex-col mt-5 gap-2'>
              <h1 className='text-[#d54521] font-bold text-2xl'>Ruhi Shanbag</h1>
              <h1 className='text-[#ffffff] font-medium text-lg'>4 Year Course Student</h1>
          </div>
        </div>

        <div className='flex flex-col ml-5  gap-6'>
          
          <p className='text-white text-base font-medium mr-2 justify-center'>
            {testimonial.text}
          </p>
        </div>
      </div>
      ))}

      
    </div>


    <div className='flex flex-col mt-32 gap-5'>
      <h1 className='text-white font-bold text-2xl text-center'>What Makes Us Different from Others ?</h1>
        
      <ComparisonTable/>
    </div>



    



    <footer className="bg-[#060202] mt-20 w-screen   justify-start items-start transition-all duration-700 ease-in-out animate-fade-in-slide-up h-auto lg:h-[480px] flex flex-col lg:flex-row gap-5 lg:gap-[50px] p-5  overflow-hidden">
      <div className="flex flex-col gap-3 mt-0 w-screen items-center justify-center lg:w-[300px]">
        <img src={SynergyIcon} alt="Logo" width={70} height={70} className="self-center rounded-full mt-2 " />
        <div className=" text-sm md:text-md mr-6 lg:mr-0  sm:w-32 font-instrument text-center font-semibold text-[#9A9494] ">
          Best Place to Master Physics Chemistry and Mathematics.
        </div>

        
      </div>

      


      
          <div className="flex flex-col gap-[15px] w-full lg:w-[300px] ">
            <h1 className="text-[#0B02FF] text-lg font-semibold md:text-xl mt-[10px] lg:mt-[30px]">Quick Links</h1>
            <div className="flex flex-col gap-[20px]">
              <Link to="/about" className="text-white text-base font md:text-lg cursor-pointer">Company</Link>
              <Link to="/about" className="text-white text-base font md:text-lg cursor-pointer">About</Link>
              <Link to="/Contact" className="text-white text-base md:text-lg cursor-pointer">Contact</Link>
              <Link to="/PrivacyPolicy" className="text-white text-base md:text-lg cursor-pointer">Privacy Policy</Link>
              <Link to="/Tnc" className="text-white text-base md:text-lg cursor-pointer">Terms And Conditions</Link>
              <Link to="/notes" className="text-white text-base md:text-lg cursor-pointer">Notes</Link>
          
            </div>
          </div>

          <div className="flex flex-col gap-[30px] w-full lg:w-[200px]">
            <h1 className="text-[#0B02FF] text-lg font-semibold md:text-xl mt-[10px] lg:mt-[30px]">Navigate To</h1>
            <div className="flex flex-col gap-[20px]">
              <Link to="/CSCluster" className="text-white text-base md:text-lg cursor-pointer">Activities</Link>
              <Link to="/ECCluster" className="text-white text-base md:text-lg cursor-pointer">Mentorship Programs</Link>
              <Link to="/ECCluster" className="text-white text-base md:text-lg cursor-pointer">Sessions</Link>

            </div>
          </div>

          <div className="flex flex-col gap-[15px] w-full lg:w-[200px] items-start">
            <h1 className="text-[#0B02FF] text-lg font-semibold md:text-xl mt-[10px] lg:mt-[30px]">
              Follow Us On
            </h1>
            <div className="flex flex-row items-center gap-3">
              <img src={InstagramIcon} className="w-10 h-10 md:w-12 md:h-14 object-contain" />
              <img src={LinkedInIcon} className="w-10 h-10 md:w-12 md:h-14 object-contain" />
              <img src={YoutubeIcon} className="w-10 h-10 md:w-12 md:h-14 object-contain" />
            </div>
          </div>




          <div className="flex flex-row items-center gap-2  lg:mt-8">
            <i className="bi bi-c-circle text-white text-base md:text-lg"></i>
            <h1 className="text-white  text-sm md:text-lg leading-none">
              2025 by <span className="text-[#0B02FF] font-semibold">Synergy Learning</span>
            </h1>
          </div>



        </footer>

    </div>

   

  
  
  
  );
};

export default Home;
