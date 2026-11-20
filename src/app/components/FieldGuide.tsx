import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGameStore } from '../store';
import { GUIDES, GuideEntry, CATEGORY_DEFAULT_ICON, STARTER_GUIDE_IDS } from '../data';
import { Drawer } from 'vaul';
import { BookOpen, CheckCircle2, ExternalLink, MapPin, GitFork, RotateCcw, Shuffle, Zap, LayoutGrid, Layers, Sparkles, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { format, parseISO } from 'date-fns';

// Resolve a Lucide icon by name, with a safe fallback.
function DynIcon({ name, size, className, style }: { name?: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const Cmp = (name && (LucideIcons as any)[name]) || LucideIcons.Circle;
  return <Cmp size={size} className={className} style={style} />;
}

// Icon a card should show: its own, else a per-category default.
const iconFor = (guide: GuideEntry) => guide.icon || CATEGORY_DEFAULT_ICON[guide.category] || 'Circle';

// Deck categories in fixed order. Colors follow the deck spec exactly.
const DECKS: { key: GuideEntry['category']; text: string; tint: string }[] = [
  { key: 'Survival', text: '#0F6E56', tint: '#E1F5EE' },
  { key: 'Navigation', text: '#185FA5', tint: '#E6F1FB' },
  { key: 'Lore', text: '#993C1D', tint: '#FAECE7' },
  { key: 'MCET', text: '#534AB7', tint: '#EEEDFE' },
  { key: 'Safety', text: '#791F1F', tint: '#FCEBEB' },
  { key: 'Accessibility', text: '#0C447C', tint: '#E6F1FB' },
];

// Aggregate deck that spans every category.
const ALL_DECK = { key: 'All' as const, text: '#F76902', tint: '#FDE9DC' };

// Curated onboarding deck — a neutral view over hand-picked entries.
const STARTER_DECK = { key: 'Starter' as const, text: '#2B2118', tint: '#EDE4D6', label: 'Start here' };

const getDeck = (cat: string) => {
  if (cat === 'All') return ALL_DECK;
  if (cat === 'Starter') return STARTER_DECK;
  return DECKS.find(d => d.key === cat) || { key: cat as any, text: '#334155', tint: '#F1F5F9' };
};

export function FieldGuideView() {
  const navigate = useNavigate();
  const readGuides = useGameStore(s => s.readGuides) || [];
  const readGuide = useGameStore(s => s.readGuide);
  const xp = useGameStore(s => s.xp);
  const contentOverrides = useGameStore(s => s.contentOverrides) || {};
  const customGuides = useGameStore(s => s.customGuides) || [];
  const allGuides = [...GUIDES, ...(customGuides || [])];

  const guidesIn = (cat: string): GuideEntry[] => {
    if (cat === 'All') return allGuides;
    if (cat === 'Starter') return STARTER_GUIDE_IDS.map(id => allGuides.find(g => g.id === id)).filter(Boolean) as GuideEntry[];
    return allGuides.filter(g => g.category === cat);
  };
  const allIdsIn = (cat: string) => guidesIn(cat).map(g => g.id);
  const unreadIdsIn = (cat: string) => guidesIn(cat).filter(g => !readGuides.includes(g.id)).map(g => g.id);

  // Pick the first deck that still has unread cards, else the first deck.
  const initialCat = (DECKS.find(d => unreadIdsIn(d.key).length > 0) || DECKS[0]).key;

  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [order, setOrder] = useState<string[]>(() => allIdsIn(initialCat));
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'deck' | 'list'>('deck');

  const topCardRef = useRef<{ swipe: (dir: 'read' | 'skip') => void } | null>(null);

  // Every card in the category stays in the deck (read cards can be revisited).
  const deck = order.map(id => allGuides.find(g => g.id === id)).filter(Boolean) as GuideEntry[];
  const visible = deck.slice(0, 3);
  const topGuide = deck[0];

  const selectDeck = (cat: string) => {
    setActiveCategory(cat);
    setOrder(allIdsIn(cat));
  };

  // Move the top card to the back so the next one comes up (used by both skip and read).
  const advance = () => {
    if (!topGuide) return;
    const id = topGuide.id;
    setOrder(prev => [...prev.filter(x => x !== id), id]);
  };

  const skip = advance;

  const shuffle = () => {
    setOrder(prev => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  };

  const handleRead = (id: string) => {
    setSelectedGuide(id);
    readGuide(id); // +10 XP (once), confetti, trophy check — unchanged; safe on re-reads
    advance(); // keep the card in the deck, just cycle it to the back
  };

  // Opening from the list view: read it but don't disturb deck order.
  const openFromList = (id: string) => {
    setSelectedGuide(id);
    readGuide(id);
  };

  const listGuides = guidesIn(activeCategory);

  const drawerGuide = selectedGuide ? allGuides.find(g => g.id === selectedGuide) : null;
  const activeDeckColor = getDeck(activeCategory);

  // Starter deck placement: first normally, last once every entry is read.
  const starterTotal = guidesIn('Starter').length;
  const starterRead = guidesIn('Starter').filter(g => readGuides.includes(g.id)).length;
  const starterDone = starterTotal > 0 && starterRead === starterTotal;
  const chipDecks = starterDone
    ? [ALL_DECK, ...DECKS, STARTER_DECK]
    : [STARTER_DECK, ALL_DECK, ...DECKS];

  return (
    <div className="flex-1 overflow-y-auto bg-app-bg p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-rit-orange text-white rounded-2xl shadow-sm">
            <BookOpen size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-primary-text tracking-tight">The Field Guide</h1>
            <p className="text-secondary-text font-medium">Swipe through freshman survival secrets & campus lore</p>
          </div>
        </div>

        {/* Region 1: deck chips (left) + XP counter (right) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {chipDecks.map(d => {
              const isStarter = d.key === 'Starter';
              const label = isStarter ? STARTER_DECK.label : d.key;
              const total = guidesIn(d.key).length;
              const read = guidesIn(d.key).filter(g => readGuides.includes(g.id)).length;
              const isActive = activeCategory === d.key;
              const done = isStarter && starterDone;
              return (
                <button
                  key={d.key}
                  onClick={() => selectDeck(d.key)}
                  aria-pressed={isActive}
                  className="inline-flex items-center gap-1 font-bold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-app-bg"
                  style={{
                    borderRadius: 999,
                    fontSize: 12,
                    padding: '5px 11px',
                    backgroundColor: isActive ? d.tint : (isStarter ? 'var(--color-desktop-bg)' : 'transparent'),
                    color: isActive ? d.text : (isStarter ? 'var(--color-primary-text)' : 'var(--color-secondary-text)'),
                    borderColor: isActive ? d.text : (isStarter ? 'transparent' : 'var(--color-desktop-bg)'),
                    borderStyle: isStarter && !isActive ? 'dashed' : 'solid',
                  }}
                >
                  {isStarter && (done ? <Check size={12} /> : <Sparkles size={12} />)}
                  {label} {read}/{total}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 bg-rit-orange/10 text-rit-orange font-extrabold rounded-full px-3 py-1.5 text-sm shrink-0">
            <Zap size={16} className="fill-rit-orange" />
            {xp.toLocaleString()} XP
          </div>
        </div>

        {/* View toggle: swipe one-by-one vs. browse the whole list */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1 bg-card-surface border border-desktop-bg rounded-full p-1 shadow-sm">
            <button
              onClick={() => setViewMode('deck')}
              aria-pressed={viewMode === 'deck'}
              className={`inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rit-orange ${viewMode === 'deck' ? 'bg-rit-orange text-white shadow-sm' : 'text-secondary-text hover:text-primary-text'}`}
            >
              <Layers size={14} /> Deck
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-pressed={viewMode === 'list'}
              className={`inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rit-orange ${viewMode === 'list' ? 'bg-rit-orange text-white shadow-sm' : 'text-secondary-text hover:text-primary-text'}`}
            >
              <LayoutGrid size={14} /> List all
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          /* List view: browse every card in the deck and pick one to read */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {listGuides.map(guide => {
              const cat = getDeck(guide.category);
              const title = (contentOverrides || {})[guide.id]?.title || guide.title;
              const desc = (contentOverrides || {})[guide.id]?.desc || guide.shortDesc;
              const isRead = readGuides.includes(guide.id);
              return (
                <button
                  key={guide.id}
                  onClick={() => openFromList(guide.id)}
                  className="text-left rounded-[16px] overflow-hidden bg-card-surface flex items-stretch transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rit-orange"
                  style={{
                    boxShadow: CARD_SHADOW,
                    borderStyle: guide.rare ? 'solid' : undefined,
                    borderWidth: guide.rare ? 2 : undefined,
                    borderColor: guide.rare ? cat.text : undefined,
                  }}
                >
                  <div className="flex items-center justify-center shrink-0" style={{ width: 46, backgroundColor: cat.text }}>
                    <DynIcon name={iconFor(guide)} size={20} style={{ color: '#fff' }} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 p-4 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span style={{ fontSize: 10, letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 700, color: cat.text }}>
                        {guide.category}{guide.rare ? ' · RARE' : ''}
                      </span>
                      {isRead && (
                        <span className="inline-flex items-center gap-1 font-bold shrink-0" style={{ fontSize: 10, color: cat.text }}>
                          <CheckCircle2 size={12} /> Read
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-primary-text leading-snug" style={{ fontSize: 15 }}>{title}</span>
                    <span className="text-secondary-text" style={{ fontSize: 13, lineHeight: 1.4 }}>{desc}</span>
                  </div>
                </button>
              );
            })}
            {listGuides.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-text font-medium">
                No entries in this deck yet.
              </div>
            )}
          </div>
        ) : (
        <>
        {/* Region 2: card stage */}
        <div className="relative mx-auto" style={{ maxWidth: 360, height: 440 }}>
          {/* Peek cards behind the top card */}
          {visible.slice(1).map((guide, idx) => {
            const i = idx + 1;
            return (
              <div
                key={guide.id}
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  transform: `translateY(${i * 10}px) scale(${1 - i * 0.05})`,
                  opacity: 1 - i * 0.28,
                  zIndex: 10 - i,
                }}
              >
                <CardFace guide={guide} showText={false} />
              </div>
            );
          })}

          {/* Top interactive card */}
          {topGuide && (
            <TopCard
              key={topGuide.id}
              ref={topCardRef}
              guide={topGuide}
              onRead={() => handleRead(topGuide.id)}
              onSkip={skip}
            />
          )}

          {/* Empty / completed deck state */}
          {!topGuide && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3 rounded-[20px] p-6"
              style={{ backgroundColor: activeDeckColor.tint, border: `0.5px solid ${activeDeckColor.text}33` }}
            >
              <div className="p-3 rounded-2xl" style={{ backgroundColor: '#ffffffaa', color: activeDeckColor.text }}>
                <CheckCircle2 size={32} />
              </div>
              <p className="font-extrabold text-lg" style={{ color: activeDeckColor.text }}>No entries yet</p>
              <p className="text-sm font-medium" style={{ color: activeDeckColor.text, opacity: 0.85 }}>
                This {activeCategory} deck is empty for now. Pick another deck to keep exploring.
              </p>
            </div>
          )}
        </div>

        {/* Region 3: action row + hint */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => topCardRef.current?.swipe('skip')}
            disabled={!topGuide}
            aria-label="Skip this card"
            className="flex flex-col items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <span className="p-3 rounded-full bg-card-surface border-2 border-desktop-bg text-secondary-text shadow-sm group-hover:border-progress-track transition-colors">
              <RotateCcw size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-text">Skip</span>
          </button>

          <button
            onClick={() => topCardRef.current?.swipe('read')}
            disabled={!topGuide}
            aria-label="Read this secret"
            className="flex flex-col items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <span className="p-4 rounded-full bg-rit-orange text-white shadow-lg shadow-rit-orange/30 group-hover:-translate-y-1 transition-transform">
              <BookOpen size={26} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rit-orange">Read Secret</span>
          </button>

          <button
            onClick={shuffle}
            disabled={deck.length < 2}
            aria-label="Shuffle the deck"
            className="flex flex-col items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <span className="p-3 rounded-full bg-card-surface border-2 border-desktop-bg text-secondary-text shadow-sm group-hover:border-progress-track transition-colors">
              <Shuffle size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-text">Shuffle</span>
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-muted-text font-medium">
          Swipe right or tap a card to read a secret (+10 XP) · swipe left for the next card · read cards stay in the deck to revisit
        </p>
        </>
        )}
      </div>

      {/* Reading drawer — preserves full content, links, XP, and trophy logic */}
      <Drawer.Root open={!!selectedGuide} onOpenChange={(open) => !open && setSelectedGuide(null)}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <Drawer.Content className="bg-app-bg flex flex-col rounded-t-[32px] h-[85vh] mt-24 fixed bottom-0 left-0 right-0 z-50">
            <div className="pt-4 bg-card-surface rounded-t-[32px] flex-1 flex flex-col min-h-0 overflow-hidden max-w-2xl mx-auto w-full border-t border-desktop-bg">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-progress-track mb-6" />
              {drawerGuide && (() => {
                const cat = getDeck(drawerGuide.category);
                const title = (contentOverrides || {})[drawerGuide.id]?.title || drawerGuide.title;
                const desc = (contentOverrides || {})[drawerGuide.id]?.desc || drawerGuide.shortDesc;
                const url = (contentOverrides || {})[drawerGuide.id]?.url || drawerGuide.url;
                const content = (contentOverrides || {})[drawerGuide.id]?.content || drawerGuide.content;
                const stats = (drawerGuide.stats || []).slice(0, 2);
                const facts = (drawerGuide.facts || []).slice(0, 4);
                const tip = drawerGuide.tip;
                return (
                  <div className="flex-1 overflow-y-auto px-5 pb-8 min-h-0">
                    <div className="rounded-[16px] overflow-hidden bg-card-surface" style={{ boxShadow: CARD_SHADOW }}>
                      {/* Header block */}
                      <div className="relative" style={{ backgroundColor: cat.text, padding: '18px 20px 20px' }}>
                        <div
                          className="absolute flex items-center justify-center rounded-full"
                          style={{ top: 16, right: 16, width: 34, height: 34, backgroundColor: 'rgba(255,255,255,0.16)' }}
                        >
                          <DynIcon name={iconFor(drawerGuide)} size={18} style={{ color: '#fff' }} />
                        </div>
                        <div style={{ fontSize: 10, letterSpacing: '0.6px', textTransform: 'uppercase', color: cat.tint, marginBottom: 8, fontWeight: 700, paddingRight: 42 }}>
                          {drawerGuide.category}{drawerGuide.rare ? ' · RARE' : ''}
                        </div>
                        <Drawer.Title style={{ fontSize: 21, fontWeight: 500, lineHeight: 1.2, color: '#fff', paddingRight: 42 }}>{title}</Drawer.Title>
                        <Drawer.Description className="sr-only">{desc}</Drawer.Description>
                      </div>

                      {/* Body block */}
                      <div style={{ padding: '16px 20px 18px' }}>
                        {stats.length > 0 && (
                          <div className="flex" style={{ gap: 10, marginBottom: 14 }}>
                            {stats.map((s, i) => (
                              <div key={i} className="flex-1" style={{ backgroundColor: 'var(--color-desktop-bg)', borderRadius: 10, padding: '10px 12px' }}>
                                <div style={{ fontSize: 22, fontWeight: 500, lineHeight: 1, color: 'var(--color-primary-text)' }}>{s.value}</div>
                                <div style={{ fontSize: 11, marginTop: 3, color: 'var(--color-secondary-text)' }}>{s.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {facts.length > 0 ? (
                          <div className="flex flex-col" style={{ gap: 9 }}>
                            {facts.map((f, i) => (
                              <div key={i} className="flex items-start" style={{ gap: 10 }}>
                                <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 22, height: 22, marginTop: 1, backgroundColor: cat.tint }}>
                                  <DynIcon name={f.icon || 'Check'} size={13} style={{ color: cat.text }} />
                                </div>
                                <p style={{ fontSize: 13, lineHeight: 1.5 }}>
                                  <span style={{ fontWeight: 500, color: 'var(--color-primary-text)' }}>{f.lead} </span>
                                  <span style={{ color: 'var(--color-secondary-text)' }}>{f.detail}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div
                            className="text-sm text-primary-text leading-relaxed [&>h4]:text-primary-text [&>h4]:font-bold [&>h4]:text-sm [&>h4]:mt-4 [&>h4]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>ol]:mb-3 [&>p]:mb-3 last:[&>p]:mb-0 [&_strong]:font-semibold"
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        )}

                        {tip && (
                          <div style={{ marginTop: 14, borderLeft: '3px solid #EF9F27', backgroundColor: '#FAEEDA', padding: '9px 12px', fontSize: 12, color: '#633806', borderRadius: '0 6px 6px 0', lineHeight: 1.5 }}>
                            {tip}
                          </div>
                        )}

                        {/* Footer row */}
                        <div className="flex items-center justify-between gap-3" style={{ marginTop: 14, borderTop: '0.5px solid rgba(0,0,0,0.12)', paddingTop: 12 }}>
                          <span className="inline-flex items-center gap-1.5" style={{ fontSize: 12, color: cat.text, fontWeight: 600 }}>
                            <CheckCircle2 size={14} /> +10 XP earned
                          </span>
                          {url && (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-desktop-bg text-secondary-text hover:text-primary-text transition-colors shrink-0"
                            >
                              <ExternalLink size={13} /> Resource
                            </a>
                          )}
                        </div>

                        {drawerGuide.lastVerified && (() => {
                          let stamp = '';
                          try { stamp = format(parseISO(drawerGuide.lastVerified), 'LLLL yyyy'); } catch { stamp = ''; }
                          return stamp ? (
                            <div className="text-muted-text" style={{ fontSize: 11, marginTop: 12 }}>
                              Verified {stamp}
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>

                    {/* Cross-links (kept from before) */}
                    {(drawerGuide.mapLocationId || drawerGuide.relatedQuestId) && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {drawerGuide.mapLocationId && (
                          <button
                            onClick={() => navigate(`/campus?focus=${encodeURIComponent(drawerGuide.mapLocationId!)}`)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-secondary-text bg-desktop-bg hover:bg-progress-track hover:text-primary-text transition-colors"
                          >
                            <MapPin size={16} /> Show on map
                          </button>
                        )}
                        {drawerGuide.relatedQuestId && (
                          <button
                            onClick={() => navigate(`/?quest=${encodeURIComponent(drawerGuide.relatedQuestId!)}`)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-secondary-text bg-desktop-bg hover:bg-progress-track hover:text-primary-text transition-colors"
                          >
                            <GitFork size={16} /> Related quest
                          </button>
                        )}
                      </div>
                    )}

                    <div className="mt-6">
                      <button
                        onClick={() => setSelectedGuide(null)}
                        className="w-full py-4 bg-desktop-bg text-primary-text hover:bg-progress-track rounded-xl font-bold transition-colors"
                      >
                        Close Guide
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}

const CARD_SHADOW = '0 1px 2px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.06)';

const CardFace = ({ guide, showText }: { guide: GuideEntry; showText: boolean }) => {
  const cat = getDeck(guide.category);
  const contentOverrides = useGameStore(s => s.contentOverrides) || {};
  const readGuides = useGameStore(s => s.readGuides) || [];
  const title = contentOverrides[guide.id]?.title || guide.title;
  const desc = contentOverrides[guide.id]?.desc || guide.shortDesc;
  const isRead = readGuides.includes(guide.id);

  return (
    <div
      className="absolute inset-0 rounded-[16px] overflow-hidden select-none flex flex-col bg-card-surface"
      style={{
        boxShadow: CARD_SHADOW,
        borderStyle: guide.rare ? 'solid' : undefined,
        borderWidth: guide.rare ? 2 : undefined,
        borderColor: guide.rare ? cat.text : undefined,
      }}
    >
      {/* Solid category header */}
      <div className="relative shrink-0" style={{ backgroundColor: cat.text, padding: '24px 26px 26px' }}>
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 20, right: 20, width: 42, height: 42, backgroundColor: 'rgba(255,255,255,0.16)' }}
        >
          <DynIcon name={iconFor(guide)} size={22} style={{ color: '#fff' }} />
        </div>
        {showText && (
          <>
            <div style={{ fontSize: 11, letterSpacing: '0.7px', textTransform: 'uppercase', color: cat.tint, marginBottom: 10, fontWeight: 700, paddingRight: 52 }}>
              {guide.category}{guide.rare ? ' · RARE' : ''}
            </div>
            <div style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.2, color: '#fff', paddingRight: 52 }}>
              {title}
            </div>
          </>
        )}
      </div>

      {/* Body teaser */}
      {showText && (
        <div className="flex-1 flex flex-col" style={{ padding: '20px 26px 24px' }}>
          <p className="text-secondary-text" style={{ fontSize: 15, lineHeight: 1.55 }}>{desc}</p>
          <div className="mt-auto pt-3 flex items-center gap-1.5" style={{ color: cat.text }}>
            {isRead ? (
              <><CheckCircle2 size={16} /><span style={{ fontSize: 13, fontWeight: 600 }}>+10 XP earned</span></>
            ) : (
              <span style={{ fontSize: 13, fontWeight: 600 }}>Tap to read · +10 XP</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TopCard = forwardRef<
  { swipe: (dir: 'read' | 'skip') => void },
  { guide: GuideEntry; onRead: () => void; onSkip: () => void }
>(({ guide, onRead, onSkip }, ref) => {
  const [leaving, setLeaving] = useState<'read' | 'skip' | null>(null);
  const movedRef = useRef(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-14, 14]);

  useImperativeHandle(ref, () => ({
    swipe: (dir) => setLeaving(dir),
  }));

  const dir = leaving === 'read' ? 1 : -1;

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-rit-orange rounded-[20px]"
      style={{ x, rotate, zIndex: 20 }}
      tabIndex={0}
      role="button"
      aria-label={`Read secret: ${guide.title}. Press Enter to open.`}
      drag={leaving ? false : 'x'}
      dragSnapToOrigin
      dragElastic={0.6}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={leaving ? { x: dir * 460, opacity: 0 } : { opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      onDrag={(_, info) => {
        if (Math.abs(info.offset.x) > 5) movedRef.current = true;
      }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110) setLeaving('read');
        else if (info.offset.x < -110) setLeaving('skip');
      }}
      onClick={() => {
        if (movedRef.current) { movedRef.current = false; return; }
        setLeaving('read');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLeaving('read'); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); setLeaving('skip'); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); setLeaving('read'); }
      }}
      onAnimationComplete={() => {
        if (leaving === 'read') onRead();
        else if (leaving === 'skip') onSkip();
      }}
    >
      <CardFace guide={guide} showText={true} />
    </motion.div>
  );
});

TopCard.displayName = 'TopCard';
