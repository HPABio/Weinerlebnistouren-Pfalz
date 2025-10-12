import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrigittaHeylPortrait from "@images/BrigittaHeylPortrait.png";
import { Image } from "astro:assets";

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
        "Lassen Sie sich von mir durch die malerischen Weinberge Gimmeldingens und durch ihre Geschichte führen.",
      season: "Für jede Saison die passende Tour",
      images: {
        card: images.MJAlmondFlowerMosaicGlass.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-contain",
      },
      longDescription: `
      <p class="mb-4 text-gray-900/80 text-3xl text-center">Erleben Sie in</p>
      <p class="mb-4 text-gray-900/80 text-xl text-center">⏱️ 4-5 Stunden/4 km ⏱️</p>
      <p class="mb-4 text-gray-900/80 text-xl text-center">🍇 die Neustädter Weinregion 🍇</p>
      <p class="mb-4 text-gray-900/80 text-xl text-center">🍷 mit 5 Weinen/5 Mandel-Snacks 🍷</p>
      <p class="mb-4 text-gray-900/80 text-xl text-center">🏰 als Zeitreise/Teamevent 🏰</p>
      <p class="mb-10 mt-10 text-xl text-gray-900/80">Lassen Sie sich von mir  durch die malerischen Weinberge Gimmeldingens und durch ihre Geschichte führen.</p>
      `,
    },
    {
      id: "mandelbluete",
      info: "Genuss, Geschichte und Natur",
      title: "Mandelblüte, Meerspinne und Monarchen",
      subtitle:
        "Erleben Sie die Pfälzer Mandelblüte auf einer einzigartigen Route.",
      season: "Frühling",
      images: {
        card: images.MJAlmondFlowerMosaicGlass.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-contain",
      },
      // <p class="mb-4">Erlebe mit Freunden, Kollegen und Familie eine unterhaltsame Weinerlebnistour durch die rosa blühenden Weinberge von Gimmeldingen. Geführt von einer zertifizierten Kultur- und Weinbotschafterin erwartet Dich eine spannende Mischung aus Natur, Genuss und kurzweiligen historischen Episoden - perfekt für alle Sinne! Das erwartet dich:</p>
      longDescription: `
        <p class="mb-4 text-gray-900/80 text-xl">🌸 Mandelblüte/Weinberge •  🍷 5 Weine/5 Mandel-Snacks  • 🤝 Teamevent/Zeitreise • ⏱️ 4-5 Stunden/4 km</p>
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
        "Lauschen Sie dem Mussbach - den Geschichten des Gimmeldinger Tales und seines geheimnisvollen Waldes.",
      season: "Sommer",
      images: {
        card: images.WassermühleImWald.src,
        background: backgroundImage.src,
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
        "Weinberge, Geschichte und Kultur - eine Tour auf den Spuren der Weinkultur und regionaler Legenden.",
      season: "Frühling - Herbst",
      images: {
        card: images.MJBachusMosaicGlass.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_20%]",
        bgObjectPosition: "object-[50%_50%]",
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

        <p class="mb-2">Denn Wein erzählt Geschichten – von Landschaften, Menschen und Jahrhunderten. Auf dieser besonderen Tour entdeckt ihr, wie eng die Kultur des Weins mit der Geschichte der Pfalz verwoben ist. Während ihr die Weine verkostet, reist ihr durch die Epochen des Weinbaus, erfahrt Spannendes über die pfälzische Historie und schlüpft selbst in die Rolle einer historischen Figur. So erlebt ihr die Vergangenheit hautnah – mit allen Sinnen, einem Glas Wein in der Hand und der lebendigen Atmosphäre der Pfalz um euch herum.</p>
        <p class="mb-2">Lass Dich von der einzigartigen Verbindung aus Wein, Kultur, Kulinarik und Natur inspirieren – ein wahres Fest für alle Sinne.  Ideal als genussvolles Teamevent oder als entspannter Ausflug mit Freunden, Kollegen & Familie.</p>
        <p>Die Tour startet um 11h oder 14h im Weingut JF Ohler in Gimmeldingen.</p>
      `,
    },
    {
      id: "gluehwein",
      info: "Wärmende Wintertour mit Glühwein",
      title: "Geheimnisvolles Gimmeldingen",
      subtitle:
        "Genießen Sie Natur, Geschichten und Pfälzer Herzlichkeit in der kalten Jahreszeit.",
      season: "Winter",
      images: {
        card: images.MJGlühweinV1.src,
        background: backgroundImage.src,
        objectPosition: "object-[50%_28%]",
        bgObjectPosition: "object-center",
      },
      longDescription: `
        <p class="mb-4 text-gray-900/80 text-xl">❄️ Winterzauber  •  🔥 5 Glühweine & Co+Snacks  • 🤝 Teamevent+Zeitreise • ⏱️ 4 Stunden/4 km</p>
        <p class="mb-10">Erlebe Gimmeldingen im Lichterglanz: Diese Tour führt dich durch geheimnisvolle Gassen und Keller des malerischen Weinorts sowie entlang des plätschernden Mussbaches – begleitet von einem wärmenden 5-teiligen Foodpairing mit Secco, 3 Glühweinen und einer pfälzischen Kostbarkeit. Bei jeder Station entfalten sich die Geheimnisse von Gimmeldingen mit spannenden Anekdoten und Hintergrundwissen, lebendig erzählt von einer zertifizierten Kultur- und Weinbotschafterin.</p>
        <ul class="list-disc pl-5 space-y-2 mb-10">
            <li>Zum Auftakt wirst du mit einem prickelnden Secco und einem pfälzischen Snack in einem historischen Weinkeller willkommen geheißen</li>
            <li>Von dort aus führt dich ein entspannter Spaziergang über rund 4 Kilometer durch romantische Gassen und versteckte Winkel des malerischen Weinorts Gimmeldingen</li>
            <li>Die winterliche Stimmung entlang des plätschernden Mußbachs verleiht der Tour dabei eine ganz besondere Atmosphäre</li>
            <li>Unterwegs erwarten dich weitere vier liebevoll gestaltete Stationen in historischen Gebäuden oder am knisternden Feuer – jede einzelne ein Genussmoment mit wärmendem Glühwein und passenden Häppchen bzw einer Pfälzer Köstlichkeit</li>
            <li>Und das Besondere: Du wirst selbst Teil der Geschichte – schlüpfst in die Rolle des Bischofs von Speyer, des Belzenickels, Adligen und Müllern, spürst die Magie des Mußbachs, erfährst von skurrilen Begebenheiten, alten Weihnachtsbräuchen und lüftest so die Geheimnisse, die sich hinter den historischen Mauern Gimmeldingens verbergen</li>
        </ul>
        <p class="mb-4">Diese Tour verbindet Genuss, Natur und Kultur auf einzigartige Weise. Ob als weihnachtliche Team-Aktivität, Betriebsausflug oder romantischer Nachmittag mit Freunden, Familie oder Kollegen – schaffe Dir unvergessliche Erinnerungen in der Winterzeit.</p>
      `,
    },
  ];


  const [selectedTour, setSelectedTour] = useState(tours[0]);

  return (
    <section className={`min-h-screen  text-text ${className} `}>
      <div className="relative w-full h-full ">
        <AnimatePresence>
          <motion.img
            key={selectedTour.id + "-bg"}
            src={`${selectedTour.images.background}`}
            alt={`${selectedTour.title} background`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75, transition: { duration: 0.8 } }}
            exit={{ opacity: 0 }}
            className={`absolute -top-52 left-0 w-full h-[95vh] -mt-[70px] ${selectedTour.images.bgObjectPosition} object-cover object-[0%_100%] saturate-[1]`}
          />
        </AnimatePresence>

        {/* <div className="absolute w-full h-[95vh] -mt-[70px] bg-gradient-to-b from-stone-50/30 via-stone-50/0 to-transparent "></div> */}
        <div className="absolute w-full h-[26vh] -mt-[70px] bg-gradient-to-b from-white via-stone-50/80 to-transparent "></div>
        <div className="absolute top-0 w-full h-[95vh] mt-[70px] bg-gradient-to-t from-stone-100 via-stone-100 to-stone-50/5"></div>
        <div className="absolute top-0 w-full h-[95vh] -mt-[70px] bg-gradient-to-t from-stone-100/90 via-stone-100/95 to-transparent"></div>
        <div className="relative w-full h-full flex flex-col justify-center z-20 ">
          <div className="relative z-20 w-full">
            <div className="w-full mx-auto px-4 pt-4">
              {/* Title and Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  className="text-center sm:pt-[1vh] ">

            <h2 className="relative z-10 text-[0.6rem]  font-semibold text-accent1 uppercase tracking-wider font-body mb-1">
              {selectedTour.info}
            </h2>
            <h1 className="relative z-10 drop-shadow-lg font-bonanova font-bold bg-stone-900/90 text-transparent bg-clip-text
            text-lg -mt-2 leading-none
            sm:text-4xl">
              {selectedTour.title}
            </h1>
            
                </motion.div>
              </AnimatePresence>


              {/* Detailed Description Section */}
              <div className="max-w-3xl mx-auto h-[65vh] rounded-b-xl border-b-4 border-text/20 relative overflow-hidden ">
                <div className=" h-full w-full overflow-scroll absolute top-4 left-0 right-0 px-4 rounded-t-xl pb-[200px] border-t-4 border-t-stone-50/70 pt-10
                border-x-4 border-x-stone-50/60">

                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTour.id + "-desc"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  >
                    
                    <div
                      className="mt-2 pb-48 text-xs sm:text-sm md:text-lg text-gray-800 font-body leading-relaxed px-2"
                      dangerouslySetInnerHTML={{
                        __html: selectedTour.longDescription,
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
                </div>
                <div className="absolute h-[41vh] w-full bottom-0 left-[50%] translate-x-[-50%] right-0 pointer-events-none
                bg-gradient-to-t from-stone-100 via-stone-100/95 to-transparent" />
              </div>


              {/* Tours Grid - thumbnail selection */}
              <div
                className="flex flex-row items-center justify-center mb-6 mt-6
                  mx-auto max-w-[85%] absolute bottom-0 left-0 right-0 ">
                    
                {tours.slice(1, 6).map((tour) => (
                  <motion.div
                    key={tour.id}
                    onClick={() => setSelectedTour(tour)}
                    className={`cursor-pointer group relative overflow-hidden aspect-[4/5] w-full
                                  rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                                    selectedTour.id === tour.id
                                      ? "outline-offset-[4px] scale-105 flex-grow ring-offset-0 ring-2 ring-soft-beige outline-[2px] outline-stone-50/70 outline-none border-[2.5px] border-stone-100 z-30"
                                      : "border-[2.5px] border-soft-beige/20 brightness-[0.6] saturate-[0.7] scale-95 flex-shrink"
                                  }`}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <div className="absolute w-full -bottom-8 left-0 bg-stone-200/80 backdrop-blur-sm text-amber-900/90 font-semibold 
                                text-xl sm:text-[0.5rem] md:text-xs py-1 px-3 rounded-full shadow-sm hidden sm:block">
                        {tour.season}
                    </div>
                      <img
                        src={`${tour.images.card}`}
                        alt={tour.title}
                        className={`w-full h-full ${tour.images.objectPosition} object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl overflow-hidden`}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-amber-900/40 to-transparent"></div>
                      <h3
                        className="absolute bottom-3 left-[50%] translate-x-[-50%] text-[0.5rem] sm:text-[0.65rem] sm:leading-tight md:text-sm font-semibold font-bonanova text-soft-sand">
                        {tour.season}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>


            <div className="hidden absolute w-full -bottom-6 left-0 right-0 flex-row items-center justify-center text-accent1 px-4 ">
                  <svg
                    className="w-4 h-4 animate-bounce  "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span className="text-xs mb-1">
                    Weiter scrollen
                  </span>
                </div>

                






          </div>
        </div>
      
                    {/* Book Tour Button */}
                    <div className="w-[360px] h-full relative flex justify-start my-6 rounded-full bg-gradient-to-r from-stone-50 to-white mx-auto
                    border-b-2 border-b-stone-200/60 border-r-2 border-r-stone-200">
                          <div className="flex justify-between w-full ">
                            <a href="https://eveeno.com/de/event-cal/34263?style=grid"
                              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent1 to-accent1/80 text-white font-semibold 
                              rounded-full shadow-lg hover:from-accent1/90 hover:to-accent1/70 transform hover:scale-105 transition-all duration-300 group">
                              <p className="text-base">Tour buchen</p>
                              <svg className="w-5 aspect-square ml-2 group-hover:scale-110 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </a>
                            <a href="/gruppen"
                              className="inline-flex items-center justify-end text-accent2-wine font-semibold
                              text-xs md:text-sm rounded-full pr-4 lg:pr-6 hover:from-accent1/90 hover:to-accent1/70 transform hover:scale-105 transition-all duration-300 group">
                              <svg className=" w-5 aspect-square mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                ></path>
                              </svg>
                              <p className="text-accent1 text-base">Auch für Gruppen</p>
                            </a>
                          </div>
                     </div>

      </div>
      
    </section>
  );
};

export default InteractiveTours;
