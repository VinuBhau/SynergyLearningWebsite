

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



    const [home,setHome] = useState(true);
    const [session,setSession] = useState(false);
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


  <div className="bg-black min-h-screen w-full flex flex-row md:flex-row ">
                
    
        <div className='flex min-h-screen w-full flex-row gap-5' >

            <div className="bg-[#0F0C0C] self-start flex flex-col gap-10 border-r border-[#645D5D] w-20 h-full">
            
                                <img src={SynergyIcon} width={60} height={60} className='mt-16 bg-black rounded-lg ' />
                                
                                <div className='flex flex-col gap-4'>
                                    <Link to='/' onClick={TurnOnHome} className={`w-19 h-20 hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${home ? 'bg-black border-l-2 border-orange-500':'' } `}>
                                        <div className='flex flex-col justify-center items-center '>
                                            <img src={homeIcon} width={30}  height={30}  />
                                            <h1 className='text-white'>Home</h1>
                                        </div>
                                    </Link>
                                    <div  onClick={TurnOnSession} className={`w-19 h-20 hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${session ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <img src={sessionIcon} width={30}  height={30}  />
                                            <h1 className='text-white'>Sessions</h1>
                                        </div>
            
                                    </div>

                                    <Link to='/courses' onClick={TurnOnCourses} className={`w-19 h-20 hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${courses ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <img src={coursesIcon} width={30}  height={30}  />
                                            <h1 className='text-white'>Courses</h1>
                                        </div>
            
                                    </Link>
                                </div>
            </div>

            {/* PDF Viewer Section */}
            <div 
              className={`w-full min-h-screen md:w-3/4 bg-[#030109] mt-5  border-2 border-custom-dark rounded-md shadow-lg p-4 overflow-auto 
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
            <div className={`flex flex-col w-full md:w-1/3 transition-all duration-700 ease-in-out ${isMobile && showPdfOnMobile ? 'hidden' : 'block'}`}>
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
    </div>
   
  )
}

export default Notes
