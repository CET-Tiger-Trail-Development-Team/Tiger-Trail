import React from 'react';
import { useGameStore } from '../store';
import { QUESTS, ACHIEVEMENTS } from '../data';
import * as Icons from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

export function ProfileView() {
  const { user, level, xp, completedQuests, unlockedAchievements, setRole, customQuests } = useGameStore();
  const contentOverrides = useGameStore(s => s.contentOverrides) || {};
  const allQuests = [...QUESTS, ...(customQuests || [])].map(q => ({...q, ...((contentOverrides || {})[q.id] || {})}));

  if (!user) return <div className="p-8 text-center text-muted-text">Loading profile...</div>;

  // @ts-ignore
  const EmblemIcon = Icons[user.emblem] || Icons.User;

  const totalQuests = allQuests.length;
  const completedCount = (completedQuests || []).length;

  const getTrackStats = (track: string) => {
    const total = allQuests.filter(q => q.track === track).length;
    const completed = allQuests.filter(q => q.track === track && (completedQuests || []).includes(q.id)).length;
    return { total, completed, percent: Math.round((completed / total) * 100) || 0 };
  };

  const academic = getTrackStats('academic');
  const career = getTrackStats('career');
  const out = getTrackStats('out-of-classroom');

  return (
    <div className="flex-1 overflow-y-auto bg-app-bg p-4 sm:p-8 pb-24 sm:pb-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="bg-card-surface rounded-3xl p-6 sm:p-8 shadow-sm border border-desktop-bg text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 opacity-20" style={{ backgroundColor: user.color }} />
          
          <div className="relative z-10 flex flex-col items-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center bg-card-surface shadow-xl mb-4 border-4 border-card-surface"
              style={{ color: user.color }}
            >
              <EmblemIcon size={48} />
            </div>
            
            <h2 className="text-3xl font-extrabold text-primary-text">{user.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-app-bg px-3 py-1 rounded-full text-sm font-bold text-secondary-text flex items-center gap-1">
                <Icons.Award size={16} className="text-rit-orange" />
                Level {level}
              </span>
              <span className="bg-app-bg px-3 py-1 rounded-full text-sm font-bold text-secondary-text flex items-center gap-1">
                <Icons.Star size={16} className="text-gold" />
                {xp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Quests Done" value={completedCount} max={totalQuests} icon={<Icons.CheckSquare size={24} />} color="text-track-academic" />
          <StatCard title="Trophies" value={(unlockedAchievements || []).length} max={14} icon={<Icons.Trophy size={24} />} color="text-rit-orange" />
        </div>

        {/* Track Breakdown */}
        <div className="bg-card-surface rounded-3xl p-6 shadow-sm border border-desktop-bg mb-6">
          <h3 className="text-lg font-bold text-primary-text mb-6">Track Progress</h3>
          <div className="space-y-6">
            <TrackProgress title="Academic" stats={academic} color="bg-track-academic" />
            <TrackProgress title="Career Development" stats={career} color="bg-track-career" />
            <TrackProgress title="Out of Classroom" stats={out} color="bg-track-out" />
          </div>
        </div>

        
        {/* Trophy Case */}
        <div className="bg-card-surface rounded-3xl p-6 shadow-sm border border-desktop-bg mb-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-primary-text">Trophy Case</h3>
              <p className="text-sm text-secondary-text font-medium mt-1">Unlock badges by completing quests</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-gold">{unlockedAchievements.length}</span>
              <span className="text-sm text-muted-text font-bold"> / {ACHIEVEMENTS.length}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = (unlockedAchievements || []).includes(ach.id);
              // @ts-ignore
              const Icon = Icons[ach.icon] || Icons.Award;

              return (
                <div 
                  key={ach.id} 
                  className={`relative rounded-2xl p-4 border-2 flex flex-col items-center text-center transition-all duration-300
                    ${isUnlocked 
                      ? 'bg-card-surface border-gold shadow-sm' 
                      : 'bg-desktop-bg border-transparent opacity-60 grayscale'
                    }
                  `}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner
                    ${isUnlocked ? 'bg-gold/10 text-gold' : 'bg-app-bg text-muted-text'}
                  `}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-bold text-primary-text text-xs mb-1">{ach.title}</h3>
                  <p className="text-[10px] text-secondary-text leading-tight">{ach.description}</p>
                  
                  {isUnlocked && (
                    <div className="absolute top-2 right-2 text-gold">
                      <Icons.CheckCircle2 size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>


        {/* Account Actions */}
        <div className="bg-card-surface rounded-3xl p-4 shadow-sm border border-desktop-bg flex justify-center">
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setRole(null)}
            className="flex flex-1 justify-center items-center gap-2 text-primary-text bg-desktop-bg hover:bg-progress-track px-6 py-3 rounded-xl transition-colors font-bold text-sm"
          >
            <Icons.LogOut size={18} />
            Sign Out
          </button>
          
          <button 
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
                useGameStore.getState().resetGame();
                window.location.href = '/onboarding';
              }
            }}
            className="flex flex-1 justify-center items-center gap-2 text-red-500 bg-red-500/10 hover:bg-red-500/20 px-6 py-3 rounded-xl transition-colors font-bold text-sm"
          >
            <Icons.AlertTriangle size={18} />
            Wipe Progress (Dev)
          </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, max, icon, color }: any) {
  return (
    <div className="bg-card-surface rounded-3xl p-5 shadow-sm border border-desktop-bg flex flex-col items-center text-center">
      <div className={`w-12 h-12 rounded-full bg-app-bg flex items-center justify-center mb-2 ${color}`}>
        {icon}
      </div>
      <div className="text-2xl font-extrabold text-primary-text">{value} <span className="text-sm text-muted-text">/ {max}</span></div>
      <div className="text-xs font-bold text-secondary-text uppercase tracking-wider">{title}</div>
    </div>
  );
}

function TrackProgress({ title, stats, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm font-bold mb-2">
        <span className="text-primary-text">{title}</span>
        <span className="text-secondary-text">{stats.completed} / {stats.total} ({stats.percent}%)</span>
      </div>
      <Progress.Root className="relative overflow-hidden bg-progress-track rounded-full w-full h-2">
        <Progress.Indicator 
          className={`w-full h-full transition-transform duration-1000 ease-out ${color}`}
          style={{ transform: `translateX(-${100 - stats.percent}%)` }} 
        />
      </Progress.Root>
    </div>
  );
}
