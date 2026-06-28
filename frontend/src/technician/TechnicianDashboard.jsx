import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Wrench, ClipboardCheck, Camera, CheckSquare, 
  MapPin, Phone, LogOut, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function TechnicianDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeJob, setActiveJob] = useState(null);
  const [checklist, setChecklist] = useState({
    brakes: false,
    lubrication: false,
    wiring: false,
    governor: false,
    doorLimits: false,
    emergencyPhone: false
  });
  
  // Signature Drawing state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const jobs = [
    { id: "JOB-402", title: "Lift Door Jammed", client: "Apex Residency", contact: "Rajesh - +91 94401 22334", location: "Siddipet Central", floor: "Flat 402, Block C", priority: "High" },
    { id: "JOB-398", title: "Monthly Scheduled Maintenance", client: "Metro Heights Apartments", contact: "Manager - +91 73829 04959", location: "Medak Road", floor: "Shaft A & B", priority: "Medium" }
  ];

  const handleStartDraw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleDrawing = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStopDraw = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    alert(`Service report for ${activeJob.id} has been submitted successfully, and invoice is generated.`);
    setActiveJob(null);
    clearSignature();
  };

  return (
    <div className="min-h-screen bg-slateBg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-gray-400 p-6 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg text-white tracking-tight">
              TRINITY <span className="text-accent">TECH</span>
            </span>
            <span className="text-[10px] text-gray-500 uppercase font-sans tracking-widest mt-1">
              Field Dispatch
            </span>
          </div>

          <nav className="space-y-2 text-sm font-semibold">
            <a href="#" className="flex items-center text-white bg-secondary/30 p-2.5 rounded-md">
              <ClipboardCheck className="w-4 h-4 mr-2.5 text-accent" />
              My Assigned Jobs
            </a>
          </nav>
        </div>

        <button 
          onClick={logout}
          className="flex items-center text-red-400 hover:text-red-300 font-semibold text-sm p-2 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </button>
      </aside>

      {/* Main Container */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Technician Portal</span>
            <h1 className="font-display font-extrabold text-2xl text-primary">{user?.fullName}</h1>
          </div>
          <button 
            onClick={logout}
            className="md:hidden p-2 text-red-500 hover:bg-red-50 rounded"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Job List */}
          <div className={`${activeJob ? 'lg:col-span-4' : 'lg:col-span-12'} space-y-4`}>
            <h3 className="font-display font-bold text-lg text-primary mb-2">My Active Schedules</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {jobs.map(job => (
                <div 
                  key={job.id} 
                  onClick={() => setActiveJob(job)}
                  className={`p-5 rounded-lg border shadow-premium cursor-pointer transition-all ${
                    activeJob?.id === job.id 
                      ? 'bg-secondary text-white border-secondary' 
                      : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{job.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      job.priority === 'High' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-primary'
                    }`}>
                      {job.priority}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm mt-2">{job.title}</h4>
                  <p className={`text-xs mt-1 ${activeJob?.id === job.id ? 'text-gray-200' : 'text-gray-400'}`}>
                    Client: {job.client}
                  </p>
                  <div className="flex items-center text-[10px] mt-4 opacity-90">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {job.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job execution checklist Form */}
          {activeJob && (
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-premium space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-display font-bold text-lg text-primary">{activeJob.title}</h3>
                  <p className="text-xs text-gray-400">{activeJob.client} - {activeJob.floor}</p>
                </div>
                <button 
                  onClick={() => setActiveJob(null)}
                  className="text-xs font-semibold text-gray-400 hover:text-primary uppercase"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slateBg/40 p-4 rounded-md">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-secondary shrink-0" />
                  <span>{activeJob.contact}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-secondary shrink-0" />
                  <span>{activeJob.location}</span>
                </div>
              </div>

              <form onSubmit={handleSubmitReport} className="space-y-6">
                
                {/* 10-Point Checklist */}
                <div>
                  <h4 className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                    Safety Inspection Checklist
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {Object.keys(checklist).map(item => (
                      <label key={item} className="flex items-center space-x-2.5 p-2 bg-slateBg/30 rounded border border-gray-100 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={checklist[item]} 
                          onChange={e => setChecklist(prev => ({ ...prev, [item]: e.target.checked }))}
                          className="w-4.5 h-4.5 text-secondary border-gray-300 rounded" 
                        />
                        <span className="capitalize text-xs text-primary font-semibold">{item.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* File/Photo Upload triggers */}
                <div>
                  <h4 className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                    Before & After Photos
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-200 p-4 rounded-md text-center bg-slateBg/30 hover:bg-slateBg/50 transition-colors">
                      <Camera className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <span className="block text-xs font-bold text-primary">Upload Before Image</span>
                      <input type="file" accept="image/*" className="hidden" id="before-upload" />
                      <label htmlFor="before-upload" className="mt-2 inline-block px-3 py-1 bg-white border border-gray-200 text-[10px] font-bold text-gray-500 rounded cursor-pointer">
                        Select Photo
                      </label>
                    </div>

                    <div className="border-2 border-dashed border-gray-200 p-4 rounded-md text-center bg-slateBg/30 hover:bg-slateBg/50 transition-colors">
                      <Camera className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <span className="block text-xs font-bold text-primary">Upload After Image</span>
                      <input type="file" accept="image/*" className="hidden" id="after-upload" />
                      <label htmlFor="after-upload" className="mt-2 inline-block px-3 py-1 bg-white border border-gray-200 text-[10px] font-bold text-gray-500 rounded cursor-pointer">
                        Select Photo
                      </label>
                    </div>
                  </div>
                </div>

                {/* Signature canvas panel */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Customer Signature Confirm
                    </label>
                    <button 
                      type="button" 
                      onClick={clearSignature}
                      className="text-[10px] font-semibold text-red-500 hover:text-red-400 uppercase"
                    >
                      Clear Board
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-md overflow-hidden bg-slateBg">
                    <canvas 
                      ref={canvasRef}
                      width={400}
                      height={120}
                      onMouseDown={handleStartDraw}
                      onMouseMove={handleDrawing}
                      onMouseUp={handleStopDraw}
                      onMouseLeave={handleStopDraw}
                      className="w-full h-32 block cursor-crosshair"
                    />
                  </div>
                </div>

                {/* Text Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                    Resolution Notes
                  </label>
                  <textarea 
                    required 
                    rows={3} 
                    placeholder="Describe parts replaced (lubricants, door guide sliders) and overall status..."
                    className="w-full px-3 py-2 bg-slateBg border border-gray-200 rounded-md text-xs text-primary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs uppercase tracking-wider rounded"
                >
                  Submit Service Report & Close Job
                </button>

              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
