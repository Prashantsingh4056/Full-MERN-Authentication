import { useState } from "react";
import Navbar from "../Components/Navbar"; // Adjust path as needed

const Dashboard = () => {
  // 1. Mock logged-in user context (Replace with your actual auth hooks later)
  const username = "prashant";

  // 2. Component States
  const [bio, setBio] = useState("Fullstack Developer | Building cool web apps");
  const [links, setLinks] = useState([
    { id: 1, title: "My GitHub Portfolio", url: "https://github.com" },
    { id: 2, title: "Connect on LinkedIn", url: "https://linkedin.com" },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 3. Logic: Add a link locally
  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const newLinkItem = {
      id: Date.now(), // Unique local ID
      title: newTitle,
      url: newUrl.startsWith("http") ? newUrl : `https://${newUrl}`, // basic URL formatting
    };

    setLinks([...links, newLinkItem]);
    setNewTitle("");
    setNewUrl("");
  };

  // 4. Logic: Delete a link locally
  const handleDeleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  // 5. Logic: Save entire profile state to backend database
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Your backend fetch API request logic will replace this timeout block
      // await fetch('/api/profile', { method: 'POST', body: JSON.stringify({ bio, links }) })
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile data", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Dynamic Header Component */}
      <Navbar username={username} />

      {/* Main Workspace Frame */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start grow">
        
        {/* ================= LEFT CONTROLS CONTAINER (7 COLS) ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Profile Section Box */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Profile Customization</h2>
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Bio Description</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="3"
                placeholder="Write a short intro about yourself..."
                className="w-full border border-slate-200 rounded-lg p-3 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition"
              />
            </div>
          </div>

          {/* Link Insertion Creator Form */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Add a New Link</h2>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Link Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Personal Website"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">URL Target</label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="e.g., https://mywebsite.com"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition active:scale-98 shadow-xs cursor-pointer"
              >
                + Add to Page Array
              </button>
            </form>
          </div>

          {/* Active Links Managed Workspace */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Your Links</h2>
            {links.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No links added yet. Build your first record above!</p>
            ) : (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {links.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50/50 rounded-lg group hover:border-slate-200 transition">
                    <div className="truncate pr-4">
                      <p className="text-sm font-semibold text-slate-700 truncate">{link.title}</p>
                      <p className="text-xs text-slate-400 truncate">{link.url}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition cursor-pointer"
                    >
                      <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Master Database Form Sync Trigger */}
          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="w-full bg-linear-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-50 active:scale-99 cursor-pointer text-center text-sm"
          >
            {isSaving ? "Syncing Workspace Data..." : "Publish Changes Code Sync"}
          </button>

        </div>

        {/* ================= RIGHT LIVE PREVIEW CARD (5 COLS) ================= */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Live Device Sandbox</p>
          
          {/* Simulated Mobile Framing Container */}
          <div className="w-full max-w-[340px] aspect-[9/18] border-8 border-slate-800 rounded-[36px] bg-white shadow-2xl overflow-hidden p-6 flex flex-col items-center relative">
            
            {/* Visual Phone Camera Notch Anchor */}
            <div className="absolute top-2 w-24 h-4 bg-slate-800 rounded-full"></div>

            {/* Simulated Public Layout Markup Rendering State changes reactively */}
            <div className="w-14 h-14 rounded-full bg-linear-to-tr from-indigo-600 to-pink-500 text-white font-black text-sm tracking-wider flex items-center justify-center shadow-xs mt-4 mb-3 uppercase">
              {username.slice(0,2)}
            </div>
            
            <p className="text-sm font-bold text-slate-800 mb-1">@{username}</p>
            <p className="text-center text-xs text-slate-500 px-2 line-clamp-2 min-h-[32px] mb-6">{bio || "No bio summary set yet."}</p>
            
            <div className="w-full space-y-2.5 overflow-y-auto grow max-h-[220px] no-scrollbar pr-0.5">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="w-full py-2.5 px-4 text-center border border-slate-200 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 shadow-xs truncate select-none"
                >
                  {link.title || "Untitled Link"}
                </div>
              ))}
            </div>

            <div className="mt-auto text-[9px] font-bold text-slate-300 tracking-widest uppercase pt-2">Powered by LinkTree</div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;