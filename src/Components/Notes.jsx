

import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import _ from 'lodash';
import React, { useEffect, useRef, useState,useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';



function Notes() {
  
  const [CSRelatedPdf,setCSRelatedPdf] = useState([])
  const [Sem1,setSem1] = useState(0)
  const [Sem2,setSem2] = useState(0)

  
  
  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])



  useEffect(() => {
    console.log("Fetching data...");
  
    setCSRelatedPdf([]);
    setSelectedSubjectNumber([]);
  
    axios.get("http://localhost:5000/api/Notes/GetAllModules")
      .then(response => {
        const data = response.data;
  
        setCSRelatedPdf(data);
        console.log(data);
  
        if (data.length > 0) {
          setSelectedSubjectNumber(data.map(item => ({ SubjectNumber: item.SubjectNumber, State: 0 })));
  
          window.scrollTo({
            top: 300,
            left: 0,
            behavior: 'smooth'
          });
        } else {
          setErrVal(true);
          setTimeout(() => {
            setErrVal(false);
          }, 1000);
  
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
  
        setTimeout(() => {
          if (data.length === 0) {
            setCSRelatedPdf([]);
            setShowSubjectsClicked(false);
          }
        }, 1000);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setErrVal(true);
        setTimeout(() => setErrVal(false), 1000);
      });
  
  }, []);
  


  





  
const handleToggle = (subjectNumber) => {



  // setSelectedSubjectNumber((prev) => {
  //   // Check if the subject is already in the array
  //   const existingSubject = prev.find(sub => sub.SubjectNumber === subjectNumber);
    
  //   if (existingSubject) {
  //     // If it exists, toggle its state
  //     return prev.map(sub =>
  //       sub.SubjectNumber === subjectNumber
  //         ? { ...sub, State: existingSubject.State === 0 ? 1 : 0 } // Toggle between 0 and 1
  //         : sub
  //     );
  //   } else {
  //     // If it doesn't exist, add it with state 1 (expanded)
  //     return [...prev, { SubjectNumber: subjectNumber, State: 1 }];
  //   }
  // });

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



const [fadeIn,setFadeIn] = useState(false)

const [isPdfVisible, setIsPdfVisible] = useState(false);
const [currentPdfLink, setCurrentPdfLink] = useState("");

// Handle PDF click to open it
const handlePdfClick = (pdfLink) => {
 
  toast.success("PDF Viewing .....")
  setCurrentPdfLink(pdfLink);
  setIsPdfVisible(true);
  


};

// Handle closing the PDF viewer
const handleClosePdf = () => {

  toast.success("PDF Closed")
  setIsPdfVisible(false);
  setCurrentPdfLink("");

  
};



useEffect(() => {
  setTimeout(() => {
    setFadeIn(true);
  }, 100); // Small delay to trigger animation after mounting
}, []);


  return (

    <div className='bg-black min-h-screen gap-[20px] flex flex-row   '>

    <div className="hidden md:block w-full mt-20  bg-white border-2 border-custom-dark rounded-md shadow-lg p-4 h-[90vh] overflow-auto">
          {currentPdfLink ? (
          <iframe
          src={`${currentPdfLink}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full"
          style={{ border: "none", overflow: "hidden" }}
          title="PDF Viewer"
        ></iframe>
        
         
          ) : (
            <div className="text-center text-gray-500">Select a PDF to view</div>
          )}
        </div>
    
    
    <div className='flex flex-col transition-all    duration-700 ease-in-out animate-fade-in-slide-up '>
        <div className='text-white text-3xl mt-6 flex justify-center'>
          <span className='text-center'>Notes</span>
        </div>
    
        
    
        {CSRelatedPdf.length ? (
      <div className={`mt-4 transition-all self-end mr-2 duration-700 ease-in-out animate-fade-in-slide-up ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="flex flex-col gap-4 border-2 bg-[#20C030] border-custom-dark rounded-md shadow-lg p-4 justify-between w-full max-w-xs mx-auto">
          <div className="flex flex-row justify-between font-semibold">
            <div className="flex-1 text-white text-center">Contents</div>
          </div>
        </div>
    
        <div className="flex flex-row gap-2 bg-black border-2 border-custom-dark mt-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-xs">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-white text-center flex-1 text-sm">Subject Name</div>
            <div className="flex flex-col items-center flex-none">
              <span className="text-white text-xs mt-1">Expand/Reduce</span>
            </div>
          </div>
        </div>
        
        {CSRelatedPdf.map((pdf, key) => (
          <div key={pdf.SubjectNumber}>
            {pdf.Modules.length ? (
              <div key={pdf.SubjectNumber} className="transition-all duration-700 ease-in-out transform bg-black">
                <div className="flex flex-col gap-2 bg-black border-2 border-custom-dark rounded-lg shadow-lg p-4 mx-auto w-full max-w-xs">
                  <div onClick={() => handleToggle(pdf.SubjectNumber)} className="flex cursor-pointer flex-row justify-between items-center w-full bg-black">
                    <div className="text-white text-center flex-1 break-words overflow-hidden whitespace-normal max-w-[180px]" style={{ minHeight: '3rem' }}>
                      {pdf.SubjectName}
                    </div>
                    <div className="flex flex-col items-center flex-none">
                      <i className={`text-2xl text-white cursor-pointer ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'bi bi-arrow-up-circle-fill' : 'bi bi-arrow-down-circle-fill'}`}></i>
                    </div>
                  </div>
    
                  {SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber) && (
                    <div className={`flex flex-col gap-5 mt-2 overflow-auto transition-all duration-700 ease-in-out bg-black ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {pdf.Modules.map((module) => (
                        <div key={module.ModuleNum} className="flex flex-col gap-2 bg-black border-2 border-custom-dark rounded-2xl shadow-lg p-2 w-full mx-auto">
                          <div className="text-white text-center md:text-left text-sm">{module.ModuleName}</div>
    
                          <div className="flex justify-center gap-2">
                            {module.PdfLink.map((pdfLink, index) => (
                              <div key={index} className="relative">
                                (
                                    <a href="#" onClick={(e) => { e.preventDefault(); handlePdfClick(pdfLink); }} className="text-black cursor-pointer">
                                      <i className="bi bi-file-earmark-pdf-fill text-white text-2xl"></i>
                                    </a>
                                  )
                              
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
    ) : null}
    
    </div>
    
    
          <div className='mb-[50px]'></div>
          <Toaster/>
        </div>
   
  )
}

export default Notes

// <div className='bg-black min-h-screen gap-[20px] flex flex-row   '>

// <div className="hidden md:block w-2/5 bg-white border-2 border-custom-dark rounded-md shadow-lg p-4 h-[80vh] overflow-auto">
//       {currentPdfLink ? (
//         <iframe
//           src={currentPdfLink}
//           className="w-full h-full"
//           style={{ border: "none", overflow: "auto" }}
//           title="PDF Viewer"
//         ></iframe>
//       ) : (
//         <div className="text-center text-gray-500">Select a PDF to view</div>
//       )}
//     </div>


// <div className='flex flex-col transition-all     duration-700 ease-in-out animate-fade-in-slide-up '>
//     <div className='text-white text-3xl mt-6 flex justify-center'>
//       <span className='text-center'>Notes</span>
//     </div>

    

//     {CSRelatedPdf.length ? (
//   <div className={`mt-4 transition-all self-end mr-2 duration-700 ease-in-out animate-fade-in-slide-up ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
//     <div className="flex flex-col gap-4 border-2 bg-[#20C030] border-custom-dark rounded-md shadow-lg p-4 justify-between w-full max-w-xs mx-auto">
//       <div className="flex flex-row justify-between font-semibold">
//         <div className="flex-1 text-white text-center">Contents</div>
//       </div>
//     </div>

//     <div className="flex flex-row gap-2 bg-black border-2 border-custom-dark mt-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-xs">
//       <div className="flex flex-row justify-between items-center w-full">
//         <div className="text-white text-center flex-1 text-sm">Subject Name</div>
//         <div className="flex flex-col items-center flex-none">
//           <span className="text-white text-xs mt-1">Expand/Reduce</span>
//         </div>
//       </div>
//     </div>
    
//     {CSRelatedPdf.map((pdf, key) => (
//       <div key={pdf.SubjectNumber}>
//         {pdf.Modules.length ? (
//           <div key={pdf.SubjectNumber} className="transition-all duration-700 ease-in-out transform bg-black">
//             <div className="flex flex-col gap-2 bg-black border-2 border-custom-dark rounded-lg shadow-lg p-4 mx-auto w-full max-w-xs">
//               <div onClick={() => handleToggle(pdf.SubjectNumber)} className="flex cursor-pointer flex-row justify-between items-center w-full bg-black">
//                 <div className="text-white text-center flex-1 break-words overflow-hidden whitespace-normal max-w-[180px]" style={{ minHeight: '3rem' }}>
//                   {pdf.SubjectName}
//                 </div>
//                 <div className="flex flex-col items-center flex-none">
//                   <i className={`text-2xl text-white cursor-pointer ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'bi bi-arrow-up-circle-fill' : 'bi bi-arrow-down-circle-fill'}`}></i>
//                 </div>
//               </div>

//               {SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber) && (
//                 <div className={`flex flex-col gap-5 mt-2 overflow-auto transition-all duration-700 ease-in-out bg-black ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
//                   {pdf.Modules.map((module) => (
//                     <div key={module.ModuleNum} className="flex flex-col gap-2 bg-black border-2 border-custom-dark rounded-2xl shadow-lg p-2 w-full mx-auto">
//                       <div className="text-white text-center md:text-left text-sm">{module.ModuleName}</div>

//                       <div className="flex justify-center gap-2">
//                         {module.PdfLink.map((pdfLink, index) => (
//                           <div key={index} className="relative">
//                             {pdfLink !== "" ? (
//                               isPdfVisible && currentPdfLink === pdfLink ? (
//                                 <div className="fixed inset-0 bg-opacity-80 z-50 flex justify-center items-center">
//                                   <div className="z-50 w-[90vw] h-[80vh] relative overflow-auto bg-white">
//                                     <button onClick={handleClosePdf} className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center">
//                                       <i className="bi bi-x-lg text-lg"></i>
//                                     </button>
//                                     <iframe src={`${pdfLink}`} className="w-full h-full border-none"></iframe>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <a href="#" onClick={(e) => { e.preventDefault(); handlePdfClick(pdfLink); }} className="text-black cursor-pointer">
//                                   <i className="bi bi-file-earmark-pdf-fill text-white text-2xl"></i>
//                                 </a>
//                               )
//                             ) : null}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : null}
//       </div>
//     ))}
//   </div>
// ) : null}

// </div>


//       <div className='mb-[50px]'></div>
//       <Toaster/>
//     </div>