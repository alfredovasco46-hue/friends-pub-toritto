// Configurazione e dati ufficiali FRIENDS PUB TORITTO (Piazza Papa Giovanni Paolo II, 13/15)

const FRIENDS_CONFIG = {
  name: "Friends Pub",
  city: "Toritto",
  subtitle: "Pizzeria • Hamburgeria • Sushi & Poke",
  address: "Piazza Papa Giovanni Paolo II, 13/15 — 70020 Toritto (BA)",
  phone: "347 360 5371",
  phoneClean: "393473605371",
  facebookUrl: "https://www.facebook.com/friendspubtoritto",
  googleMapsUrl: "https://www.google.com/maps/place/Friends/@40.9993938,16.6793703,17z/data=!4m7!3m6!1s0x13478d26a6892ca3:0xb9f076679d42c379!8m2!3d40.9993938!4d16.6819452!10e9!16s%2Fg%2F11csrmv0_s",
  coordinates: { lat: 40.9993938, lng: 16.6819452 },
  supabaseUrl: "https://wrnvorxczaxtjojgmyqe.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybnZvcnhjemF4dGpvamdteXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1ODUwNTcsImV4cCI6MjEwNjE2MTA1N30.ZKCei8IozPOyD_XuPaaUNu6pyuDT_UPZDuYQGQdjfTY",
  hours: "Lunedì – Domenica: 19:00 – 01:00",
  maxSeatsPerSlotIndoor: 42,
  maxSeatsPerSlotOutdoor: 48,
  outdoorEnabled: true,
  serviceNote: "Servizio al tavolo 1,50 € • Pane 1,00 € • Ciccio 3,00 € • Mozzarella senza lattosio +2,00 €",
  tables: [
    { id: "P1", name: "Tavolo P1", area: "Dehors Piazza", capacity: 2 },
    { id: "P2", name: "Tavolo P2", area: "Dehors Piazza", capacity: 4 },
    { id: "P3", name: "Tavolo P3", area: "Dehors Piazza", capacity: 4 },
    { id: "P4", name: "Tavolo P4", area: "Dehors Piazza", capacity: 6 },
    { id: "P5", name: "Tavolo P5", area: "Dehors Piazza", capacity: 8 },
    { id: "P6", name: "Tavolo P6", area: "Dehors Piazza", capacity: 10 },
    { id: "S1", name: "Tavolo S1", area: "Sala Interna", capacity: 2 },
    { id: "S2", name: "Tavolo S2", area: "Sala Interna", capacity: 4 },
    { id: "S3", name: "Tavolo S3", area: "Sala Interna", capacity: 4 },
    { id: "S4", name: "Tavolo S4", area: "Sala Interna", capacity: 6 },
    { id: "S5", name: "Tavolo S5", area: "Sala Interna", capacity: 8 },
    { id: "S6", name: "Tavolo S6", area: "Sala Interna", capacity: 12 }
  ]
};

function getTodayFormatted(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const INITIAL_MENU = [
  // STUZZICHIAMO & FRIGGIAMO
  { id: "sf1", name: "Olive", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 1.50, description: "Porzione di olive selezionate.", tagLabels: ["Stuzzichiamo"], available: true },
  { id: "sf2", name: "Arachidi", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 1.50, description: "Arachidi tostate e salate.", tagLabels: ["Stuzzichiamo"], available: true },
  { id: "sf3", name: "Anacardi", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 2.50, description: "Anacardi tostati croccanti.", tagLabels: ["Stuzzichiamo"], available: true },
  { id: "sf4", name: "Patatine Classiche", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 3.00, description: "Patatine fritte classiche dorate (Media 3,00 € / Maxi 7,00 €).", tagLabels: ["Media 3,00 € • Maxi 7,00 €"], available: true },
  { id: "sf5", name: "Patatine Fritte Cheddar e Bacon", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 4.00, description: "Patatine fritte con fonduta di cheddar e bacon croccante (Media 4,00 € / Maxi 8,00 €).", tagLabels: ["Media 4,00 € • Maxi 8,00 €"], available: true },
  { id: "sf6", name: "Patate Dolci Americane", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 4.00, description: "Bastoncini di patata dolce americana fritti (Media 4,00 € / Maxi 8,00 €).", tagLabels: ["Novità • Maxi 8,00 €"], available: true },
  { id: "sf7", name: "Criss Cross Gusto Paprika", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 3.50, description: "Patate taglio waffle croccanti speziate alla paprika (Media 3,50 € / Maxi 7,00 €).", tagLabels: ["Novità • Maxi 7,00 €"], available: true },
  { id: "sf8", name: "Tempura di Verdure", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 4.00, description: "Verdure fresche in pastella leggera e croccante (Media 4,00 € / Maxi 8,00 €).", tagLabels: ["Media 4,00 € • Maxi 8,00 €"], available: true },
  { id: "sf9", name: "Gyoza Beef (Ravioli di Carne)", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 3.50, description: "Ravioli orientali ripieni di carne di manzo piastrati (5 pz 3,50 € / 10 pz 7,00 €).", tagLabels: ["5 pz 3,50 € • 10 pz 7,00 €"], available: true },
  { id: "sf10", name: "Pepite Corn Flakes", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 3.50, description: "Bocconcini di pollo panati ai corn flakes super croccanti (5 pz 3,50 € / 10 pz 7,00 €).", tagLabels: ["5 pz 3,50 € • 10 pz 7,00 €"], available: true },
  { id: "sf11", name: "Bucatini Fritti Cacio e Pepe", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 3.50, description: "Frittatine di bucatini mantecati cacio e pepe (5 pz 3,50 € / 10 pz 7,00 €).", tagLabels: ["5 pz 3,50 € • 10 pz 7,00 €"], available: true },
  { id: "sf12", name: "Tempura di Gamberi (6 pz)", category: "stuzzicheria-fritti", categoryLabel: "Stuzzichiamo & Friggiamo", price: 5.00, description: "Sei code di gambero in tempura dorata.", tagLabels: ["6 Pezzi"], available: true },

  // PIZZE & PANZEROTTI XXL
  { id: "pz1", name: "Ciccio", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 3.00, description: "Olio EVO, origano, sale.", tagLabels: ["Classica"], available: true },
  { id: "pz2", name: "Marinara", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 5.00, description: "Pomodoro, origano, aglio, olio EVO.", tagLabels: ["Classica"], available: true },
  { id: "pz3", name: "Margherita", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 5.00, description: "Pomodoro, mozzarella, basilico, olio EVO.", tagLabels: ["Classica"], available: true },
  { id: "pz4", name: "Bufala", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 7.00, description: "Pomodoro, mozzarella di bufala, basilico, olio EVO.", tagLabels: ["Classica"], available: true },
  { id: "pz5", name: "Piccantina", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 7.00, description: "Pomodoro, mozzarella, salame piccante.", tagLabels: ["Piccante"], available: true },
  { id: "pz6", name: "Vegetariana", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 8.00, description: "Pomodoro, mozzarella, zucchine, chips di melanzane, funghi freschi.", tagLabels: ["Vegetariana"], available: true },
  { id: "pz7", name: "Capricciosa", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 8.00, description: "Pomodoro, mozzarella, prosciutto cotto, funghi, olive.", tagLabels: ["Classica"], available: true },
  { id: "pz8", name: "Fumè", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 7.50, description: "Pomodoro, mozzarella, scamorza affumicata, speck.", tagLabels: ["Affumicata"], available: true },
  { id: "pz9", name: "Valtellina", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 8.00, description: "Pomodoro, mozzarella, bresaola, rucola, grana.", tagLabels: ["Classica"], available: true },
  { id: "pz10", name: "Principessa", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 8.00, description: "Pomodoro, mozzarella, panna, rucola, prosciutto crudo.", tagLabels: ["Specialità"], available: true },
  { id: "pz11", name: "Sporcacciona", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 8.00, description: "Pomodoro, mozzarella, mortadella, stracciatella, granella di pistacchio.", tagLabels: ["Consigliata"], available: true },
  { id: "pz14", name: "Friends (Bianca)", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 8.50, description: "Mozzarella, funghi freschi, crema di noci, bacon.", tagLabels: ["Pizza della Casa"], available: true },
  { id: "pz17", name: "Sopraffina (Bianca)", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 9.00, description: "Mozzarella, bresaola, stracciatella, pomodori secchi, granella di pistacchio, rucola in uscita.", tagLabels: ["Bianca Gourmet"], available: true },
  { id: "pz21", name: "Carbonara 3.0", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 9.50, description: "Fiordilatte, crema carbonara, guanciale, grana.", tagLabels: ["Specialità"], available: true },
  { id: "pz24", name: "Hollywood", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 9.50, description: "Mozzarella di bufala, crema cacio e pepe, salame al tartufo, stracciatella in uscita.", tagLabels: ["Specialità"], available: true },
  { id: "pz31", name: "Superlativa", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 9.00, description: "Crema di zucca, fiordilatte, capocollo, cipolla fritta, chips di zucchine, grana a scaglie.", tagLabels: ["Novità"], available: true },
  { id: "pz32", name: "Panzerotto al Forno XXL Classico", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 5.00, description: "Fiordilatte, pomodoro.", tagLabels: ["Panzerotto XXL"], available: true },
  { id: "pz33", name: "Panzerotto al Forno XXL Ignorante", category: "pizze", categoryLabel: "Pizze & Panzerotti XXL", price: 8.00, description: "Cotto, funghi, carciofi, wurstel.", tagLabels: ["Panzerotto XXL"], available: true },

  // HAMBURGER + PATATINE
  { id: "hb1", name: "Americano", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 8.00, description: "Carne, insalata iceberg, cipolla bianca, pomodoro insalataro, cheddar, salsa americana, bacon croccante. Con patatine.", tagLabels: ["Con Patatine"], available: true },
  { id: "hb2", name: "Birbante", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 8.00, description: "Carne, salsa BBQ, doppio cheddar, doppio bacon croccante. Con patatine.", tagLabels: ["Con Patatine"], available: true },
  { id: "hb3", name: "Imbrattato", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 9.00, description: "Carne, ragù di pomodori secchi, scamorza affumicata, bacon croccante, granella di pistacchio. Con patatine.", tagLabels: ["Con Patatine"], available: true },
  { id: "hb4", name: "Toriloco", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 9.00, description: "Carne, mozzarella di bufala, confettura di ciliegie, caciocavallo, bacon, cipolla rossa saltata con soia, olio al basilico, granella di mandorla. Con patatine.", tagLabels: ["Specialità Toritto"], available: true },
  { id: "hb5", name: "Dimenticato", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 9.00, description: "Carne, fonduta di caciocavallo, uovo occhio di bue, bacon croccante, salsa cheddar. Con patatine.", tagLabels: ["Con Patatine"], available: true },
  { id: "hb6", name: "Maialino", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 9.00, description: "Carne, zucchine alla scapece, verza viola brasata, chips di capocollo croccante, dip di cipolla, mayo giapponese. Con patatine.", tagLabels: ["Con Patatine"], available: true },
  { id: "hb7", name: "Crazy Chicken Evolution", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 9.00, description: "Filetto di pollo ai corn flakes, scamorza affumicata, mortadella, bacon, salsa hamburger. Con patatine.", tagLabels: ["Novità"], available: true },
  { id: "hb8", name: "Pulled Passion", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 9.00, description: "Pulled pork, salsa barbecue, cheddar, coleslaw di cavolo viola. Con patatine.", tagLabels: ["Novità"], available: true },
  { id: "hb9", name: "Super Smash", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 10.00, description: "Doppio hamburger di carne 100g cad., doppio cheddar, doppio bacon, salsa crispy. Con patatine.", tagLabels: ["Doppio Smash"], available: true },
  { id: "hb10", name: "Parmigianino", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 9.00, description: "Carne, chips di melanzana, stracciatella, ragù napoletano, mortadella alla piastra. Con patatine.", tagLabels: ["Con Patatine"], available: true },
  { id: "hb11", name: "Superbo", category: "hamburger", categoryLabel: "Hamburger + Patatine", price: 9.00, description: "Carne, crema di rucola, insalatina ai due pomodori con prezzemolo, guanciale croccante, bufala. Con patatine.", tagLabels: ["Novità"], available: true },

  // HAMBURGER DI MARE & BAO
  { id: "hm1", name: "Tuna Vibes", category: "mare-bao", categoryLabel: "Hamburger di Mare & Bao", price: 9.00, description: "Tartare di tonno fresco, crema di pistacchio, stracciatella, mandorle, datterino giallo.", tagLabels: ["Burger di Mare"], available: true },
  { id: "hm2", name: "Igloo", category: "mare-bao", categoryLabel: "Hamburger di Mare & Bao", price: 9.00, description: "Tartare di salmone fresco, mayo giapponese, zucchine alla scapece, bufala, rucola, zest di lime.", tagLabels: ["Burger di Mare"], available: true },
  { id: "hm3", name: "Purple Rain", category: "mare-bao", categoryLabel: "Hamburger di Mare & Bao", price: 9.00, description: "Gamberi in tempura, verza viola, salsa cocktail, insalata iceberg, capocollo croccante.", tagLabels: ["Burger di Mare"], available: true },
  { id: "hm4", name: "Fish Burger", category: "mare-bao", categoryLabel: "Hamburger di Mare & Bao", price: 9.00, description: "Hamburger di merluzzo fritto, crema tzatziki, capocollo croccante, misticanza.", tagLabels: ["Novità"], available: true },
  { id: "hm5", name: "Big Fish", category: "mare-bao", categoryLabel: "Hamburger di Mare & Bao", price: 12.00, description: "Tartare di tonno, tartare di salmone, mayo al lime, chips di zucchine fritte, pesto di pistacchio.", tagLabels: ["Specialità Mare"], available: true },
  { id: "hm6", name: "Nettuno", category: "mare-bao", categoryLabel: "Hamburger di Mare & Bao", price: 9.00, description: "Tartare di salmone, crema tzatziki, radicchio, zucchine infornate, granella di pistacchio.", tagLabels: ["Novità"], available: true },
  { id: "hm7", name: "Bao Artigianali (2 pz / Tris 3 pz)", category: "mare-bao", categoryLabel: "Hamburger di Mare & Bao", price: 7.00, description: "Ordine minimo 2 pz (7,00 €) o Tris (10,00 €): A) Pulled pork, BBQ, cheddar • B) Tonno fresco, stracciatella, pistacchio • C) Salmone fresco, mandorla, teriyaki.", tagLabels: ["2 pz 7,00 € • Tris 10,00 €"], available: true },

  // INSALATE & TAGLIATE
  { id: "it1", name: "Insalata Leggera", category: "insalate-tagliate", categoryLabel: "Insalate & Tagliate", price: 8.00, description: "Insalata iceberg, misticanza, rucola, pomodorini ciliegino, pollo alla piastra 150g, salsa yogurt, grana.", tagLabels: ["Insalata"], available: true },
  { id: "it2", name: "Insalata Allegra", category: "insalate-tagliate", categoryLabel: "Insalate & Tagliate", price: 8.00, description: "Insalata iceberg, misticanza, pollo alla piastra 150g, bacon croccante, vinaigrette alla senape, sfoglie di grana croccante, frutta secca.", tagLabels: ["Insalata"], available: true },
  { id: "it3", name: "Insalata Superclassica", category: "insalate-tagliate", categoryLabel: "Insalate & Tagliate", price: 7.00, description: "Insalata iceberg, misticanza, tonno in scatola, olive nere, pomodorini, fiordilatte a fette, mais, carote.", tagLabels: ["Novità"], available: true },
  { id: "it4", name: "Caesar Salad", category: "insalate-tagliate", categoryLabel: "Insalate & Tagliate", price: 8.00, description: "Insalata iceberg, pollo alla piastra 150g, petali di grana, crostini di pane tostato con origano, Caesar cream.", tagLabels: ["Novità"], available: true },
  { id: "it5", name: "Insalata Fitness", category: "insalate-tagliate", categoryLabel: "Insalate & Tagliate", price: 7.00, description: "Insalata iceberg, misticanza, mais, rucola, mozzarella di bufala, olive nere, pomodorini con Bresaola o Fesa di Tacchino (7,00 €) o Tartare di Salmone 100g (9,00 €).", tagLabels: ["Fitness"], available: true },
  { id: "it6", name: "Insalata Marittima", category: "insalate-tagliate", categoryLabel: "Insalate & Tagliate", price: 9.00, description: "Insalata iceberg, radicchio, avocado, fiordilatte a fette, scaglie di mandorle, crema yogurt lime con Tartare di Tonno 100g o Salmone 100g.", tagLabels: ["Novità"], available: true },
  { id: "it7", name: "Tagliata Entrecote di Angus (300g)", category: "insalate-tagliate", categoryLabel: "Insalate & Tagliate", price: 12.00, description: "Entrecote di Angus da 300g servita con rucola, grana e pomodorini.", tagLabels: ["Tagliata 300g"], available: true },
  { id: "it8", name: "Tagliata di Pollo (300g)", category: "insalate-tagliate", categoryLabel: "Insalate & Tagliate", price: 9.00, description: "Tagliata di pollo alla piastra da 300g servita con rucola, grana e pomodorini.", tagLabels: ["Tagliata 300g"], available: true },

  // SUSHI & POKE
  { id: "sp1", name: "Roll 1 (8 pz)", category: "sushi-poke", categoryLabel: "Sushi & Poke", price: 8.00, description: "Interno: Gambero in tempura, avocado, Philadelphia. Esterno: Tartare di salmone, teriyaki, mix alghe di mare.", tagLabels: ["8 Pezzi"], available: true },
  { id: "sp2", name: "Roll 2 (8 pz)", category: "sushi-poke", categoryLabel: "Sushi & Poke", price: 8.00, description: "Interno: Gambero in tempura, Philadelphia. Esterno: Tartare di tonno, mayo al lime, palline di crackers di riso.", tagLabels: ["8 Pezzi"], available: true },
  { id: "sp3", name: "Roll 3 (8 pz)", category: "sushi-poke", categoryLabel: "Sushi & Poke", price: 8.00, description: "Interno: Salmone, Philadelphia. Esterno: Salmone scottato, teriyaki, katsuobushi.", tagLabels: ["8 Pezzi"], available: true },
  { id: "sp4", name: "Roll 4 (8 pz)", category: "sushi-poke", categoryLabel: "Sushi & Poke", price: 8.00, description: "Interno: Tonno, avocado. Esterno: Salmone, crema cocco e lime, palline di crackers di riso.", tagLabels: ["Novità • 8 Pezzi"], available: true },
  { id: "sp5", name: "Roll 5 (8 pz)", category: "sushi-poke", categoryLabel: "Sushi & Poke", price: 8.00, description: "Interno: Salmone, avocado. Esterno: Salmone, teriyaki, mayo giapponese.", tagLabels: ["Novità • 8 Pezzi"], available: true },
  { id: "sp6", name: "Poke Bowl Componibile", category: "sushi-poke", categoryLabel: "Sushi & Poke", price: 10.00, description: "Base 7,00 € (Avocado, alghe wakame, edamame, cetrioli, mais, carote) + Proteina (Salmone +3€, Tonno +4€, Gambero in tempura +3€, Pollo fritto +2€) + Salsa a scelta.", tagLabels: ["Componibile"], available: true }
];

const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Marco Lorusso",
    rating: 5,
    date: "2 settimane fa",
    category: "Cena in Piazza",
    favoriteDish: "Pizza Sopraffina & Hamburger Toriloco",
    text: "Una garanzia nel centro storico di Toritto. Cenare in Piazza Papa Giovanni Paolo II ha un'atmosfera davvero piacevole. Impasto della pizza leggerissimo e il panino Toriloco con confettura di ciliegie, bufala e mandorle è spettacolare.",
    ownerReply: "Grazie di cuore Marco. Ti aspettiamo presto in piazza da Friends Pub!"
  },
  {
    id: "rev-2",
    author: "Valentina De Palma",
    rating: 5,
    date: "3 settimane fa",
    category: "Hamburgeria",
    favoriteDish: "Super Smash & Bucatini Fritti Cacio e Pepe",
    text: "Hamburger di qualità altissima e patatine sempre croccanti. I bucatini fritti cacio e pepe e i gyoza sono perfetti per iniziare la serata. Personale gentile e veloce anche nel fine settimana.",
    ownerReply: "Grazie mille Valentina, a prestissimo da Friends!"
  },
  {
    id: "rev-3",
    author: "Giuseppe D'Ambrosio",
    rating: 5,
    date: "1 mese fa",
    category: "Sushi & Burger di Mare",
    favoriteDish: "Big Fish & Roll 1",
    text: "Siamo venuti in comitiva per provare i nuovi hamburger di mare e i roll di sushi: pesce freschissimo e abbinamenti curati. Anche la sala interna con le volte in pietra è molto accogliente.",
    ownerReply: "Grazie Giuseppe, siamo felici che abbiate apprezzato le novità del nostro menu."
  },
  {
    id: "rev-4",
    author: "Chiara Fiore",
    rating: 4,
    date: "1 mese fa",
    category: "Pizzeria",
    favoriteDish: "Pizza Hollywood & Panzerotto XXL",
    text: "Locale curato e ottima accoglienza. La pizza Hollywood con cacio e pepe, tartufo e stracciatella è buonissima. Prezzi onesti e servizio attento.",
    ownerReply: ""
  }
];
