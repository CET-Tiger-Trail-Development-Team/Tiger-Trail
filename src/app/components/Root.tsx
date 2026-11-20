import React from 'react';
import { AuthView } from './Auth';
import { AdvisorDashboard } from './AdvisorDashboard';
import { PeerMentorDashboard } from './PeerMentorDashboard';
import { ITDashboard } from './ITDashboard';
import { Outlet, useLocation } from 'react-router';
import { Layout } from './Layout';
import { LogOut, ArrowLeft } from 'lucide-react';
import { MapView } from './Map';
import { useGameStore } from '../store';
import { ErrorBoundary } from './ErrorBoundary';

export function Root() {
  return <ErrorBoundary><RootContent /></ErrorBoundary>;
}

function RootContent() {
  const role = useGameStore(state => state.role);
  const setRole = useGameStore(state => state.setRole);
  const location = useLocation();

  if (!role) {
    return <AuthView />;
  }

  const handleLogout = () => {
    setRole(null);
  };

  if (role === 'advisor') {
    if (location.pathname === '/advisor/trail') {
      return (
        <div className="min-h-screen bg-app-bg flex flex-col">
          <header className="bg-card-surface border-b border-desktop-bg p-4 flex justify-between items-center z-50 shadow-sm relative">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm text-secondary-text hover:text-rit-orange font-bold">
              <ArrowLeft size={16} /> Back to Roster
            </button>
            <h1 className="font-bold text-primary-text hidden sm:block">Advisor Trail View</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-secondary-text hover:text-rit-orange font-bold">
              <LogOut size={16} /> Sign Out
            </button>
          </header>
          <MapView />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-app-bg flex flex-col">
        <header className="bg-card-surface border-b border-desktop-bg p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rit-orange text-white rounded-lg flex items-center justify-center font-bold">A</div>
            <h1 className="font-bold text-primary-text">Tiger Trail Advisor</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-secondary-text hover:text-rit-orange font-bold">
            <LogOut size={16} /> Sign Out
          </button>
        </header>
        <AdvisorDashboard />
      </div>
    );
  }

    if (role === 'peer-mentor') {
    if (location.pathname === '/mentor/trail') {
      return (
        <div className="min-h-screen bg-app-bg flex flex-col">
          <header className="bg-card-surface border-b border-desktop-bg p-4 flex justify-between items-center z-50 shadow-sm relative">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm text-secondary-text hover:text-rit-orange font-bold">
              <ArrowLeft size={16} /> Back to Roster
            </button>
            <h1 className="font-bold text-primary-text hidden sm:block">Peer Mentor Trail View</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-secondary-text hover:text-rit-orange font-bold">
              <LogOut size={16} /> Sign Out
            </button>
          </header>
          <MapView />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-app-bg flex flex-col">
        <header className="bg-card-surface border-b border-desktop-bg p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">PM</div>
            <h1 className="font-bold text-primary-text">Tiger Trail Mentor</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-secondary-text hover:text-rit-orange font-bold">
            <LogOut size={16} /> Sign Out
          </button>
        </header>
        <PeerMentorDashboard />
      </div>
    );
  }

  if (role === 'it') {
    return (
      <div className="min-h-screen bg-app-bg flex flex-col">
        <header className="bg-card-surface border-b border-desktop-bg p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold">IT</div>
            <h1 className="font-bold text-primary-text">Tiger Trail Systems</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-secondary-text hover:text-rit-orange font-bold">
            <LogOut size={16} /> Sign Out
          </button>
        </header>
        <ITDashboard />
      </div>
    );
  }

  // If student, render the normal Layout
  // Fallback to student app
  if (true) {
    const isSpecialRoute = location.pathname === '/onboarding';
    
    if (isSpecialRoute) {
      return (
        <div className="min-h-screen bg-app-bg text-primary-text">
          <Outlet />
        </div>
      );
    }
    
    return <Layout onLogout={handleLogout} />;
  }

  return <div style={{padding:20}}>Error: Reached end of Root without rendering. Role: {String(role)}</div>;
}
