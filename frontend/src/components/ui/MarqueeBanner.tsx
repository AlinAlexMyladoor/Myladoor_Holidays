import React from 'react';

const brands = [
  'Airport Transfers', 'Corporate Travel', 'Wedding Journeys', 'Pilgrimages',
  'School Trips', 'Outstation Tours', 'Event Convoys', 'City Tours',
  'Medical Transport', 'Sports Teams', 'Film Productions', 'Luxury Travel',
];

export const MarqueeBanner = () => {
  const marqueeItems = [...brands, ...brands]; // doubled for seamless loop

  return (
    <div className="py-5 bg-yellow-400 overflow-hidden relative">
      <div className="flex marquee-track gap-0">
        {marqueeItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-8 shrink-0"
          >
            <span className="text-black font-black text-xs tracking-[0.3em] uppercase whitespace-nowrap">
              {item}
            </span>
            <span className="text-black/40 text-base">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};
