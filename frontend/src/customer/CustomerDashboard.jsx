import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Wrench, Shield, CreditCard, Layout, Bell, User, 
  PlusCircle, LogOut, CheckCircle2, ChevronRight, FileText 
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [complaintModal, setComplaintModal] = useState(false);
  const [complaints, setComplaints] = useState([
    { id: "COMP-101", title: "Lift Door Jammed", lift: "Main Lobby Lift", date: "2026-06-25", status: "In Progress", priority: "High" },
    { id: "COMP-92", title: "Slight Noise during travel", lift: "Service Lift B", date: "2026-05-12", status: "Resolved", priority: "Low" }
  ]);
  const [newComplaint, setNewComplaint] = useState({ title: '', description: '', lift: 'Main Lobby Lift', priority: 'medium' });

  const lifts = [
    { id: "LIFT-01", name: "Main Lobby Lift", model: "PMSM Passenger (10 Pax)", location: "Tower A Shaft", amc: "Active (Expires: 2027-05-24)" },
    { id: "LIFT-02", name: "Service Lift B", model: "Geared Goods Lift", location: "Back Entry Shaft", amc: "Active (Expires: 2026-11-12)" }
  ];

  const handleRaiseComplaint = (e) => {
    e.preventDefault();
    const id = `COMP-${Math.floor(100 + Math.random() * 900)}`;
    setComplaints([
      {
        id,
        title: newComplaint.title,
        lift: newComplaint.lift,
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
        priority: newComplaint.priority.toUpperCase()
      },
      ...complaints
    ]);
    setComplaintModal(false);
    setNewComplaint({ title: '', description: '', lift: 'Main Lobby Lift', priority: 'medium' });
  };

  return (
    <div className="min-h-screen bg-slateBg flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-primary text-gray-400 p-6 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg text-white tracking-tight">
              TRINITY <span className="text-accent">PORTAL</span>
            </span>
            <span className="text-[10px] text-gray-500 uppercase font-sans tracking-widest mt-1">
              Customer Hub
            </span>
          </div>

          <nav className="space-y-2 text-sm font-semibold">
            <a href="#" className="flex items-center text-white bg-secondary/30 p-2.5 rounded-md">
              <Layout className="w-4 h-4 mr-2.5 text-accent" />
              Dashboard Overview
            </a>
            <a href="#" className="flex items-center hover:text-white p-2.5 rounded-md transition-colors">
              <Wrench className="w-4 h-4 mr-2.5" />
              My Lifts Catalog
            </a>
            <a href="#" className="flex items-center hover:text-white p-2.5 rounded-md transition-colors">
              <Shield className="w-4 h-4 mr-2.5" />
              AMC Contract
            </a>
            <a href="#" className="flex items-center hover:text-white p-2.5 rounded-md transition-colors">
              <FileText className="w-4 h-4 mr-2.5" />
              Invoice History
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

      {/* Main Panel Content */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto max-w-7xl">
        {/* Top bar info */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Welcome back,</span>
            <h1 className="font-display font-extrabold text-2xl text-primary">{user?.fullName}</h1>
          </div>
          <button 
            onClick={logout}
            className="md:hidden p-2 text-red-500 hover:bg-red-50 rounded"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Grid Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lifts Section */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-premium">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-lg text-primary flex items-center">
                  <Layout className="w-5 h-5 mr-2 text-secondary" />
                  My Registered Lifts
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lifts.map(lift => (
                  <div key={lift.id} className="p-4 border border-gray-100 rounded-md bg-slateBg/40">
                    <h4 className="font-bold text-sm text-primary">{lift.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{lift.model}</p>
                    <p className="text-xs text-gray-400">{lift.location}</p>
                    <span className="inline-block mt-3 px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-semibold">
                      {lift.amc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complaints Timeline tracking */}
            <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-premium">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-lg text-primary flex items-center">
                  <Wrench className="w-5 h-5 mr-2 text-secondary" />
                  Service & Ticket History
                </h3>
                <button
                  onClick={() => setComplaintModal(true)}
                  className="flex items-center text-xs font-bold uppercase tracking-wider text-secondary hover:text-accent transition-colors"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Raise Complaint
                </button>
              </div>

              <div className="space-y-4">
                {complaints.map(comp => (
                  <div key={comp.id} className="flex justify-between items-center p-4 border border-gray-100 hover:border-gray-200 rounded-md">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-primary">{comp.id}</span>
                        <span className="text-xs text-gray-400">| {comp.lift}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-primary mt-1">{comp.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Filed: {comp.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        comp.status === 'Resolved' 
                          ? 'bg-green-50 text-green-600' 
                          : comp.status === 'Pending' 
                          ? 'bg-yellow-50 text-yellow-600' 
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {comp.status}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1 font-semibold">Priority: {comp.priority}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Actions & Support Column */}
          <div className="space-y-6">
            
            {/* AMC plan details */}
            <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-premium bg-gradient-to-br from-primary to-primary-dark text-white">
              <h3 className="font-display font-bold text-base text-accent mb-2">Annual Maintenance (AMC)</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Keep your equipment covered. Subscriptions guarantee 12 diagnostic checks, free lubrication, and zero service labor charges.
              </p>
              <div className="p-3 border border-white/20 bg-white/5 rounded-md flex justify-between items-center text-xs">
                <span>Contract ID: AMC-7788</span>
                <span className="font-bold text-accent">Expires in 134 Days</span>
              </div>
              <button className="w-full mt-4 py-2.5 bg-accent hover:bg-accent-dark text-primary font-bold text-xs tracking-wider uppercase rounded-md transition-all">
                Request Contract Renewal
              </button>
            </div>

            {/* Invoices List */}
            <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-premium">
              <h3 className="font-display font-bold text-base text-primary mb-4 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-secondary" />
                Unpaid Invoices
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 border border-gray-100 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-bold text-primary">INV-2026-904</p>
                    <p className="text-[10px] text-gray-400">Regular Service Call - Tower A</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹2,360.00</p>
                    <span className="text-[10px] font-bold text-amber-500">Unpaid</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* COMPLAINT MODAL */}
        {complaintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/45 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white max-w-md w-full p-6 rounded-lg border border-gray-200 shadow-2xl relative">
              <button 
                onClick={() => setComplaintModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-primary font-bold"
              >
                ✕
              </button>
              <h3 className="font-display font-bold text-lg text-primary mb-4">File Elevator Complaint</h3>
              
              <form onSubmit={handleRaiseComplaint} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Select Lift</label>
                  <select 
                    value={newComplaint.lift} 
                    onChange={e => setNewComplaint(prev => ({ ...prev, lift: e.target.value }))}
                    className="w-full p-2 border border-gray-200 rounded text-sm text-primary"
                  >
                    <option value="Main Lobby Lift">Main Lobby Lift (Tower A)</option>
                    <option value="Service Lift B">Service Lift B (Rear shaft)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Title / Issue</label>
                  <input 
                    type="text" 
                    required 
                    value={newComplaint.title}
                    onChange={e => setNewComplaint(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Lift doors closing very slowly"
                    className="w-full p-2 border border-gray-200 rounded text-sm text-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Priority</label>
                  <select 
                    value={newComplaint.priority}
                    onChange={e => setNewComplaint(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full p-2 border border-gray-200 rounded text-sm text-primary"
                  >
                    <option value="low">Low (General suggestion)</option>
                    <option value="medium">Medium (Requires diagnostic check)</option>
                    <option value="high">High (Elevator out of order)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs uppercase tracking-wider rounded"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
