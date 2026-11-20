import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';

const MOCK_STUDENTS = [
  { id: '1', name: 'Jane Smith', initials: 'JS', color: 'bg-rit-orange text-white border-transparent', level: 3, xp: 2500 },
  { id: '2', name: 'John Doe', initials: 'JD', color: 'bg-app-bg text-rit-orange border-rit-orange border', level: 1, xp: 500 },
  { id: '3', name: 'Alice Johnson', initials: 'AJ', color: 'bg-track-academic text-white border-transparent', level: 2, xp: 1200 },
];

export function PeerMentorDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto flex-1 overflow-y-auto w-full">
      <h1 className="text-3xl font-extrabold text-primary-text mb-2">Peer Mentor Dashboard</h1>
      <p className="text-secondary-text mb-8">Welcome, Mentor! View your assigned mentees' trails and leave helpful suggestions.</p>
      
      <div className="bg-card-surface border border-desktop-bg rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold">Your Mentees</h2>
          
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-desktop-bg border border-progress-track rounded-xl pl-10 pr-4 py-2 text-sm text-primary-text focus:outline-none focus:border-rit-orange transition-colors"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-progress-track rounded-xl hover:border-rit-orange/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${student.color}`}>
                    {student.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-text">{student.name}</h3>
                    <p className="text-xs text-secondary-text">Level {student.level} • {student.xp} XP</p>
                  </div>
                </div>
                <button onClick={() => navigate('/mentor/trail')} className="px-4 py-2 bg-desktop-bg text-primary-text text-sm font-bold rounded-lg hover:bg-progress-track transition-colors">
                  View Trail
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-secondary-text bg-desktop-bg/50 rounded-xl border border-dashed border-progress-track">
              No mentees found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
