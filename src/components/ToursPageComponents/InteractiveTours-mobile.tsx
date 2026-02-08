import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  images: {
    MJAlmondFlowerV1: ImageMetadata;
    MJAlmondFlowerMosaicGlass: ImageMetadata;
    MJBachusMosaicGlass: ImageMetadata;
    MJGlühweinV1: ImageMetadata;
    MJWallWithGrapes: ImageMetadata;
    MJGlühweinV2: ImageMetadata;
    WassermühleImWald: ImageMetadata;
  };
  backgroundImage: ImageMetadata;
  className: string;
}

const InteractiveToursMobile = ({ images, backgroundImage, className }: Props) => {
  const mobileTours = [
    {
      id: "welcome",
      info: "Touren & Events",
      title: "Entdecken Sie meine interaktiven Touren",
      subtitle:
        "Lassen Sie sich von mir durch die malerischen Weinberge und den historischen Ortskern Gimmeldingens und durch seine Vergangenheit führen.",
      season: "Willkommen",
      stats: {
        duration: "4 Std.",
        distance: "4 km",
        wines: "5 Weine",
        type: "Teamevent"
      },
      images: {
        card: images.MJAlmondFlowerMosaicGlass.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-contain",
      },
      longDescription: `
      <p class="mb-6 text-stone-700 text-lg leading-relaxed font-semibold text-center mt-2">
        Erleben Sie die Pfalz von ihrer schönsten Seite. 
      </p>
      <div class="space-y-4 text-gray-700 leading-relaxed text-center px-2">
        <p>Lassen Sie sich von mir durch die malerischen Weinberge, den historischen Ortskern Gimmeldingens und durch seine bewegte Vergangenheit führen.</p>
        <p>Meine Touren verbinden Genuss, Natur und Geschichte zu einem einzigartigen Erlebnis. Ob Mandelblüte, sommerliche Frische oder winterlicher Glühweinzauber – für jede Jahreszeit gibt es die perfekte Entdeckungsreise.</p>
        <p class="font-bold text-accent1 mt-6">Wählen Sie unten eine Tour aus, um mehr zu erfahren.</p>
      </div>
      `,
    },
    {
      id: "mandelbluete",
      info: "Frühling",
      title: "Mandelblüte, Meerspinne und Monarchen",
      subtitle:
        "Erleben Sie den Frühling in Gimmeldingen mit Wein, Mandelblüte und lebendigen Geschichten.",
      season: "Frühling",
      stats: {
        duration: "4 Std.",
        distance: "4 km",
        wines: "5 Weine",
        type: "Genuss"
      },
      images: {
        card: images.MJAlmondFlowerMosaicGlass.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-contain",
      },
      longDescription: `
        <h3 class="font-bonanova font-bold text-accent1 text-xl mb-2 text-center">Frühling genießen mit allen Sinnen</h3>
        <p class="mb-8 text-gray-700 leading-relaxed text-center">Wenn die Mandelbäume blühen und die Weinberge erwachen, beginnt ein Erlebnis der besonderen Art. Auf dieser Tour erwarten Sie fünf erlesene Weine, feinste Mandelköstlichkeiten und lebendige Geschichte.</p>
        
        <div class="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/50">
          <ul class="space-y-4 text-gray-700 text-sm">
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Rosa Wanderlust:</strong> Erkunden Sie die blühende Mandelmeile mit traumhaften Ausblicken.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Exzellente Weine:</strong> Verkosten Sie u.a. einen Riesling aus der originalen Meerspinn-Lage.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Lebendige Geschichte:</strong> Erfahren Sie, warum Bayern das Oktoberfest den Pfälzern verdankt.</span>
            </li>
          </ul>
        </div>
      `,
    },
    {
      id: "mussbach",
      info: "Sommer",
      title: "Magischer Mussbach",
      subtitle:
        "Eine sommerlich-erfrischende Weinwanderung entlang des Mussbachs.",
      season: "Sommer",
      stats: {
        duration: "6 Std.",
        distance: "Var.",
        wines: "5 Weine",
        type: "Natur"
      },
      images: {
        card: images.WassermühleImWald.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-[50%_36%]",
      },
      longDescription: `
        <h3 class="font-bonanova font-bold text-accent1 text-xl mb-2 text-center">Wasser, Wald & Wein</h3>
        <p class="mb-8 text-gray-700 leading-relaxed text-center">Wenn die Sonne hoch steht, bietet das Gimmeldinger Tal kühle Frische. Entdecken Sie die Magie des Mussbachs, historische Mühlen und genießen Sie Weine in einem grünen Naturparadies.</p>

        <div class="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/50">
          <ul class="space-y-4 text-gray-700 text-sm">
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Erfrischend:</strong> Schattige Pfade am Bachlauf und durch Wälder.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Nachhaltig:</strong> Jeder Teilnehmer pflanzt einen Baum über Click-A-Tree.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Spannend:</strong> Geschichten über Mühlen, Treideln und Wappenschmieden.</span>
            </li>
          </ul>
        </div>
      `,
    },
    {
      id: "bacchus",
      info: "Herbst",
      title: "Von Bacchus bis Christophorus",
      subtitle:
        "Entdecken Sie historische Weingüter und tauchen Sie ein in die Geschichte des Weinbaus.",
      season: "Herbst",
      stats: {
        duration: "4 Std.",
        distance: "4 km",
        wines: "5 Weine",
        type: "Kultur"
      },
      images: {
        card: images.MJBachusMosaicGlass.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-[50%_50%]",
      },
      longDescription: `
        <h3 class="font-bonanova font-bold text-accent1 text-xl mb-2 text-center">Für Genießer und Entdecker</h3>
        <p class="mb-8 text-gray-700 leading-relaxed text-center">Eine kulinarische Zeitreise durch Gimmeldingen. Entdecken Sie historische Weingüter, malerische Gassen und tiefgreifende Einblicke in die Pfälzer Weinbaugeschichte.</p>
        
        <div class="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/50">
          <ul class="space-y-4 text-gray-700 text-sm">
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Exklusiv:</strong> Besuch von 3 historischen Weingütern mit Verkostung.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Interaktiv:</strong> Schlüpfen Sie in die Rolle historischer Gestalten.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Authentisch:</strong> Erleben Sie, wie Wein und Kultur verwoben sind.</span>
            </li>
          </ul>
        </div>
      `,
    },
    {
      id: "gluehwein",
      info: "Winter",
      title: "Geheimnisvolles Gimmeldingen",
      subtitle:
        "Gimmeldingen im Lichterglanz mit Glühwein und Maskenbräuchen.",
      season: "Winter",
      stats: {
        duration: "4 Std.",
        distance: "4 km",
        wines: "5 Glühw.",
        type: "Event"
      },
      images: {
        card: images.MJGlühweinV1.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_28%]",
        bgObjectPosition: "object-center",
      },
      longDescription: `
        <h3 class="font-bonanova font-bold text-accent1 text-xl mb-2 text-center">Wärmende Wintertour</h3>
        <p class="mb-8 text-gray-700 leading-relaxed text-center">Erleben Sie Gimmeldingen im zauberhaften Lichterglanz. Eine mystische Tour durch Gassen und Keller, begleitet von wärmenden Glühweinen und alten Sagen.</p>
        
        <div class="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/50">
          <ul class="space-y-4 text-gray-700 text-sm">
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Foodpairing:</strong> 3 Glühweine, Secco & Edelbrand mit passenden Snacks.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span><strong class="text-stone-800">Mystisch:</strong> Erfahren Sie von Belzenickel, Maskenbräuchen und Legenden.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent1 text-lg">✦</span>
              <span>Am knisternden Feuer oder im historischen Gewölbekeller genießen.</span>
            </li>
          </ul>
        </div>
      `,
    },
  ];


  const [selectedMobileTour, setSelectedMobileTour] = useState(mobileTours[0]);

  return (
    <section className={`fixed inset-0 w-full h-full bg-stone-100 ${className} font-sans z-40 mt-[70px] pb-[70px]`}>

      {/* 1. Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMobileTour.id + "-bg"}
            initial={{ opacity: 1 }} // Ensure visible immediately
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={selectedMobileTour.images.background}
              alt="Background"
              className={`w-full h-full object-cover ${selectedMobileTour.images.bgObjectPosition} opacity-60 grayscale-[20%] sepia-[10%]`}
            />
            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50/95 via-stone-50/70 to-stone-50/95" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-100 via-stone-100/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Scrollable Content Layer */}
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden pb-[330px] pt-4 scroll-smooth no-scrollbar touch-pan-y">
        <div className="relative min-h-[100vh] flex flex-col items-center px-6 md:px-12">

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMobileTour.id + "-content"}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } }}
              exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } }}
              className="w-full max-w-lg mx-auto flex flex-col items-center"
            >
              {/* Top Badge */}
              <div className="mb-6">
                <span className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-stone-200/60 text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                  {selectedMobileTour.info}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bonanova font-bold text-center text-stone-800 leading-[1.1] mb-4 drop-shadow-sm">
                {selectedMobileTour.title}
              </h1>

              {/* Subtitle/Short Intro */}
              <div className="relative mb-8">
                <p className="text-center text-stone-600 font-body leading-relaxed text-sm sm:text-base max-w-xs mx-auto italic">
                  "{selectedMobileTour.subtitle}"
                </p>
                <div className="w-12 h-[1px] bg-accent1/30 mx-auto mt-4"></div>
              </div>

              {/* Stats / Info Row (Icons) - Glassmorphism Card */}
              <div className="w-full grid grid-cols-4 gap-2 mb-10 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg shadow-stone-200/50">
                {/* Duration */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <svg className="w-5 h-5 text-accent1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[0.6rem] font-bold text-stone-600 uppercase tracking-wider">{selectedMobileTour.stats.duration}</span>
                </div>
                {/* Distance */}
                <div className="flex flex-col items-center justify-center gap-1 border-l border-stone-200/50">
                  <svg className="w-5 h-5 text-accent1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L14 7m0 13V3" />
                  </svg>
                  <span className="text-[0.6rem] font-bold text-stone-600 uppercase tracking-wider">{selectedMobileTour.stats.distance}</span>
                </div>
                {/* Wines */}
                <div className="flex flex-col items-center justify-center gap-1 border-l border-stone-200/50">
                  <svg className="w-5 h-5 text-accent1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="text-[0.6rem] font-bold text-stone-600 uppercase tracking-wider">{selectedMobileTour.stats.wines}</span>
                </div>
                {/* Type */}
                <div className="flex flex-col items-center justify-center gap-1 border-l border-stone-200/50">
                  <svg className="w-5 h-5 text-accent1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-[0.6rem] font-bold text-stone-600 uppercase tracking-wider truncate w-full text-center">{selectedMobileTour.stats.type}</span>
                </div>
              </div>

              {/* Long Description */}
              <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/60 mb-8 w-full">
                <div
                  className="text-stone-700 font-body leading-relaxed prose prose-stone prose-p:text-stone-700 prose-headings:font-bonanova prose-headings:text-stone-800"
                  dangerouslySetInnerHTML={{
                    __html: selectedMobileTour.longDescription,
                  }}
                />
              </div>

              <div className="h-6 w-full"></div> {/* Spacer */}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Fixed Bottom Interaction Layer */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center bg-stone-100/95 backdrop-blur-lg border-t border-stone-200/50 pt-4 pb-24 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-3xl">

        {/* Booking Button - Floating above nav */}
        <div className="w-full flex justify-center -mt-10 mb-6 px-6 relative z-40">
          <a
            href="https://eveeno.com/de/event-cal/34263?style=grid"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[280px] shadow-2xl shadow-accent1/20 group"
          >
            <div className="relative bg-gradient-to-r from-accent1 to-accent1/90 rounded-full py-3 px-6 flex items-center justify-between transition-all group-hover:scale-105 group-hover:brightness-110 ring-4 ring-stone-100 ring-offset-0">
              <span className="text-white font-bold tracking-wider uppercase text-xs pl-2">Jetzt Buchen</span>
              <div className="bg-white/20 rounded-full p-1.5 backdrop-blur-sm">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Horizontal Tour Selector (App-like Dock) */}
        <div className="w-full overflow-x-auto no-scrollbar px-6 pt-2">
          <div className="flex gap-4 justify-center w-full px-2">
            {mobileTours.slice(1).map((tour) => (
              <button
                key={tour.id}
                onClick={() => setSelectedMobileTour(tour)}
                className={`relative flex-shrink-0 flex flex-col items-center gap-2 group transition-all duration-300 transform ${selectedMobileTour.id === tour.id
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-60"
                  }`}
              >
                <div className={`w-16 h-16 rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${selectedMobileTour.id === tour.id
                    ? "ring-2 ring-accent1 ring-offset-2 ring-offset-stone-100"
                    : ""
                  }`}>
                  <img
                    src={tour.images.card}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${selectedMobileTour.id === tour.id ? "text-accent1" : "text-stone-400"
                  }`}>
                  {tour.season}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default InteractiveToursMobile;
