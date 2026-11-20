import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ExternalLink,
  GripVertical,
  Lock,
  Plus,
  Repeat2,
  Sparkles,
  Star,
} from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';
import { QUESTS, Quest, Term, Track } from '../data';
import { useGameStore } from '../store';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

const TERMS: Term[] = ['fall', 'spring', 'summer'];
const YEARS = [1, 2, 3, 4, 5];
const COOP_REQUIRED = 4;
const ItemTypes = { COOP: 'coop' };

const TRACKS: { id: Track; label: string; color: string; soft: string }[] = [
  { id: 'academic', label: 'Academic', color: 'bg-track-academic', soft: 'bg-track-academic/5' },
  { id: 'career', label: 'Career Development', color: 'bg-track-career', soft: 'bg-track-career/5' },
  { id: 'out-of-classroom', label: 'Out of Classroom', color: 'bg-track-out', soft: 'bg-track-out/5' },
];

function termIndex(year: number, term: Term) {
  return (year - 1) * 3 + TERMS.indexOf(term) + 1;
}

function getPlacement(
  quest: Quest,
  customPlacements: Record<string, { year: number; term: string } | 'bank'>,
  lockedPlacements: Record<string, { year: number; term: string }>,
) {
  if (lockedPlacements[quest.id]) return lockedPlacements[quest.id];
  if (customPlacements[quest.id]) return customPlacements[quest.id];
  if (quest.startsInBank) return 'bank';
  return { year: quest.year, term: quest.term };
}

export function MapView() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [activeTrack, setActiveTrack] = useState<Track | 'all'>('all');
  const [searchParams] = useSearchParams();
  const highlightQuest = searchParams.get('quest');
  const {
    completedQuests,
    contentOverrides,
    customPlacements,
    customQuests,
    lockedPlacements,
    moveQuest,
    role,
    toggleQuest,
    xp,
  } = useGameStore();

  const allQuests = useMemo(
    () =>
      [...QUESTS, ...(customQuests || [])].map((quest) => ({
        ...quest,
        ...((contentOverrides || {})[quest.id] || {}),
      })),
    [contentOverrides, customQuests],
  );

  const coops = allQuests.filter((quest) => quest.nodeType === 'coop');
  const placedCoops = coops.filter(
    (quest) => getPlacement(quest, customPlacements || {}, lockedPlacements || {}) !== 'bank',
  );
  const completedCoops = coops.filter((quest) => completedQuests.includes(quest.id)).length;
  const totalXP = allQuests.reduce((total, quest) => total + quest.xp, 0);
  const progressPercent = totalXP ? Math.min(100, Math.round((xp / totalXP) * 100)) : 0;
  const isAdvisor = role === 'advisor';

  const addCoop = (year: number, term: Term) => {
    const available = coops.find(
      (quest) => getPlacement(quest, customPlacements || {}, lockedPlacements || {}) === 'bank',
    );
    if (available) moveQuest(available.id, year, term);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-1 overflow-y-auto bg-app-bg pb-24 sm:pb-8">
        {isAdvisor && (
          <div className="bg-required text-white text-xs font-bold text-center py-2 flex items-center justify-center gap-2">
            <Lock size={14} /> ADVISOR MODE: Review and lock a student’s term placements.
          </div>
        )}

        <div className="sticky top-0 z-30 bg-card-surface/95 backdrop-blur-md border-b border-desktop-bg">
          <div className="max-w-screen-2xl mx-auto p-4 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="text-rit-orange" size={20} />
                  <h2 className="text-xl font-extrabold text-primary-text">MCET Major Map</h2>
                </div>
                <p className="text-sm text-secondary-text">
                  Plan five years across academics, career development, and life beyond the classroom.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-track-career/10 border border-track-career/20 rounded-xl px-4 py-2 min-w-44">
                  <div className="flex items-center justify-between gap-4 text-sm font-extrabold text-track-career">
                    <span className="flex items-center gap-2">
                      <BriefcaseBusiness size={16} /> Co-ops
                    </span>
                    <span>{completedCoops} of {COOP_REQUIRED} required</span>
                  </div>
                  <Progress.Root className="relative overflow-hidden bg-track-career/15 rounded-full w-full h-1.5 mt-2">
                    <Progress.Indicator
                      className="bg-track-career h-full transition-transform"
                      style={{ width: `${(completedCoops / COOP_REQUIRED) * 100}%` }}
                    />
                  </Progress.Root>
                </div>
                <div className="bg-desktop-bg rounded-xl px-4 py-2">
                  <div className="text-xs font-bold text-muted-text uppercase tracking-wider">Trail progress</div>
                  <div className="text-sm font-extrabold text-primary-text">{xp} XP · {progressPercent}%</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              {(['all', 'academic', 'career', 'out-of-classroom'] as const).map((track) => (
                <Button
                  key={track}
                  type="button"
                  size="sm"
                  variant={activeTrack === track ? 'default' : 'outline'}
                  onClick={() => setActiveTrack(track)}
                  className={activeTrack === track ? 'bg-primary-text text-white hover:bg-secondary-text' : 'bg-card-surface'}
                >
                  {track === 'all' ? 'All lanes' : TRACKS.find((item) => item.id === track)?.label}
                </Button>
              ))}
              <div className="ml-auto hidden md:flex items-center gap-2 text-xs font-semibold text-secondary-text">
                <Badge className="bg-required text-white border-transparent">Required</Badge>
                <Repeat2 size={14} className="text-track-out" /> Recurs every year
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-screen-2xl mx-auto p-4 sm:p-8">
          <div className="bg-card-surface border border-desktop-bg rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[1480px]">
                <div className="grid grid-cols-[180px_repeat(15,minmax(82px,1fr))] border-b border-desktop-bg">
                  <div className="sticky left-0 z-20 bg-primary-text text-white p-4 flex items-end">
                    <span className="text-xs font-extrabold uppercase tracking-wider">Swimlane</span>
                  </div>
                  {YEARS.map((year) => (
                    <div
                      key={year}
                      className="col-span-3 border-l border-desktop-bg bg-primary-text text-white text-center py-3"
                    >
                      <div className="font-extrabold">Year {year}</div>
                    </div>
                  ))}

                  <div className="sticky left-0 z-20 bg-desktop-bg border-t border-desktop-bg" />
                  {YEARS.flatMap((year) =>
                    TERMS.map((term) => (
                      <div
                        key={`${year}-${term}`}
                        className="bg-desktop-bg border-l border-t border-desktop-bg py-2 text-center text-[10px] font-extrabold uppercase tracking-wider text-secondary-text"
                      >
                        {term}
                      </div>
                    )),
                  )}
                </div>

                {TRACKS.filter((track) => activeTrack === 'all' || activeTrack === track.id).map((track) => (
                  <Swimlane
                    key={track.id}
                    track={track}
                    quests={allQuests.filter((quest) => quest.track === track.id)}
                    completedQuests={completedQuests}
                    customPlacements={customPlacements || {}}
                    lockedPlacements={lockedPlacements || {}}
                    placedCoops={placedCoops.length}
                    onAddCoop={addCoop}
                    onOpen={setSelectedQuest}
                    highlightedId={highlightQuest}
                  />
                ))}
              </div>
            </div>
          </div>

          <CoopPool
            coops={coops}
            customPlacements={customPlacements || {}}
            lockedPlacements={lockedPlacements || {}}
            onOpen={setSelectedQuest}
          />
        </main>

        <QuestSheet
          quest={selectedQuest}
          open={!!selectedQuest}
          onOpenChange={(open) => !open && setSelectedQuest(null)}
          completed={selectedQuest ? completedQuests.includes(selectedQuest.id) : false}
          onToggle={() => {
            if (selectedQuest) toggleQuest(selectedQuest.id);
          }}
        />
      </div>
    </DndProvider>
  );
}

function Swimlane({
  track,
  quests,
  completedQuests,
  customPlacements,
  lockedPlacements,
  placedCoops,
  onAddCoop,
  onOpen,
  highlightedId,
}: {
  track: (typeof TRACKS)[number];
  quests: Quest[];
  completedQuests: string[];
  customPlacements: Record<string, { year: number; term: string } | 'bank'>;
  lockedPlacements: Record<string, { year: number; term: string }>;
  placedCoops: number;
  onAddCoop: (year: number, term: Term) => void;
  onOpen: (quest: Quest) => void;
  highlightedId: string | null;
}) {
  const visibleQuests = quests.filter(
    (quest) => getPlacement(quest, customPlacements, lockedPlacements) !== 'bank',
  );

  return (
    <section className="grid grid-cols-[180px_1fr] border-b border-desktop-bg last:border-b-0">
      <div className={`sticky left-0 z-20 ${track.color} text-white p-5`}>
        <div className="font-extrabold leading-tight">{track.label}</div>
        <div className="text-xs text-white/75 mt-2">
          {track.id === 'academic' && 'Courses and advising milestones'}
          {track.id === 'career' && 'Co-op and professional preparation'}
          {track.id === 'out-of-classroom' && 'Community, events, and involvement'}
        </div>
      </div>

      <div className={`relative min-h-48 ${track.soft}`}>
        <div className="absolute inset-0 grid grid-cols-15 pointer-events-none">
          {YEARS.flatMap((year) =>
            TERMS.map((term) => (
              <TermDropCell
                key={`${year}-${term}`}
                year={year}
                term={term}
                careerLane={track.id === 'career'}
                canAddCoop={placedCoops < COOP_REQUIRED}
                onAddCoop={onAddCoop}
              />
            )),
          )}
        </div>

        <div className="relative grid grid-cols-15 gap-y-3 p-3 auto-rows-min">
          {visibleQuests.map((quest) => {
            const placement = getPlacement(quest, customPlacements, lockedPlacements);
            if (placement === 'bank') return null;
            return (
              <QuestNode
                key={quest.id}
                quest={quest}
                placement={placement as { year: number; term: string }}
                completed={completedQuests.includes(quest.id)}
                locked={!!lockedPlacements[quest.id]}
                highlighted={highlightedId === quest.id}
                onOpen={() => onOpen(quest)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TermDropCell({
  year,
  term,
  careerLane,
  canAddCoop,
  onAddCoop,
}: {
  year: number;
  term: Term;
  careerLane: boolean;
  canAddCoop: boolean;
  onAddCoop: (year: number, term: Term) => void;
}) {
  const moveQuest = useGameStore((state) => state.moveQuest);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.COOP,
      drop: (item: { id: string }) => moveQuest(item.id, year, term),
      collect: (monitor) => ({ isOver: monitor.isOver() }),
    }),
    [moveQuest, term, year],
  );

  return (
    <div
      ref={drop as never}
      className={`group border-l border-desktop-bg/80 first:border-l-0 transition-colors ${
        isOver ? 'bg-track-career/20 ring-2 ring-inset ring-track-career' : ''
      }`}
    >
      {careerLane && canAddCoop && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onAddCoop(year, term)}
          className="pointer-events-auto opacity-0 group-hover:opacity-100 focus:opacity-100 m-1 h-7 px-2 text-[10px] text-track-career hover:bg-track-career/10 hover:text-track-career"
          aria-label={`Add a co-op to Year ${year} ${term}`}
        >
          <Plus size={12} /> Co-op
        </Button>
      )}
    </div>
  );
}

function QuestNode({
  quest,
  placement,
  completed,
  locked,
  highlighted,
  onOpen,
}: {
  quest: Quest;
  placement: { year: number; term: string };
  completed: boolean;
  locked: boolean;
  highlighted: boolean;
  onOpen: () => void;
}) {
  const role = useGameStore((state) => state.role);
  const canDrag = quest.nodeType === 'coop' && !locked && role !== 'peer-mentor';
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.COOP,
      item: { id: quest.id },
      canDrag,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [canDrag, quest.id],
  );
  const start = termIndex(placement.year, placement.term as Term);
  const span = Math.min(quest.spanTerms || 1, 16 - start);
  const trackClasses =
    quest.track === 'academic'
      ? 'border-track-academic/30 hover:border-track-academic'
      : quest.track === 'career'
        ? 'border-track-career/30 hover:border-track-career'
        : 'border-track-out/30 hover:border-track-out';

  return (
    <div
      ref={drag as never}
      style={{ gridColumn: `${start} / span ${span}` }}
      className={`relative z-10 min-w-0 ${isDragging ? 'opacity-40' : ''}`}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onOpen}
        className={`h-full min-h-28 w-full whitespace-normal justify-start items-stretch text-left bg-card-surface p-3 rounded-xl border-2 shadow-sm hover:shadow-md transition-all ${
          highlighted ? 'ring-4 ring-rit-orange/30 border-rit-orange' : trackClasses
        } ${quest.featured ? 'bg-gold/10 border-gold' : ''}`}
      >
        <div className="w-full flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="font-extrabold text-sm leading-snug text-primary-text">{quest.title}</div>
            {canDrag && <GripVertical size={15} className="shrink-0 text-muted-text" />}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {quest.required && <Badge className="bg-required text-white border-transparent">Required</Badge>}
            {quest.recurring && (
              <Badge variant="outline" className="text-track-out border-track-out/30">
                <Repeat2 size={11} /> Every year
              </Badge>
            )}
            {quest.featured && (
              <Badge className="bg-gold text-primary-text border-transparent">
                <Sparkles size={11} /> Featured
              </Badge>
            )}
            {locked && (
              <Badge variant="outline" className="text-required border-required/30">
                <Lock size={11} /> Locked
              </Badge>
            )}
          </div>
          <div className="mt-auto pt-3 flex items-center justify-between text-[10px] font-bold text-muted-text">
            <span>{quest.timing || `Year ${placement.year} · ${placement.term}`}</span>
            {completed && <CheckCircle2 size={16} className="text-rit-orange" />}
          </div>
        </div>
      </Button>
    </div>
  );
}

function CoopPool({
  coops,
  customPlacements,
  lockedPlacements,
  onOpen,
}: {
  coops: Quest[];
  customPlacements: Record<string, { year: number; term: string } | 'bank'>;
  lockedPlacements: Record<string, { year: number; term: string }>;
  onOpen: (quest: Quest) => void;
}) {
  const available = coops.filter(
    (quest) => getPlacement(quest, customPlacements, lockedPlacements) === 'bank',
  );
  if (!available.length) return null;

  return (
    <aside className="mt-5 bg-card-surface border border-track-career/25 rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="font-extrabold text-primary-text flex items-center gap-2">
            <BriefcaseBusiness size={18} className="text-track-career" /> Co-op pool
          </h3>
          <p className="text-xs text-secondary-text mt-1">
            Drag a reusable co-op block into any eligible Fall, Spring, or Summer term.
          </p>
        </div>
        <Badge variant="outline" className="text-track-career border-track-career/30">
          {available.length} left to place
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {available.map((quest, index) => (
          <PoolCoop key={quest.id} quest={quest} label={`Co-op ${coops.length - available.length + index + 1}`} onOpen={() => onOpen(quest)} />
        ))}
      </div>
    </aside>
  );
}

function PoolCoop({ quest, label, onOpen }: { quest: Quest; label: string; onOpen: () => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COOP,
    item: { id: quest.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <Button
      ref={drag as never}
      type="button"
      variant="outline"
      onClick={onOpen}
      className={`border-track-career/30 bg-track-career/5 text-primary-text hover:bg-track-career/10 ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <GripVertical size={14} className="text-track-career" />
      {label}
      <Badge className="bg-required text-white border-transparent">Required</Badge>
    </Button>
  );
}

function QuestSheet({
  quest,
  open,
  onOpenChange,
  completed,
  onToggle,
}: {
  quest: Quest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  completed: boolean;
  onToggle: () => void;
}) {
  const [program, setProgram] = useState<'MCET' | 'ECET'>('MCET');
  if (!quest) return null;

  const isCoopClass = quest.id === 'c5';
  const description =
    isCoopClass && program === 'ECET'
      ? 'ECET students take ENGT-299, a one-credit course that prepares them for the co-op search and professional workplace expectations.'
      : quest.description ||
        (quest.required
          ? 'This required milestone supports progress through the MCET major map.'
          : 'This optional experience can strengthen your RIT journey and professional development.');
  const credits = isCoopClass && program === 'ECET' ? '1 credit' : quest.credits;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-app-bg border-desktop-bg w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="p-6 pb-3">
          <div className="flex flex-wrap items-center gap-2 pr-8">
            <Badge
              className={`text-white border-transparent ${
                quest.track === 'academic'
                  ? 'bg-track-academic'
                  : quest.track === 'career'
                    ? 'bg-track-career'
                    : 'bg-track-out'
              }`}
            >
              {TRACKS.find((track) => track.id === quest.track)?.label}
            </Badge>
            {quest.required && <Badge className="bg-required text-white border-transparent">Required</Badge>}
            {!quest.required && <Badge variant="outline">Optional</Badge>}
          </div>
          <SheetTitle className="text-2xl font-extrabold text-primary-text pt-3">{quest.title}</SheetTitle>
          <SheetDescription className="text-secondary-text leading-relaxed">{description}</SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-6 space-y-5">
          {isCoopClass && (
            <div className="bg-card-surface border border-desktop-bg rounded-xl p-1 flex">
              {(['MCET', 'ECET'] as const).map((option) => (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setProgram(option)}
                  className={`flex-1 ${program === option ? 'bg-track-career text-white hover:bg-track-career hover:text-white' : ''}`}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <DetailFact label="Timing" value={quest.timing || `Year ${quest.year} · ${quest.term}`} />
            <DetailFact label="Credits" value={credits || 'Not applicable'} />
            <DetailFact label="Status" value={quest.required ? 'Required' : 'Optional'} />
            <DetailFact label="XP reward" value={`${quest.xp} XP`} />
          </div>

          {quest.recurring && (
            <div className="bg-track-out/10 border border-track-out/20 rounded-xl p-4 flex gap-3">
              <Repeat2 className="text-track-out shrink-0" size={20} />
              <div>
                <div className="font-extrabold text-sm text-primary-text">Recurs every year</div>
                <div className="text-sm text-secondary-text mt-1">
                  This event appears once on the map, but students can participate again in future years.
                </div>
              </div>
            </div>
          )}

          {quest.resourceUrl && (
            <Button asChild variant="outline" className="w-full bg-card-surface">
              <a href={quest.resourceUrl} target="_blank" rel="noreferrer">
                Visit RIT resource <ExternalLink size={15} />
              </a>
            </Button>
          )}

          <Button
            type="button"
            onClick={onToggle}
            className={`w-full h-11 font-extrabold ${
              completed
                ? 'bg-card-surface text-rit-orange border-2 border-rit-orange hover:bg-rit-orange/5'
                : 'bg-rit-orange text-white hover:bg-deep-orange'
            }`}
          >
            {completed ? <CheckCircle2 size={18} /> : <Check size={18} />}
            {completed ? 'Completed' : 'Mark complete'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DetailFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card-surface border border-desktop-bg rounded-xl p-3">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-text">{label}</div>
      <div className="text-sm font-bold text-primary-text mt-1">{value}</div>
    </div>
  );
}
