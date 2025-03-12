

import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import _ from 'lodash';
import React, { useEffect, useRef, useState,useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
// import { useSelector } from 'react-redux';
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import homeIcon from '/icons8-home-48.png';
import sessionIcon from '/icons8-video-camera-64.png'
import coursesIcon from '/courses/icons8-online-group-studying-50.png'
import PdfViewer from './PdfViewer';
import { motion } from 'framer-motion';

function Notes() {

  const [CSRelatedPdf,setCSRelatedPdf] = useState([])


  
const [showPdfOnMobile, setShowPdfOnMobile] = useState(false); // State to toggle PDF on mobile
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  
  
  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])

  const [fadeIn, setFadeIn] = useState(!isMobile); // Disable fadeIn for mobile

  const SubjectNumber = sessionStorage.getItem("SubjectNumber")
  const Sem = sessionStorage.getItem("Sem")




  useEffect(() => {
    console.log("Updated in NotesPage:", SubjectNumber, Sem); // ✅ This will now show the updated values
}, [SubjectNumber, Sem]);




  
const [isPdfVisible, setIsPdfVisible] = useState(false);
const [currentPdfLink, setCurrentPdfLink] = useState("");



  
  useEffect(() => {



    console.log("Fetching data..."+SubjectNumber+" "+Sem);
    setCSRelatedPdf([]);
    setSelectedSubjectNumber([]);
  
    var myData = { SubjectNumber, Sem };
  
    axios.post("http://localhost:5000/api/notes/getSelectedModules", myData)
    .then(response => {
      if (response && response.data) {  
        const receivedData = response.data;  // ✅ Define 'receivedData' correctly
        console.log("✅ Raw response data:", receivedData);


        setCSRelatedPdf([receivedData]);  // ✅ Set state properly
        setSelectedSubjectNumber([receivedData])
        setCurrentPdfLink(receivedData.Modules[0].PdfLink[0])
        setFadeIn(true);
      }
      else
        console.log("Error fetching data")
      
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  
  },[])



    const [home,setHome] = useState(false);
    const [session,setSession] = useState(false);
    const [courses,setCourses] = useState(false);
    const [notes,setNotes] = useState(true);



    const TurnOnHome = () =>{

        setHome(true);
        setSession(false);
        setCourses(false)
        setNotes(false)
    }

    const TurnOnSession = () =>{

        setHome(false);
        setSession(true);
        setCourses(false)
        setNotes(false)

    }

    const TurnOnCourses = () =>{

      setHome(false);
      setSession(false);
      setCourses(true)
      setNotes(false)

    }

    const TurnOnNotes = () =>{

      setHome(false);
      setSession(false);
      setCourses(false)
      setNotes(true)

    }



  
const handleToggle = (subjectNumber) => {




  setSelectedSubjectNumber((prev) => {
    const existingSubject = prev.find(sub => sub.SubjectNumber === subjectNumber);
    
    if (existingSubject) {
      return prev.map(sub =>
        sub.SubjectNumber === subjectNumber
          ? { ...sub, State: existingSubject.State === 0 ? 1 : 0 } 
          : sub
      );
    } else {
      return [...prev, { SubjectNumber: subjectNumber, State: 1 }];
    }
  });
  

};





// Handle PDF click to open it
const handlePdfClick = (pdfLink) => {
 
  toast.success("PDF Viewing .....")
  setCurrentPdfLink(pdfLink);
  setIsPdfVisible(true);
  


};

useEffect(() => {
  setTimeout(() => {
    setFadeIn(true);
  }, 100); // Small delay to trigger animation after mounting
}, []);

  // Detect screen size and update states dynamically
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setFadeIn(!mobileView); // Disable fade-in on mobile, enable on desktop
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    
<div className="w-screen h-screen bg-[#090707] ">
  <motion.div
      initial={{ x: -808, opacity: 0.9 }} // Start slightly off-screen left
      animate={fadeIn ? { x: 0, opacity: 1 } : { x: -908, opacity: 0.9 }} // Animate based on fadeIn state
      transition={{ duration: .5, ease: "easeInOut" }} // Smooth transition
      className="bg-black min-h-screen w-full flex flex-row md:flex-row   border-r border-[#645D5D] "
    >


        <div className='flex min-h-screen w-full flex-row gap-5' >

            <div className="bg-[#0F0C0C] self-start fixed  flex flex-col gap-14 border-r border-[#645D5D] w-[60px]  min-h-screen">
            
                                            <img src={SynergyIcon}  className='mt-16 bg-black w-[58px] h-[54px]  rounded-lg ' />
            
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
            
                                                <Link to='/notes' onClick={TurnOnNotes} className={`w-[58px] h-[54px]  hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${notes ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                                    <div className='flex flex-col justify-center items-center gap-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-journal-text lg:w-7 lg:h-7 mt-1 w-5 h-5 text-white" viewBox="0 0 16 16">
                                                            <path fillRule='evenodd' d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                                            <path fillRule='evenodd' d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                                            <path fillRule='evenodd' d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                                        </svg>
                                                        <h1 className='text-white text-sm '>Notes</h1>
                                                    </div>
            
                                                </Link>
                                            </div>
                        </div>

            {/* PDF Viewer Section */}
            <div 
              className={`w-full min-h-screen ml-20 md:w-3/4 bg-[#030109] mt-5  border-2 border-custom-dark rounded-md shadow-lg p-4 overflow-auto 
                ${isMobile && !showPdfOnMobile ? 'hidden' : 'block'}`}
            >
              {/* Back to Notes Button on Mobile */}
              {isMobile && showPdfOnMobile && (
                <button 
                  className="md:hidden mb-4 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowPdfOnMobile(false)}
                >
                  Back to Notes
                </button>
              )}

              {currentPdfLink ? (
                // <div onClick={()=>window.location.reload()} className="relative w-full h-[80vh] sm:h-[90vh] md:h-screen">
                // <iframe
                //   src={`${currentPdfLink}#toolbar=0&view=FitH#zoom=150`}
                //   className="w-full h-full border-none pointer-events-auto"
                //   title="PDF Viewer"
                //   loading="lazy"
                // /></div>
                <PdfViewer pdfUrl={currentPdfLink}/>
              ) : (
                <div className="text-center text-gray-500">Select a PDF to view</div>
              )}
            </div>

            {/* Notes Section (Always Visible on Desktop, Toggles on Mobile) */}
            <div className={`flex flex-col lg:ml-0 ml-20 w-full md:w-1/3 transition-all duration-700 ease-in-out ${isMobile && showPdfOnMobile ? 'hidden' : 'block'}`}>
              <div className="text-white text-3xl text-center">Notes</div>

              {CSRelatedPdf.length > 0 && (
                <div className={`mt-4 self-center  mr-2 transition-all duration-700 ease-in-out animate-fade-in-slide-up ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>

                  {/* Contents Header */}
                  <div className="flex flex-col gap-4 border-2 bg-[#101553] border-custom-dark rounded-md shadow-lg p-4 max-w-xs mx-auto">
                    <div className="flex flex-row justify-between font-semibold">
                      <div className="flex-1 text-white text-center">Contents</div>
                    </div>
                  </div>

                  {/* Subject List */}
                  {CSRelatedPdf.map((pdf) => (
                    <div key={pdf.SubjectNumber}>
                      {pdf.Modules.length ? (
                        <div key={pdf.SubjectNumber} className="transition-all duration-700 ease-in-out transform bg-black">
                          
                          {/* Subject Title */}
                          <div className="flex flex-col gap-2 bg-black border-2 border-custom-dark rounded-lg shadow-lg p-4 mx-auto w-full max-w-xs">
                            <div 
                              onClick={() => handleToggle(pdf.SubjectNumber)} 
                              className="flex cursor-pointer flex-row justify-between items-center w-full bg-black"
                            >
                              <div className="text-white text-center flex-1 break-words overflow-hidden whitespace-normal max-w-[180px]" style={{ minHeight: '3rem' }}>
                                {pdf.SubjectName}
                              </div>
                              <div className="flex flex-col items-center flex-none">
                                <i className={`text-2xl text-white cursor-pointer ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'bi bi-arrow-up-circle-fill' : 'bi bi-arrow-down-circle-fill'}`}></i>
                              </div>
                            </div>

                            {/* Modules */}
                            {SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber) && (
                              <div className={`flex flex-col gap-5 mt-2 overflow-auto transition-all duration-700 ease-in-out bg-black ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {pdf.Modules.map((module) => (
                                  <div key={module.ModuleNum} className="flex flex-col gap-2 bg-black border-2 border-custom-dark rounded-2xl shadow-lg p-2 w-full mx-auto">
                                    <div className="text-white text-center text-sm">{module.ModuleName}</div>

                                    <div className="flex justify-center gap-2">
                                      {module.PdfLink.map((pdfLink, index) => (
                                        <div key={index} className="relative">
                                          <a 
                                            href="#" 
                                            onClick={(e) => { 
                                              e.preventDefault(); 
                                              handlePdfClick(pdfLink); 
                                              if (isMobile) setShowPdfOnMobile(true); // Hide subjects only on mobile
                                            }} 
                                            className="text-black cursor-pointer"
                                          >
                                            <i className="bi bi-file-earmark-pdf-fill text-white text-2xl"></i>
                                          </a>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>

      <Toaster />
      </motion.div>
   </div>
  )
}

export default Notes
