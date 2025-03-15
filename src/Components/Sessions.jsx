import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import SynergyIcon from '/LogoSynergy.jpeg';
const Sessions = () => {


    const [fadeIn, setFadeIn] = useState(false);

    const [currentVideoLink,setCurrentVideoLink] = useState("")
    const [currentDescription,setCurrentDescription] = useState("")
    const [currentTitle,setCurrentTitle] = useState("")

    const [videoLinks,setVideoLinks] = useState([])
    


        const [home,setHome] = useState(false);
        const [session,setSession] = useState(true);
        const [courses,setCourses] = useState(false);

    
    
    
        const TurnOnHome = () =>{
    
            setHome(true);
            setSession(false);
            setCourses(false)
        
    
        }
    
        const TurnOnSession = () =>{
    
            setHome(false);
            setSession(true);
            setCourses(false)
        
    
    
        }
    
        const TurnOnCourses = () =>{
    
            setHome(false);
            setSession(false);
            setCourses(true)
        
    
        }
    
    


    useEffect(() => {

        axios.get("http://localhost:5000/api/sessions")
    .then((res) => {
        console.log("Fetched Videos:", res.data);
        
        if (res.data.length > 0) {
            setVideoLinks(res.data);
            setCurrentVideoLink(res.data[0].link); 
            setCurrentDescription(res.data[0].description);
            setCurrentTitle(res.data[0].title);
        } else {
            console.log("No videos found");
        }
    })
    .catch((err) => {
        console.error("Error fetching videos:", err);
    });


        setTimeout(() => {
            setFadeIn(true);
        }, 500); // Small delay to trigger animation after mounting
    }, []);

  return (



<div className="w-screen h-screen bg-[#090707] ">
  <motion.div
      initial={{ x: -2008, opacity: 0.9 }} // Start slightly off-screen left
      animate={fadeIn ? { x: 0, opacity: 1 } : { x: 0, opacity: 0.9 }} // Animate based on fadeIn state
      transition={{ duration: .5, ease: "easeInOut" }} // Smooth transition
      className="bg-black min-h-screen w-full flex flex-row md:flex-row  justify-center  border-r border-[#645D5D] "
    >



        <div className='flex h-full w-full flex-row ' >

            <div className="bg-[#0F0C0C] self-start fixed  flex flex-col gap-14 border-r border-[#645D5D] w-[60px]  min-h-screen">

                                <img src={SynergyIcon}  className='mt-16 bg-black  w-[58px] h-[54px]  rounded-full ' />

                                <div className='flex flex-col gap-10'>
                                    <Link to='/' onClick={TurnOnHome} className={` w-[58px] h-14  hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${home ? 'bg-black border-l-2 border-orange-500':'' } `}>
                                        <div className='flex flex-col justify-center items-center '>
                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-house-door mt-1 lg:w-7 lg:h-7 w-5 h-5 text-white" viewBox="0 0 16 16">
                                            <path fillRule='evenodd' d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                                        </svg>
                                            <h1 className='text-white text-sm '>Home</h1>
                                        </div>
                                    </Link>

                                    <Link to='/sessions'  onClick={TurnOnSession} className={` w-[58px] h-[54px]    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${session ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                        <div className='flex flex-col self-start justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-camera-video mt-1 lg:w-7 lg:h-7 w-5 h-5 text-white" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
                                        </svg>
                                            <h1 className='text-white text-sm  '>Sessions</h1>
                                        </div>
            
                                    </Link>

                                    <Link to='/courses' onClick={TurnOnCourses} className={` w-[58px] h-[54px]    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${courses ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                        <div className='flex flex-col justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-mortarboard lg:w-7 lg:h-7 mt-1 w-5 h-5 text-white" viewBox="0 0 16 16">
                                            <path fillRule='evenodd' d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                                            <path fillRule='evenodd' d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                                        </svg>
                                            <h1 className='text-white text-sm '>Courses</h1>
                                        </div>

                                    </Link>

                                    
                                </div>
            </div>

            <div className='flex flex-col w-screen  min-h-screen gap-10 border-r border-[#645D5D] '>
                                <div className='flex flex-row gap-5  justify-center items-center'>
                                    <h1 className='text-white text-center ml-10 font-semibold text-2xl mt-5'>Sessions</h1>

                                </div>

                                <div className='border w-full    border-[#645D5D] '>

                                </div>

                                <div className='justify-center lg:ml-20  ml-20 flex flex-col  lg:flex-row  gap-10 items-start  '>
                                
                                        <div className=' flex flex-col gap-5  cursor-pointer lg:w-[1000px] lg:h-[600px] w-[300px] h-[500px] '>
                                                <iframe
                                                    src={currentVideoLink}
                                                    preload='auto'
                                                    className="rounded-lg w-[300px] h-[200px] cursor-pointer lg:w-[1000px] lg:h-[700px] shadow-lg border border-r border-[#645D5D] "
                                                    controlsList="nodownload"
                                                    allow="accelerometer; encrypted-media; gyroscope; "
                                                    allowFullScreen
                                                    onContextMenu={(e) => e.preventDefault()}
                                                />
                                                <p className='text-white text-start font-semibold text-xl'>Title: {currentTitle}</p>
                                                <p className='text-white text-start font-bold text-2xl'>Description: {currentDescription}</p>
                                        </div>


                                        <div className='flex flex-col gap-3 justify-center'>
                                            <h1 className='text-white text-center text-lg font-medium'>Video Lectures</h1>
                                            <div className='justify-center border border-[#645D5D] rounded-xl p-5 flex flex-col gap-10 lg:w-[400px] lg:h-[500px] w-[300px] h-[500px] '>
                                            {/* Inner scrollable container */}

                                            

                                                <div className="overflow-auto flex flex-col gap-10 h-full  ">
                                                    {videoLinks.length > 0 && videoLinks.map((video, index) => (
                                                        <div key={index}  onClick={() => {
                                                            window.scrollTo({
                                                                top: 0,
                                                                left: 0,
                                                                behavior: 'smooth'
                                                            });

                                                            setCurrentVideoLink(video.link);
                                                            setCurrentDescription(video.description);
                                                            setCurrentTitle(video.title);
                                                        }} className="flex flex-col cursor-pointer items-center">
                                                            <iframe
                                                                src={video.link}
                                                                preload='auto'
                                                                
                                                                className="rounded-lg pointer-events-none cursor-pointer lg:w-[350px] lg:h-[200px] w-[250px] h-[150px] shadow-lg border border-[#645D5D]"
                                                                controlsList="nodownload"
                                                                
                                                                
                                                                onContextMenu={(e) => e.preventDefault()}
                                                            />
                                                        </div>
                                                    ))}

                                                    <div className='mb-3'></div>
                                                </div>
                                            </div>
                                        </div>

                                </div>

                                
            </div>
        </div>
    </motion.div>
</div>
  )
}

export default Sessions
