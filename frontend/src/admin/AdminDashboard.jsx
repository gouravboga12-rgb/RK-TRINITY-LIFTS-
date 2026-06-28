import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { 
  ShieldAlert, Users, Wrench, Shield, CreditCard, 
  Settings, LogOut, CheckCircle2, ChevronRight, PlusCircle 
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('complaints');
  const [assignModal, setAssignModal] = useState(null); // stores active complaint to assign
  const [selectedTech, setSelectedTech] = useState('');

  // Mock database records
  const metrics = [
    { label: "Active AMCs", value: "148 Contracts", icon: <Shield className="w-5 h-5 text-accent" /> },
    { label: "Pending Tickets", value: "6 Complaints", icon: <ShieldAlert className="w-5 h-5 text-red-500" /> },
    { label: "Monthly Revenue", value: "₹4,89,500.00", icon: <CreditCard className="w-5 h-5 text-green-500" /> },
    { label: "Technicians Available", value: "8 Active", icon: <Wrench className="w-5 h-5 text-secondary" /> }
  ];

  const complaints = [
    { id: "COMP-101", customer: "Apex Residency", lift: "Main Lobby Lift", issue: "Lift Door Jammed", date: "2026-06-25", status: "Unassigned", priority: "High" },
    { id: "COMP-102", customer: "Dr. Verma", lift: "Residential Duplex Lift", issue: "Slight Noise during travel", date: "2026-06-27", status: "Assigned", priority: "Medium", tech: "Ramesh Kumar" }
  ];

  const techniciansList = [
    { id: "tech-1", name: "Ramesh Kumar", specialization: "PMSM Systems", jobs: 1 },
    { id: "tech-2", name: "Sunil Verma", specialization: "Hydraulic Elevators", jobs: 0 },
    { id: "tech-3", name: "N. Srinivasan", specialization: "Heavy Freight Rails", jobs: 2 }
  ];

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    const techName = techniciansList.find(t => t.id === selectedTech)?.name || 'Technician';
    alert(`Assigned ${techName} successfully to ${assignModal.id}.`);
    setAssignModal(null);
    setSelectedTech('');
  };

  return (
    <div className="min-h-screen bg-slateBg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-gray-400 p-6 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg text-white tracking-tight">
              TRINITY <span className="text-accent">ADMIN</span>
            </span>
            <span className="text-[10px] text-gray-500 uppercase font-sans tracking-widest mt-1">
              CMS & Operations
            </span>
          </div>

          <nav className="space-y-2 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('complaints')}
              className={`w-full flex items-center p-2.5 rounded-md text-left transition-colors ${
                activeTab === 'complaints' ? 'text-white bg-secondary/30' : 'hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4 mr-2.5" />
              Complaints Queue
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center p-2.5 rounded-md text-left transition-colors ${
                activeTab === 'users' ? 'text-white bg-secondary/30' : 'hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 mr-2.5" />
              User Accounts
            </button>
            <button 
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center p-2.5 rounded-md text-left transition-colors ${
                activeTab === 'cms' ? 'text-white bg-secondary/30' : 'hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 mr-2.5" />
              Website settings
            </button>
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

      {/* Main Contents Panel */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Control Panel</span>
            <h1 className="font-display font-extrabold text-2xl text-primary">{user?.fullName}</h1>
          </div>
          <button onClick={logout} className="md:hidden p-2 text-red-500 hover:bg-red-50 rounded">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border border-gray-200/80 shadow-premium flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase">{m.label}</span>
                <h4 className="font-display font-extrabold text-lg text-primary mt-1">{m.value}</h4>
              </div>
              <div className="p-3 bg-slateBg rounded-full border border-gray-100">
                {m.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic tabs render content */}
        {activeTab === 'complaints' && (
          <div className="bg-white rounded-lg border border-gray-200/80 shadow-premium p-6">
            <h3 className="font-display font-bold text-lg text-primary mb-6">Service Calls & Complaints Dispatch Queue</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Equipment</th>
                    <th className="pb-3">Priority</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Assigned Tech</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-slateText">
                  {complaints.map(comp => (
                    <tr key={comp.id}>
                      <td className="py-4 font-bold">{comp.id}</td>
                      <td className="py-4">{comp.customer}</td>
                      <td className="py-4">{comp.lift}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          comp.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          {comp.priority}
                        </span>
                      </td>
                      <td className="py-4">{comp.status}</td>
                      <td className="py-4 text-gray-400">{comp.tech || 'None'}</td>
                      <td className="py-4 text-right">
                        {comp.status === 'Unassigned' ? (
                          <button
                            onClick={() => setAssignModal(comp)}
                            className="px-3 py-1 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                          >
                            Assign Tech
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 font-semibold">Closed / Dispatched</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg border border-gray-200/80 shadow-premium p-6">
            <h3 className="font-display font-bold text-lg text-primary mb-6">User Accounts & Role Settings</h3>
            <p className="text-xs text-gray-400 mb-4">Admins can promote registered Customers to Technician status to access the dispatch portal.</p>
            <div className="border border-gray-100 rounded-md overflow-hidden text-xs sm:text-sm">
              <div className="grid grid-cols-4 p-3 bg-slateBg font-bold text-gray-400 uppercase tracking-widest text-[10px]">
                <span>Name</span>
                <span>Email</span>
                <span>Role</span>
                <span className="text-right">Actions</span>
              </div>
              <div className="divide-y divide-gray-100 font-semibold text-slateText">
                <div className="grid grid-cols-4 p-3.5 items-center">
                  <span>Dr. Verma</span>
                  <span className="text-gray-400">verma@example.com</span>
                  <span className="text-xs uppercase font-bold text-primary">customer</span>
                  <button className="text-right text-xs font-bold text-secondary hover:text-accent uppercase tracking-wider">Promote to Tech</button>
                </div>
                <div className="grid grid-cols-4 p-3.5 items-center">
                  <span>Ramesh Kumar</span>
                  <span className="text-gray-400">ramesh@trinity.com</span>
                  <span className="text-xs uppercase font-bold text-accent">technician</span>
                  <button className="text-right text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-wider">Demote</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="bg-white rounded-lg border border-gray-200/80 shadow-premium p-6 space-y-6">
            <h3 className="font-display font-bold text-lg text-primary">Website Content Management System (CMS)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-center">
              <div className="p-5 border border-gray-200 rounded-md hover:border-accent hover:bg-slateBg cursor-pointer transition-all">
                <PlusCircle className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <span>Add Product</span>
              </div>
              <div className="p-5 border border-gray-200 rounded-md hover:border-accent hover:bg-slateBg cursor-pointer transition-all">
                <PlusCircle className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <span>Upload Gallery Item</span>
              </div>
              <div className="p-5 border border-gray-200 rounded-md hover:border-accent hover:bg-slateBg cursor-pointer transition-all">
                <PlusCircle className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <span>Add Testimonial review</span>
              </div>
            </div>
          </div>
        )}

        {/* ASSIGN MODAL */}
        {assignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/45 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white max-w-md w-full p-6 rounded-lg border border-gray-200 shadow-2xl relative text-slateText">
              <button 
                onClick={() => setAssignModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-primary font-bold"
              >
                ✕
              </button>
              <h3 className="font-display font-bold text-lg text-primary mb-2">Assign Technician</h3>
              <p className="text-xs text-gray-400 mb-4">Job: {assignModal.issue} ({assignModal.customer})</p>
              
              <form onSubmit={handleAssignSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Select Available Technician</label>
                  <select 
                    required
                    value={selectedTech} 
                    onChange={e => setSelectedTech(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded text-sm text-primary"
                  >
                    <option value="">-- Choose Tech --</option>
                    {techniciansList.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.specialization}) - Active Jobs: {t.jobs}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={!selectedTech}
                  className="w-full py-2 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs uppercase tracking-wider rounded disabled:opacity-50"
                >
                  Confirm Dispatch Assignment
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
