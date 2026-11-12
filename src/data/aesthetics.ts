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
   "bg": "#2b1d14",
   "surface": "#3a2a1e",
   "ink": "#f1e4cf",
   "muted": "#c4a988",
   "accent": "#d19a5b",
   "accent2": "#7a2e2a"
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
   "18777754",
   "16827794",
   "35458639",
   "15899069",
   "19997863",
   "27236661",
   "7097779",
   "34549309",
   "17543684",
   "35276502",
   "1809347",
   "29188653",
   "7097887",
   "18102276",
   "35930243",
   "31730796",
   "29154434",
   "37397516",
   "6281128",
   "14697602",
   "36286362",
   "30263625",
   "38956229",
   "35715584",
   "7702804",
   "37694188",
   "16618308",
   "6753683",
   "5172747",
   "37736465",
   "298864",
   "27442583",
   "26587826",
   "4452380",
   "34327746",
   "17280214",
   "4052195",
   "12199408",
   "4106621",
   "281962",
   "12220437",
   "4587610",
   "2005009",
   "38492283",
   "4057662"
  ]
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
   "bg": "#ead9c6",
   "surface": "#f5ebe0",
   "ink": "#3a2c22",
   "muted": "#8a7462",
   "accent": "#a9774f",
   "accent2": "#d9bfa4"
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
   "7797734",
   "7960114",
   "8101522",
   "34939690",
   "15814692",
   "11935641",
   "6690845",
   "5928033",
   "28482020",
   "8533219",
   "14577586",
   "14377376",
   "5012084",
   "9603628",
   "3927390",
   "33806936",
   "17740560",
   "29137146",
   "30541179",
   "12194385",
   "27535671",
   "12194353",
   "30541186",
   "12194336",
   "29502924",
   "30328042",
   "11438346",
   "6970025",
   "29120651",
   "8325261",
   "12277295",
   "3705536",
   "10061386",
   "4119831",
   "6510942",
   "9734812",
   "29096395",
   "36365230",
   "26954381",
   "36385200",
   "22432991",
   "17139205",
   "8356224",
   "37384060",
   "4004226"
  ]
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
   "bg": "#f9cfda",
   "surface": "#fde6ec",
   "ink": "#5a1f33",
   "muted": "#9c5a70",
   "accent": "#d94f7a",
   "accent2": "#f7a8bd"
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
   "4886937",
   "31019914",
   "29922134",
   "10819686",
   "34972172",
   "6045704",
   "36833976",
   "14238877",
   "4938275",
   "35825554",
   "14473395",
   "17941998",
   "27589864",
   "15097508",
   "3910071",
   "7670691",
   "5154372",
   "6387628",
   "10628883",
   "8934625",
   "17098758",
   "11949595",
   "6010207",
   "2008136",
   "4234550",
   "30633961",
   "14898783",
   "5363077",
   "5705679",
   "25403127",
   "10781658",
   "4959837",
   "7227204",
   "10961457",
   "8753093"
  ]
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
   "bg": "#cfdcb8",
   "surface": "#e4ecd3",
   "ink": "#2f3a22",
   "muted": "#5f6d4d",
   "accent": "#5f7f3f",
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
   "8800265",
   "12488550",
   "38208785",
   "7383463",
   "4974341",
   "17555744",
   "8829035",
   "16730969",
   "8524491",
   "4267965",
   "30350360",
   "31009557",
   "8599585",
   "30596423",
   "32590836",
   "10481791",
   "30888612",
   "30926706",
   "33387837",
   "28295139",
   "17815664",
   "30095744",
   "18407576",
   "33037629",
   "19612895",
   "21391299",
   "31480125",
   "29673656",
   "11265917",
   "31233298",
   "4503501",
   "6790333",
   "31233294",
   "12319167",
   "25881409",
   "27893013",
   "9108934",
   "8330535",
   "31558084",
   "11434936",
   "7373480",
   "6627209",
   "15666789",
   "3275725",
   "8329294",
   "36575302",
   "14249262",
   "7772134"
  ]
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
   "bg": "#3b1d6e",
   "surface": "#4c2a87",
   "ink": "#fbefff",
   "muted": "#cdb6ee",
   "accent": "#ff5fd2",
   "accent2": "#5ee3ff"
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
   "7422083",
   "9227566",
   "5744290",
   "5363077",
   "4021530",
   "37589993",
   "35688802",
   "40500243",
   "13039066",
   "29703512",
   "29146231",
   "31702117",
   "11444940",
   "18105323",
   "6192764",
   "4226797",
   "11860586",
   "32799191",
   "5594294",
   "29702644",
   "35026559",
   "30455548",
   "22809666",
   "3165335",
   "37336312",
   "35471661",
   "28771649",
   "30558537",
   "5149145",
   "8339244",
   "14541066",
   "14212241",
   "4000317",
   "8475350"
  ]
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
   "bg": "#1f3a2b",
   "surface": "#2a4a38",
   "ink": "#f3ecdc",
   "muted": "#b9c4b0",
   "accent": "#d1b26f",
   "accent2": "#8a6d3b"
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
   "36230899",
   "34214169",
   "25524047",
   "35538579",
   "5828579",
   "34151747",
   "31129832",
   "31935097",
   "25381178",
   "27174552",
   "267301",
   "11911858",
   "36472450",
   "38694917",
   "31759014",
   "36093623",
   "31488463",
   "29681694",
   "32008368",
   "3952086",
   "28279100",
   "35113956",
   "31281861",
   "31281866",
   "31182792",
   "30955758",
   "14702697",
   "31281864",
   "31281869"
  ]
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
   "bg": "#e8b48f",
   "surface": "#f2cbad",
   "ink": "#3d2416",
   "muted": "#7c5038",
   "accent": "#a94a22",
   "accent2": "#f4dfc8"
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
   "8503255",
   "37181466",
   "12180307",
   "7190392",
   "31352327",
   "31538824",
   "12200640",
   "6010464",
   "36564996",
   "32280848",
   "32497580",
   "14336552",
   "20111822",
   "8989344",
   "6123228",
   "30059657",
   "14924710",
   "31871754",
   "8187048",
   "19480676",
   "19480677",
   "29038006",
   "19480678",
   "4992938",
   "10992850",
   "28639076",
   "17082863",
   "28638936",
   "36203198",
   "39043438",
   "11042712",
   "16188291",
   "34593568",
   "9045045",
   "30947447",
   "30969443",
   "34846770",
   "8286098",
   "8581409",
   "31653080",
   "37538486",
   "12181250",
   "38278219",
   "5211547"
  ]
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
   "bg": "#7a1d2b",
   "surface": "#8d2a37",
   "ink": "#fdebd3",
   "muted": "#f0bfa0",
   "accent": "#f4b13e",
   "accent2": "#e8566a"
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
   "27987925",
   "30409745",
   "28912704",
   "1643975",
   "2383561",
   "30509523",
   "34085534",
   "31192563",
   "32990456",
   "33000064",
   "33853980",
   "39160036",
   "34899896",
   "8818748",
   "36141286",
   "5027991",
   "6315678",
   "19296035",
   "31723285",
   "38780933",
   "28928621",
   "17501823",
   "33154729",
   "36662612",
   "9660954",
   "5947062",
   "20270270",
   "11413997",
   "29650995",
   "38958679",
   "29389866",
   "31979029",
   "2381468",
   "29494878",
   "37415386",
   "31683076"
  ]
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
   "bg": "#1d2440",
   "surface": "#283154",
   "ink": "#f4f4f4",
   "muted": "#a7b0c8",
   "accent": "#ff6a2b",
   "accent2": "#d7ff3d"
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
   "16861662",
   "9065153",
   "3944690",
   "4271568",
   "3944692",
   "18946635",
   "8473534",
   "2608438",
   "16929212",
   "18533674",
   "31871752",
   "14577601",
   "14577586",
   "7543637",
   "19882420",
   "16501302",
   "13807630",
   "34003824",
   "2300334",
   "18946639",
   "3053859",
   "955798",
   "10950880",
   "6389787",
   "226376"
  ]
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
   "bg": "#3a2f3d",
   "surface": "#4a3c4e",
   "ink": "#ece4ea",
   "muted": "#b3a3b1",
   "accent": "#e05565",
   "accent2": "#8fa38c"
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
   "33937416",
   "27637737",
   "39417237",
   "30804466",
   "7225259",
   "35654953",
   "11676206",
   "32110095",
   "7626337",
   "8419955",
   "36317794",
   "7626329",
   "14351798",
   "20532119",
   "39005265",
   "5156622",
   "34612124",
   "3941292",
   "16637461",
   "18447992",
   "33624546",
   "16929212"
  ]
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
   "bg": "#bfdcef",
   "surface": "#dcecf7",
   "ink": "#12364f",
   "muted": "#4a6a80",
   "accent": "#1f6fa3",
   "accent2": "#f2e2c4"
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
   "17295629",
   "13444961",
   "12785311",
   "18987354",
   "30647211",
   "16824213",
   "33240705",
   "11398928",
   "12553348",
   "8371656",
   "16770368",
   "12581088",
   "13484695",
   "5865555",
   "36972704",
   "8406999",
   "32393945",
   "15981392",
   "1449778",
   "9928672",
   "15551110",
   "334008",
   "35492145",
   "8746961",
   "20644147",
   "15250508",
   "9588908",
   "12705214",
   "11175390",
   "17185665",
   "28056622",
   "7541157",
   "8085688",
   "13184763",
   "27296616",
   "31854429"
  ]
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
   "bg": "#c9bfe6",
   "surface": "#ddd5f1",
   "ink": "#2d2547",
   "muted": "#625785",
   "accent": "#6f50bd",
   "accent2": "#9fc7a3"
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
   "29122230",
   "12280916",
   "28787650",
   "34886466",
   "7547229",
   "16777743",
   "34552308",
   "37114901",
   "28993833",
   "6037170",
   "701336",
   "16130227",
   "34944360",
   "966861",
   "33469006",
   "33224417",
   "1591888",
   "29171330",
   "29673131",
   "18630828",
   "32063474",
   "33488985",
   "39462859",
   "34361856",
   "10963812",
   "36286496",
   "4091076",
   "13041024",
   "6825310",
   "6634252",
   "20431425",
   "7301830",
   "18038799",
   "20431432",
   "38741851",
   "30908348",
   "29255295",
   "39922158",
   "29579820",
   "29857038",
   "35592910",
   "20386766",
   "14094833",
   "29120822",
   "16114621"
  ]
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
   "bg": "#d9d4cb",
   "surface": "#e8e4dd",
   "ink": "#1f1e1c",
   "muted": "#6a655d",
   "accent": "#3e3b36",
   "accent2": "#b9b2a6"
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
   "28518251",
   "34558081",
   "7587871",
   "4252513",
   "19520998",
   "6800942",
   "12277013",
   "34414485",
   "36581194",
   "6739706",
   "36404827",
   "6594382",
   "36490690",
   "33399034",
   "4386355",
   "35082703",
   "8581377",
   "3892820",
   "11840490",
   "11951543",
   "19193207",
   "7218824",
   "9566058",
   "6958761",
   "7828341",
   "29383010",
   "29383009",
   "8251592",
   "8251240",
   "7671236",
   "8251295",
   "8251920",
   "5712532",
   "8004110",
   "8004094",
   "28297689",
   "31726666",
   "28350932",
   "31145641",
   "38094568",
   "35242187"
  ]
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
   "bg": "#f2c46b",
   "surface": "#f7d892",
   "ink": "#3a2416",
   "muted": "#6e4a28",
   "accent": "#a83b23",
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
   "34112721",
   "6568638",
   "8752422",
   "1808338",
   "7641027",
   "36455706",
   "35165116",
   "29982271",
   "35069427",
   "30641912",
   "30425147",
   "40000021",
   "34270742",
   "29988968",
   "8859972",
   "40000322",
   "37397147",
   "37502469",
   "33367136",
   "38775507",
   "29405115",
   "33866990",
   "39169044",
   "30186384",
   "36852413",
   "36409857",
   "32144893",
   "32830296",
   "12122270",
   "32144901",
   "37420330",
   "29389865",
   "10724277",
   "34026174",
   "39297588",
   "35543412"
  ]
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
   "bg": "#e9a3a0",
   "surface": "#f2c0bc",
   "ink": "#4a1218",
   "muted": "#7e343a",
   "accent": "#8e1f2c",
   "accent2": "#d4a24c"
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
   "35394354",
   "39141927",
   "32261804",
   "31089168",
   "32261830",
   "16744870",
   "18239598",
   "34669529",
   "38957181",
   "39226990",
   "33154729",
   "32077588",
   "37485313",
   "24012397",
   "17501823",
   "9808451",
   "28985983",
   "39290973",
   "37350616",
   "32261823",
   "38696442",
   "35930214",
   "32842479",
   "36470448",
   "28347078",
   "36818394",
   "10931903",
   "25287965",
   "33823949",
   "38855634",
   "36478020",
   "9238973",
   "29997441"
  ]
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
   "bg": "#ffd9c7",
   "surface": "#ffe8dc",
   "ink": "#4a3240",
   "muted": "#8a6573",
   "accent": "#e0645b",
   "accent2": "#a9c1ec"
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
   "18515165",
   "34268916",
   "26973633",
   "10526110",
   "17493755",
   "31552020",
   "13516158",
   "4841482",
   "6223482",
   "14535057",
   "13573728",
   "6767794",
   "6847857",
   "13573726",
   "37866353",
   "1682459",
   "35224340",
   "35056953",
   "32691609",
   "34993179",
   "38842571",
   "5594328",
   "8099491",
   "5594312",
   "35051396",
   "6193084",
   "5594276",
   "35242188",
   "5594269",
   "7123021",
   "9743099",
   "29956386",
   "31909200",
   "38201757"
  ]
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
