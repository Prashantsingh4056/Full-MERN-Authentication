import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50/50">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring - Spinning Indigo */}
        <div className="animate-spin ease-linear rounded-full w-14 h-14 border-t-2 border-b-2 border-indigo-600" />
        
        {/* Inner Ring - Counter-Spinning Pink */}
        <div className="absolute animate-spin [animation-direction:reverse] ease-linear rounded-full w-8 h-8 border-r-2 border-l-2 border-pink-500" />
        
        {/* Center Core Anchor */}
        <div className="absolute w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
      </div>

      {/* Modern Subtext Layout */}
      <div className="mt-5 text-center">
        <p className="text-sm font-bold text-slate-700 tracking-wide">
          LinkTree<span className="text-pink-500">.</span>
        </p>
        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest mt-1 animate-pulse">
          Syncing Workspace
        </p>
      </div>
    </div>
  );
}

export default Loader;