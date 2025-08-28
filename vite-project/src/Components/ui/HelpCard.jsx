export default function HelpCard({ icon, title, description }) {
  return (
    <div className="bg-[#F3F2EC] backdrop-blur-md p-6 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="text-3xl mb-4 text-red-300 hover:text-blue-300">{icon}</div>
      <h3 className="text-lg font-bold text-[#1E93AB] mb-2">{title}</h3>
      <p className="text-[#568F87] text-sm">{description}</p>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-md">
        Learn More
      </button>
    </div>
  );
}
