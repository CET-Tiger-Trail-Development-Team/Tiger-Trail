import React from 'react';
import { MapPin, Navigation, X } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { CAMPUS_LOCATIONS } from '../data';

export function CampusMap() {
  const [showTip, setShowTip] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const focusId = searchParams.get('focus') || undefined;
  const focusName = focusId ? CAMPUS_LOCATIONS[focusId] : undefined;

  const clearFocus = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('focus');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="flex-1 overflow-hidden bg-app-bg flex flex-col">
      <div className="p-4 sm:p-8 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="p-3 bg-rit-orange text-white rounded-2xl shadow-sm">
            <MapPin size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-primary-text tracking-tight">RIT Campus Map</h1>
            <p className="text-secondary-text font-medium">Find your way around Brick City</p>
          </div>
        </div>
        {focusName && (
          <div className="max-w-4xl mx-auto mt-4 flex items-center justify-between gap-3 bg-rit-orange/10 border-2 border-rit-orange/30 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="bg-rit-orange text-white p-2 rounded-lg shrink-0 shadow-sm">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-rit-orange">Highlighted location</p>
                <p className="font-bold text-primary-text leading-tight">{focusName}</p>
              </div>
            </div>
            <button
              onClick={clearFocus}
              aria-label="Clear highlighted location"
              className="text-muted-text hover:text-rit-orange p-1.5 bg-card-surface rounded-md transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rit-orange"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto p-4 sm:px-8 pb-8 pt-0 flex flex-col">
        <div className="bg-card-surface border border-desktop-bg rounded-3xl p-2 shadow-sm flex-1 relative overflow-hidden flex flex-col">
          {showTip && (
            <div className="absolute bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto z-10 bg-card-surface/90 backdrop-blur-md p-3 rounded-xl shadow-lg border-2 border-rit-orange/30 flex items-start sm:items-center justify-between gap-3 sm:max-w-md pointer-events-auto transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-rit-orange/10 p-2 rounded-lg shrink-0">
                  <Navigation className="text-rit-orange" size={20} />
                </div>
                <p className="text-xs font-bold text-primary-text leading-snug">Tip: Zoom in to find specific buildings like Gleason Hall (Bldg 70) for MCET labs!</p>
              </div>
              <button onClick={() => setShowTip(false)} className="text-muted-text hover:text-rit-orange p-1 bg-desktop-bg rounded-md transition-colors shrink-0">
                <X size={14} />
              </button>
            </div>
          )}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11659.551465225134!2d-77.6836938951253!3d43.08459469828551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d14c603a147e55%3A0xbe7eb31ed5e22c03!2sRochester%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1684340000000!5m2!1sen!2sus" 
            className="w-full h-full rounded-2xl border-0"
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
