import HelpCard from "./HelpCard";
import { FaStethoscope, FaUserMd, FaClinicMedical } from "react-icons/fa";

export default function HowToGuides() {
  const guides = [
    { icon: <FaStethoscope />, title: "Consult a Doctor", desc: "Steps to book and join an online consultation quickly." },
    { icon: <FaUserMd />, title: "Request Appointment", desc: "Schedule visits or follow-ups with your preferred doctor." },
    { icon: <FaClinicMedical />, title: "Pharmacy Access", desc: "Order medicines and check availability from partnered stores." }
  ];

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-green-400 mb-4">🧾 How-To Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, i) => (
          <HelpCard key={i} icon={guide.icon} title={guide.title} description={guide.desc} />
        ))}
      </div>
    </section>
  );
}
