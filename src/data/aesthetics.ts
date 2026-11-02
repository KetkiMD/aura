export type ThemeVars = { bg: string; surface: string; ink: string; muted: string; accent: string; accent2: string }

export type Aesthetic = {
  id: string
  name: string
  emoji: string
  tagline: string
  description: string
  keywords: string[]
  outfits: string[]
  rooms: string[]
  playlist: string
  palette: string[]
  theme: ThemeVars
  images: string[]
}

export const AESTHETICS: Aesthetic[] = [
  {
    "id": "dark-academia",
    "name": "Dark Academia",
    "emoji": "🕯️",
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
    "playlist": "37i9dQZF1DX17GkScaAekA",
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
      "38630051"
    ]
  },
  {
    "id": "clean-girl",
    "name": "Clean Girl",
    "emoji": "🤍",
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
    "playlist": "58F1FFUDroBF6RbrZLT1La",
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
      "35373125"
    ]
  },
  {
    "id": "coquette",
    "name": "Coquette",
    "emoji": "🎀",
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
    "playlist": "7cfCMtYWeRMh1D3BpzcUG5",
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
      "25403127"
    ]
  },
  {
    "id": "cottagecore",
    "name": "Cottagecore",
    "emoji": "🌿",
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
    "playlist": "1Lk1TOPytr2JGul2pYyZdE",
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
      "18407576"
    ]
  },
  {
    "id": "y2k",
    "name": "Y2K",
    "emoji": "💿",
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
    "playlist": "37i9dQZF1DX6MAQN3OnFEl",
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
    ]
  },
  {
    "id": "old-money",
    "name": "Old Money",
    "emoji": "⚜️",
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
    "playlist": "0q63F2FaPTWyPiCDfPLKga",
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
      "9641135"
    ]
  },
  {
    "id": "boho",
    "name": "Boho",
    "emoji": "🌾",
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
    "playlist": "25rUa2y2yd6Ie2MWD2uZXW",
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
      "18537109"
    ]
  },
  {
    "id": "desi-retro",
    "name": "Desi Retro",
    "emoji": "🪔",
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
    "playlist": "3eePXCTXTVgjTOw2JyEMyj",
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
      "29215357"
    ]
  }
]

export const byId = (id: string) => AESTHETICS.find((a) => a.id === id)

export const pexelsUrl = (id: string, w = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const pexelsPage = (id: string) => `https://www.pexels.com/photo/${id}/`
