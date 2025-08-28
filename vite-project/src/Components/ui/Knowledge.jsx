import HelpCard from "./HelpCard";
import { FaHeartbeat, FaSyringe, FaNotesMedical } from "react-icons/fa";

export default function KnowledgeBase() {
  const categories = [
    { icon: <FaHeartbeat />, title: "Health Diagnostics", desc: "Understand symptoms and possible conditions quickly." },
    { icon: <FaSyringe />, title: "Medication Info", desc: "Check medicines, dosages, and side effects safely." },
    { icon: <FaNotesMedical />, title: "Guidelines & Tips", desc: "Official health guidelines and preventive care tips." }
  ];

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-black  mb-4 ">📘 Knowledge Base</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <HelpCard key={i} icon={cat.icon} title={cat.title} description={cat.desc} />
        ))}
      </div>
    </section>
  );
}
