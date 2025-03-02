import React from "react";
import correctIcon from '/correcticon.svg';
import wrongIcon from '/wrongicon 2.svg';


const features = [
  "Live Classes",
  "Dedicated Doubt Support",
  "Motivational Sessions",
  "Sessions on Tackling Exams",
  "Mentorship From Seniors",
  "Dedicated Notes and Articles",
  "Group Discussion Sessions",
  "Mastering Problem Solving techniques",
  "Robotics Event - Apply what you learn",
  "Recorded Video Lectures",
  "Chapter wise Tests",
  "Disciplined Learning Methods",
];

const synergyLearning = [true, true, true, true, true, true, true, true, true, true, true, true];
const others = [true, false, false, false, false, false, false, false, false, true, true, false];


const ComparisonTable = () => {
  return (
    <div className="flex justify-center mt-5 items-center w-full bg-[#090707] py-1 px-5">
    <div className="overflow-x-auto w-full max-w-5xl">
      <table className="w-full border-collapse bg-[#0f0c0c] text-white shadow-lg table-fixed">
        <thead>
          <tr className="bg-[#0F0C0C] border-b border-gray-700 text-lg">
            <th className="p-3 pl-4 text-left w-[50%] sm:w-[40%]">Features</th>
            <th className="p-3 text-center w-[25%] sm:w-[30%]">Synergy Learning</th>
            <th className="p-3 text-center w-[25%] sm:w-[30%] pl-3">Others</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-gray-700 bg-[#0F0C0C]">
              <td className="p-3 pl-4 w-[50%] sm:w-[40%]">{feature}</td>
              <td className="p-3 text-center w-[25%] sm:w-[30%]">
                <img src={synergyLearning[index] ? correctIcon : wrongIcon} width={30} height={30} className="inline-block" />
              </td>
              <td className="p-3 text-center w-[25%] sm:w-[30%]">
                <img src={others[index] ? correctIcon : wrongIcon} width={30} height={30} className="inline-block" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  


  );
};

export default ComparisonTable;
