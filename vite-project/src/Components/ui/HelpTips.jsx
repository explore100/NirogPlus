export default function HelpTips() {
  const tips = [
    "Always check the knowledge base before contacting support.",
    "Ensure your health records are updated in your profile.",
    "Use secure connections for online consultations.",
  ];

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-green-400 mb-4">🎯 Helpful Tips</h2>
      <ul className="list-disc pl-6 space-y-2 text-[#547792]">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}
