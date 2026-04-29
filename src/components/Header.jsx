export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* 5px Tricolor strip */}
      <div className="flex h-[5px] w-full">
        <div className="w-1/3 bg-saffron h-full"></div>
        <div className="w-1/3 bg-white h-full"></div>
        <div className="w-1/3 bg-green h-full"></div>
      </div>
      
      {/* Logos and Navigation */}
      <div className="bg-navy py-2 px-6 flex justify-between items-center border-b-4 border-solid border-white">
        <img src="https://voters.eci.gov.in/assets/images/G20-Logo.png" alt="G20 Logo" className="h-10 object-contain" />
        <h1 className="text-white text-xl md:text-2xl font-bold tracking-wider text-center hidden sm:block">
          VOTER EDUCATION PORTAL
        </h1>
        <img src="https://voters.eci.gov.in/assets/images/eci-logo-white.png" alt="ECI Logo" className="h-12 object-contain" />
      </div>
    </header>
  );
}
