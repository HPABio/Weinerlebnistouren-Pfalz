import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GimmeldingenMap from "@images/GimmeldingenMap.jpg";
import GetInTouch from "../InfoCards/GetInTouchCard";
import { tourStore, type Tour } from "../../store/tourStore";
import TicketTailorBigWidget from "../TicketTailor/TicketTaylorBigWidget";
import TicketTailorSmallWidget from "../TicketTailor/TicketTaylorSmallWidget";

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

const InteractiveTours = ({ images, backgroundImage, className }: Props) => {
  const tours = [
    {
      id: "welcome",
      bookingUrl: "https://eveeno.com/de/event-cal/34263?style=grid",
      info: "⋅ vier Touren ⋅ vier Jahreszeiten ⋅ vier Geschichten ⋅",
      title: "Entdecken Sie meine interaktiven Touren",
      subtitle:
        "Lassen Sie sich von mir durch die malerischen Weinberge und den historischen Ortskern Gimmeldingens und durch seine Vergangenheit führen.",
      season: "Für jede Saison die passende Tour",
      images: {
        card: images.MJAlmondFlowerMosaicGlass.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-contain",
      },
      longDescription: `
        <p class="mb-10">Geführte Touren durch die Weinberge rund um Gimmeldingen verbinden schöne Ausblicke, spannende Einblicke in die Pfälzer Weinkultur und entspannte Genussmomente. Ideal für alle, die die Landschaft, den Ort und seine Geschichten in angenehmer Begleitung entdecken möchten.</p>
      `,
    },
    {
      id: "mandelbluete",
      bookingUrl: "https://eveeno.com/Mandelbluete",
      info: "Genuss, Geschichte und Natur",
      title: "Mandelblüte, Meerspinne und Monarchen",
      subtitle:
        "Erleben Sie den Frühling in Gimmeldingen mit Wein, Mandelblüte und lebendigen Geschichten einiger Monarchen auf einer genussvollen, interaktiven Weinwanderung.",
      season: "Frühling",
      images: {
        card: images.MJAlmondFlowerMosaicGlass.src,
        background: images.MJAlmondFlowerMosaicGlass.src,
        // background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-top",
      },
      // <p class="mb-4">Erlebe mit Freunden, Kollegen und Familie eine unterhaltsame Weinerlebnistour durch die rosa blühenden Weinberge von Gimmeldingen. Geführt von einer zertifizierten Kultur- und Weinbotschafterin erwartet Dich eine spannende Mischung aus Natur, Genuss und kurzweiligen historischen Episoden - perfekt für alle Sinne! Das erwartet dich:</p>
      longDescription: `
        <p class="mb-4 text-xl text-gray-900/80">🌸 Mandelblüte/Weinberge •  🍷 5 Weine/5 pfälzischen Snacks  • 🤝 Teamevent/Zeitreise • ⏱️ 4 Stunden/4 km</p>
        <p class="mb-10">Frühling genießen mit allen Sinnen: Wein, Mandelblüte & Kulturgeschichte erleben: Wenn die Mandelbäume blühen und die Weinberge erwachen, beginnt ein Erlebnis der besonderen Art. Auf unserer interaktiven Weinwanderung erwarten Sie fünf erlesene Weine, perfekt kombiniert mit feinen Mandelköstlichkeiten, dazu lebendig erlebte regionale Geschichten – und all das inmitten einer traumhaften Frühlingskulisse.</p>
        <ul class="pl-5 mb-10 space-y-2 list-disc">
          <li>Prickelnder Start: Genieße einen rosa Begrüßungs-Secco mit einem Pfälzer Snack bei herrlicher Aussicht!</li>
          <li>Rosa Wanderlust: Erkunde zartrosa blühende Mandelbäume und die besten Aussichten inmitten malerischer Weinberge</li>
          <li>Weingenuss der Extraklasse: Lass Dich unterwegs von exzellenten Weinen lokaler Weingüter mit abgestimmten Mandel-Snacks verwöhnen, u.a. einen besonderen Riesling aus der originalen Meerspinn-Lage</li>
          <li>Geschichten, die begeistern: Erfahre, warum das Mandelblütenfest in Gimmeldingen stattfindet, was Mandeln und Meerspinne gemeinsam haben und warum die Bayern das Oktoberfest den Pfälzern verdanken. Durchlebe dabei interaktiv 700 Jahre Wittelsbacher Monarchie mit ihren Irrungen und Wirrungen – und Du mittendrin!</li>
          <li>Zum Abschluss wartet eine süße, mandelige Überraschung auf Dich</li>
        </ul>
        <p>Ob als Teamerlebnis oder entspannter Ausflug mit Familie, Freunden oder Kollegen – diese Tour vereint Genuss und Natur, macht Geschichte lebendig, stärkt das Miteinander und zeigt Dir Gimmeldingen von seiner schönsten Seite.</p>
      `,
    },
    {
      id: "mussbach",
      bookingUrl: "https://eveeno.com/mussbach",
      info: "Wasser, Wald und Wein - eine Weinwanderung",
      title: "Magischer Mussbach",
      subtitle:
        "Erleben Sie eine sommerlich-erfrischende Weinwanderung entlang des Mussbachs, die Genuss, Natur und lebendige Geschichten mit einem nachhaltigen Beitrag verbindet.",
      season: "Sommer",
      images: {
        card: images.WassermühleImWald.src,
        background: images.WassermühleImWald.src,
        // background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-[50%_36%]",
      },
      longDescription: `
        <p class="mb-4 text-xl text-gray-900/80">🌊 Wasser & Wald • 🍷 5 Weine/ regionale Snacks • 🌱 Nachhaltigkeit & Baumpflanzung • ⏱️ 6 Stunden/4, 8 oder 12 km</p>
        <p class="mb-10">Wenn die Sonne hoch steht und das Gimmeldinger Tal in sommerlicher Kühle erstrahlt, beginnt ein nachhaltiges Erlebnis der besonderen Art. Auf unserer interaktiven Weinwanderung entdecken wir die Magie des Mussbachs, erfahren spannende Geschichten über Mühlen, Wasser und Holz und genießen fünf erlesene Weine mit passenden Snacks – inmitten eines grünen, erfrischenden Naturparadieses. Ideal für Teams oder Genießer, die Natur, Nachhaltigkeit und Geschichte verbinden möchten.</p>
        <ul class="pl-5 mb-10 space-y-2 list-disc">
          <li>Erfrischender Auftakt: Genieße einen prickelnden Begrüßungswein an einem schattigen Platz  in einem Mussbacher Weingut</li>
          <li>Sommerliche Wanderlust: Entdecke den Mussbach über Lobloch entlang des erfrischenden Bachlaufes bis ins Gimmeldinger Tal auf schattigen Pfaden, durch Wälder und zu historischen Mühlen</li>
          <li>Weingenuss der Extraklasse: Lass Dich unterwegs von fünf regionalen Weinen mit saisonalen Snacks verwöhnen – jedes Glas erzählt von nachhaltiger Weinbaukunst in der Pfalz.</li>
          <li>Geschichten, die begeistern: Lebendige Erzählungen über Wasser, Holz, Treideln am Speyerbach, Eselsmühlen, Kunsthandwerk und Wappenschmieden – lebendige Geschichte zum Mitmachen.</li>
          <li>Zum Abschluss: Jeder Teilnehmer pflanzt über Click-A-Tree einen Baum und erhält ein persönliches Zertifikat – so hinterlassen wir gemeinsam einen grünen Fußabdruck in der Pfalz.</li>
        </ul>
        <p>Diese Tour ist mehr als nur eine Wanderung: Sie verbindet Erfrischung mit Genuss und Geschichte mit Nachhaltigkeit, lässt die Magie des Mussbachs spürbar werden und macht Natur und Kultur hautnah erlebbar. Ideal für Teams, Familien, Freunde oder Urlaubsgäste, die einen erfrischenden Tag in der Pfalz erleben möchten.</p>
      `,
    },
    {
      id: "bacchus",
      bookingUrl: "https://eveeno.com/bacchus",
      info: "Für Genießer und Entdecker",
      title: "Von Bacchus bis Christophorus",
      subtitle:
        "Auf dieser Weinwanderung durch Weinberge und malerische Gassen entdecken Sie die Pfalz sowie einige historische Weingüter und tauchen auf einer interaktiven Zeitreise in die Geschichte des regionalen Weinbaus ein.",
      season: "Herbst",
      images: {
        card: images.MJBachusMosaicGlass.src,
        background: images.MJBachusMosaicGlass.src,
        // background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-top",
      },
      longDescription: `
      <p class="mb-4 text-xl text-gray-900/80">🌿 Weinberge/historischer Ortskern •  🍷 5 Weine/5 Häppchen  • 🤝 Teamevent/Zeitreise • ⏱️ 4 Stunden/4 km</p>
        <p class="mb-10">Ein kulinarisches Gruppenerlebnis, das Gimmeldingen und die Pfalz lebendig macht – interaktiv, spannend und unterhaltsam.</p>
        <ul class="pl-5 mb-10 space-y-2 list-disc">          
          <li>Weinbergwanderung mit großartigen Ausblicken und faszinierenden Einblicken in den Weinbau</li>
          <li>5 ausgewählte Weine von lokalen Winzern und perfekt dazu abgestimmte Leckerbissen</li>
          <li>Spaziergang durch die charmanten Gassen von Gimmeldingen zu 3 historischen Weingütern mit Weinverkostungen</li>
          <li>Interaktive Zeitreise durch die pfälzische Weingeschichte - jeder Teilnehmer wird dabei ein Teil der Geschichte !</li>
        </ul>

        <p class="mb-2">Denn Wein erzählt Geschichten – von Landschaften, Menschen und Jahrhunderten. Auf dieser besonderen Tour entdeckt ihr, wie eng die Kultur des Weins mit der Geschichte der Pfalz verwoben ist. Während ihr die Weine verkostet, reist ihr durch die Epochen des Weinbaus, erfahrt Spannendes über die pfälzische Historie und verkörpert dabei eine historische Gestalt. So erlebt ihr die Vergangenheit hautnah – mit allen Sinnen, einem Glas Wein in der Hand und der lebendigen Atmosphäre der Pfalz um euch herum.</p>
        <p class="mb-2">Lass Dich von der einzigartigen Verbindung aus Wein, Kultur, Kulinarik und Natur inspirieren – ein wahres Fest für alle Sinne.  Ideal als genussvolles Teamevent oder als entspannter Ausflug mit Freunden, Kollegen & Familie.</p>
        <p>Die Tour startet um 11h oder 14h im Weingut JF Ohler in Gimmeldingen.</p>
      `,
    },
    {
      id: "gluehwein",
      bookingUrl: "https://eveeno.com/gluehwein",
      info: "Wärmende Wintertour mit Glühwein",
      title: "Geheimnisvolles Gimmeldingen",
      subtitle:
        "Entdecken Sie Gimmeldingen im zauberhaften Lichterglanz, genießen Sie weihnachtliche Köstlichkeiten und erleben Sie hautnah alte Maskenbräuche der Pfalz.",
      season: "Winter",
      images: {
        card: images.MJGlühweinV1.src,
        background: images.MJGlühweinV1.src,
        // background: backgroundImage.src,
        objectPosition: "object-[50%_28%]",
        bgObjectPosition: "object-top",
      },
      longDescription: `
        <p class="mb-4 text-xl text-gray-900/80"> 🎄 Weihnachtszauber  •  🔥 5 Glühweine & Co+Snacks  • 🤝 Teamevent+Zeitreise • ⏱️ 4 Stunden/4 km</p>
        <p class="mb-10 text-base">Erlebe Gimmeldingen im Lichterglanz: Geniesse ein 5-teiliges Foodpairing aus Secco, drei wärmenden Glühweinen und einem edlen Brand, perfekt ergänzt von weihnachtlichen Häppchen. Die interaktive Tour führt durch stimmungsvoll erleuchtete Gassen, geheimnisvolle Keller und entlang des plätschernden Mussbaches. Begleitet von allerlei mystischen Gestalten tauchen wir ein in weihnachtliche Sagen und Legenden der Pfalz, lauschen verborgenen Geschichten aus Gimmeldingen und spüren den Zauber vergangener Zeiten. Ein Erlebnis voller Genuss, Weihnachtszauber und Gemeinschaft – mitten im Herzen der winterlichen Pfalz.</p>
        <ul class="pl-5 mb-10 space-y-2 list-disc">
            <li>Zum Auftakt wirst du mit einem prickelnden Secco und einem pfälzischen Snack in einem historischen Weinkeller willkommen geheißen</li>
            <li>Von dort aus führt dich ein entspannter Spaziergang über rund 4 Kilometer durch romantische Gassen und versteckte Winkel des malerischen Weinorts Gimmeldingen</li>
            <li>Die winterliche Stimmung entlang des plätschernden Mußbachs verleiht der Tour dabei eine ganz besondere Atmosphäre</li>
            <li>Unterwegs erwarten dich weitere vier liebevoll gestaltete Stationen in historischen Gebäuden oder am knisternden Feuer – jede einzelne ein Genussmoment mit wärmendem Glühwein und passenden Häppchen bzw einer Pfälzer Köstlichkeit</li>
            <li>Und das Besondere: Du wirst selbst Teil der Geschichte – verkörperst eine historische Gestalt wie den Bischof von Speyer, den Belzenickel, Adligen und Müllern, spürst die Magie des Mußbachs, erfährst von skurrilen Begebenheiten, alten Weihnachtsbräuchen und lüftest so die Geheimnisse, die sich hinter den historischen Mauern Gimmeldingens verbergen</li>
        </ul>
        <p class="mb-4">Diese Tour verbindet Genuss, Natur und Kultur auf einzigartige Weise. Ob als weihnachtliche Team-Aktivität, Betriebsausflug oder romantischer Nachmittag mit Freunden, Familie oder Kollegen – schaffe Dir unvergessliche Erinnerungen in der Winterzeit.</p>
      `,
    },
  ];

  const [selectedTour, setSelectedTour] = useState(tours[0]);

  // Initialize global store with the initial tour
  useEffect(() => {
    tourStore.setCurrentTour(selectedTour);
  }, []);

  // Sync global store whenever selectedTour changes
  useEffect(() => {
    tourStore.setCurrentTour(selectedTour);
  }, [selectedTour]);

  return (
    <section className={`relative min-h-screen text-text ${className}`}>
      <img
        src={GimmeldingenMap.src}
        alt="Tour Background"
        className="object-cover object-center absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-transparent to-gray-300/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

      {/* Header Section (with interface elements) */}
      <div
        className="relative w-full h-[60vh] 2xl:h-[800px] overflow-hidden -mt-[70px] pt-[40px]
      sm:min-h-[400px] md:min-h-[450px] lg:min-h-[570px] xl:min-h-[600px]
      max-h-[450px] md:max-h-[500px] lg:max-h-[600px]
       ">
        <motion.div
          key={selectedTour.id + "-hero"}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: "easeOut" },
          }}
          className="absolute inset-0">
          <img
            src={selectedTour.images.background}
            alt="Tour Background"
            className={`w-full h-full object-cover scale-[2] md:scale-[1.5] lg:scale-[1] ${selectedTour.images.bgObjectPosition}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-r via-transparent from-black/20 to-black/35" />
          <div className="hidden sm:block absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-gray-50 via-gray-50/60 to-black/0 z-10" />
          <div className="hidden sm:block absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-gray-50 via-gray-50/60 to-black/0 z-10" />
        </motion.div>

        {/* Navigation Buttons */}
        {/* Previous Button */}
        <div className="flex absolute inset-y-0 left-0 z-20 items-center">
          <motion.button
            onClick={() => {
              const currentIndex = tours.findIndex(
                (tour) => tour.id === selectedTour.id
              );
              const prevIndex =
                currentIndex === 1 ? tours.length - 1 : currentIndex - 1;
              setSelectedTour(tours[prevIndex]);
            }}
            className="p-3 ml-6 rounded-full border backdrop-blur-md transition-all duration-300 lg:p-4 bg-white/20 border-white/30 hover:bg-white/30 hover:scale-110 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 1.2 } }}>
            <svg
              className="w-3 text-white transition-colors duration-300 md:w-4 lg:w-6 aspect-square group-hover:text-accent1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Next Button */}
        <div className="flex absolute inset-y-0 right-0 z-20 items-center">
          <motion.button
            onClick={() => {
              const currentIndex = tours.findIndex(
                (tour) => tour.id === selectedTour.id
              );
              const nextIndex =
                currentIndex === tours.length - 1 ? 1 : currentIndex + 1;
              setSelectedTour(tours[nextIndex]);
            }}
            className="p-3 mr-6 rounded-full border backdrop-blur-md transition-all duration-300 lg:p-4 bg-white/20 border-white/30 hover:bg-white/30 hover:scale-110 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 1.2 } }}>
            <svg
              className="w-3 text-white transition-colors duration-300 md:w-4 lg:w-6 aspect-square group-hover:text-accent1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Hero Content */}
        <div className="flex relative z-10 flex-col justify-center items-center px-6 mt-8 w-full h-full text-center border-0 border-red-500 lg:px-12">
          {/* Seasonal Badge */}
          <div className="absolute top-0 justify-center items-center px-10 py-3 mx-auto w-full rounded-full backdrop-blur-sm bg-white/0 text-text/40">
            <h4 className="font-semibold text-center text-text/40">
              <span className="font-semibold text-center text-text/40">
                {selectedTour.info}
              </span>
            </h4>
          </div>

          {/* Header/Title and Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTour.id + "-content"}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 0.95,
                transition: { duration: 0.4 },
              }}
              className="mx-auto max-w-5xl">
              <div
                className="w-full relative mb-8 leading-[0.9] drop-shadow-2xl border-0 border-amber-500 
              text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold font-bonanova text-white">
                <h1 className="hidden opacity-0 xl:block">
                  Hidden <br />
                  Tit le
                </h1>
                <div
                  className="w-full xl:w-[84vw] 2xl:max-w-[1300px] relative xl:absolute top-0 xl:top-1/2 xl:left-[50%] xl:-translate-x-[50%] xl:translate-y-[-50%]
                  border-0 border-red-500">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, delay: 0.7 },
                    }}>
                    {selectedTour.title}
                  </motion.h1>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.9 },
                }}
                className="mx-auto max-w-lg text-sm leading-relaxed drop-shadow-lg md:max-w-xl xl:max-w-3xl md:text-lg lg:text-2xl xl:text-3xl text-stone-100 font-playfair"
                dangerouslySetInnerHTML={{ __html: selectedTour.subtitle }}
              />

              {/* Booking Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileHover={{ scale: 1.06, filter: "brightness(1.2) saturate(2.2)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.1 },
                }}
                className="flex flex-wrap gap-6 justify-center mt-4 lg:mt-8"
              >
                <a
                  className="inline-flex gap-2 items-center px-6 py-1 mb-6 bg-gradient-to-r rounded-full border backdrop-blur-md transition-transform duration-200 md:py-2 lg:py-3 from-accent1/25 to-accent1/15 border-accent1/30"
                  href="https://eveeno.com/de/event-cal/34263?style=grid"
                >
                  <span className="text-xs font-bold tracking-wider uppercase text-accent1 md:text-sm">
                    • BUCHEN •
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative w-full h-full border-0 border-green-500">
        <div className="w-full h-[300px] absolute top-0 left-0 bg-gradient-to-b from-stone-300 via-transparent to-transparent z-0 " />

        <div className="flex relative z-10 flex-row justify-center items-center w-full h-full border-0 border-yellow-500">
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 1.5 },
            }}
            className="absolute -top-[65px] xl:top-[10%] -translate-y-4 right-3 lg:right-6 z-20 flex flex-col lg:flex-row items-center  gap-2
                  text-gray-400 2xl:hidden">
            {/* <p className="block lg:hidden">scroll down</p> */}
            <p className="hidden leading-tight lg:block lg:pt-1">
              scroll <br /> down
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center w-4 h-8 rounded-full border-2 lg:w-6 lg:h-10 border-stone-50/50 xl:border-black/50">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-2 w-1 h-2 rounded-full lg:h-3 bg-stone-50/70 xl:bg-black/70"
              />
            </motion.div>
            <p className="text-[0.5rem] block lg:hidden">scroll down</p>
          </motion.div>

          {/* Enhanced Tour Selection Navbar */}
          <div className="mt-4 border-0 border-red-500 xl:mt-9 2xl:mt-10">
            <div className="sticky top-8">
              <div
                className="flex flex-row items-center justify-center w-[75vw] lg:w-[65vw] 
                md:max-w-[650px] lg:max-w-[700px] xl:max-w-[800px] mx-auto max-h-[180px] md:gap-1 2xl:gap-2">
                {tours.slice(1).map((tour, index) => {
                  // Bewusst ein normales <a> statt motion.a: die Kacheln sind die
                  // Hauptnavigation dieser Seite und müssen auch dann sichtbar
                  // sein, wenn die Hydration scheitert. Einblenden und Hover
                  // laufen deshalb komplett über CSS.
                  return (
                    <a
                      key={tour.id}
                      href={tour.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tour.title} – Tour buchen`}
                      onMouseEnter={() => setSelectedTour(tour)}
                      onFocus={() => setSelectedTour(tour)}
                      style={{ animationDelay: `${index * 60}ms` }}
                      className={`animate-rise-in block cursor-pointer group relative overflow-hidden w-full h-full xl:rounded-3xl max-h-[180px] drop-shadow-md rounded-2xl transition-all duration-500 hover:duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent1 focus-visible:ring-offset-2 ${selectedTour.id === tour.id
                        ? "outline-offset-[6px] aspect-[10/8] drop-shadow-2xl ring-offset-0 ring-2 mx-4 ring-soft-beige outline-[2px] outline-accent1 outline-none border-[2.5px] border-stone-100 z-30 "
                        : "border-[2.5px] border-soft-beige/20 drop-shadow-lg aspect-[4/3]  brightness-[1] saturate-[0.8]"
                        }`}>
                      <div className="relative w-full h-full transition-all duration-500 group">
                        <img
                          src={tour.images.card}
                          alt={tour.title}
                          className={`w-full h-full object-cover object-center  ${selectedTour.id === tour.id
                            ? "brightness-100 "
                            : "group-hover:scale-110 group-hover:contrast-100 brightness-[1] contrast-[1]"
                            }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none via-black/30" />

                        {/* season Badge */}
                        {/* <div className="hidden absolute top-4 right-4">
                                <span className="px-3 py-1 text-xs font-bold text-gray-800 rounded-full border shadow-sm backdrop-blur-sm bg-white/95 border-white/20">
                                  {tour.season}
                                </span>
                              </div> */}

                        {/* Tour Season */}
                        <div className="absolute right-4 bottom-4 left-4">
                          <h4
                            className="text-white/40 font-bold font-bonanova
                                text-[0.6rem] md:text-[0.5rem] lg:text-[0.8rem] xl:text-[0.9rem] group-hover:text-white leading-tight drop-shadow-lg">
                            {tour.season}
                          </h4>
                        </div>
                        {/* Tour Title
                        <div className="absolute right-4 bottom-4 left-4">
                          <h4
                            className="text-white/40 font-bold font-bonanova
                                text-[0.6rem] md:text-[0.5rem] lg:text-[0.8rem] xl:text-[0.9rem] group-hover:text-white leading-tight drop-shadow-lg">
                            {tour.title}
                          </h4>
                        </div> */}

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 mix-blend-color-burn transition-opacity duration-300 from-black/70 group-hover:opacity-100" />

                        {/* Booking affordance — makes it obvious the tile leads to eveeno */}
                        <div className="flex absolute top-2 right-2 gap-1 items-center px-2 py-1 rounded-full border opacity-0 backdrop-blur-sm transition-all duration-300 translate-y-1 pointer-events-none border-accent1/50 bg-accent2-wine/90 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100">
                          <span className="text-[0.5rem] lg:text-[0.6rem] font-bold uppercase tracking-[0.12em] text-stone-50 font-bonanova">
                            Buchen
                          </span>
                          <svg
                            className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-accent1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.6}
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M7 17 17 7" />
                            <path d="M8 7h9v9" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket-Tailor-Termine — nur wenn für die gewählte Tour ein Widget hinterlegt ist.
            Die frühere dynamische Tourbeschreibung unter den Kacheln entfällt: die
            Kacheln führen jetzt direkt zur jeweiligen eveeno-Buchungsseite. */}
        {(selectedTour.season === "Herbst" || selectedTour.season === "Sommer") && (
          <div className="relative z-20 px-6 pt-10 pb-12 mx-auto max-w-7xl lg:px-12">
            <div className="overflow-hidden rounded-3xl border shadow-2xl bg-stone-50 border-stone-100">
              <div className="p-6 sm:p-8 lg:p-12">
                {selectedTour.season === "Herbst" && <TicketTailorBigWidget />}
                {selectedTour.season === "Sommer" && <TicketTailorSmallWidget />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Get In Touch Section */}
      <div className="overflow-hidden relative bg-gradient-to-br to-white border-t from-stone-50 border-stone-200">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-accent1" />
          <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-accent1" />
        </div>
        <div className="relative z-10">{/* <GetInTouch className="" /> */}</div>
      </div>
    </section>
  );
};

export default InteractiveTours;
