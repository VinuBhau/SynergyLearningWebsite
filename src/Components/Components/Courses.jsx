import React, { useEffect, useState } from 'react'
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import homeIcon from '/icons8-home-48.png';
import sessionIcon from '/icons8-video-camera-64.png'
import coursesIcon from '/courses.png'
import fundamentalsIcon from '/courses/SBSPHY.svg'
import fundamentalsOfPhysics from '/courses/FUNDAMENTALS OF PHYSICS.svg'
import SheetIcon from '/courses/icons8-sheet-50 1.svg'
import fundamentalsOfChemistry from '/courses/FUNDAMENTALS OF CHEMISTRY.svg'
import fundamentalsOfMathematics from '/courses/FUNDAMENTALS OF MATHEMATICS.svg'
import ChemistryIcon from '/courses/ChemistryIcon.png'
import PhysicsIcon from '/courses/physicsIcon.png'
import MathematicsIcon from '/courses/MathematicsIcon.png'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const Courses = () => {


    const [fadeIn,setFadeIn] = useState(false);
    useEffect(() => {
        setFadeIn(true);
    },[])

    const navigate = useNavigate();
    // const dispatch = useDispatch(); // Initialize Redux dispatch

    const [home,setHome] = useState(false);
    const [session,setSession] = useState(false);
    const [courses,setCourses] = useState(true);
    const [notes,setNotes] = useState(false);



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

    const [eleventh,seteleventh] = useState(true);
    const [twelth,settwelth] = useState(false);

    const firstSet = ()=>{
        seteleventh(true);
        settwelth(false);
    }

    const SecondSet = ()=>{
        seteleventh(false);
        settwelth(true);
    }



    // const SubjectNumber = useSelector((state) => state.session.SubjectNumber);
    // const Sem = useSelector((state) => state.session.Sem);



    const NavigateToNotes = (key, grade) => {
        
        
        

        sessionStorage.setItem("SubjectNumber",key);
        sessionStorage.setItem("Sem",grade);

        setTimeout(() => {
            navigate("/notes"); // ✅ Ensure state updates before navigation
        }, 100);
    };








  return (

<div className="w-screen h-screen bg-[#090707] ">
    <motion.div
    initial={{ x: -808, opacity: 0.9 }} // Start slightly off-screen left
    animate={fadeIn ? { x: 0, opacity: 1 } : { x: -908, opacity: 0.9 }} // Animate based on fadeIn state
    transition={{ duration: .5, ease: "easeInOut" }} // Smooth transition
    className="bg-[#090707] w-screen min-h-screen lg:min-h-screen flex flex-col "
  >
        <div className='flex flex-row  '>
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


                <div className='flex flex-col w-screen ml-10  gap-20 border-r border-[#645D5D] '>
                    <div className='flex flex-row gap-5 justify-center items-center'>
                        <h1 className='text-white  font-semibold text-2xl mt-5'>Explore Courses</h1>
                        <img src={coursesIcon} width={50} height={50} className='mt-5' />
                    </div>

                    <div className=' flex flex-row gap-3  border-b-2 w-auto border-[#302121] '>
                        <h1 className='text-white ml-10 text-lg font-medium'>Courses</h1>

                        
                                <div className='flex flex-row gap-2'>

                                    <div onClick={firstSet} className={`w-20 cursor-pointer rounded-md ${eleventh ? 'bg-[#20C030]' : '' } `}>
                                        <h1 className='text-white font-medium text-center' >11th</h1>
                                    </div>

                                    <div onClick={SecondSet} className={`w-20 cursor-pointer rounded-md ${twelth ? 'bg-[#20C030]' : '' } `}>
                                        <h1 className='text-white font-medium text-center' >12th</h1>
                                    </div>
                                </div>

                    </div>


                    
                    
                        <div className='flex flex-row gap-20  ml-10  flex-wrap'>
                            {eleventh ? 
                    
                            (<div  className='flex flex-row flex-wrap gap-12'>
                                <div onClick={()=>NavigateToNotes(1,11)} className='w-72 h-72 cursor-pointer  gap-5 flex flex-col justify-center items-center  bg-[#1D5455] rounded-lg border border-[#524c4c]'>
                                    <img src={fundamentalsIcon} width={150} height={150} />
                                    <img src={fundamentalsOfPhysics} width={200} height={200}/>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>Physics</h1>

                                        <div className='flex flex-row gap-2'>
                                            <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>5 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div onClick={()=>NavigateToNotes(2,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1A5677] rounded-md border border-[#524c4c]'>
                                    <img src={fundamentalsIcon} width={150} height={150} />
                                    <img src={fundamentalsOfChemistry} width={200} height={200}/>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>Chemistry</h1>

                                        <div className='flex flex-row gap-2'>
                                            <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>5 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div  onClick={()=>NavigateToNotes(3,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#04011E] rounded-md border border-[#524c4c]'>
                                    <img src={fundamentalsIcon} width={150} height={150} />
                                    <img src={fundamentalsOfMathematics} width={200} height={200}/>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>Mathematics</h1>

                                        <div className='flex flex-row gap-2'>
                                            <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>5 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div onClick={()=>NavigateToNotes(4,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#102e48] rounded-md border border-[#524c4c]'>
                                    <img src={PhysicsIcon} width={130} height={130} />  
                                    <h1 className='text-white font-medium'>CORE PHYSICS CONCEPTS</h1>


                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>11th PHYSICS</h1>

                                        <div className='flex flex-row gap-2'>
                                            <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>15 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div onClick={()=>NavigateToNotes(5,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1c4234] rounded-md border border-[#524c4c]'>
                                    <img src={ChemistryIcon} width={130} height={130} />  
                                    <h1 className='text-white font-medium'>CORE CHEMISTRY CONCEPTS</h1>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>11th Chemistry</h1>

                                        <div className='flex flex-row gap-2'>
                                            <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>15 Topics</h1>
                                        </div>
                                    </div>

                                </div>


                                <div onClick={()=>NavigateToNotes(6,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1d8732] rounded-md border border-[#524c4c]'>
                                    <img src={MathematicsIcon} width={130} height={130} />  
                                    <h1 className='text-white font-medium'>CORE MATHEMATICS CONCEPTS</h1>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>11th Mathematics</h1>

                                        <div className='flex flex-row gap-2'>
                                            <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>15 Topics</h1>
                                        </div>
                                    </div>

                                </div>
                        </div>
                        ):null}
                        

                        {twelth ? 

                        (
                        <div onClick={()=>NavigateToNotes(7,12)} className='flex flex-row flex-wrap  gap-12'>
                            <div className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#102e48] rounded-md border border-[#524c4c]'>
                                <img src={PhysicsIcon} width={130} height={130} />  
                                <h1 className='text-white font-medium'>CORE PHYSICS CONCEPTS</h1>


                                <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                    <h1 className='text-white mt-2 ml-4 font-medium text-lg'>12th PHYSICS</h1>

                                    <div className='flex flex-row gap-2'>
                                        <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                        <h1 className='text-white font-medium'>15 Topics</h1>
                                    </div>
                                </div>

                            </div>

                            <div onClick={()=>NavigateToNotes(8,12)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1c4234] rounded-md border border-[#524c4c]'>
                                <img src={ChemistryIcon} width={130} height={130} />  
                                <h1 className='text-white font-medium'>CORE CHEMISTRY CONCEPTS</h1>

                                <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                    <h1 className='text-white mt-2 ml-4 font-medium text-lg'>12th Chemistry</h1>

                                    <div className='flex flex-row gap-2'>
                                        <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                        <h1 className='text-white font-medium'>15 Topics</h1>
                                    </div>
                                </div>

                            </div>


                            <div onClick={()=>NavigateToNotes(9,12)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1d8732] rounded-md border border-[#524c4c]'>
                                <img src={MathematicsIcon} width={130} height={130} />  
                                <h1 className='text-white font-medium'>CORE MATHEMATICS CONCEPTS</h1>

                                <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                    <h1 className='text-white mt-2 ml-4 font-medium text-lg'>12th Mathematics</h1>

                                    <div className='flex flex-row gap-2'>
                                        <img src={SheetIcon} width={20} height={20} className='ml-4' />
                                        <h1 className='text-white font-medium'>15 Topics</h1>
                                    </div>
                                </div>

                            </div>
                            </div>
                        ):null}


                    </div>
                    
                </div>

                <div className='mt-10 h-20'>

                </div>

                

                
        </div>

    </motion.div>
</div>
  )
}

export default Courses

