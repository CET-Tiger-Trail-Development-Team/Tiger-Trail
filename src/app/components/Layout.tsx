import React, { useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router';
import { Map, Trophy, User as UserIcon, LogOut, Users, Rocket, Zap, Flame, Star, Hexagon, PawPrint, Calendar, BookOpen, MapPin } from 'lucide-react';
import { useGameStore } from '../store';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Toaster, toast } from 'sonner';
import { ACHIEVEMENTS } from '../data';

import TIGER_IMG from '../../imports/image-6.png';

const EMBLEM_MAP: Record<string, React.ElementType> = {
  PawPrint, Rocket, Zap, Flame, Star, Hexagon, User: UserIcon
};

export function Layout() {
  const user = useGameStore((state) => state.user);
  const resetGame = useGameStore((state) => state.resetGame);
  const level = useGameStore((state) => state.level);
  const unlockedAchievements = useGameStore((state) => state.unlockedAchievements);
  const navigate = useNavigate();
  const location = useLocation();

  const prevAchievements = useRef<string[]>(unlockedAchievements);

  const UserEmblem = user ? (EMBLEM_MAP[user.emblem] || UserIcon) : UserIcon;

  useEffect(() => {
    if (unlockedAchievements.length > prevAchievements.current.length) {
      const newAchievements = unlockedAchievements.filter(id => !prevAchievements.current.includes(id));
      
      newAchievements.forEach(id => {
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        if (ach) {
          toast.custom((t) => (
            <div className="bg-card-surface border-2 border-rit-orange rounded-xl p-4 shadow-lg flex flex-col gap-3 min-w-[300px] pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="bg-rit-orange/20 text-rit-orange p-3 rounded-full shrink-0">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="font-extrabold text-primary-text text-sm uppercase tracking-wide">Trophy Unlocked!</h3>
                  <p className="text-base font-bold text-rit-orange">{ach.title}</p>
                </div>
              </div>
              <p className="text-sm text-secondary-text">{ach.description}</p>
              <button 
                onClick={() => { 
                  toast.dismiss(t); 
                  navigate('/profile'); 
                }}
                className="mt-1 w-full py-2.5 bg-rit-orange/10 hover:bg-rit-orange text-rit-orange hover:text-white rounded-lg font-bold text-sm transition-colors"
              >
                View in Profile
              </button>
            </div>
          ), { duration: 5000, id: `toast-${id}` });
        }
      });
    }
    prevAchievements.current = unlockedAchievements;
  }, [unlockedAchievements, navigate]);

  useEffect(() => {
    if (!user && location.pathname !== '/onboarding') {
      navigate('/onboarding');
    }
  }, [user, navigate, location]);

  if (!user) return <div className="min-h-screen bg-app-bg flex items-center justify-center text-rit-orange font-bold">Redirecting...</div>;

  return (
    <div className="flex h-screen print:h-auto bg-app-bg text-primary-text font-sans print:bg-white">
      <Toaster position="bottom-right" />
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex w-64 bg-card-surface border-r border-desktop-bg flex-col z-20 shadow-sm relative print:hidden">
        <div className="p-6 border-b border-desktop-bg">
          <div className="flex items-center gap-3 mb-6">
            <ImageWithFallback src={TIGER_IMG} alt="Tiger Trail" className="h-10 w-10 object-cover rounded-xl" />
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-primary-text leading-tight">Tiger Trail</h1>
              <p className="text-[10px] uppercase font-bold text-rit-orange tracking-widest">MCET Major Map</p>
            </div>
          </div>
          
          <div className="bg-app-bg rounded-2xl p-4 border border-desktop-bg flex items-center gap-3">
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-card-surface shadow-sm" style={{ color: user.color }}>
              <UserEmblem size={24} />
            </div>
            <div>
              <div className="text-sm font-extrabold text-primary-text">{user.name}</div>
              <div className="text-xs font-semibold text-rit-orange">Level {level}</div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 overflow-y-auto flex-1">
          <div role="group" aria-label="My path">
            <NavGroupLabel first>My path</NavGroupLabel>
            <div className="space-y-1">
              <SideNavItem to="/" icon={<Map size={20} />} label="Trail Map" />
              <SideNavItem to="/profile" icon={<UserIcon size={20} />} label="Profile" />
            </div>
          </div>
          <div role="group" aria-label="Explore RIT">
            <NavGroupLabel>Explore RIT</NavGroupLabel>
            <div className="space-y-1">
              <SideNavItem to="/guide" icon={<BookOpen size={20} />} label="Field Guide" />
              <SideNavItem to="/campus" icon={<MapPin size={20} />} label="Campus Map" />
              <SideNavItem to="/clubs" icon={<Users size={20} />} label="Clubs" />
            </div>
          </div>
          <div role="group" aria-label="Stay current">
            <NavGroupLabel>Stay current</NavGroupLabel>
            <div className="space-y-1">
              <SideNavItem to="/calendar" icon={<Calendar size={20} />} label="Calendar" />
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-desktop-bg">

        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-desktop-bg sm:bg-transparent print:block print:overflow-visible">
        {/* Mobile Header */}
        <header className="sm:hidden print:hidden bg-rit-orange text-white p-4 shadow-md flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <ImageWithFallback src={TIGER_IMG} alt="Tiger Trail" className="h-8 w-8 object-cover rounded-full" />
            <h1 className="text-xl font-bold tracking-tight">Tiger Trail</h1>
          </div>
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white shadow-sm" style={{ color: user.color }}>
            <UserEmblem size={16} />
          </div>
        </header>

        <main className="flex-1 overflow-hidden print:overflow-visible flex flex-col relative bg-desktop-bg sm:bg-app-bg print:block">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="print:hidden bg-card-surface border-t border-desktop-bg flex overflow-x-auto gap-2 p-3 pb-safe z-10 sm:hidden scrollbar-hide">
          <NavItem to="/" icon={<Map size={24} />} label="Trail" />
          <NavItem to="/guide" icon={<BookOpen size={24} />} label="Guide" />
          <NavItem to="/campus" icon={<MapPin size={24} />} label="Campus" />
          <NavItem to="/clubs" icon={<Users size={24} />} label="Clubs" />
          <NavItem to="/calendar" icon={<Calendar size={24} />} label="Calendar" />
          <NavItem to="/profile" icon={<UserIcon size={24} />} label="Profile" />
        </nav>
      </div>
    </div>
  );
}

function NavGroupLabel({ children, first }: { children: React.ReactNode, first?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`text-[11px] font-bold text-muted-text px-2 mb-1.5 select-none ${first ? '' : 'mt-[14px]'}`}
    >
      {children}
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex flex-col items-center justify-center min-w-[64px] gap-1 p-2 rounded-xl transition-colors ${isActive ? 'text-rit-orange bg-rit-orange/10' : 'text-muted-text hover:text-secondary-text'}`
      }
    >
      {icon}
      <span className="text-[10px] font-semibold">{label}</span>
    </NavLink>
  );
}

function SideNavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-3 p-3 rounded-xl transition-colors text-sm font-medium ${isActive ? 'bg-rit-orange/10 text-rit-orange' : 'text-secondary-text hover:bg-desktop-bg'}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
