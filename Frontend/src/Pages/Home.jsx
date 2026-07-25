import { useState } from "react"
import { Link } from "react-router-dom"
import { getUserData } from "../Context/userContext"
import { ArrowRightSquareIcon, CircleChevronRight, MoveRight } from "lucide-react"
import Loader from "../Components/Loader"

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const {user, loading} = getUserData();

  if(loading) return <Loader/>

  return (
    <section className="flex flex-col items-center min-h-screen bg-slate-50/50">
      <nav className="flex flex-col items-center w-full bg-white border-b border-slate-100" >
        <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
            <Link to="/" className="text-2xl font-black tracking-tight text-indigo-600">LinkTree<span className="text-pink-500">.</span></Link>
            
            <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-white/95 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm font-medium`}>
                <a href="#features" onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-indigo-600 transition">Features</a>
                <a href="#templates" onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-indigo-600 transition">Themes</a>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="md:hidden text-slate-600 hover:text-indigo-600 transition">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="md:hidden text-white px-5 py-2 bg-indigo-600 rounded-md">Get Started</Link>

                <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-md aspect-square font-medium transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            
            <div className="hidden md:flex items-center gap-4">

                {user ? (
                  <div>
                    <Link to="/dashboard" className="flex gap-2 text-white px-4 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md font-medium shadow-xs cursor-pointer">
                    <span>Dashboard</span> <MoveRight/>
                </Link>
                  </div>
                ) : (
                  <>
                  <Link to='/login' className="active:scale-95 hover:bg-slate-50 transition px-4 py-2 border border-slate-200 rounded-md text-slate-700 font-medium cursor-pointer">
                    Sign in
                </Link>
                <Link to="/signup" className="text-white px-4 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md font-medium shadow-xs cursor-pointer">
                    Create Your Page
                </Link>
                  </>
                )}

                {/* <Link to='/login' className="active:scale-95 hover:bg-slate-50 transition px-4 py-2 border border-slate-200 rounded-md text-slate-700 font-medium cursor-pointer">
                    Sign in
                </Link>
                <Link to="/signup" className="text-white px-4 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md font-medium shadow-xs cursor-pointer">
                    Create Your Page
                </Link> */}


            </div>
            
            <button id="open-menu" onClick={() => setMobileOpen(true)}
                className="md:hidden bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-md aspect-square font-medium transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 12h16" /> <path d="M4 18h16" /> <path d="M4 6h16" /> </svg>
            </button>
        </div>
      </nav>
      
      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full p-1 pr-3 text-sm mt-20 md:mt-24">
        <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Portfolio MVP
        </span>
        <p className="flex items-center gap-2 text-indigo-600 font-medium">
            <span className='text-xs md:text-sm'>Build your link hub in under 60 seconds</span>
            <svg className="mt-px" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </p>
      </div>

      <h1 className="text-center text-slate-900 text-4xl md:text-6xl font-black max-w-3xl leading-[1.15] tracking-tight my-6 px-4">
        One link to share <span className='bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent'>everything</span> you build
      </h1>
      
      <p className="text-center text-base md:text-lg text-slate-600 max-w-xl px-4 leading-relaxed">
        The open-source bio link hub built for developers. House your GitHub repositories, portfolios, social channels, and projects on a single interactive page.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center z-1 w-full px-4">
        <Link to="/signup" className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3.5 rounded-md shadow-md shadow-indigo-200 active:scale-98 transition cursor-pointer">
          Claim Your Username
        </Link>
        
        <a href="#features" className="w-full sm:w-auto flex items-center justify-center gap-2 text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 rounded-md font-medium active:scale-98 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
          </svg>
          Explore Features
        </a>
      </div>

      {/* Visual Placeholder for Mockup Dashboard / Profile Preview */}
      <div className="relative mt-16 w-full max-w-4xl px-4 mb-20">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-indigo-300 blur-[120px] opacity-40 z-0 rounded-full"></div>
        
        {/* Sleek Profile Layout Wireframe to give immediate visual context */}
        <div className="relative z-1 w-full border border-slate-200/80 bg-white rounded-xl shadow-xl p-6 md:p-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-linear-to-tr from-indigo-500 to-pink-400 p-1 mb-4 shadow-sm">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-xl text-slate-700">🧑‍💻</div>
          </div>
          <div className="h-5 w-32 bg-slate-200 rounded-md mb-2 animate-pulse"></div>
          <div className="h-3 w-48 bg-slate-100 rounded-md mb-8 animate-pulse"></div>
          
          <div className="w-full space-y-3.5">
            <div className="w-full p-4 border border-slate-100 bg-slate-50/50 rounded-lg flex items-center justify-between text-slate-700 font-medium hover:border-indigo-200 transition">
              <span>🚀 Personal Portfolio Website</span>
              <span className="text-slate-400 text-xs">→</span>
            </div>
            <div className="w-full p-4 border border-slate-100 bg-slate-50/50 rounded-lg flex items-center justify-between text-slate-700 font-medium hover:border-indigo-200 transition">
              <span>📦 Latest GitHub Projects</span>
              <span className="text-slate-400 text-xs">→</span>
            </div>
            <div className="w-full p-4 border border-slate-100 bg-slate-50/50 rounded-lg flex items-center justify-between text-slate-700 font-medium hover:border-indigo-200 transition">
              <span>💼 LinkedIn Network</span>
              <span className="text-slate-400 text-xs">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home