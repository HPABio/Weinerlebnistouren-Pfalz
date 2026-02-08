import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrigittaHeylPortrait from "@images/BrigittaHeylPortrait.png";
import HWELogoV2NoText from "@images/HWE-LogoV2-noText.svg";
import GimmeldingenMap from "@images/GimmeldingenMap.jpg";
import GetInTouch from "../InfoCards/GetInTouchCard";
import BookingButtonV1 from "../BookingButtons/BookingButtonV1";
import {
  BookingButtonV2toRight,
  BookingButtonV2toLeft,
} from "../BookingButtons/BookingButtonV2";
import { tourStore, type Tour } from "../../store/tourStore";

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
       <p class="mb-4 text-gray-900/80 text-xl">🌸 Mandelblüte/Weinberge •  🍷 5 Weine/5 pfälzischen Snacks  • 🤝 Teamevent/Zeitreise • ⏱️ 4 Stunden/4 km</p>
        <p class="mb-10">Frühling genießen mit allen Sinnen: Wein, Mandelblüte & Kulturgeschichte erleben: Wenn die Mandelbäume blühen und die Weinberge erwachen, beginnt ein Erlebnis der besonderen Art. Auf unserer interaktiven Weinwanderung erwarten Sie fünf erlesene Weine, perfekt kombiniert mit feinen Mandelköstlichkeiten, dazu lebendig erlebte regionale Geschichten – und all das inmitten einer traumhaften Frühlingskulisse.</p>
        <ul class="list-disc pl-5 space-y-2 mb-10">
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
      id: "mandelbluete",
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
        <p class="mb-4 text-gray-900/80 text-xl">🌸 Mandelblüte/Weinberge •  🍷 5 Weine/5 pfälzischen Snacks  • 🤝 Teamevent/Zeitreise • ⏱️ 4 Stunden/4 km</p>
        <p class="mb-10">Frühling genießen mit allen Sinnen: Wein, Mandelblüte & Kulturgeschichte erleben: Wenn die Mandelbäume blühen und die Weinberge erwachen, beginnt ein Erlebnis der besonderen Art. Auf unserer interaktiven Weinwanderung erwarten Sie fünf erlesene Weine, perfekt kombiniert mit feinen Mandelköstlichkeiten, dazu lebendig erlebte regionale Geschichten – und all das inmitten einer traumhaften Frühlingskulisse.</p>
        <ul class="list-disc pl-5 space-y-2 mb-10">
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
        <p class="mb-4 text-gray-900/80 text-xl">🌊 Wasser & Wald • 🍷 5 Weine/ regionale Snacks • 🌱 Nachhaltigkeit & Baumpflanzung • ⏱️ 6 Stunden/4, 8 oder 12 km</p>
        <p class="mb-10">Wenn die Sonne hoch steht und das Gimmeldinger Tal in sommerlicher Kühle erstrahlt, beginnt ein nachhaltiges Erlebnis der besonderen Art. Auf unserer interaktiven Weinwanderung entdecken wir die Magie des Mussbachs, erfahren spannende Geschichten über Mühlen, Wasser und Holz und genießen fünf erlesene Weine mit passenden Snacks – inmitten eines grünen, erfrischenden Naturparadieses. Ideal für Teams oder Genießer, die Natur, Nachhaltigkeit und Geschichte verbinden möchten.</p>
        <ul class="list-disc pl-5 space-y-2 mb-10">
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
      <p class="mb-4 text-gray-900/80 text-xl">🌿 Weinberge/historischer Ortskern •  🍷 5 Weine/5 Häppchen  • 🤝 Teamevent/Zeitreise • ⏱️ 4 Stunden/4 km</p>
        <p class="mb-10">Ein kulinarisches Gruppenerlebnis, das Gimmeldingen und die Pfalz lebendig macht – interaktiv, spannend und unterhaltsam.</p>
        <ul class="list-disc pl-5 space-y-2 mb-10">          
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
        <p class="mb-4 text-gray-900/80 text-xl"> 🎄 Weihnachtszauber  •  🔥 5 Glühweine & Co+Snacks  • 🤝 Teamevent+Zeitreise • ⏱️ 4 Stunden/4 km</p>
        <p class="mb-10 text-base">Erlebe Gimmeldingen im Lichterglanz: Geniesse ein 5-teiliges Foodpairing aus Secco, drei wärmenden Glühweinen und einem edlen Brand, perfekt ergänzt von weihnachtlichen Häppchen. Die interaktive Tour führt durch stimmungsvoll erleuchtete Gassen, geheimnisvolle Keller und entlang des plätschernden Mussbaches. Begleitet von allerlei mystischen Gestalten tauchen wir ein in weihnachtliche Sagen und Legenden der Pfalz, lauschen verborgenen Geschichten aus Gimmeldingen und spüren den Zauber vergangener Zeiten. Ein Erlebnis voller Genuss, Weihnachtszauber und Gemeinschaft – mitten im Herzen der winterlichen Pfalz.</p>
        <ul class="list-disc pl-5 space-y-2 mb-10">
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
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  // Initialize global store with the initial tour
  useEffect(() => {
    tourStore.setCurrentTour(selectedTour);
  }, []);

  // Sync global store whenever selectedTour changes
  useEffect(() => {
    tourStore.setCurrentTour(selectedTour);
  }, [selectedTour]);

  // Auto-cycling info blocks every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`min-h-screen text-text relative ${className}`}>
      <img
        src={GimmeldingenMap.src}
        alt="Tour Background"
        className="w-full h-full absolute top-0 left-0 object-cover object-center"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/35" />
          <div className="hidden sm:block absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-gray-50 via-gray-50/60 to-black/0 z-10" />
          <div className="hidden sm:block absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-gray-50 via-gray-50/60 to-black/0 z-10" />
        </motion.div>

        {/* Navigation Buttons */}
        {/* Previous Button */}
        <div className="absolute inset-y-0 left-0 z-20 flex items-center">
          <motion.button
            onClick={() => {
              const currentIndex = tours.findIndex(
                (tour) => tour.id === selectedTour.id
              );
              const prevIndex =
                currentIndex === 1 ? tours.length - 1 : currentIndex - 1;
              setSelectedTour(tours[prevIndex]);
            }}
            className="ml-6 p-3 lg:p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 1.2 } }}>
            <svg
              className="w-3 md:w-4 lg:w-6 aspect-square text-white group-hover:text-accent1 transition-colors duration-300"
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
        <div className="absolute inset-y-0 right-0 z-20 flex items-center ">
          <motion.button
            onClick={() => {
              const currentIndex = tours.findIndex(
                (tour) => tour.id === selectedTour.id
              );
              const nextIndex =
                currentIndex === tours.length - 1 ? 1 : currentIndex + 1;
              setSelectedTour(tours[nextIndex]);
            }}
            className="mr-6 p-3 lg:p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 1.2 } }}>
            <svg
              className="w-3 md:w-4 lg:w-6 aspect-square text-white group-hover:text-accent1 transition-colors duration-300"
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
        <div className="relative z-10 h-full w-full flex flex-col justify-center items-center text-center mt-8 px-6 lg:px-12 border-0 border-red-500">
          {/* Seasonal Badge */}
          <div className="absolute w-full top-0 bg-white/0 text-text/40 items-center justify-center mx-auto px-10 py-3 backdrop-blur-sm rounded-full">
            <h4 className="text-text/40 font-semibold text-center">
              <span className="text-text/40 font-semibold text-center">
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
              className="max-w-5xl mx-auto">
              <div
                className="w-full relative mb-8 leading-[0.9] drop-shadow-2xl border-0 border-amber-500 
              text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold font-bonanova text-white">
                <h1 className="hidden xl:block opacity-0">
                  Hidden <br />
                  Title
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
                className="max-w-lg md:max-w-xl xl:max-w-3xl mx-auto drop-shadow-lg
                text-sm md:text-lg lg:text-2xl xl:text-3xl text-stone-100 font-playfair leading-relaxed  "
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
                className="flex flex-wrap justify-center gap-6 mt-4 lg:mt-8"
              >
                <a
                  className="inline-flex items-center gap-2 px-6 py-1 md:py-2 lg:py-3 bg-gradient-to-r from-accent1/25 to-accent1/15 backdrop-blur-md rounded-full mb-6 border border-accent1/30 transition-transform duration-200"
                  href="https://eveeno.com/de/event-cal/34263?style=grid"
                >
                  <span className="text-accent1 font-bold text-xs md:text-sm uppercase tracking-wider">
                    • BUCHEN •
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full h-full relative border-0 border-green-500 ">
        <div className="w-full h-[300px] absolute top-0 left-0 bg-gradient-to-b from-stone-300 via-transparent to-transparent z-0 " />

        <div className="w-full h-full relative flex flex-row items-center justify-center z-10  border-0 border-yellow-500 ">
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
            <p className="hidden lg:block leading-tight lg:pt-1">
              scroll <br /> down
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 lg:w-6 h-8 lg:h-10 border-2 border-stone-50/50 xl:border-black/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 lg:h-3 bg-stone-50/70 xl:bg-black/70 rounded-full mt-2"
              />
            </motion.div>
            <p className="text-[0.5rem] block lg:hidden">scroll down</p>
          </motion.div>

          {/* Enhanced Tour Selection Navbar */}
          <div className="mt-4 xl:mt-9 2xl:mt-10  border-0 border-red-500">
            <div className="sticky top-8">
              <div
                className="flex flex-row items-center justify-center w-[75vw] lg:w-[65vw] 
                md:max-w-[650px] lg:max-w-[700px] xl:max-w-[800px] mx-auto max-h-[180px] md:gap-1 2xl:gap-2">
                {tours.slice(1).map((tour, index) => {
                  return (
                    <motion.div
                      key={tour.id}
                      onClick={() => setSelectedTour(tour)}
                      className={`cursor-pointer group relative overflow-hidden w-full h-full xl:rounded-3xl max-h-[180px] drop-shadow-md rounded-2xl transition-all duration-500 ${selectedTour.id === tour.id
                        ? "outline-offset-[6px] aspect-[10/8] drop-shadow-2xl ring-offset-0 ring-2 mx-4 ring-soft-beige outline-[2px] outline-accent1 outline-none border-[2.5px] border-stone-100 z-30 "
                        : "border-[2.5px] border-soft-beige/20 drop-shadow-lg aspect-[4/3]  brightness-[1] saturate-[0.8]"
                        }`}
                      whileHover={{ y: -4, transition: { duration: 0.1 } }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.05 },
                      }}>
                      <div className="w-full h-full relative group transition-all duration-500 ">
                        <img
                          src={tour.images.card}
                          alt={tour.title}
                          className={`w-full h-full object-cover object-center  ${selectedTour.id === tour.id
                            ? "brightness-100 "
                            : "group-hover:scale-110 group-hover:contrast-100 brightness-[1] contrast-[1]"
                            }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                        {/* season Badge */}
                        {/* <div className="hidden absolute top-4 right-4">
                                <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-full shadow-sm border border-white/20">
                                  {tour.season}
                                </span>
                              </div> */}

                        {/* Tour Season */}
                        <div className="absolute bottom-4 left-4 right-4 ">
                          <h4
                            className="text-white/40 font-bold font-bonanova
                                text-[0.6rem] md:text-[0.5rem] lg:text-[0.8rem] xl:text-[0.9rem] group-hover:text-white leading-tight drop-shadow-lg">
                            {tour.season}
                          </h4>
                        </div>
                        {/* Tour Title
                        <div className="absolute bottom-4 left-4 right-4 ">
                          <h4
                            className="text-white/40 font-bold font-bonanova
                                text-[0.6rem] md:text-[0.5rem] lg:text-[0.8rem] xl:text-[0.9rem] group-hover:text-white leading-tight drop-shadow-lg">
                            {tour.title}
                          </h4>
                        </div> */}

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 mix-blend-color-burn to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tour Details Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12 z-20 -mt-16 border-0 border-blue-500">
          <div className="grid grid-cols-1">
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 ">
                {/* Tour Header */}
                <div className="hidden relative bg-stone-100 bg-gradient-to-r from-stone-50 to-amber-50/40 p-8 lg:p-12 pt-24 lg:pt-28 2xl:pt-28">
                  {/* Decorative Image */}
                  <div className="absolute top-0 right-0 w-2/5 h-full z-0 overflow-hidden">
                    <img
                      src={selectedTour.images.card}
                      alt={selectedTour.title}
                      className="w-full h-full object-cover object-top grayscale contrast-150 opacity-20"
                    />
                    {/* Tour Information Display - Auto Cycling - Background */}
                    <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center py-8 pr-4 ">
                      <AnimatePresence mode="wait">
                        {/* Distance Block */}
                        {currentInfoIndex === 0 && (
                          <motion.div
                            key="distance"
                            className="w-full flex flex-col items-center justify-center relative h-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1.2 }}>
                            <div className="relative flex flex-col items-center pt-8 pl-6 ">
                              <h2 className="text-[28rem] leading-none text-text/40 lg:text-text/50 xl:text-text/70 font-bold">
                                4
                                <span className="text-[6rem] font-sourcesans">
                                  km
                                </span>
                              </h2>
                            </div>
                          </motion.div>
                        )}

                        {/* Duration Block */}
                        {currentInfoIndex === 1 && (
                          <motion.div
                            key="duration"
                            className="w-full flex flex-col items-center justify-center relative h-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1.2 }}>
                            <div className="relative flex flex-col items-center pt-8 pl-6 ">
                              <h2 className="text-[28rem] leading-none text-text/40 lg:text-text/50 xl:text-text/70 font-bold">
                                4
                                <span className="text-[10rem] font-sourcesans">
                                  h
                                </span>
                              </h2>
                            </div>
                          </motion.div>
                        )}

                        {/* Wines Block */}
                        {currentInfoIndex === 2 && (
                          <motion.div
                            key="wines"
                            className="w-full flex flex-col items-center justify-center relative h-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1.2 }}>
                            <div className="relative flex flex-col items-center pt-2 ">
                              <h2 className="text-[30rem] leading-none text-text/30 font-bold">
                                5
                              </h2>
                            </div>
                          </motion.div>
                        )}

                        {/* People Block */}
                        {currentInfoIndex === 3 && (
                          <motion.div
                            key="people"
                            className="w-full flex flex-col items-center justify-center relative h-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1.2 }}>
                            <div className="relative flex flex-col items-center">
                              <h2 className="text-[18rem] lg:text-[20rem] xl:text-[24rem] leading-none text-text/40 lg:text-text/50 xl:text-text/70 font-bold">
                                28
                              </h2>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="w-full h-full absolute top-0 right-0 bg-gradient-to-r from-stone-100 to-amber-50/40" />
                    <div
                      className="w-full h-full flex flex-col justify-center items-center
                      absolute top-0 right-0 bg-gradient-to-r from-amber-50/40 to-transparent">
                      {/* Tour Information Display - Auto Cycling */}
                      <div className="w-full h-full flex flex-col justify-center items-center py-8 pr-4 ">
                        <AnimatePresence mode="wait">
                          {/* Distance Block */}
                          {currentInfoIndex === 0 && (
                            <motion.div
                              key="distance"
                              className="w-full flex flex-col items-center justify-center relative h-full"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 1.2 }}>
                              <div className="relative flex flex-col items-center justify-center pt-32 h-[90%]">
                                <svg
                                  className="w-20 lg:w-35 aspect-square text-accent1 z-10"
                                  fill="currentColor"
                                  stroke="none"
                                  viewBox="0 0 480.1 501.91">
                                  <path
                                    d="M71.17 23.58c27.73-.29 50.44 21.96 50.72 49.68a50.229 50.229 0 0 1-15.01 36.33c-19.44 19.78-51.22 20.05-71 .62a50.178 50.178 0 0 1-15.01-36.23c-.11-27.73 22.29-50.29 50.01-50.4h.29Zm21.12 29.27c-11.52-11.72-30.37-11.87-42.08-.35a29.756 29.756 0 0 0-8.89 21.47c-.19 16.43 12.97 29.91 29.41 30.11 8.15.1 15.98-3.15 21.66-8.99 11.66-11.58 11.73-30.42.15-42.08l-.15-.15h-.1ZM13.57 27.9A73.933 73.933 0 0 1 76.16.15a73.423 73.423 0 0 1 55.1 27.65c16.99 21.12 16.51 54.05 7.3 87.36-11.52 41.85-36.86 85.44-57.31 106.07-3.49 4-9.23 5.18-14.02 2.88-.83-.41-1.61-.92-2.3-1.54-.53-.46-1.01-.98-1.44-1.54C42.95 200.49 17.8 157 6.28 115.34c-9.12-33.3-9.6-66.23 7.29-87.35v-.1Zm33.79-1.73a53.63 53.63 0 0 0-17.86 14.5c-12.19 15.36-11.14 41.66-3.55 69.21 9.6 34.56 29.18 70.36 46.46 90.81 17.28-20.45 36.96-56.16 46.46-90.81 7.68-27.55 8.74-53.95-3.46-69.12A53.668 53.668 0 0 0 69.52 20.6c-7.68.23-15.21 2.13-22.08 5.57h-.1Zm25.73 187.67-.48.1.48-.1Zm0 0 7.2-2.69-7.2 2.69Zm314.29 31.77c34.35-.11 62.29 27.66 62.4 62.01v.38c.11 34.35-27.66 62.29-62.01 62.4h-.38c-34.35.11-62.29-27.66-62.4-62.01v-.38c-.11-34.35 27.66-62.29 62.01-62.4h.38Zm29.66 32.83c-16.25-16.44-42.75-16.58-59.19-.33a41.81 41.81 0 0 0-12.42 29.99c-.13 23.11 18.51 41.96 41.62 42.09 11.26.06 22.07-4.42 29.99-12.42 16.38-16.31 16.44-42.81.13-59.19-.04-.05-.09-.09-.13-.13ZM314.9 250.03a93.118 93.118 0 0 1 78.72-34.75c27.12.83 52.5 13.53 69.4 34.75 21.41 26.78 20.64 68.44 8.93 110.87-14.78 53.76-47.33 109.91-73.53 136.51-3.61 4.4-9.76 5.75-14.88 3.26-.76-.39-1.47-.87-2.11-1.44-.71-.56-1.36-1.21-1.92-1.92-26.21-26.59-58.75-82.56-73.53-136.31-11.71-42.53-12.48-84.19 8.93-110.97Zm40.13-6.72a72.807 72.807 0 0 0-24.29 19.58c-16.61 20.73-15.26 55.97-5.09 92.73 12.86 46.94 40.03 95.52 63.36 121.91 23.23-26.4 50.4-74.97 63.36-121.91 10.08-36.77 11.42-72-5.18-92.73a72.749 72.749 0 0 0-62.11-27.17 72.017 72.017 0 0 0-30.05 7.49v.1Zm34.65 246.42-.48.19.48-.19Zm0 0 6.72-2.4-6.72 2.4ZM73.09 205.01c-5.62.13-10.07 4.8-9.94 10.42.13 5.62 4.8 10.07 10.42 9.94 8.35-.19 18.62-1.15 29.76-2.21 34.65-3.26 79.1-7.49 84.48 8.83 3.84 11.71-23.52 21.89-47.61 31.01-24.96 9.31-47.52 17.76-46.37 34.75 1.34 19.39 31.49 20.16 67.39 21.21 34.46.96 75.26 2.11 89.28 16.13 4.22 4.32 3.94 7.68.96 10.56-6.53 6.53-20.35 13.25-35.23 20.45-35.71 17.28-77.08 37.34-69.79 76.8 3.46 19.01 35.04 31.49 81.79 40.03 43.01 7.87 99.74 13.44 158.39 17.95 5.67-.22 10.08-5 9.86-10.66-.19-4.77-3.64-8.79-8.33-9.69-58.27-4.61-114.43-10.08-156.28-17.66-38.3-7.1-63.74-14.78-65.37-23.71-4.42-24.09 29.37-40.51 58.56-54.72 16.7-7.97 32.06-15.36 40.99-24.38 11.81-11.71 13.92-24.38-1.15-39.45-19.68-19.68-64.89-20.93-103.1-22.08-15.86.05-31.72-.66-47.52-2.11-.19-1.92 15.55-7.78 33.02-14.4 32.83-12.19 69.88-26.11 59.9-56.35-10.46-31.87-63.93-26.78-105.79-22.75-10.85.96-20.73 1.92-28.32 2.11Z"
                                    style={{
                                      fill: "#d3ba91",
                                    }}
                                  />
                                </svg>
                              </div>
                              <p className="text-lg font-sourcesans text-center text-text/40">
                                ungefähre
                              </p>
                              <p className="text-3xl lg:text-5xl text-stone-600 font-medium -mt-1 text-center">
                                Strecke
                              </p>
                            </motion.div>
                          )}

                          {/* Duration Block */}
                          {currentInfoIndex === 1 && (
                            <motion.div
                              key="duration"
                              className="w-full flex flex-col items-center justify-center relative h-full"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 1.2 }}>
                              <div className="relative flex flex-col items-center justify-center pt-32 h-[90%]">
                                <svg
                                  className="w-14 lg:w-20 aspect-square text-accent1 z-10"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <p className="text-lg font-sourcesans text-center text-text/40">
                                ungefähre
                              </p>
                              <p className="text-3xl lg:text-5xl text-stone-600 font-medium -mt-1 text-center">
                                Dauer
                              </p>
                            </motion.div>
                          )}

                          {/* Wines Block */}
                          {currentInfoIndex === 2 && (
                            <motion.div
                              key="wines"
                              className="w-full flex flex-col items-center justify-center relative h-full"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 1.2 }}>
                              <div className="relative flex flex-col items-center justify-center pt-32 h-[90%]">
                                <svg
                                  className="w-14 lg:w-24 aspect-square text-accent1 z-10"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 32 32">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11.381V3h2v8.381c.356.089.689.229 1 .408V2.75c0-.276-.224-.75-.5-.75h-3c-.276 0-.5.474-.5.75v9.038a3.928 3.928 0 0 1 1-.407z"
                                  />
                                  <path d="M18.667 29.75h-5.333a1.835 1.835 0 0 1-1.833-1.833V15.21c0-2.459 2-4.46 4.46-4.46 2.54 0 4.54 2 4.54 4.46v12.707a1.836 1.836 0 0 1-1.834 1.833zm-2.627-18c-1.988 0-3.54 1.552-3.54 3.46v12.707c0 .459.374.833.833.833h5.333a.834.834 0 0 0 .833-.833V15.21a3.462 3.462 0 0 0-3.459-3.46zM14 4h3v1h-3z" />
                                  <path d="M14.5 26H12a.5.5 0 0 1 0-1h2v-7h-2a.5.5 0 0 1 0-1h2.5c.276 0 .5.474.5.75v8c0 .276-.224.25-.5.25z" />
                                </svg>
                              </div>
                              <p className="text-lg font-sourcesans text-center text-text/40">
                                ausgewählte
                              </p>
                              <p className="text-3xl lg:text-5xl text-stone-600 font-medium -mt-1 text-center">
                                Weine
                              </p>
                            </motion.div>
                          )}

                          {/* People Block */}
                          {currentInfoIndex === 3 && (
                            <motion.div
                              key="people"
                              className="w-full flex flex-col items-center justify-center relative h-full"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 1.2 }}>
                              <div className="relative flex flex-col items-center justify-center pt-32 h-[90%]">
                                <svg
                                  className="w-14 lg:w-24 aspect-square text-accent1 z-10"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                  />
                                </svg>
                              </div>
                              <p className="text-lg font-sourcesans text-text/40">
                                bis zu
                              </p>
                              <p className="text-3xl lg:text-5xl text-stone-600 font-medium -mt-1 text-center">
                                Personen
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Tour Header Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTour.id + "-header"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6 },
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        transition: { duration: 0.3 },
                      }}>
                      <div className="flex flex-row lg:items-center lg:justify-between gap-6 z-20 relative">
                        <div>
                          <div className="flex items-center gap-3 mb-4 ">
                            <div>
                              <p className="text-accent1 font-semibold text-sm uppercase tracking-wider z-20 ">
                                •{" "}
                                {selectedTour.id === "welcome"
                                  ? tours[1].info
                                  : selectedTour.info}{" "}
                                •
                              </p>
                              <h2 className="text-3xl lg:text-[40px] font-bold font-bonanova text-gray-800 xl:pr-32 ">
                                {selectedTour.id === "welcome"
                                  ? tours[1].title
                                  : selectedTour.title}
                              </h2>
                            </div>
                          </div>
                          <div className="w-24 h-1 bg-gradient-to-r from-accent1 to-accent1/60 rounded-full" />
                          <div className="w-full flex justify-between items-start border-0 border-green-500">
                            {/* Booking Button HERE */}
                            {/* <BookingButtonV1 /> */}
                            <BookingButtonV2toRight classNames="w-[450px] h-full -ml-3 mt-4 justify-start border-0 border-blue-500" />
                            {/* <BookingButtonV2toLeft classNames="w-[450px] h-full ml-8 mt-10 justify-end border-0 border-blue-500" /> */}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Tour Description */}
                <div className="p-8 lg:p-12 relative bg-stone-50 border-t-[1.2px] border-stone-200 mt-14">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTour.id + "-details"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, delay: 0.2 },
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        transition: { duration: 0.3 },
                      }}>
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold font-bonanova text-gray-800 mb-6 flex items-center gap-3">
                          Was Sie erwartet
                        </h3>
                      </div>

                      <div className="relative pb-12">
                        <div
                          className="prose prose-lg max-w-none text-gray-900/70 font-body leading-relaxed
                                    prose-headings:font-bonanova prose-headings:text-gray-800
                                    prose-strong:text-gray-800 prose-strong:font-semibold
                                    prose-ul:space-y-3 prose-li:text-gray-700
                                    prose-p:text-gray-700 prose-p:leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: selectedTour.longDescription,
                          }}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Image Gallery */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTour.id + "-gallery"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.4 },
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                      transition: { duration: 0.3 },
                    }}></motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Get In Touch Section */}
      <div className="relative bg-gradient-to-br from-stone-50 to-white border-t border-stone-200 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-32 h-32 bg-accent1 rounded-full" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent1 rounded-full" />
        </div>
        <div className="relative z-10">{/* <GetInTouch className="" /> */}</div>
      </div>
    </section>
  );
};

export default InteractiveTours;
