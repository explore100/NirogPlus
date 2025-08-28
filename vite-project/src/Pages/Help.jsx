import React from 'react'
import { useState } from 'react'
import HelpSearch from '../Components/ui/HelpSearch'
import KnowledgeBase from '../Components/ui/Knowledge'
import ProblemDiagnoser from '../Components/ui/ProblemDiagnoser'
import HowToGuides from '../Components/ui/HowToGuide'
import SparePartsInfo from '../Components/ui/SparePartsInfo'
import ContactSupport from '../Components/ui/ContactSupport'
import HelpTips from '../Components/ui/HelpTips'
import { FaHeartbeat, FaStethoscope, FaLaptopMedical } from "react-icons/fa";

const Help = () => {
  const [ query, setQuery ] = useState('');

  return (
  <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center my-8">
      <h1 className="text-4xl font-bold text-green-700 mb-2 flex justify-center items-center gap-3">
        <FaHeartbeat className="text-red-500 animate-pulse" />
        Nirog Care Hub
        <FaStethoscope className="text-blue-600" />
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Your futuristic health-tech assistant. Browse guides, check symptoms, book online consultations, and access medical inventory—all in one place.
      </p>
      <div className="mt-4 flex justify-center gap-6 text-gray-300 text-2xl">
        <FaLaptopMedical className="text-green-400 transition" />
        <FaHeartbeat className="text-red-500 transition" />
        <FaStethoscope className="text-blue-400 transition" />
      </div>
    </div>

        <HelpSearch query={query} setQuery={setQuery} />
        <KnowledgeBase />
        <ProblemDiagnoser />
        <HowToGuides />
        <SparePartsInfo />
        <ContactSupport />
        <HelpTips />
       
      </div>
    </div>
  )
}

export default Help