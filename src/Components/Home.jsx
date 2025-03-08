import React, { useEffect, useRef, useState } from 'react';

import LogOut from '../pages/LogOut/Logout'
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import ComparisonTable from './ComparisonTable';
import InstagramIcon from '/instagram-logo-instagram-icon-transparent-free-png 1.svg'
import LinkedInIcon from '/linkedin-logo-linkedin-icon-transparent-free-png 1.svg'
import YoutubeIcon from '/youtube-icon-512x511-vupixj7v-removebg-preview 1.svg'
import { Menu, X } from "lucide-react";
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

  
  

  const fullText = [
    { text: 'Everything you need ', color: 'text-white', fontStyle: 'font-normal' },
    { text: 'at one place ', color: 'text-white', fontStyle: 'font-normal' },
    { text: 'to Master Physics Chemistry ', color: 'text-[#20C030]', fontStyle: 'font-semibold italic' },
    { text: 'and Mathematics.', color: 'text-[#20C030]', fontStyle: 'font-semibold italic' },
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length && subIndex < fullText[index].text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index].text[subIndex]);
        setSubIndex(subIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (subIndex === fullText[index]?.text?.length) {
      if (index < fullText.length - 1) {
        setTimeout(() => {
          setIndex(index + 1);
          setSubIndex(0);
          setDisplayedText('');
        }, 500);
      } else {
        setTimeout(() => {
          setIndex(0);
          setSubIndex(0);
          setDisplayedText('');
        }, 1000);
      }
    }
  }, [index, subIndex, fullText]);

  return (

    <div className="bg-[#090707] w-screen min-h-screen lg:min-h-screen flex flex-col items-center overflow-hidden px-4">
    
    <div className="w-full flex flex-row justify-between items-center mt-4">
      <img src={SynergyIcon} width={150} height={150} className="ml-0" />

       {/* Desktop Navigation */}
       <div className="hidden md:flex flex-row gap-10 justify-center items-center mr-5">
        <Link to="/courses" className="text-white font-medium text-2xl">Courses</Link>
        <LogOut className="cursor-pointer" />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

     
      {/* Mobile Dropdown Menu (Click Outside Close) */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:hidden"
        >
          <Link to="/courses" className="text-white text-lg" onClick={() => setMenuOpen(false)}>Courses</Link>
          <LogOut className="cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>
      )}

    </div>

    <div className='text-center text-white  text-2xl mt-5 md:text-4xl max-w-full md:max-w-4xl font-mono mb-6 md:mb-10 h-[80px] md:h-[100px]'>
          {fullText.slice(0, index + 1).map((item, idx) => (
            <span key={idx} className={`${item.color} ${item.fontStyle}`}>
              {index === idx ? displayedText : item.text}
            </span>
          ))}
    </div>

    <div className='flex flex-col mt-14 gap-5'>
      <h1 className='text-white font-bold text-2xl text-center'>What Makes Us Different from Others ?</h1>
        
      <ComparisonTable/>
    </div>
    
      


    <footer className="bg-[#0f0c0c] mt-20 w-screen  justify-start items-start transition-all duration-700 ease-in-out animate-fade-in-slide-up h-auto lg:h-[480px] flex flex-col lg:flex-row gap-5 lg:gap-[50px] p-5  overflow-hidden">
      <div className="flex flex-col  mt-0 w-screen items-center justify-center lg:w-[300px]">
        <img src={SynergyIcon} alt="Logo" width={117} height={117} className="self-center " />
        <div className=" text-sm md:text-md  sm:w-32 font-instrument text-center font-semibold text-[#9A9494] ">
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




          <div className="flex flex-row items-center gap-2 mt-6">
            <i className="bi bi-c-circle text-white text-base md:text-lg"></i>
            <h1 className="text-white text-sm md:text-lg leading-none">
              2025 by <span className="text-[#0B02FF] font-semibold">Synergy Learning</span>
            </h1>
          </div>



        </footer>

    </div>

   

  
  
  
  );
};

export default Home;
