export type ThemeVars = { bg: string; surface: string; ink: string; muted: string; accent: string; accent2: string }
export type QuizAnswerKey = 'sunday' | 'song' | 'item' | 'place' | 'outfit'

export type Aesthetic = {
  id: string
  name: string
  emoji: string
  adj: string
  noun: string
  tagline: string
  description: string
  keywords: string[]
  outfits: string[]
  rooms: string[]
  playlist: string
  palette: string[]
  theme: ThemeVars
  related: string[]
  answers: Record<QuizAnswerKey, string>
  images: string[]
}

export const AESTHETICS: Aesthetic[] = [
 {
  "id": "dark-academia",
  "name": "Dark Academia",
  "emoji": "🕯️",
  "adj": "Candlelit",
  "noun": "Scholar",
  "tagline": "Candlelit libraries, old poetry, rainy afternoons.",
  "description": "You romanticise learning. Worn leather books, tweed, ink-stained fingers and long walks through misty campuses — you find beauty in the melancholic and the timeless.",
  "keywords": [
   "Poetry",
   "Tweed",
   "Libraries",
   "Rain",
   "Classical"
  ],
  "outfits": [
   "Oversized wool blazer + turtleneck",
   "Pleated trousers & loafers",
   "Long trench coat, leather satchel"
  ],
  "rooms": [
   "Floor-to-ceiling bookshelves",
   "Brass desk lamp",
   "Dried flowers in old bottles"
  ],
  "palette": [
   "#1c1612",
   "#4a3426",
   "#a8743f",
   "#6b2d2a",
   "#efe6d8"
  ],
  "theme": {
   "bg": "#1c1612",
   "surface": "#2a211b",
   "ink": "#efe6d8",
   "muted": "#b9a991",
   "accent": "#c08a52",
   "accent2": "#6b2d2a"
  },
  "related": [
   "old-money",
   "grunge",
   "desi-retro"
  ],
  "answers": {
   "sunday": "Reading poetry in a café while it rains",
   "song": "Chopin nocturnes, Hozier",
   "item": "📜 A worn leather notebook",
   "place": "An old university library",
   "outfit": "Tweed blazer & turtleneck"
  },
  "images": [
   "5026996",
   "18335787",
   "1122870",
   "30342669",
   "1438252",
   "18194757",
   "6981009",
   "2553427",
   "31138996",
   "6549351",
   "6549363",
   "32787237",
   "37354385",
   "16827794",
   "35458639",
   "34549309",
   "37694188",
   "38630051",
   "17780412",
   "34423762",
   "4083119",
   "35538161",
   "14644998",
   "27236661"
  ],
  "playlist": "37i9dQZF1DX17GkScaAekA"
 },
 {
  "id": "clean-girl",
  "name": "Clean Girl",
  "emoji": "🤍",
  "adj": "Dewy",
  "noun": "Muse",
  "tagline": "Slick buns, dewy skin, calm mornings.",
  "description": "Effortless, put-together and serene. You love neutral tones, a skincare ritual, gold hoops and a space that feels like a deep breath.",
  "keywords": [
   "Minimal",
   "Dewy",
   "Neutral",
   "Rituals",
   "Gold hoops"
  ],
  "outfits": [
   "White linen set",
   "Beige knit + straight jeans",
   "Slick bun, gold hoops, lip oil"
  ],
  "rooms": [
   "Neutral linen bedding",
   "Candles & a ceramic tray",
   "One big plant, zero clutter"
  ],
  "palette": [
   "#f7f3ee",
   "#e9d8c8",
   "#c8a98a",
   "#8a7f75",
   "#2b2622"
  ],
  "theme": {
   "bg": "#f7f3ee",
   "surface": "#ffffff",
   "ink": "#2b2622",
   "muted": "#8a7f75",
   "accent": "#b88e68",
   "accent2": "#e9d8c8"
  },
  "related": [
   "minimal",
   "soft-korean",
   "old-money"
  ],
  "answers": {
   "sunday": "Pilates, a smoothie and a long skincare routine",
   "song": "SZA, Frank Ocean, soft R&B",
   "item": "🧴 Lip oil",
   "place": "A sunlit wellness studio",
   "outfit": "Matching beige knit set"
  },
  "images": [
   "32565167",
   "34939696",
   "32565179",
   "34939726",
   "3735631",
   "6621472",
   "6767781",
   "14973938",
   "32565163",
   "3321416",
   "6417940",
   "34939701",
   "32565164",
   "34939729",
   "14473398",
   "32922275",
   "19836805",
   "35373125",
   "12277014",
   "7512046",
   "36023384",
   "19399818",
   "19650953",
   "20285350",
   "34558081",
   "6800942",
   "15253314",
   "34549311"
  ],
  "playlist": "58F1FFUDroBF6RbrZLT1La"
 },
 {
  "id": "coquette",
  "name": "Coquette",
  "emoji": "🎀",
  "adj": "Ribbon",
  "noun": "Romantic",
  "tagline": "Bows, lace, ballet flats and love letters.",
  "description": "Soft, romantic and a little bit dramatic. You collect ribbons, pastel pinks, vintage perfume bottles and you write diary entries like movie monologues.",
  "keywords": [
   "Bows",
   "Lace",
   "Pastel pink",
   "Ballet",
   "Romance"
  ],
  "outfits": [
   "Lace top + mini skirt + bows",
   "Ballet flats & white socks",
   "Pearl jewellery, pink blush"
  ],
  "rooms": [
   "Pink fairy lights",
   "Vintage vanity mirror",
   "Bows on everything"
  ],
  "palette": [
   "#fff1f3",
   "#f7c6d0",
   "#e88aa3",
   "#a0566c",
   "#4a2430"
  ],
  "theme": {
   "bg": "#fff1f3",
   "surface": "#ffffff",
   "ink": "#4a2430",
   "muted": "#a07080",
   "accent": "#e07895",
   "accent2": "#f7c6d0"
  },
  "related": [
   "fairycore",
   "soft-korean",
   "y2k"
  ],
  "answers": {
   "sunday": "Writing my diary with pink gel pens",
   "song": "Lana Del Rey, The Marías",
   "item": "🎀 A satin ribbon",
   "place": "A Parisian patisserie",
   "outfit": "Lace dress with a big bow"
  },
  "images": [
   "31019914",
   "4886937",
   "34972172",
   "10819686",
   "29922134",
   "6045704",
   "33243730",
   "35224354",
   "31542070",
   "30416952",
   "5729090",
   "9055980",
   "23495725",
   "6794189",
   "19832003",
   "6010207",
   "6206346",
   "25403127",
   "19748357",
   "4959837",
   "2008136",
   "37309561",
   "10781658",
   "3782745",
   "5705679",
   "11661433",
   "5363077",
   "30633961",
   "33457393",
   "17296280"
  ],
  "playlist": "7cfCMtYWeRMh1D3BpzcUG5"
 },
 {
  "id": "cottagecore",
  "name": "Cottagecore",
  "emoji": "🌿",
  "adj": "Wildflower",
  "noun": "Dreamer",
  "tagline": "Wildflowers, baking bread, slow living.",
  "description": "You dream of a little cottage, a garden full of herbs and a picnic basket. Simple, slow, handmade — nature is your favourite aesthetic.",
  "keywords": [
   "Wildflowers",
   "Baking",
   "Linen",
   "Garden",
   "Slow life"
  ],
  "outfits": [
   "Floral midi dress",
   "Puff sleeves & straw hat",
   "Knit cardigan, linen skirt"
  ],
  "rooms": [
   "Hanging dried herbs",
   "Wooden furniture, gingham",
   "Fresh flowers in a jar"
  ],
  "palette": [
   "#f3efe1",
   "#d9a35b",
   "#7a9a5b",
   "#4d6340",
   "#2f3a26"
  ],
  "theme": {
   "bg": "#f3efe1",
   "surface": "#fbf8ee",
   "ink": "#2f3a26",
   "muted": "#7b8566",
   "accent": "#6f8f50",
   "accent2": "#d9a35b"
  },
  "related": [
   "fairycore",
   "boho",
   "coastal"
  ],
  "answers": {
   "sunday": "Baking bread and picking flowers",
   "song": "Fleet Foxes, folklore-era Taylor",
   "item": "🧺 A wicker basket",
   "place": "A cottage garden in bloom",
   "outfit": "Floral dress & straw hat"
  },
  "images": [
   "10024428",
   "37540149",
   "32822962",
   "32682148",
   "36010458",
   "37540143",
   "31695900",
   "24245167",
   "37498173",
   "35032729",
   "33585046",
   "35032724",
   "32682146",
   "38027499",
   "33732641",
   "17922976",
   "32741941",
   "18407576",
   "29673656",
   "14716523",
   "30506032",
   "28295139",
   "30095744",
   "37291570",
   "19612895",
   "3951747",
   "29803443",
   "38233164",
   "38856651",
   "37441090"
  ],
  "playlist": "1Lk1TOPytr2JGul2pYyZdE"
 },
 {
  "id": "y2k",
  "name": "Y2K",
  "emoji": "💿",
  "adj": "Glitter",
  "noun": "Icon",
  "tagline": "Chrome, glitter, flip phones and pop anthems.",
  "description": "Loud, fun and unapologetically extra. Butterfly clips, metallics, low-rise everything and a playlist straight out of 2003.",
  "keywords": [
   "Chrome",
   "Glitter",
   "Butterflies",
   "Pop",
   "Neon"
  ],
  "outfits": [
   "Baby tee + cargo pants",
   "Metallic mini skirt",
   "Tinted sunglasses, butterfly clips"
  ],
  "rooms": [
   "LED strip lights",
   "Inflatable chair",
   "Posters & stickers everywhere"
  ],
  "palette": [
   "#120a24",
   "#4fd8ff",
   "#ff4fd8",
   "#b7a3d9",
   "#f5ecff"
  ],
  "theme": {
   "bg": "#120a24",
   "surface": "#1f1438",
   "ink": "#f5ecff",
   "muted": "#b7a3d9",
   "accent": "#ff4fd8",
   "accent2": "#4fd8ff"
  },
  "related": [
   "streetwear",
   "coquette",
   "soft-korean"
  ],
  "answers": {
   "sunday": "Mall trip + karaoke with the besties",
   "song": "Britney, *NSYNC, Paris Hilton",
   "item": "📱 A sparkly flip phone",
   "place": "A neon-lit arcade",
   "outfit": "Baby tee, cargos & butterfly clips"
  },
  "images": [
   "10112866",
   "37065996",
   "29702644",
   "29674254",
   "36126794",
   "6923312",
   "10126380",
   "1860623",
   "14017467",
   "1860668",
   "13640375",
   "35704423",
   "13825633",
   "20856616",
   "35383481",
   "4836055",
   "20451421",
   "19236338"
  ],
  "playlist": "37i9dQZF1DX6MAQN3OnFEl"
 },
 {
  "id": "old-money",
  "name": "Old Money",
  "emoji": "⚜️",
  "adj": "Heritage",
  "noun": "Heir",
  "tagline": "Quiet luxury, tennis whites, sailing weekends.",
  "description": "Understated and elegant. Cashmere, pearls, classic tailoring and a calm confidence — you prefer quality over logos.",
  "keywords": [
   "Quiet luxury",
   "Cashmere",
   "Tennis",
   "Pearls",
   "Heritage"
  ],
  "outfits": [
   "Cable-knit over the shoulders",
   "Tailored trousers + loafers",
   "Silk scarf, pearl studs"
  ],
  "rooms": [
   "Dark wood & brass",
   "Framed equestrian art",
   "Fresh white lilies"
  ],
  "palette": [
   "#f4f1ea",
   "#b89b5e",
   "#23432f",
   "#6f7a72",
   "#1f2a24"
  ],
  "theme": {
   "bg": "#f4f1ea",
   "surface": "#fffdf8",
   "ink": "#1f2a24",
   "muted": "#6f7a72",
   "accent": "#23432f",
   "accent2": "#b89b5e"
  },
  "related": [
   "coastal",
   "dark-academia",
   "royal-rajasthani"
  ],
  "answers": {
   "sunday": "Brunch at the club, then tennis",
   "song": "Jazz standards & Sinatra",
   "item": "⌚ Grandpa’s vintage watch",
   "place": "A yacht club terrace",
   "outfit": "Cashmere knit & tailored trousers"
  },
  "images": [
   "17993765",
   "28574904",
   "17806777",
   "34230000",
   "27570262",
   "17836120",
   "29198187",
   "7972896",
   "36690194",
   "18631360",
   "36758027",
   "18582200",
   "14597812",
   "33856985",
   "38350536",
   "38243272",
   "5549240",
   "9641135",
   "34157197",
   "31340782",
   "34191015",
   "16563535"
  ],
  "playlist": "0q63F2FaPTWyPiCDfPLKga"
 },
 {
  "id": "boho",
  "name": "Boho",
  "emoji": "🌾",
  "adj": "Sunset",
  "noun": "Wanderer",
  "tagline": "Rattan, sunsets, travel and free spirits.",
  "description": "Warm, earthy and free. Layered jewellery, macramé, plants in every corner and a soul that's always planning the next trip.",
  "keywords": [
   "Earthy",
   "Rattan",
   "Sunsets",
   "Travel",
   "Macramé"
  ],
  "outfits": [
   "Flowy maxi dress",
   "Layered silver jewellery",
   "Crochet top + wide-leg pants"
  ],
  "rooms": [
   "Rattan & jute rugs",
   "Macramé wall hanging",
   "Plants everywhere"
  ],
  "palette": [
   "#f6ece2",
   "#d9a066",
   "#c46a3d",
   "#8f7461",
   "#3b2a20"
  ],
  "theme": {
   "bg": "#f6ece2",
   "surface": "#fff8f1",
   "ink": "#3b2a20",
   "muted": "#8f7461",
   "accent": "#c46a3d",
   "accent2": "#d9a066"
  },
  "related": [
   "cottagecore",
   "indie-desi",
   "coastal"
  ],
  "answers": {
   "sunday": "Road trip to watch the sunset somewhere new",
   "song": "Acoustic indie folk",
   "item": "🪶 Layered silver rings",
   "place": "A desert camp under the stars",
   "outfit": "Flowy maxi & layered jewellery"
  },
  "images": [
   "32280848",
   "34454109",
   "34996459",
   "29350088",
   "13986348",
   "8989344",
   "34027611",
   "16494057",
   "14336552",
   "14924710",
   "32497580",
   "20111822",
   "30059657",
   "6314322",
   "31247347",
   "10117421",
   "33711178",
   "18537109",
   "15861780",
   "16299828",
   "36181730",
   "36722007",
   "28639076",
   "39043440",
   "28638840",
   "34593568",
   "998637",
   "13722026"
  ],
  "playlist": "25rUa2y2yd6Ie2MWD2uZXW"
 },
 {
  "id": "desi-retro",
  "name": "Desi Retro",
  "emoji": "🪔",
  "adj": "Filmi",
  "noun": "Diva",
  "tagline": "Old Bollywood, sarees, marigolds and chai.",
  "description": "You're nostalgic for golden-era Bollywood. Chiffon sarees, jhumkas, brass diyas, Kishore Kumar on loop and evenings with chai.",
  "keywords": [
   "Bollywood",
   "Jhumkas",
   "Marigold",
   "Chiffon",
   "Chai"
  ],
  "outfits": [
   "Chiffon saree, winged liner",
   "Kurta + jhumkas + bindi",
   "Oxidised silver, gajra"
  ],
  "rooms": [
   "Brass diyas & lamps",
   "Vintage film posters",
   "Marigold garlands"
  ],
  "palette": [
   "#2a0f12",
   "#c2364a",
   "#e8a53a",
   "#d8b48e",
   "#fbe9d2"
  ],
  "theme": {
   "bg": "#2a0f12",
   "surface": "#3d171b",
   "ink": "#fbe9d2",
   "muted": "#d8b48e",
   "accent": "#e8a53a",
   "accent2": "#c2364a"
  },
  "related": [
   "royal-rajasthani",
   "indie-desi",
   "dark-academia"
  ],
  "answers": {
   "sunday": "Old Bollywood movie marathon with chai",
   "song": "Kishore Kumar & R.D. Burman",
   "item": "🌼 A gajra & jhumkas",
   "place": "A single-screen cinema hall",
   "outfit": "Chiffon saree & winged liner"
  },
  "images": [
   "8750032",
   "33582069",
   "32683758",
   "37325958",
   "38246589",
   "35560525",
   "28058270",
   "19170999",
   "37294263",
   "5704311",
   "35108774",
   "35359952",
   "38890438",
   "14083636",
   "9031825",
   "33243963",
   "39520625",
   "29215357",
   "29291974",
   "18488308",
   "34644588",
   "37028044",
   "31723285",
   "37531059",
   "37650548",
   "34628335",
   "8887005",
   "38920473",
   "35508972",
   "40384574"
  ],
  "playlist": "3eePXCTXTVgjTOw2JyEMyj"
 },
 {
  "id": "streetwear",
  "name": "Streetwear",
  "emoji": "👟",
  "adj": "Concrete",
  "noun": "Rebel",
  "tagline": "Sneakers, hoodies, skate parks and city nights.",
  "description": "Cool without trying. Limited-drop sneakers, oversized hoodies, graffiti walls and a camera roll full of city shots — the street is your runway.",
  "keywords": [
   "Sneakers",
   "Oversized",
   "Skate",
   "Graffiti",
   "Drops"
  ],
  "outfits": [
   "Oversized hoodie + cargos",
   "Fresh sneakers, crew socks",
   "Cap, crossbody bag, chains"
  ],
  "rooms": [
   "Sneaker wall display",
   "Neon sign",
   "Skate deck art"
  ],
  "palette": [
   "#111111",
   "#2b2b2b",
   "#ff5a1f",
   "#c9c9c9",
   "#f2f2f2"
  ],
  "theme": {
   "bg": "#111111",
   "surface": "#1d1d1d",
   "ink": "#f2f2f2",
   "muted": "#a3a3a3",
   "accent": "#ff5a1f",
   "accent2": "#c9c9c9"
  },
  "related": [
   "y2k",
   "grunge",
   "indie-desi"
  ],
  "answers": {
   "sunday": "Sneaker drop, then skating with the crew",
   "song": "Travis Scott, Divine, hip-hop",
   "item": "👟 A fresh pair of sneakers",
   "place": "A graffiti-covered skate park",
   "outfit": "Oversized hoodie & cargos"
  },
  "images": [
   "26604623",
   "26955125",
   "13190957",
   "29627647",
   "24287018",
   "11531384",
   "32940211",
   "8167379",
   "5238220",
   "29664428",
   "29544281",
   "36128749",
   "31063929",
   "5365474",
   "25525597",
   "11232182",
   "3944690",
   "17474220",
   "30786504",
   "6106947",
   "28953577",
   "15694149",
   "5805576",
   "1054787",
   "12739980",
   "18368129",
   "37804207",
   "20552882",
   "36048314",
   "30930107",
   "18286290",
   "32023382",
   "15336560",
   "18368110",
   "36347530",
   "12739976",
   "9692170",
   "32430590",
   "30257624",
   "32752833",
   "19461583",
   "16168408",
   "31573892",
   "2657961",
   "9695914",
   "30283474",
   "17005040",
   "15988342",
   "12870447",
   "19461584",
   "27355230",
   "6353474",
   "30477026",
   "15988350",
   "1737405",
   "19916596",
   "30668177",
   "10842890",
   "8298855"
  ],
  "playlist": "3f3ZdpYSUXDP7knEJQ4Fu0"
 },
 {
  "id": "grunge",
  "name": "Soft Grunge",
  "emoji": "🖤",
  "adj": "Midnight",
  "noun": "Rockstar",
  "tagline": "Flannels, band tees, gigs and moody nights.",
  "description": "A little moody, very real. Thrifted flannels, chipped nail polish, live gigs and playlists that hit at 2am — you'd rather be authentic than perfect.",
  "keywords": [
   "Flannel",
   "Band tees",
   "Gigs",
   "Thrifted",
   "Moody"
  ],
  "outfits": [
   "Band tee + flannel + ripped jeans",
   "Combat boots, fishnets",
   "Silver rings, smudged liner"
  ],
  "rooms": [
   "Gig posters & polaroids",
   "Fairy lights + dark walls",
   "Vinyl records stacked"
  ],
  "palette": [
   "#141414",
   "#3a3a3a",
   "#7a1f2b",
   "#5b6b5a",
   "#d9d4cc"
  ],
  "theme": {
   "bg": "#141414",
   "surface": "#212121",
   "ink": "#e8e3db",
   "muted": "#9a958d",
   "accent": "#b8323f",
   "accent2": "#5b6b5a"
  },
  "related": [
   "streetwear",
   "dark-academia",
   "y2k"
  ],
  "answers": {
   "sunday": "Thrifting, then a live gig at night",
   "song": "Nirvana, Arctic Monkeys",
   "item": "🎸 A guitar pick on a chain",
   "place": "A sweaty underground gig",
   "outfit": "Band tee, flannel & boots"
  },
  "images": [
   "30970302",
   "35610286",
   "33673413",
   "33633556",
   "29600345",
   "13185583",
   "33262508",
   "19579973",
   "24361002",
   "20439065",
   "31890011",
   "212951",
   "27208055",
   "5045599",
   "15180233",
   "37324698",
   "33624546",
   "8512206",
   "8041015",
   "38757035",
   "17268969",
   "11720409",
   "6270146",
   "17488505",
   "18204611",
   "2050932",
   "7561849",
   "3214773",
   "16165826",
   "12577563",
   "17268971",
   "35614092",
   "9005447",
   "9005427",
   "16277540",
   "39284159",
   "3807142",
   "28157255",
   "7502178",
   "40623998",
   "16118368",
   "11995853",
   "9009570",
   "32836299",
   "19488965",
   "1763075",
   "39981567"
  ],
  "playlist": "5pUcoEbHCxPzczArNXS2Mw"
 },
 {
  "id": "coastal",
  "name": "Coastal",
  "emoji": "🌊",
  "adj": "Seaside",
  "noun": "Sailor",
  "tagline": "Linen, sea breeze, white houses and slow summers.",
  "description": "Breezy and sunlit. White linen, blue stripes, salty hair and a home that smells like the sea — you live for long beach days and golden hour.",
  "keywords": [
   "Linen",
   "Sea breeze",
   "Blue stripes",
   "Sunlight",
   "Summer"
  ],
  "outfits": [
   "White linen shirt dress",
   "Striped tee + shorts",
   "Straw bag, sandals"
  ],
  "rooms": [
   "Whitewashed walls",
   "Blue & white ceramics",
   "Linen curtains in the breeze"
  ],
  "palette": [
   "#f5f8fa",
   "#cfe3ee",
   "#4c8cb5",
   "#1f4e6e",
   "#e9dcc5"
  ],
  "theme": {
   "bg": "#f5f8fa",
   "surface": "#ffffff",
   "ink": "#16384f",
   "muted": "#6a8597",
   "accent": "#2f7fb0",
   "accent2": "#cfe3ee"
  },
  "related": [
   "old-money",
   "clean-girl",
   "boho"
  ],
  "answers": {
   "sunday": "Sunrise swim and a seafood lunch",
   "song": "Jack Johnson, beach-house acoustic",
   "item": "🐚 A seashell anklet",
   "place": "A white house by the sea",
   "outfit": "White linen & straw hat"
  },
  "images": [
   "34754643",
   "34943158",
   "10610941",
   "28866065",
   "6774009",
   "19899070",
   "33532309",
   "14595928",
   "11430597",
   "29430411",
   "28272351",
   "6775272",
   "29702284",
   "35456653",
   "32642371",
   "19737858",
   "7027802",
   "31908827",
   "5865555",
   "36972704",
   "8406999",
   "8080661",
   "32393945",
   "9928672",
   "11042877",
   "334008",
   "417144",
   "594077",
   "15238315",
   "15551110",
   "13565228",
   "4502969",
   "12715498",
   "12323480",
   "10980683",
   "38412867",
   "31247081",
   "31704651",
   "12919839",
   "29698107",
   "31386729",
   "30386925",
   "32727434",
   "35919957",
   "36803731",
   "31788838",
   "30117420",
   "28412345",
   "38756621",
   "19448584",
   "30191438",
   "5132767",
   "23915334",
   "15694082",
   "23967576",
   "12567801",
   "4783691",
   "20105389",
   "1802146",
   "38507164"
  ],
  "playlist": "4fGbJQm6UuNO48iSnA6QLz"
 },
 {
  "id": "fairycore",
  "name": "Fairycore",
  "emoji": "🧚",
  "adj": "Moonlit",
  "noun": "Fairy",
  "tagline": "Enchanted forests, mushrooms and glowing nights.",
  "description": "Whimsical and a little magical. You notice mushrooms on walks, love tulle and fairy lights, and secretly believe the forest is alive.",
  "keywords": [
   "Enchanted",
   "Mushrooms",
   "Tulle",
   "Moonlight",
   "Whimsy"
  ],
  "outfits": [
   "Sheer tulle dress",
   "Flower crown, glitter",
   "Corset + flowy skirt"
  ],
  "rooms": [
   "Canopy bed with lights",
   "Moss & crystals",
   "Mushroom lamps"
  ],
  "palette": [
   "#16201a",
   "#2f4a36",
   "#8fb996",
   "#e7d7f2",
   "#f6f1e7"
  ],
  "theme": {
   "bg": "#16201a",
   "surface": "#21302a",
   "ink": "#eef3ea",
   "muted": "#a8bba9",
   "accent": "#b9a3e3",
   "accent2": "#8fb996"
  },
  "related": [
   "cottagecore",
   "coquette",
   "boho"
  ],
  "answers": {
   "sunday": "Wandering a misty forest looking for mushrooms",
   "song": "Aurora, Florence + the Machine",
   "item": "🍄 A tiny mushroom charm",
   "place": "An enchanted forest at dusk",
   "outfit": "Tulle dress & flower crown"
  },
  "images": [
   "27911835",
   "31858476",
   "30812858",
   "33157657",
   "30279984",
   "31858477",
   "30812857",
   "32292098",
   "21283333",
   "33157662",
   "14332265",
   "32292095",
   "32000781",
   "36033509",
   "33304315",
   "33565541",
   "29141646",
   "28779445",
   "30005052",
   "27911836",
   "1545589",
   "27911843",
   "5134641",
   "27911834",
   "29992370",
   "23842053",
   "12994635",
   "32997071",
   "35989593",
   "12699058",
   "12994632",
   "32918394",
   "14580562",
   "14456702",
   "28402815",
   "35416299",
   "21560118",
   "16777743",
   "28825109",
   "34552308",
   "28338520",
   "7547229",
   "29122244",
   "34465816",
   "28473203",
   "34755991",
   "29379836",
   "34428415",
   "28803384",
   "29220349",
   "29063953",
   "28640616",
   "33686160",
   "39914920",
   "32636730",
   "34153995",
   "32608649"
  ],
  "playlist": "1JJxZQj9iVeatT29XmeBpv"
 },
 {
  "id": "minimal",
  "name": "Minimalist",
  "emoji": "◽",
  "adj": "Quiet",
  "noun": "Architect",
  "tagline": "Clean lines, calm spaces, less but better.",
  "description": "Calm, intentional and clear. You love open space, natural light, one perfect chair and a wardrobe of ten pieces that all match.",
  "keywords": [
   "Less is more",
   "Natural light",
   "Neutrals",
   "Japandi",
   "Calm"
  ],
  "outfits": [
   "Crisp white shirt + black trousers",
   "Monochrome layers",
   "One statement watch"
  ],
  "rooms": [
   "Bare walls, one artwork",
   "Low wooden furniture",
   "Lots of empty space"
  ],
  "palette": [
   "#f4f3f0",
   "#dcd8d0",
   "#a9a39a",
   "#5c5852",
   "#1e1d1b"
  ],
  "theme": {
   "bg": "#f4f3f0",
   "surface": "#ffffff",
   "ink": "#1e1d1b",
   "muted": "#7b766e",
   "accent": "#5c5852",
   "accent2": "#dcd8d0"
  },
  "related": [
   "clean-girl",
   "soft-korean",
   "coastal"
  ],
  "answers": {
   "sunday": "Decluttering, then reading in total silence",
   "song": "Lo-fi beats & ambient piano",
   "item": "⌚ One simple watch",
   "place": "A sunlit Japandi apartment",
   "outfit": "Monochrome layers"
  },
  "images": [
   "17386428",
   "8987429",
   "34558081",
   "32922275",
   "19889112",
   "16982688",
   "19399818",
   "34549311",
   "19520998",
   "29252368",
   "4252513",
   "33054912",
   "6800942",
   "30183860",
   "35641446",
   "20557088",
   "35083748",
   "37834298",
   "4207785",
   "37173314",
   "4252511",
   "8251559",
   "10886543",
   "30923809",
   "10584317",
   "15124846",
   "19991832",
   "38083081",
   "29559675",
   "5278940",
   "6594382",
   "28536695",
   "28485151",
   "29252561",
   "17483485",
   "13934813",
   "6373527",
   "7307625",
   "28772354",
   "6952340",
   "16842762",
   "8015807",
   "776806",
   "12951088",
   "7232906",
   "38735080",
   "7045859",
   "29383010",
   "29383009",
   "8251592"
  ],
  "playlist": "2PWqtRTop5iLJUMVu92i6k"
 },
 {
  "id": "indie-desi",
  "name": "Indie Desi",
  "emoji": "🌺",
  "adj": "Chai",
  "noun": "Storyteller",
  "tagline": "Kurtas with sneakers, street food and city stories.",
  "description": "Modern and rooted. Block-print kurtas with sneakers, chai at a tapri, indie music and city streets — you mix tradition with your own twist.",
  "keywords": [
   "Block print",
   "Street food",
   "Indie music",
   "Jhumkas",
   "City life"
  ],
  "outfits": [
   "Kurta + jeans + kolhapuris",
   "Block-print co-ord set",
   "Oxidised jhumkas, tote bag"
  ],
  "rooms": [
   "Handloom cushions",
   "Terracotta & plants",
   "Indie gig posters"
  ],
  "palette": [
   "#fbf3e6",
   "#e2a13b",
   "#c1492f",
   "#2f6b62",
   "#2a211b"
  ],
  "theme": {
   "bg": "#fbf3e6",
   "surface": "#fffaf1",
   "ink": "#2a211b",
   "muted": "#8a7766",
   "accent": "#c1492f",
   "accent2": "#2f6b62"
  },
  "related": [
   "desi-retro",
   "boho",
   "streetwear"
  ],
  "answers": {
   "sunday": "Street food crawl and an indie gig",
   "song": "Prateek Kuhad, Ritviz, Lifafa",
   "item": "☕ A kulhad of cutting chai",
   "place": "A busy Mumbai street at golden hour",
   "outfit": "Kurta, jeans & jhumkas"
  },
  "images": [
   "14975739",
   "19556879",
   "35445207",
   "28512779",
   "13178920",
   "6705270",
   "20792015",
   "36311379",
   "22064199",
   "37661016",
   "28213811",
   "13640286",
   "20791992",
   "5922738",
   "32718416",
   "28213745",
   "19211470",
   "16803164",
   "20080463",
   "35508907",
   "37797075",
   "33684732",
   "36704376",
   "13237442",
   "35441228",
   "13191608",
   "13204631",
   "35395102",
   "13031588",
   "13204632",
   "38555838",
   "13162254",
   "12850139",
   "13031587",
   "30641912",
   "34270742",
   "30425147",
   "8859972",
   "40000319",
   "29988968",
   "35069427",
   "32448263",
   "40000322",
   "36879484",
   "36536808",
   "32845310",
   "13063308",
   "37806787",
   "14507073",
   "19664695",
   "36701468",
   "39452267",
   "28432040",
   "19764951",
   "5414587",
   "29092195",
   "13234166",
   "37376570",
   "30347226",
   "19764952"
  ],
  "playlist": "5OgY7VGPMuVBdqJMHl3g0S"
 },
 {
  "id": "royal-rajasthani",
  "name": "Royal Rajasthani",
  "emoji": "👑",
  "adj": "Palace",
  "noun": "Maharani",
  "tagline": "Pink palaces, kundan jewels and desert sunsets.",
  "description": "Regal, rich and full of colour. You love intricate jharokhas, heavy jewellery, deep reds and gold, and celebrations that last a week.",
  "keywords": [
   "Palaces",
   "Kundan",
   "Jharokhas",
   "Deep red",
   "Celebration"
  ],
  "outfits": [
   "Bandhani lehenga",
   "Kundan choker & maang tikka",
   "Gota-patti dupatta"
  ],
  "rooms": [
   "Carved wooden jharokha",
   "Brass & mirror work",
   "Block-printed textiles"
  ],
  "palette": [
   "#2a1214",
   "#8e1f2c",
   "#d4a24c",
   "#e98a7a",
   "#f6e7d2"
  ],
  "theme": {
   "bg": "#2a1214",
   "surface": "#3a1a1d",
   "ink": "#f6e7d2",
   "muted": "#d8b49a",
   "accent": "#d4a24c",
   "accent2": "#8e1f2c"
  },
  "related": [
   "desi-retro",
   "old-money",
   "indie-desi"
  ],
  "answers": {
   "sunday": "Exploring a palace, then a rooftop dinner",
   "song": "Rajasthani folk & Coke Studio",
   "item": "💍 A kundan maang tikka",
   "place": "A pink palace in Jaipur",
   "outfit": "Bandhani lehenga & kundan jewels"
  },
  "images": [
   "32261830",
   "32261804",
   "21382502",
   "33846113",
   "33797758",
   "33726142",
   "16744870",
   "29624175",
   "30171014",
   "31866953",
   "33689321",
   "37350635",
   "33230289",
   "31089168",
   "9902399",
   "36818387",
   "33689320",
   "34548994",
   "13425094",
   "29368152",
   "32261823",
   "34649656",
   "36512869",
   "36470562",
   "34669534",
   "34678090",
   "36532822",
   "18239598",
   "19437677",
   "38794589",
   "35357873",
   "6060943",
   "29406289",
   "28494456",
   "32077588",
   "29160903",
   "38780795",
   "30929038",
   "28144266",
   "28347078",
   "38796467",
   "36896552",
   "30355211",
   "35327123",
   "18694129",
   "36907928",
   "20365080",
   "14743768",
   "12992066",
   "18694066",
   "10958645",
   "10347064",
   "25489380",
   "35455629",
   "35455642",
   "39567970",
   "35077286",
   "35455628",
   "33230283"
  ],
  "playlist": "1hrKfDToIuBL2LK6MKZQWf"
 },
 {
  "id": "soft-korean",
  "name": "Soft K-Style",
  "emoji": "🍑",
  "adj": "Peach",
  "noun": "Daydreamer",
  "tagline": "Pastel cafés, glass skin and cosy Seoul streets.",
  "description": "Soft, cute and curated. 10-step skincare, pastel cafés, cosy knits and a playlist of K-indie — you make everyday life feel like a K-drama.",
  "keywords": [
   "Glass skin",
   "Pastel cafés",
   "Cosy knits",
   "K-indie",
   "Cute"
  ],
  "outfits": [
   "Oversized cardigan + pleated skirt",
   "Pastel knit & wide jeans",
   "Hair clips, tote bag"
  ],
  "rooms": [
   "Pastel desk setup",
   "Plushies & fairy lights",
   "Skincare shelf"
  ],
  "palette": [
   "#fff6f1",
   "#ffd7c4",
   "#f4a6a0",
   "#b6c9e8",
   "#4a3f45"
  ],
  "theme": {
   "bg": "#fff6f1",
   "surface": "#ffffff",
   "ink": "#4a3f45",
   "muted": "#9a8a90",
   "accent": "#ef8f86",
   "accent2": "#b6c9e8"
  },
  "related": [
   "coquette",
   "clean-girl",
   "minimal"
  ],
  "answers": {
   "sunday": "Café hopping and a K-drama marathon",
   "song": "IU, NewJeans, K-indie",
   "item": "🍑 A peach-scented sheet mask",
   "place": "A pastel café in Seoul",
   "outfit": "Oversized cardigan & pleated skirt"
  },
  "images": [
   "39508695",
   "20478046",
   "31497732",
   "29476491",
   "34259246",
   "31743247",
   "18414628",
   "27924825",
   "31743303",
   "40354249",
   "34586542",
   "36830541",
   "34665055",
   "31909200",
   "4847619",
   "31735991",
   "19271565",
   "28349061",
   "34853217",
   "29956386",
   "38796661",
   "20284137",
   "34706320",
   "31446199",
   "6896972",
   "32481976",
   "29546529",
   "28898672",
   "8076215",
   "31552020",
   "14535057",
   "11179659",
   "6977609",
   "3321416",
   "6543668",
   "13516158",
   "24602068",
   "4841482",
   "6418002",
   "6731844",
   "34939690",
   "1682459",
   "37866353",
   "12232125",
   "2573870",
   "34334096",
   "33687990",
   "7363239",
   "36254047",
   "37643624",
   "32691609"
  ],
  "playlist": "37i9dQZF1DXbirtHQBuwCo"
 }
]

export const byId = (id: string) => AESTHETICS.find((a) => a.id === id)

export const pexelsUrl = (id: string, w = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const pexelsPage = (id: string) => `https://www.pexels.com/photo/${id}/`

export const blendName = (primary: Aesthetic, secondary: Aesthetic) => `${secondary.adj} ${primary.noun}`

export const blendPalette = (primary: Aesthetic, secondary: Aesthetic) => [
  primary.palette[0],
  primary.palette[2],
  secondary.palette[2],
  primary.palette[3],
  secondary.palette[1],
]
