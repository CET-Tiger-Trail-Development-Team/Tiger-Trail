import React, { useState } from 'react';
import { useGameStore } from '../store';
import { QUESTS, GUIDES } from '../data';
import { Database, Edit3, Activity, Save, AlertCircle, Search, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

export function ITDashboard() {
  const [activeTab, setActiveTab] = useState<'health' | 'cms' | 'db'>('health');

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex-1 overflow-y-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-primary-text mb-1">IT Systems Dashboard</h1>
          <p className="text-secondary-text">System health, content management, and database administration.</p>
        </div>
      </div>

      <div className="flex gap-2 bg-desktop-bg p-1 rounded-xl overflow-x-auto mb-6">
        <TabButton active={activeTab === 'health'} onClick={() => setActiveTab('health')} icon={<Activity size={18} />} label="System Health" />
        <TabButton active={activeTab === 'cms'} onClick={() => setActiveTab('cms')} icon={<Edit3 size={18} />} label="Content Editor (CMS)" />
        <TabButton active={activeTab === 'db'} onClick={() => setActiveTab('db')} icon={<Database size={18} />} label="Database Console" />
      </div>

      {activeTab === 'health' && <HealthTab />}
      {activeTab === 'cms' && <CMSTab />}
      {activeTab === 'db' && <DatabaseTab />}
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
        active ? 'bg-card-surface shadow-sm text-primary-text' : 'text-muted-text hover:text-secondary-text'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function HealthTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card-surface border border-desktop-bg rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-2">System Status</h2>
        <div className="flex items-center gap-2 text-green-600 font-bold mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          All Systems Operational
        </div>
        <ul className="text-sm space-y-3 text-secondary-text">
          <li className="flex justify-between items-center p-2 bg-desktop-bg rounded-lg"><span>Database KV Store</span> <span className="font-mono text-green-500 font-bold">32ms</span></li>
          <li className="flex justify-between items-center p-2 bg-desktop-bg rounded-lg"><span>Auth Service</span> <span className="font-mono text-green-500 font-bold">15ms</span></li>
          <li className="flex justify-between items-center p-2 bg-desktop-bg rounded-lg"><span>Frontend Edge</span> <span className="font-mono text-green-500 font-bold">8ms</span></li>
        </ul>
      </div>

      <div className="bg-card-surface border border-desktop-bg rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Recent Audit Logs</h2>
        <div className="space-y-3 font-mono text-xs">
          <div className="p-2 bg-desktop-bg rounded text-secondary-text border-l-2 border-l-green-500">
            <span className="text-muted-text">10:42:01</span> [INFO] New user registered (role: student)
          </div>
          <div className="p-2 bg-desktop-bg rounded text-secondary-text border-l-2 border-l-blue-500">
            <span className="text-muted-text">10:15:33</span> [INFO] IT Admin login successful
          </div>
          <div className="p-2 bg-desktop-bg rounded text-secondary-text border-l-2 border-l-rit-orange">
            <span className="text-muted-text">09:59:12</span> [WARN] Rate limit near threshold for IP 192.168.1.1
          </div>
        </div>
      </div>
    </div>
  );
}

function CMSTab() {
  const { contentOverrides, setContentOverride, customQuests, customGuides, addCustomQuest, addCustomGuide, deleteCustomItem } = useGameStore();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState<'Quest' | 'Guide' | null>(null);

  const [editTrack, setEditTrack] = useState<any>('out-of-classroom');
  const [editCategory, setEditCategory] = useState<any>('Lore');
  const [editYear, setEditYear] = useState<number>(1);
  const [editTerm, setEditTerm] = useState<string>('fall');
  const [editRequired, setEditRequired] = useState<boolean>(false);
  const [editXp, setEditXp] = useState<number>(100);
  const [editIcon, setEditIcon] = useState<string>('Hexagon');
  const [editUrl, setEditUrl] = useState<string>('');

  const allQuests = [...QUESTS, ...(customQuests || [])];
  const allGuides = [...GUIDES, ...(customGuides || [])];

  const items = [
    ...allQuests.map(q => ({ type: 'Quest', id: q.id, title: q.title, desc: 'Quest item on map', isCustom: customQuests.some(cq => cq.id === q.id) })),
    ...allGuides.map(g => ({ type: 'Guide', id: g.id, title: g.title, desc: g.content, isCustom: customGuides.some(cg => cg.id === g.id) }))
  ];

  const filteredItems = items.filter(item => 
    ((contentOverrides || {})[item.id]?.title || item.title).toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item: any) => {
    setIsCreating(null);
    setSelectedItem(item);
    setEditTitle((contentOverrides || {})[item.id]?.title || item.title);
    setEditDesc((contentOverrides || {})[item.id]?.desc || (contentOverrides || {})[item.id]?.content || item.desc);
    
    const baseItem = item.type === 'Quest' ? allQuests.find(q => q.id === item.id) : allGuides.find(g => g.id === item.id);
    const overrides = (contentOverrides || {})[item.id] || {};
    
    if (item.type === 'Quest') {
      setEditTrack(overrides.track || baseItem?.track || 'out-of-classroom');
      setEditYear(overrides.year || baseItem?.year || 1);
      setEditTerm(overrides.term || baseItem?.term || 'fall');
      setEditRequired(overrides.required !== undefined ? overrides.required : (baseItem?.required || false));
      setEditXp(overrides.xp || baseItem?.xp || 100);
    } else {
      setEditCategory(overrides.category || baseItem?.category || 'Lore');
      setEditIcon(overrides.icon || baseItem?.icon || 'Hexagon');
    }
    setEditUrl(overrides.url || baseItem?.url || '');

    setSaveSuccess(false);
  };

    const handleSave = async () => {
    if (!selectedItem) return;
    const payload = selectedItem.type === 'Guide' 
      ? { title: editTitle, content: editDesc, category: editCategory, icon: editIcon, url: editUrl }
      : { title: editTitle, desc: editDesc, track: editTrack, year: Number(editYear), term: editTerm, required: editRequired, xp: Number(editXp), url: editUrl };
    
    setContentOverride(selectedItem.id, payload);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);

    // Sync to Supabase KV Store
    try {
      await supabase.from('kv_store_0615a924').upsert({
        key: `override_${selectedItem.id}`,
        value: payload
      });
    } catch(e) { console.error("KV Save failed", e); }
  };

  const handleCreate = (e: any) => {
    e.preventDefault();
    const id = 'custom_' + Date.now();
    if (isCreating === 'Quest') {
      addCustomQuest({
        id,
        title: editTitle,
        track: editTrack,
        year: Number(editYear) || 1,
        term: editTerm || 'fall',
        required: editRequired || false,
        xp: Number(editXp) || 100,
        isBranch: true,
        url: editUrl
      });
    } else {
      addCustomGuide({
        id,
        category: editCategory,
        title: editTitle,
        shortDesc: 'A custom guide entry.',
        content: editDesc,
        icon: editIcon || 'Hexagon',
        url: editUrl
      });
    }
    setIsCreating(null);
    setEditTitle('');
    setEditDesc('');
    setEditUrl('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleTextareaResize = (e: any) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const ExtraFields = () => {
    const isQuest = isCreating === 'Quest' || selectedItem?.type === 'Quest';
    const isGuide = isCreating === 'Guide' || selectedItem?.type === 'Guide';
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {isQuest && (
          <>
            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Track</label>
              <select value={editTrack} onChange={e => setEditTrack(e.target.value)} className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-rit-orange">
                <option value="academic">Academic</option>
                <option value="career">Career</option>
                <option value="out-of-classroom">Out of Classroom</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Term</label>
              <select value={editTerm} onChange={e => setEditTerm(e.target.value)} className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-rit-orange">
                <option value="fall">Fall</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Year (1-5)</label>
              <input type="number" min="1" max="5" value={editYear || ''} onChange={e => setEditYear(parseInt(e.target.value) || 1)} className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-rit-orange" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">XP Reward</label>
              <input type="number" step="50" value={editXp || ''} onChange={e => setEditXp(parseInt(e.target.value) || 0)} className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-rit-orange" />
            </div>
            <div className="col-span-2 flex items-center gap-2 mt-2">
              <input type="checkbox" id="reqCheck" checked={editRequired} onChange={e => setEditRequired(e.target.checked)} className="w-4 h-4" />
              <label htmlFor="reqCheck" className="text-sm font-bold text-primary-text">Is this a required core class?</label>
            </div>
          </>
        )}
        {isGuide && (
          <>
            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Category</label>
              <select value={editCategory} onChange={e => setEditCategory(e.target.value)} className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-rit-orange">
                <option value="Survival">Survival</option>
                <option value="Navigation">Navigation</option>
                <option value="Lore">Lore</option>
                <option value="MCET">MCET</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Icon</label>
              <select value={editIcon} onChange={e => setEditIcon(e.target.value)} className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-rit-orange">
                <option value="Map">Map</option>
                <option value="Coffee">Coffee</option>
                <option value="Wind">Wind</option>
                <option value="Mountain">Mountain</option>
                <option value="Hexagon">Hexagon</option>
                <option value="Zap">Zap</option>
                <option value="BookOpen">Book</option>
              </select>
            </div>
          </>
        )}
        <div className="col-span-2">
          <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">External URLs (Separate with commas)</label>
          <input type="text" value={editUrl} onChange={e => setEditUrl(e.target.value)} placeholder="https://rit.edu, https://mycourses.rit.edu" className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-2 text-primary-text focus:outline-none focus:border-rit-orange" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      <div className="w-full md:w-1/3 bg-card-surface border border-desktop-bg rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <div className="p-4 border-b border-desktop-bg bg-app-bg flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="font-bold text-sm">Content Library</div>
            <div className="flex gap-1">
              <button onClick={() => { setIsCreating('Quest'); setSelectedItem(null); setEditTitle(''); setEditDesc(''); setEditUrl(''); setEditXp(100); setEditYear(1); setEditTerm('fall'); setEditRequired(false); }} className="p-1.5 bg-rit-orange/10 text-rit-orange rounded hover:bg-rit-orange/20" title="New Quest"><Plus size={14}/></button>
              <button onClick={() => { setIsCreating('Guide'); setSelectedItem(null); setEditTitle(''); setEditDesc(''); setEditUrl(''); setEditIcon('Hexagon'); }} className="p-1.5 bg-blue-500/10 text-blue-500 rounded hover:bg-blue-500/20" title="New Guide"><Plus size={14}/></button>
            </div>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
            <input 
              type="text" 
              placeholder="Search content..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-desktop-bg border border-progress-track rounded-lg pl-9 pr-3 py-2 text-xs text-primary-text focus:outline-none focus:border-rit-orange transition-colors"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? filteredItems.map(item => (
            <div key={item.id} className="flex items-center group">
              <button
                onClick={() => handleSelect(item)}
                className={`flex-1 text-left p-3 rounded-xl text-sm transition-colors ${selectedItem?.id === item.id ? 'bg-rit-orange text-white font-bold' : 'hover:bg-desktop-bg text-secondary-text'}`}
              >
                <div className="text-xs opacity-70 mb-0.5">{item.type} {item.isCustom && '(Custom)'}</div>
                <div className="truncate">{(contentOverrides || {})[item.id]?.title || item.title}</div>
              </button>
              {item.isCustom && (
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteCustomItem(item.id); if(selectedItem?.id === item.id) setSelectedItem(null); }} 
                  className="p-2 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-lg shrink-0 transition-opacity"
                  title="Delete custom item"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )) : (
            <div className="text-center p-4 text-xs text-muted-text">No matching content found.</div>
          )}
        </div>
      </div>

      <div className="w-full md:w-2/3 bg-card-surface border border-desktop-bg rounded-2xl p-6 shadow-sm flex flex-col overflow-y-auto">
        {isCreating ? (
          <form onSubmit={handleCreate} className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Create New {isCreating}</h2>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Display Title</label>
              <input
                type="text"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-rit-orange"
                placeholder={`Enter new ${isCreating.toLowerCase()} title...`}
              />
            </div>
            
            <ExtraFields />
            
            <div className="flex flex-col">
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Description / Content</label>
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                onInput={handleTextareaResize}
                className="w-full min-h-[120px] bg-desktop-bg border border-progress-track rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-rit-orange resize-none overflow-hidden"
                placeholder="Enter content..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-rit-orange text-white font-extrabold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-deep-orange transition-colors shrink-0"
            >
              <Plus size={20} /> Create {isCreating}
            </button>
          </form>
        ) : selectedItem ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit {selectedItem.type}</h2>
              {saveSuccess && <span className="text-green-500 font-bold text-sm flex items-center gap-1"><CheckCircle2 size={16}/> Saved!</span>}
            </div>
            
            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Display Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-rit-orange"
              />
            </div>

            <ExtraFields />
            
            <div className="flex flex-col">
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-2">Description / Content</label>
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                onInput={handleTextareaResize}
                className="w-full min-h-[120px] bg-desktop-bg border border-progress-track rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-rit-orange resize-none overflow-hidden"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-primary-text text-app-bg font-extrabold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary-text transition-colors shrink-0"
            >
              <Save size={20} /> Save Changes
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-text h-full">
            <Edit3 size={48} className="mb-4 opacity-20" />
            <p>Select an item from the library to edit, or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DatabaseTab() {
  const store = useGameStore();
  const [jsonStr, setJsonStr] = useState(JSON.stringify(store, null, 2));
  const [error, setError] = useState('');

  const handleExecute = () => {
    try {
      const parsed = JSON.parse(jsonStr);
      // Caution: Direct overwrite of local state
      useGameStore.setState(parsed);
      setError('');
      alert("Database updated successfully!");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="bg-card-surface border border-desktop-bg rounded-2xl p-6 shadow-sm flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">KV Database Editor</h2>
          <p className="text-xs text-secondary-text">Direct JSON manipulation of the local Tiger Trail state.</p>
        </div>
        <button onClick={handleExecute} className="px-4 py-2 bg-red-500/10 text-red-500 font-bold rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors">
          Execute Query (Overwrite)
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-mono rounded-lg flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span className="break-all">{error}</span>
        </div>
      )}

      <textarea
        value={jsonStr}
        onChange={(e) => setJsonStr(e.target.value)}
        className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 rounded-xl border border-desktop-bg focus:outline-none focus:border-rit-orange resize-none"
        spellCheck={false}
      />
    </div>
  );
}

function CheckCircle2(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}
