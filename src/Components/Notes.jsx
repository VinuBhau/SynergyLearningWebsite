

import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import _, { dropRight } from 'lodash';
import React, { useEffect, useRef, useState,useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
// import { useSelector } from 'react-redux';
import SynergyIcon from '/LogoSynergy.jpeg';
import homeIcon from '/icons8-home-48.png';
import sessionIcon from '/icons8-video-camera-64.png'
import coursesIcon from '/courses/icons8-online-group-studying-50.png'
import PdfViewer from './PdfViewer';
import { motion } from 'framer-motion';
import { s } from 'framer-motion/client';

function Notes() {

  const [CSRelatedPdf,setCSRelatedPdf] = useState([])

  const [currentPdfLink, setCurrentPdfLink] = useState(''); // State to hold the current PDF link
  

  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])

  const [fadeIn, setFadeIn] = useState(false); // Disable fadeIn for mobile

  const SubjectNumber = sessionStorage.getItem("SubjectNumber")
  const Sem = sessionStorage.getItem("Sem")


  const [dropdown,setdropdown] = useState(false)

  useEffect(() => {
    console.log("Updated in NotesPage:", SubjectNumber, Sem); // ✅ This will now show the updated values
    setTimeout(()=>{

        setdropdown(true)
    },1000)
    setdropdown(false)
  }, [SubjectNumber, Sem]);




  
  
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






useEffect(() => {
  setTimeout(() => {
    setFadeIn(true);
  }, 100); // Small delay to trigger animation after mounting
}, []);

  // Detect screen size and update states dynamically
 

  const handleDropdown = ()=>{

      setdropdown(!dropdown)
  }


  const handlePdfClick = (pdfLink) => {
    setCurrentPdfLink(pdfLink);
  }

    return (
      <div className="w-screen h-screen bg-[#090707] overflow-auto">
        <motion.div
          initial={{ x: -2008, opacity: 0.9 }}
          animate={fadeIn ? { x: 0, opacity: 1 } : { x: 0, opacity: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bg-black min-h-screen w-full flex flex-col md:flex-row border-r border-[#645D5D]"
        >
          <div className="flex z-10 min-h-screen w-full flex-col md:flex-row gap-5">
            {/* Sidebar */}
            <div className="bg-[#0F0C0C] fixed z-10 top-0 left-0 flex flex-col items-center gap-14 border-r border-[#645D5D] w-[60px] min-h-screen overflow-y-auto">
              <Link to='/'>
                <img src={SynergyIcon} className='mt-16 bg-black w-[58px] h-[54px] rounded-full' />
              </Link>
              <div className='flex flex-col gap-10'>
                <Link to='/' onClick={TurnOnHome} className={`w-[58px] h-14 hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${home ? 'bg-black border-l-2 border-orange-500' : ''}`}>
                  <div className='flex flex-col justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house-door mt-1 lg:w-7 lg:h-7 w-5 h-5 text-white" viewBox="0 0 16 16">
                      <path fillRule='evenodd' d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                    </svg>
                    <h1 className='text-white text-sm'>Home</h1>
                  </div>
                </Link>
                <Link to='/sessions' onClick={TurnOnSession} className={`w-[58px] h-[54px] hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${session ? 'bg-black border-l-2 border-orange-500' : ''}`}>
                  <div className='flex flex-col self-start justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-camera-video mt-1 lg:w-7 lg:h-7 w-5 h-5 text-white" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                    </svg>
                    <h1 className='text-white text-sm'>Sessions</h1>
                  </div>
                </Link>
                <Link to='/courses' onClick={TurnOnCourses} className={`w-[58px] h-[54px] hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${courses ? 'bg-black border-l-2 border-orange-500' : ''}`}>
                  <div className='flex flex-col justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-mortarboard lg:w-7 lg:h-7 mt-1 w-5 h-5 text-white" viewBox="0 0 16 16">
                      <path fillRule='evenodd' d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                      <path fillRule='evenodd' d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                    </svg>
                    <h1 className='text-white text-sm'>Courses</h1>
                  </div>
                </Link>
                <Link to='/notes' onClick={TurnOnNotes} className={`w-[58px] h-[58px] hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${notes ? 'bg-black border-l-2 border-orange-500' : ''}`}>
                  <div className='flex flex-col justify-center items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-journal-text lg:w-7 lg:h-7 mt-1 w-5 h-5 text-white" viewBox="0 0 16 16">
                      <path fillRule='evenodd' d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                      <path fillRule='evenodd' d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                      <path fillRule='evenodd' d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                    </svg>
                    <h1 className='text-white text-sm'>Notes</h1>
                  </div>
                </Link>
              </div>
            </div>

            {/* Content */}
<div className="flex flex-col  ml-20 gap-10 lg:ml-[270px] px-4">
  <div className="flex flex-col  lg:ml-20 flex-1 mt-[80px] md:mt-[20px] md:ml-[80px]  px-2 overflow-auto">
    {CSRelatedPdf.length > 0 && (
      <div className={`transition-all duration-700 ease-in-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        {CSRelatedPdf.map((pdf) =>
          pdf.Modules.length ? (
            <div key={pdf.SubjectNumber} className="my-4">
              <div className="flex flex-col gap-2 w-full max-w-[800px] bg-[#110d0d] border-2 border-[#e65036] rounded-lg shadow-lg p-4 mx-auto">
                <div onClick={() => handleToggle(pdf.SubjectNumber)} className="flex cursor-pointer justify-between items-center w-full">
                  <div className={`text-center flex-1 break-words overflow-hidden whitespace-normal ${dropdown ? 'text-[#e65036] font-bold' : 'text-white'}`}>
                    {pdf.SubjectName}
                  </div>
                  <div className="flex flex-col items-center flex-none">
                    {dropdown ? (
                      <svg onClick={handleDropdown} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chevron-up text-[#e65036]  w-[22px] h-[22px]" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                      </svg>
                    ) : (
                      <svg onClick={handleDropdown} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chevron-down text-[#e65036] w-[22px] h-[22px]" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="w-full overflow-x-auto mt-5">
                  <div className={`min-w-[500px] sm:min-w-[680px] transition-all duration-700 ease-in-out bg-black ${dropdown ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <table className="table-auto w-full text-white text-xs sm:text-sm md:text-base">
                      <thead>
                        <tr className="border-2 border-[#161313]">
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">SNo.</th>
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">Module Name</th>
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">Notes</th>
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">Mark</th>
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pdf.Modules.map((module, index) => (
                          <tr key={module.ModuleNum} className="border-2 border-[#161313]">
                            <td className="px-2 sm:px-4 py-2 border-2 border-[#161313] text-center">{index + 1}</td>
                            <td className="px-2 sm:px-4 py-2 border-2 border-[#161313] text-center">{module.ModuleName}</td>
                            <td className="px-2 sm:px-4 py-2 border-2 border-[#161313] text-center">
                              <div className="flex flex-wrap justify-center gap-1">
                                {module.PdfLink.map((pdf, index) => (
                                  <svg
                                    key={index}
                                    onClick={() => handlePdfClick(pdf)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi bi-journal-bookmark cursor-pointer w-[20px] h-[20px]"
                                    viewBox="0 0 16 16"
                                  >
                                    <path fillRule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8" />
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                                  </svg>
                                ))}
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 py-2 border-2 border-[#161313] text-center">
                              <input type="checkbox" className="w-4 h-4 rounded bg-[#161313]" />
                            </td>
                            <td className="px-2 sm:px-4 py-2 text-center">
                              <i className="bi bi-pencil-fill text-white text-lg sm:text-xl cursor-pointer" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    )}
  </div>

  {currentPdfLink ? (
    <div className="w-full flex justify-center items-center">
      <div className="w-[380px] lg:w-full max-w-[900px] h-[850px] bg-[#292626] rounded-lg flex justify-center items-center mx-4 md:mx-10">
        
          <PdfViewer pdfUrl={currentPdfLink} />
        
      </div>
    </div>
  ) : null}

  <div className="mb-[200px]" />
</div>


            
          </div>
          <Toaster />
        </motion.div>
      </div>
    );
  };

export default Notes


/*

// <div className='flex flex-col gap-3'>
//               <div className={`flex flex-row gap-5 ml-20 mt-10 self-center  `}>
//                   <button
//                     className=" mb-4 bg-red-500 w-[200px] md:w-[120px] md:text-sm h-[50px] text-white px-4 py-2 rounded"
//                     onClick={() => setPreviewMode(true)}
//                   >
//                     Preview Mode
//                   </button>

//                   <button
//                     className=" mb-4 bg-red-500 w-[200px] md:w-[120px] md:text-sm h-[50px]  text-white px-4 py-2 rounded"
//                     onClick={() => setPreviewMode(false)}
//                   >
//                     Normal Mode
//                   </button>
//             </div>

//            
//             <div
//               className={` z-50 lg:ml-24 self-center w-[1400px]   md:w-3/4 bg-[#1d1919] mt-5  border-[#180a0a] border-custom-dark rounded-md shadow-lg p-4 overflow-auto 
//                 ${isMobile && !showPdfOnMobile ? 'hidden' : 'block'} `}
//             >
//               {/* Back to Notes Button on Mobile *
//               {isMobile && showPdfOnMobile && (
//                 <button 
//                   className="md:hidden mb-4 bg-red-500 text-white px-4 py-2 rounded"
//                   onClick={() => setShowPdfOnMobile(false)}
//                 >
//                   Back to Notes
//                 </button>
//               )}


//               {currentPdfLink ? (
                

//                   <PdfViewer pdfUrl={currentPdfLink} PreviewMode={PreviewMode}/>

//               ) : (
//                 <div className="text-center text-gray-500">Select a PDF to view</div>
//               )}
//             </div>

//             <div className='mt-[100px]'></div>
//           </div>

*/