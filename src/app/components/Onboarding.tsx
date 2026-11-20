import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGameStore } from '../store';
import { Rocket, Sparkles, Zap, Flame, Star, Hexagon, PawPrint } from 'lucide-react';
import { motion } from 'motion/react';

const EMBLEMS = [
  { id: 'PawPrint', icon: <PawPrint size={32} /> },
  { id: 'Rocket', icon: <Rocket size={32} /> },
  { id: 'Zap', icon: <Zap size={32} /> },
  { id: 'Flame', icon: <Flame size={32} /> },
  { id: 'Star', icon: <Star size={32} /> },
];

const COLORS = ['#F76902', '#DA291C', '#009CBD', '#84BD00', '#C4D600', '#7D55C7', '#F6BE00'];

export function Onboarding() {
  const [name, setName] = useState('');
  const [emblem, setEmblem] = useState(EMBLEMS[0].id);
  const [color, setColor] = useState(COLORS[0]);
  const setUser = useGameStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setUser({ name, emblem, color });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-desktop-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rit-orange rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-track-academic rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card-surface rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10 border border-desktop-bg"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rit-orange/10 text-rit-orange mb-4">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-primary-text tracking-tight">Tiger Trail</h1>
          <p className="text-secondary-text mt-2">Your MCET 5-year quest begins here.</p>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">What's your name, Tiger?</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ritchie"
              className="w-full px-4 py-3 rounded-xl border-2 border-desktop-bg bg-app-bg focus:border-rit-orange focus:ring-4 focus:ring-rit-orange/20 transition-all outline-none text-lg font-medium text-primary-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">Choose your emblem</label>
            <div className="flex gap-3 justify-between">
              {EMBLEMS.map((emb) => (
                <button
                  key={emb.id}
                  type="button"
                  onClick={() => setEmblem(emb.id)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${emblem === emb.id ? 'ring-4 ring-offset-2' : 'bg-app-bg text-muted-text hover:bg-desktop-bg'}`}
                  style={emblem === emb.id ? { backgroundColor: color + '20', color: color, ringColor: color } : {}}
                >
                  {emb.icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-text mb-2">Choose your color</label>
            <div className="flex gap-3 justify-between">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-transform ${color === c ? 'scale-125 ring-4 ring-offset-2 ring-desktop-bg' : 'hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            style={{ backgroundColor: color, boxShadow: `0 10px 25px -5px ${color}60` }}
          >
            Start Your Journey
          </button>
        </form>
      </motion.div>
    </div>
  );
}
