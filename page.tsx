'use client';

import React, { useState, useEffect } from 'react';

export default function BirthdayWeb() {
  // CONFIGURABLE DATA
  const PIN_CODE = "060903";
  const PARTNER_NAME = "seng";
  const MY_NAME = "lia";

  // State Management
  const [pin, setPin] = useState<string>("");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isGiftOpened, setIsGiftOpened] = useState<boolean>(false);
  const [activeFlowerMsg, setActiveFlowerMsg] = useState<string>("");
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [jarNote, setJarNote] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Data Bunga & Pesan
  const flowers = [
    { icon: "🌹", msg: "You are the finest rose that ever bloomed — full of love and unmatched beauty." },
    { icon: "🌻", msg: "Like a sunflower, you always turn toward the light and share your warmth with everyone around you." },
    { icon: "🌸", msg: "You are as beautiful as cherry blossoms — lovely and bringing joy wherever you go." },
  ];

  // Data Foto Polaroid
  const photos = [
    { url: "/1.jpeg", caption: "Our very first sunset together" },
    { url: "/2.jpeg", caption: "Our favourite café in the corner of the city" },
    { url: "/3.jpeg", caption: "First time at the beach, just the two of us" },
  ];

  // Data Playlist Lagu
  const playlist = [
    { title: "An Art Gallery Could Never Be As Unique As You", artist: "mrld", src: "/music1.mp3" },
    { title: "Shape Of My Heart", artist: "Backstreet Boys", src: "/music2.mp3" },
    { title: "Lover", artist: "Taylor Swift", src: "/music3.mp3" },
  ];

  // Data Catatan Toples (Shake the Jar)
  const jarNotes = [
    "Your spirit in the face of challenges inspires me every single day. 🕸️",
    "Your presence alone is enough to make any room feel warmer.",
    "Thank you for being the most patient and caring person in my life.",
  ];

  // Keypad PIN Handler
  const handleKeyClick = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === PIN_CODE) {
        setTimeout(() => setIsUnlocked(true), 300);
      }
    }
  };

  const handleBackspace = () => setPin(pin.slice(0, -1));

  const shakeJar = () => {
    const randomNote = jarNotes[Math.floor(Math.random() * jarNotes.length)];
    setJarNote(randomNote);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A030A] via-[#0D0B1D] to-[#050614] text-red-100 font-serif flex flex-col items-center justify-start relative overflow-x-hidden p-4">
      
      {/* Background Falling Flowers Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20 flex justify-around">
        <span className="animate-bounce delay-100 text-lg">🌸</span>
        <span className="animate-bounce delay-300 text-lg">🌺</span>
        <span className="animate-bounce delay-200 text-lg">🌸</span>
        <span className="animate-bounce delay-500 text-lg">🌺</span>
      </div>

      {/* ---------------- STEP 1: PIN LOCK SCREEN ---------------- */}
      {!isUnlocked && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#1A030A] via-[#0D0B1D] to-[#050614] flex flex-col items-center justify-center p-6">
          <div className="text-3xl mb-2 animate-pulse">🕸️🌸</div>
          <h1 className="text-2xl font-light tracking-wide text-red-200 mb-1">For You, My Love</h1>
          <p className="text-xs text-red-300/60 mb-8">Enter our secret code</p>

          {/* Dots Indicator */}
          <div className="flex gap-3 mb-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full border border-red-400/60 transition-all ${
                  i < pin.length ? 'bg-red-500 shadow-[0_0_10px_#ef4444] scale-110' : 'bg-transparent'
                }`}
              />
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
            {['1','2','3','4','5','6','7','8','9'].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyClick(num)}
                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-xl font-light hover:bg-red-900/40 active:scale-95 transition flex items-center justify-center mx-auto text-red-100 shadow-md"
              >
                {num}
              </button>
            ))}
            <button onClick={() => setPin("")} className="w-16 h-16 rounded-full text-xs text-red-300/50 flex items-center justify-center mx-auto">
              ✕
            </button>
            <button
              onClick={() => handleKeyClick('0')}
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-xl font-light hover:bg-red-900/40 active:scale-95 transition flex items-center justify-center mx-auto text-red-100 shadow-md"
            >
              0
            </button>
            <button onClick={handleBackspace} className="w-16 h-16 rounded-full text-lg text-red-300 flex items-center justify-center mx-auto">
              ⌫
            </button>
          </div>
          <p className="mt-8 text-xs text-red-300/40">Hint: Our secret PIN 💕</p>
        </div>
      )}

      {/* ---------------- STEP 2: GIFT BOX ANIMATION ---------------- */}
      {isUnlocked && !isGiftOpened && (
        <div className="fixed inset-0 z-40 bg-gradient-to-b from-[#1A030A] to-[#050614] flex flex-col items-center justify-center p-6 animate-fadeIn">
          <p className="text-sm text-red-200/80 mb-6 tracking-wide">Tap the gift box to open it 🎁</p>
          <button
            onClick={() => setIsGiftOpened(true)}
            className="text-8xl hover:scale-110 active:scale-95 transition-transform duration-300 animate-bounce cursor-pointer filter drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]"
          >
            🎁
          </button>
        </div>
      )}

      {/* ---------------- STEP 3: MAIN CONTENT ---------------- */}
      {isGiftOpened && (
        <div className="w-full max-w-md flex flex-col items-center gap-12 pt-8 pb-20 animate-fadeIn">
          
          {/* Header */}
          <div className="text-center flex flex-col items-center">
            <span className="text-xs text-red-300/60 uppercase tracking-widest mb-2">🌸 Your Special Day 🌸</span>
            <h1 className="text-4xl font-serif text-red-200 mb-2">Happy Birthday {PARTNER_NAME}</h1>
            <div className="text-xs text-red-300/40 animate-pulse mt-4">↓ SCROLL ↓</div>
          </div>

          {/* Section 1: Digital Bouquet */}
          <div className="w-full bg-white/5 border border-red-900/30 rounded-3xl p-6 text-center backdrop-blur-md shadow-xl">
            <span className="text-[10px] text-red-300/50 tracking-widest uppercase block mb-1">— MY FIRST GIFT —</span>
            <h2 className="text-xl text-red-200 font-serif mb-1">A Digital Bouquet</h2>
            <p className="text-xs text-red-300/70 mb-6">Each flower holds a little message just for you</p>

            <div className="flex justify-center gap-6 text-4xl mb-6">
              {flowers.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFlowerMsg(f.msg)}
                  className="hover:scale-125 active:scale-90 transition-transform duration-200 filter drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                >
                  {f.icon}
                </button>
              ))}
            </div>

            {activeFlowerMsg ? (
              <div className="p-4 bg-black/40 rounded-2xl border border-red-500/20 text-xs text-red-100 animate-fadeIn">
                "{activeFlowerMsg}"
              </div>
            ) : (
              <p className="text-xs text-red-300/40 italic">Touch each flower to reveal its message 💕</p>
            )}
          </div>

          {/* Section 2: Letter For You */}
          <div className="w-full bg-white/5 border border-red-900/30 rounded-3xl p-6 text-center backdrop-blur-md relative shadow-xl">
            <span className="text-[10px] text-red-300/50 tracking-widest uppercase block mb-1">— FROM MY HEART —</span>
            <h2 className="text-xl text-red-200 font-serif mb-4">A Letter For You 💌</h2>
            
            <div className="text-left text-xs leading-relaxed text-red-100/90 space-y-3 font-sans">
              <p className="font-serif text-base font-bold text-red-200 tracking-wider">HAPPY BIRTHDAY SAYANG</p>
              <p>happy 22nd birthday, {PARTNER_NAME}. 🤍</p>
              <p>semoga di umur yang baru ini kamu selalu dikasih kesehatan, banyak hal baik, dan alasan-alasan kecil buat senyum setiap hari. semoga semua yang lagi kamu usahain pelan-pelan menemukan jalannya, even the things you haven't told anyone about yet.</p>
              <p>i hope this year brings you more good days, more random laughs, more places to go, and more moments that make you think, “okay, life is actually pretty nice.”</p>
              <p>jaga diri baik-baik, makan yang bener, jangan terlalu keras sama diri sendiri, and please remember that you deserve good things too.</p>
              <p>anyway, enough of the serious birthday speech. enjoy your day, {PARTNER_NAME}. this tiny corner of the internet is just here to remind you that today is yours. ❤️</p>
              <div className="text-right font-serif text-sm pt-4">
                with love,<br />
                <span className="font-bold text-red-300">-{MY_NAME} 🕸️</span>
              </div>
            </div>
          </div>

          {/* Section 3: Photo Memories */}
          <div className="w-full text-center">
            <span className="text-[10px] text-red-300/50 tracking-widest uppercase block mb-1">— A COLLECTION OF MEMORIES —</span>
            <h2 className="text-xl text-red-200 font-serif mb-6">Our Photo Memories</h2>

            <div className="flex flex-col gap-6">
              {photos.map((p, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-full aspect-square bg-slate-200 rounded-lg overflow-hidden mb-3">
                    <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-slate-800 text-xs font-serif italic text-center">{p.caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Special Playlist */}
          <div className="w-full bg-white/5 border border-red-900/30 rounded-3xl p-6 text-center backdrop-blur-md shadow-xl">
            <span className="text-[10px] text-red-300/50 tracking-widest uppercase block mb-1">— OUR SONGS —</span>
            <h2 className="text-xl text-red-200 font-serif mb-6">Special Playlist</h2>

            <div className="flex flex-col items-center mb-6">
              <div className={`w-24 h-24 rounded-full border-4 border-red-500/40 flex items-center justify-center bg-black/60 shadow-[0_0_20px_rgba(239,68,68,0.2)] mb-4 ${isPlaying ? 'animate-spin' : ''}`}>
                <span className="text-2xl">🕷️</span>
              </div>
              <h3 className="text-sm font-semibold text-red-100 max-w-[200px] truncate">{playlist[currentSong].title}</h3>
              <p className="text-xs text-red-300/60">{playlist[currentSong].artist}</p>
            </div>

            <div className="flex justify-center items-center gap-6 mb-6">
              <button onClick={() => setCurrentSong((prev) => (prev > 0 ? prev - 1 : playlist.length - 1))} className="text-lg">⏮</button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-red-600/80 flex items-center justify-center text-white text-lg shadow-lg">
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button onClick={() => setCurrentSong((prev) => (prev < playlist.length - 1 ? prev + 1 : 0))} className="text-lg">⏭</button>
            </div>

            <div className="flex flex-col gap-2 text-left text-xs">
              {playlist.map((song, i) => (
                <div
                  key={i}
                  onClick={() => { setCurrentSong(i); setIsPlaying(true); }}
                  className={`p-3 rounded-xl cursor-pointer flex justify-between items-center transition ${
                    currentSong === i ? 'bg-red-900/40 border border-red-500/40' : 'bg-white/5'
                  }`}
                >
                  <div className="pr-2 truncate">
                    <p className="font-semibold truncate">{song.title}</p>
                    <p className="text-[10px] text-red-300/50">{song.artist}</p>
                  </div>
                  <span className="text-xs">{currentSong === i ? '🎶' : ''}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Jar of Gratitude */}
          <div className="w-full bg-white/5 border border-red-900/30 rounded-3xl p-6 text-center backdrop-blur-md shadow-xl">
            <span className="text-[10px] text-red-300/50 tracking-widest uppercase block mb-1">— FROM MY HEART TO YOURS —</span>
            <h2 className="text-xl text-red-200 font-serif mb-2">Reasons I'm Grateful</h2>
            <p className="text-xs text-red-300/60 mb-6">Shake the jar and pick a note 🫙</p>

            <button
              onClick={shakeJar}
              className="px-6 py-2.5 rounded-full bg-red-800/40 border border-red-500/40 text-xs text-red-100 hover:bg-red-700/50 active:scale-95 transition mb-4 shadow-md"
            >
              🫙 Shake the Jar
            </button>

            {jarNote && (
              <div className="p-4 bg-black/40 rounded-2xl border border-red-500/20 text-xs text-red-100 animate-fadeIn">
                "{jarNote}"
              </div>
            )}
          </div>

          {/* Final Button / Pop-up trigger */}
          <button
            onClick={() => setShowPopup(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-700 via-rose-800 to-indigo-900 text-white font-serif text-sm font-semibold shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:opacity-90 active:scale-98 transition"
          >
            Click for Final Birthday Wishes ✨
          </button>

        </div>
      )}

      {/* Pop-up Birthday Card */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-gradient-to-b from-[#2A0512] to-[#0A0C1E] border border-red-500/40 rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl relative">
            <div className="text-4xl mb-3">🎂</div>
            <h3 className="text-2xl font-serif text-red-200 mb-1">Happy Birthday!</h3>
            <p className="text-xs text-red-300/60 mb-4">The most special {PARTNER_NAME} 🕸️🌸</p>
            <p className="text-xs text-red-100/80 leading-relaxed mb-6">
              May your life always be filled with flowers, love, and endless happiness! 💕
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-xs text-red-200 hover:bg-white/20 transition"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}