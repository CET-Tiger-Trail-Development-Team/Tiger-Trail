import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, GraduationCap, Users, LayoutList, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useGameStore } from '../store';

type EventType = 'academic' | 'club' | 'career';
type EventScope = 'mcet' | 'campus';

interface Event {
  id: number | string;
  title: string;
  dateStr: string;
  dateValue: string; // ISO format 'YYYY-MM-DD'
  endDateValue?: string; // For multiday events
  time?: string;
  location?: string;
  type: EventType;
  description: string;
  scope?: EventScope;
}

const ScopeBadge = ({ scope, size = 'md' }: { scope?: EventScope, size?: 'sm' | 'md' }) => {
  if (!scope) return null;
  const label = scope === 'mcet' ? 'MCET' : 'Campus';
  const colors = scope === 'mcet'
    ? 'bg-rit-orange/10 text-rit-orange'
    : 'bg-track-academic/10 text-track-academic';
  const sizing = size === 'sm'
    ? 'text-[9px] px-1 py-0'
    : 'text-[10px] px-2 py-0.5';
  return (
    <span className={`inline-block font-extrabold uppercase tracking-wider rounded-full whitespace-nowrap ${colors} ${sizing}`}>
      {label}
    </span>
  );
};

const UPCOMING_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Fall Classes Begin',
    dateStr: 'August 24, 2026',
    dateValue: '2026-08-24',
    type: 'academic',
    scope: 'campus',
    description: 'Start of the Fall 2026 semester for MCET students.'
  },
  {
    id: 2,
    title: 'Add/Drop Deadline',
    dateStr: 'August 31, 2026',
    dateValue: '2026-08-31',
    type: 'academic',
    scope: 'campus',
    description: 'Last day to add or drop classes without penalty.'
  },
  {
    id: 3,
    title: 'MCET Welcome Mixer',
    dateStr: 'September 5, 2026',
    dateValue: '2026-09-05',
    time: '4:00 PM - 6:00 PM',
    location: 'Gleason Hall Atrium',
    type: 'club',
    scope: 'mcet',
    description: 'Meet your fellow Mechanical Engineering Tech students, faculty, and learn about the affiliated clubs!'
  },
  {
    id: 4,
    title: 'Fall Break (No Classes)',
    dateStr: 'October 12-13, 2026',
    dateValue: '2026-10-12',
    endDateValue: '2026-10-13',
    type: 'academic',
    scope: 'campus',
    description: 'Enjoy your long weekend. Rest and recharge for midterms.'
  },
  {
    id: 5,
    title: 'RIT Career Fair',
    dateStr: 'October 15, 2026',
    dateValue: '2026-10-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Gordon Field House',
    type: 'career',
    scope: 'campus',
    description: 'Meet with hundreds of employers looking for MCET co-ops and full-time hires.'
  },
  {
    id: 6,
    title: 'Registration for Spring 2027',
    dateStr: 'November 2, 2026',
    dateValue: '2026-11-02',
    type: 'academic',
    scope: 'campus',
    description: 'Plan your next semester courses with your academic advisor.'
  },
  {
    id: 7,
    title: 'Baja SAE Team Tryouts',
    dateStr: 'November 10, 2026',
    dateValue: '2026-11-10',
    time: '6:00 PM',
    location: 'Machine Shop',
    type: 'club',
    scope: 'mcet',
    description: 'Join the RIT Baja SAE off-road racing team. No prior experience required.'
  },
  {
    id: 8,
    title: 'Final Exams Week Starts',
    dateStr: 'December 10, 2026',
    dateValue: '2026-12-10',
    type: 'academic',
    scope: 'campus',
    description: 'Good luck on your finals!'
  }
];

const EventIcon = ({ type }: { type: EventType }) => {
  switch (type) {
    case 'academic':
      return <GraduationCap size={16} className="text-rit-orange" />;
    case 'club':
      return <Users size={16} className="text-blue-500" />;
    case 'career':
      return <CalendarIcon size={16} className="text-green-500" />;
  }
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export function CalendarView() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');
  const [scopeFilter, setScopeFilter] = useState<'all' | EventScope>('all');
  const [currentDate, setCurrentDate] = useState(new Date()); // Start at current date so live events are visible

  const [liveEvents, setLiveEvents] = useState<Event[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  React.useEffect(() => {
    async function fetchRITEvents() {
      const CACHE_TTL = 1000 * 60 * 60; // 1 hour
      const cached = localStorage.getItem('rit_events_cache_v8');
      const cacheTime = localStorage.getItem('rit_events_cache_time_v8');

      if (cached && cacheTime && Date.now() - parseInt(cacheTime) < CACHE_TTL) {
        setLiveEvents(JSON.parse(cached));
        return;
      }

      setIsFetching(true);
      
      
      const fetchWithProxy = async (targetUrl: string) => {
        const proxies = [
          'https://api.allorigins.win/raw?url=',
          'https://corsproxy.io/?'
        ];
        
        for (const proxy of proxies) {
          try {
            const res = await fetch(proxy + encodeURIComponent(targetUrl));
            if (res.ok) return await res.json();
          } catch (e) {
            console.warn("Proxy failed:", proxy, e);
          }
        }
        throw new Error("All proxies failed");
      };

      try {
        const cetData = await fetchWithProxy('https://www.rit.edu/events/export-events?org_structure[]=59f7f8ad-ceb6-40e2-8f26-0d292781d909');
        const topicsData = await fetchWithProxy('https://www.rit.edu/events/export-events?general_topics[]=f750f8ef-614a-4d3c-9e7d-bf584d2d8c9b&general_topics[]=090d457d-0258-4d79-b7e4-76d8d1ace255&general_topics[]=b9f6153c-62bc-4746-910f-0ca96022ae73&general_topics[]=9d22b075-6a63-4361-aebb-713d6a0ddb07');
        
        // Tag each source so we can label event scope: CET org feed => MCET, general topics => campus-wide
        let rawData: { data: any, scope: EventScope }[] = [];
        if (Array.isArray(cetData)) rawData = [...rawData, ...cetData.map((d: any) => ({ data: d, scope: 'mcet' as EventScope }))];
        if (Array.isArray(topicsData)) rawData = [...rawData, ...topicsData.map((d: any) => ({ data: d, scope: 'campus' as EventScope }))];


        const uniqueEvents = new Map();

        rawData.forEach(({ data: d, scope }) => {
          const key = d.title + '_' + (d.display_date || d.date);
          if (!uniqueEvents.has(key)) {
            uniqueEvents.set(key, {
              id: d.dtl_id || d.event_id || Math.random().toString(),
              title: d.title,
              dateStr: d.display_date || d.date,
              dateValue: d.date,
              endDateValue: d.end_date !== d.date ? d.end_date : undefined,
              time: (d.start_time && d.end_time) ? `${d.start_time} - ${d.end_time}` : d.start_time || undefined,
              location: d.building ? `${d.building} ${d.room_location ? '- ' + d.room_location : ''}` : undefined,
              type: 'club', // Defaulting to club color
              scope,
              description: d.event_description ? d.event_description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'RIT Campus Event'
            });
          }
        });

        const mappedEvents: Event[] = Array.from(uniqueEvents.values());


        setLiveEvents(mappedEvents);
        localStorage.setItem('rit_events_cache_v8', JSON.stringify(mappedEvents));
        localStorage.setItem('rit_events_cache_time_v8', Date.now().toString());
      } catch (err) {
        console.error("Failed to fetch RIT events:", err);
      } finally {
        setIsFetching(false);
      }
    }

    fetchRITEvents();
  }, []);

  const ALL_EVENTS = [...UPCOMING_EVENTS, ...liveEvents]
    .filter((e) => scopeFilter === 'all' || e.scope === scopeFilter)
    .sort((a, b) => new Date(a.dateValue).getTime() - new Date(b.dateValue).getTime());

  
  const favoritedEvents = useGameStore((state) => state.favoritedEvents || []);
  const toggleFavoriteEvent = useGameStore((state) => state.toggleFavoriteEvent);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Helper to check if an event is on a specific calendar day
  const getEventsForDay = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return ALL_EVENTS.filter(e => {
      if (e.endDateValue) {
        return dateString >= e.dateValue && dateString <= e.endDateValue;
      }
      return e.dateValue === dateString;
    });
  };

  const renderEventList = (eventsToRender: Event[]) => (
    <div className="space-y-4">
      {eventsToRender.map((event) => {
        const isFavorited = favoritedEvents.includes(event.id);
        return (
          <div key={event.id} className="bg-card-surface border border-desktop-bg rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
            <button 
              onClick={() => toggleFavoriteEvent(event.id)}
              className="absolute top-4 right-4 p-2 hover:bg-desktop-bg rounded-full transition-colors"
              title={isFavorited ? "Unfavorite" : "Favorite"}
            >
              <Star 
                size={20} 
                className={isFavorited ? "fill-rit-orange text-rit-orange" : "text-muted-text"} 
              />
            </button>
            <div className="flex items-start gap-4 pr-8">
              <div className="mt-1 p-2 bg-desktop-bg rounded-lg hidden sm:block">
                <EventIcon type={event.type} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="sm:hidden"><EventIcon type={event.type} /></span>
                      <h2 className="text-lg font-bold text-primary-text">{event.title}</h2>
                    </div>
                    <p className="text-sm text-secondary-text">{event.description}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 mt-2 sm:mt-0">
                    <span className="inline-block px-3 py-1 bg-rit-orange/10 text-rit-orange text-xs font-bold rounded-full whitespace-nowrap">
                      {event.dateStr}
                    </span>
                    <ScopeBadge scope={event.scope} />
                  </div>
                </div>
                
                {(event.time || event.location) && (
                  <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-desktop-bg text-sm text-secondary-text font-medium">
                    {event.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {eventsToRender.length === 0 && (
        <div className="text-center p-8 text-secondary-text">
          No events found.
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-app-bg p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rit-orange/10 text-rit-orange rounded-xl">
              <CalendarIcon size={28} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-text">Academic Calendar</h1>
              <p className="text-secondary-text hidden sm:block">Upcoming events, deadlines, and club meetups</p>
            </div>
          </div>
          
          <div className="flex bg-desktop-bg p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                viewMode === 'calendar' ? 'bg-card-surface text-primary-text shadow-sm' : 'text-secondary-text hover:text-primary-text'
              }`}
            >
              <CalendarIcon size={16} /> Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                viewMode === 'list' ? 'bg-card-surface text-primary-text shadow-sm' : 'text-secondary-text hover:text-primary-text'
              }`}
            >
              <LayoutList size={16} /> List
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-bold text-muted-text uppercase tracking-wider mr-1">Scope</span>
          {([
            { key: 'all', label: 'All events' },
            { key: 'mcet', label: 'MCET' },
            { key: 'campus', label: 'Campus-wide' },
          ] as const).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setScopeFilter(opt.key)}
              aria-pressed={scopeFilter === opt.key}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rit-orange ${
                scopeFilter === opt.key
                  ? 'bg-rit-orange/10 text-rit-orange'
                  : 'bg-desktop-bg text-secondary-text hover:text-primary-text'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {viewMode === 'list' ? (
          <div>
            <h2 className="text-lg font-bold text-primary-text mb-4">All Upcoming Events</h2>
            {isFetching && <div className="text-sm text-secondary-text mb-4 animate-pulse">Syncing live events from RIT...</div>}
            {renderEventList(ALL_EVENTS)}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card-surface border border-desktop-bg rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 hover:bg-desktop-bg rounded-xl transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-primary-text">
                  {monthNames[month]} {year}
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-desktop-bg rounded-xl transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-desktop-bg border border-desktop-bg rounded-xl overflow-hidden">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="bg-app-bg py-2 text-center text-xs font-bold text-muted-text uppercase tracking-wider">
                    {day}
                  </div>
                ))}
                
                {/* Empty cells for offset */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="bg-card-surface min-h-[80px] sm:min-h-[100px] opacity-50" />
                ))}
                
                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                  
                  return (
                    <div key={day} className={`bg-card-surface min-h-[80px] sm:min-h-[100px] p-1 sm:p-2 border-t border-desktop-bg ${isToday ? 'bg-rit-orange/5' : ''}`}>
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-rit-orange text-white' : 'text-primary-text'}`}>
                          {day}
                        </span>
                      </div>
                      <div className="mt-1 space-y-1">
                        {dayEvents.map(event => (
                          <div 
                            key={event.id} 
                            className="text-[10px] sm:text-xs px-1.5 py-1 bg-desktop-bg rounded text-primary-text font-medium truncate flex items-center gap-1"
                            title={event.title}
                          >
                            <span className="shrink-0"><EventIcon type={event.type} /></span>
                            <span className="truncate">{event.title}</span>
                            {event.scope && <span className="shrink-0 ml-auto hidden sm:inline"><ScopeBadge scope={event.scope} size="sm" /></span>}
                            {favoritedEvents.includes(event.id) && <Star size={10} className="fill-rit-orange text-rit-orange shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly events list below the calendar view */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-primary-text mb-4">Events in {monthNames[month]} {year}</h2>
              {isFetching && <div className="text-sm text-secondary-text mb-4 animate-pulse">Syncing live events from RIT...</div>}
              {renderEventList(ALL_EVENTS.filter(e => {
                const eventMonth = parseInt(e.dateValue.split('-')[1], 10) - 1;
                const eventYear = parseInt(e.dateValue.split('-')[0], 10);
                
                if (e.endDateValue) {
                  const endMonth = parseInt(e.endDateValue.split('-')[1], 10) - 1;
                  const endYear = parseInt(e.endDateValue.split('-')[0], 10);
                  // Check if month falls within range (simplified for same year)
                  return (year === eventYear && month >= eventMonth && month <= endMonth);
                }
                
                return eventMonth === month && eventYear === year;
              }))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
