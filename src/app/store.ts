import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QUESTS, ACHIEVEMENTS, GUIDES, Quest, GuideEntry } from './data';
import confetti from 'canvas-confetti';

interface User {
  name: string;
  emblem: string; // lucide icon name
  color: string;
}

interface GameState {
  user: User | null;
  role: string | null;
  completedQuests: string[];
  unlockedAchievements: string[];
  customPlacements: Record<string, { year: number, term: string } | 'bank'>;
  lockedPlacements: Record<string, { year: number, term: string }>;
  favoritedEvents: (number | string)[];
  readGuides: string[];
  comments: Record<string, { author: string, role: string, text: string, timestamp: number }[]>;
  contentOverrides: Record<string, any>;
  customQuests: Quest[];
  customGuides: GuideEntry[];
  xp: number;
  level: number;
  setUser: (user: User) => void;
  setRole: (role: string | null) => void;
  toggleQuest: (questId: string) => void;
  moveQuest: (questId: string, year: number, term: string) => void;
  moveToBank: (questId: string) => void;
  toggleLockQuest: (questId: string, year: number, term: string) => void;
  toggleFavoriteEvent: (eventId: number | string) => void;
  readGuide: (guideId: string) => void;
  setContentOverride: (id: string, data: any) => void;
  addCustomQuest: (quest: Quest) => void;
  addCustomGuide: (guide: GuideEntry) => void;
  deleteCustomItem: (id: string) => void;
  addComment: (questId: string, text: string) => void;
  resetGame: () => void;
  checkAchievementsAndLevel: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      completedQuests: [],
      unlockedAchievements: [],
      customPlacements: {},
      lockedPlacements: {},
      favoritedEvents: [],
      readGuides: [],
      contentOverrides: {},
      customQuests: [],
      customGuides: [],
      comments: {},
      xp: 0,
      level: 1,

      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),

      moveQuest: (questId, year, term) => {
        set((state) => ({
          customPlacements: {
            ...state.customPlacements,
            [questId]: { year, term }
          }
        }));
      },

      
      toggleLockQuest: (questId, year, term) => {
        set((state) => {
          const newLocked = { ...state.lockedPlacements };
          const newCustom = { ...state.customPlacements };
          if (newLocked[questId]) {
            delete newLocked[questId]; // unlock
          } else {
            newLocked[questId] = { year, term };
            newCustom[questId] = { year, term }; // ensure it stays there
          }
          return { lockedPlacements: newLocked, customPlacements: newCustom };
        });
      },

      moveToBank: (questId) => {
        set((state) => ({
          customPlacements: {
            ...state.customPlacements,
            [questId]: 'bank'
          }
        }));
      },


      
      addCustomQuest: (quest) => set((state) => ({ customQuests: [...(state.customQuests || []), quest] })),
      addCustomGuide: (guide) => set((state) => ({ customGuides: [...(state.customGuides || []), guide] })),
      
      addComment: (questId, text) => set((state) => {
        const newComments = { ...(state.comments || {}) };
        if (!newComments[questId]) newComments[questId] = [];
        newComments[questId].push({
          author: state.user?.name || (state.role === 'advisor' ? 'Advisor' : state.role === 'peer-mentor' ? 'Peer Mentor' : 'Admin'),
          role: state.role || 'student',
          text,
          timestamp: Date.now()
        });
        return { comments: newComments };
      }),

      deleteCustomItem: (id) => set((state) => ({
        customQuests: (state.customQuests || []).filter(q => q.id !== id),
        customGuides: (state.customGuides || []).filter(g => g.id !== id)
      })),

      setContentOverride: (id, data) => set((state) => ({
        contentOverrides: { ...state.contentOverrides, [id]: { ...((state.contentOverrides || {})[id] || {}), ...data } }
      })),
      
      readGuide: (guideId) => {
        const state = get();
        if (!(state.readGuides || []).includes(guideId)) {
          set({
            readGuides: [...(state.readGuides || []), guideId],
            xp: state.xp + 10,
          });
          
          confetti({
            particleCount: 30,
            spread: 40,
            origin: { y: 0.8 },
            colors: ['#0CA678', '#FFFFFF']
          });
          
          get().checkAchievementsAndLevel();
        }
      },

      toggleFavoriteEvent: (eventId) => {
        set((state) => {
          const isFavorited = state.favoritedEvents.includes(eventId);
          return {
            favoritedEvents: isFavorited
              ? state.favoritedEvents.filter((id) => id !== eventId)
              : [...state.favoritedEvents, eventId]
          };
        });
      },

      toggleQuest: (questId) => {
        const state = get();
        const allQuests = [...QUESTS, ...(get().customQuests || [])].map(q => ({...q, ...((get().contentOverrides || {})[q.id] || {})}));
        const quest = allQuests.find((q) => q.id === questId);
        if (!quest) return;

        const isCompleted = (state.completedQuests || []).includes(questId);
        let newCompletedQuests = [...(state.completedQuests || [])];
        let newXp = state.xp;

        if (isCompleted) {
          newCompletedQuests = newCompletedQuests.filter((id) => id !== questId);
          newXp -= quest.xp;
        } else {
          newCompletedQuests.push(questId);
          newXp += quest.xp;
          // Simple confetti for completing a quest
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.9 },
            colors: ['#F76902', '#000000', '#FFFFFF']
          });
        }

        set({
          completedQuests: newCompletedQuests,
          xp: newXp,
        });

        get().checkAchievementsAndLevel();
      },

      checkAchievementsAndLevel: () => {
        const state = get();
        const completedQuests = state.completedQuests || [];
        const unlockedAchievements = state.unlockedAchievements || [];
        const level = state.level || 1;
        
        let newAchievements = [...unlockedAchievements];
        let newlyUnlocked = false;

        const unlock = (id: string) => {
          if (!newAchievements.includes(id)) {
            newAchievements.push(id);
            newlyUnlocked = true;
          }
        };

        // 1. First Steps
        if (completedQuests.length > 0) unlock('first_steps');
        // 2. Found Your People (o1)
        if (completedQuests.includes('o1')) unlock('found_people');
        // 3. Co-op Rookie
        if (completedQuests.some((id) => id.startsWith('coop-'))) unlock('coop_rookie');
        // 4. Step Up (o5)
        if (completedQuests.includes('o5')) unlock('step_up');
        // 5. On Stage (o14)
        if (completedQuests.includes('o14')) unlock('on_stage');
        // 6. Globetrotter (o15)
        if (completedQuests.includes('o15')) unlock('globetrotter');
        // 7. Tiger Grad (a15)
        if (completedQuests.includes('a15')) unlock('tiger_grad');
        // 8. Hired! (c16)
        if (completedQuests.includes('c16')) unlock('hired');

        // Track completion
        const allQuests = [...QUESTS, ...(state.customQuests || [])].map(q => ({...q, ...((state.contentOverrides || {})[q.id] || {})}));
        const academicQuests = allQuests.filter((q) => q.track === 'academic');
        const careerQuests = allQuests.filter((q) => q.track === 'career');
        const outQuests = allQuests.filter((q) => q.track === 'out-of-classroom');

        if (academicQuests.every((q) => completedQuests.includes(q.id))) unlock('academic_scholar');
        if (careerQuests.every((q) => completedQuests.includes(q.id))) unlock('career_ready');
        if (outQuests.every((q) => completedQuests.includes(q.id))) unlock('campus_leader');

        const year1Quests = allQuests.filter((q) => q.year === 1);
        if (year1Quests.every((q) => completedQuests.includes(q.id))) unlock('freshman_finished');

        if (completedQuests.length === allQuests.length) unlock('master_trail');

        if ((state.readGuides || []).length === (GUIDES.length + (state.customGuides || []).length)) unlock('lore_master');


        // Determine Level based on completed required quests or simply year completion
        // Let's say level corresponds to the highest year where ALL REQUIRED quests of previous years are done.
        // Actually, simpler: calculate year completion.
        let newLevel = 1;
        for (let y = 1; y <= 5; y++) {
          const yearQuests = allQuests.filter((q) => q.year === y);
          // Just counting if they finished all in the year? Or just required?
          // Let's say you unlock the next year if you finish all REQUIRED quests of the current year.
          const requiredInYear = yearQuests.filter((q) => q.required);
          const requiredDone = requiredInYear.every((q) => completedQuests.includes(q.id));
          if (requiredDone && requiredInYear.length > 0) {
            newLevel = Math.max(newLevel, y + 1);
          } else if (requiredInYear.length === 0) {
            // If no required quests, maybe just completing ANY quest in that year unlocks next?
            // Actually, looking at the data, years 1,2,3 have required quests. Years 4, 5 do not have required quests marked in our basic interpretation except maybe Graduation.
            // Let's just say Level = min(5, Math.floor(xp / 500) + 1) for a pure gamified feel, OR
            // let's stick to required quests per year.
          }
        }
        // Let's do an XP based level to make it simpler and always rewarding.
        // Total max XP is around 50*100 + some 50s = 5000+
        // Let's define thresholds: Lvl 2: 1000, Lvl 3: 2000, Lvl 4: 3000, Lvl 5: 4000
        if (state.xp >= 4000) newLevel = 5;
        else if (state.xp >= 3000) newLevel = 4;
        else if (state.xp >= 2000) newLevel = 3;
        else if (state.xp >= 1000) newLevel = 2;

        if (newLevel === 5) unlock('legend');

        if (newlyUnlocked || newLevel > level) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#F76902', '#FFC107', '#FFFFFF'],
            zIndex: 9999
          });
        }

        set({ unlockedAchievements: newAchievements, level: newLevel });
      },

      resetGame: () => {
        set({ user: null, completedQuests: [], unlockedAchievements: [], customPlacements: {}, favoritedEvents: [], lockedPlacements: {}, readGuides: [], contentOverrides: {}, customQuests: [], customGuides: [], comments: {}, xp: 0, level: 1, role: null });
      },
    }),
    {
      name: 'tiger-trail-storage',
    }
  )
);
