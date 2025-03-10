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

    const [home,setHome] = useState(true);
    const [session,setSession] = useState(false);

    const TurnOnHome = () =>{

        setHome(true);
        setSession(false);
    }

    const TurnOnSession = () =>{

        setHome(false);
        setSession(true);
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
    initial={{ x: -408, opacity: 0.9 }} // Start slightly off-screen left
    animate={fadeIn ? { x: 0, opacity: 1 } : { x: -408, opacity: 0.9 }} // Animate based on fadeIn state
    transition={{ duration: .5, ease: "easeInOut" }} // Smooth transition
    className="bg-[#090707] w-screen min-h-screen lg:min-h-screen flex flex-col "
  >
        <div className='flex flex-row  '>
                <div className="bg-[#0F0C0C] fixed flex flex-col gap-10 border-r border-[#645D5D] w-20 min-h-screen">

                    <img src={SynergyIcon} width={60} height={60} className='mt-16 bg-black rounded-lg ml-1' />
                    
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
                    </div>
                </div> 


                <div className='flex flex-col w-screen ml-20  gap-20 border-r border-[#645D5D] '>
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


                    
                    
                        <div className='flex flex-row gap-20  ml-5 lg:ml-10  flex-wrap'>
                            {eleventh ? 
                    
                            (<div  className='flex flex-row flex-wrap gap-12'>
                                <div onClick={()=>NavigateToNotes(1,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1D5455] rounded-lg border border-[#524c4c]'>
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

