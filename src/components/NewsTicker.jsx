export default function NewsTicker() {
  return (
    <div className="bg-[#000080] text-white py-2 overflow-hidden whitespace-nowrap shadow-md">
      <div className="inline-block animate-marquee lg:w-full font-semibold tracking-wide">
        <span className="mx-4 text-[#FF9933] text-lg">⚠️</span>
        Important: Voter List Revision is now live. Check your name in the electoral roll.
        <span className="mx-8 lg:hidden"></span>
        <span className="lg:hidden text-[#FF9933] text-lg">⚠️</span>
        <span className="lg:hidden">Important: Voter List Revision is now live. Check your name in the electoral roll.</span>
      </div>
    </div>
  );
}
