// Realistic dummy product catalogue for NOVA premium fashion house.
// Imagery uses Unsplash source URLs (work in a live browser; in the sandboxed
// preview external images are blocked and gracefully fall back to a gradient).

const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories = [
  { id: "outerwear", name: "Outerwear", count: 42, image: img("1551028719-00167b16eac5") },
  { id: "knitwear", name: "Knitwear", count: 38, image: img("1576566588028-4147f3842f27") },
  { id: "tailoring", name: "Tailoring", count: 26, image: img("1594938298603-c8148c4dae35") },
  { id: "footwear", name: "Footwear", count: 31, image: img("1549298916-b41d501d3772") },
  { id: "bags", name: "Bags", count: 24, image: img("1584917865442-de89df76afd3") },
  { id: "accessories", name: "Accessories", count: 19, image: img("1611591437281-460bfbe1220a") },
];

export const products = [
  {
    id: "nv-001",
    name: "Eclipse Wool Overcoat",
    brand: "NOVA Atelier",
    category: "outerwear",
    price: 489,
    compareAt: 620,
    rating: 4.9,
    reviews: 214,
    badge: "Bestseller",
    colors: ["#1c1c2b", "#6b6b83", "#8a6d4f"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("1539533018447-63fcce2678e3"), img("1544022613-e87ca75a784a"), img("1591047139829-d91aecb6caea")],
    description:
      "A sculptural double-faced wool overcoat with a clean dropped shoulder and concealed placket. Cut for an elevated, relaxed silhouette that layers effortlessly from city to weekend.",
    details: ["Double-faced Italian virgin wool", "Concealed press-stud placket", "Fully bound interior seams", "Dry clean only"],
    tags: ["new", "trending", "featured"],
    stock: 12,
  },
  {
    id: "nv-002",
    name: "Meridian Cashmere Sweater",
    brand: "NOVA Atelier",
    category: "knitwear",
    price: 248,
    compareAt: 0,
    rating: 4.8,
    reviews: 176,
    badge: "New",
    colors: ["#e9e4da", "#34344a", "#9c5b3b"],
    sizes: ["S", "M", "L", "XL"],
    images: [img("1576566588028-4147f3842f27"), img("1620799140408-edc6dcb6d633"), img("1614495039554-2f3f1b6f0b0a")],
    description:
      "Spun from grade-A Mongolian cashmere, the Meridian offers featherweight warmth with a refined ribbed collar and a timeless regular fit.",
    details: ["100% grade-A Mongolian cashmere", "Ribbed collar, cuffs & hem", "Mid-weight 12-gauge knit", "Hand wash cold"],
    tags: ["new", "featured"],
    stock: 23,
  },
  {
    id: "nv-003",
    name: "Vanguard Tailored Blazer",
    brand: "NOVA Atelier",
    category: "tailoring",
    price: 365,
    compareAt: 430,
    rating: 4.7,
    reviews: 132,
    badge: "",
    colors: ["#1c1c2b", "#2f3b34", "#4d4d63"],
    sizes: ["XS", "S", "M", "L"],
    images: [img("1594938298603-c8148c4dae35"), img("1507679799987-c73779587ccf"), img("1593030761757-71fae45fa0e7")],
    description:
      "A single-breasted blazer engineered with a half-canvas construction for a sharp yet natural drape. The defining piece of a modern wardrobe.",
    details: ["Half-canvas construction", "Super 110s wool blend", "Functional surgeon's cuffs", "Dry clean only"],
    tags: ["trending", "featured"],
    stock: 9,
  },
  {
    id: "nv-004",
    name: "Atlas Leather Derby",
    brand: "NOVA Studio",
    category: "footwear",
    price: 295,
    compareAt: 0,
    rating: 4.9,
    reviews: 308,
    badge: "Bestseller",
    colors: ["#3a2a20", "#1c1c2b"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: [img("1549298916-b41d501d3772"), img("1614252369475-531eba835eb1"), img("1543163521-1bf539c55dd2")],
    description:
      "Goodyear-welted derby shoes in full-grain Italian calfskin, finished by hand for a deep, lasting patina. Built to be resoled for a lifetime.",
    details: ["Full-grain Italian calfskin", "Goodyear-welted leather sole", "Hand-burnished finish", "Includes dust bags & trees"],
    tags: ["trending"],
    stock: 18,
  },
  {
    id: "nv-005",
    name: "Carbon Weekender Holdall",
    brand: "NOVA Studio",
    category: "bags",
    price: 410,
    compareAt: 520,
    rating: 4.8,
    reviews: 97,
    badge: "Limited",
    colors: ["#1c1c2b", "#3a2a20"],
    sizes: ["One Size"],
    images: [img("1584917865442-de89df76afd3"), img("1547949003-9792a18a2601"), img("1553062407-98eeb64c6a62")],
    description:
      "A cabin-friendly holdall in water-resistant coated canvas with vegetable-tanned leather trims and solid brass hardware.",
    details: ["Water-resistant coated canvas", "Vegetable-tanned leather trim", "Solid brass hardware", "Detachable shoulder strap"],
    tags: ["new", "featured"],
    stock: 6,
  },
  {
    id: "nv-006",
    name: "Solace Ribbed Turtleneck",
    brand: "NOVA Atelier",
    category: "knitwear",
    price: 188,
    compareAt: 0,
    rating: 4.6,
    reviews: 144,
    badge: "",
    colors: ["#0a0a0f", "#e9e4da", "#6b6b83"],
    sizes: ["S", "M", "L", "XL"],
    images: [img("1620799140408-edc6dcb6d633"), img("1614495039554-2f3f1b6f0b0a"), img("1576566588028-4147f3842f27")],
    description:
      "A streamlined merino turtleneck with full-needle ribbing for sleek structure and quiet sophistication under tailoring.",
    details: ["Extra-fine merino wool", "Full-needle ribbed body", "Slim modern fit", "Machine wash wool cycle"],
    tags: ["trending"],
    stock: 31,
  },
  {
    id: "nv-007",
    name: "Horizon Aviator Sunglasses",
    brand: "NOVA Studio",
    category: "accessories",
    price: 165,
    compareAt: 0,
    rating: 4.7,
    reviews: 211,
    badge: "New",
    colors: ["#1c1c2b", "#8a6d4f"],
    sizes: ["One Size"],
    images: [img("1611591437281-460bfbe1220a"), img("1572635196237-14b3f281503f"), img("1473496169904-658ba7c44d8a")],
    description:
      "Lightweight titanium aviators with polarized CR-39 lenses and adjustable acetate temple tips. Effortless, year-round.",
    details: ["Beta-titanium frame", "Polarized CR-39 lenses", "100% UVA/UVB protection", "Includes hard case"],
    tags: ["new"],
    stock: 40,
  },
  {
    id: "nv-008",
    name: "Drift Relaxed Trousers",
    brand: "NOVA Atelier",
    category: "tailoring",
    price: 215,
    compareAt: 260,
    rating: 4.5,
    reviews: 88,
    badge: "",
    colors: ["#34344a", "#8a6d4f", "#1c1c2b"],
    sizes: ["28", "30", "32", "34", "36"],
    images: [img("1593030761757-71fae45fa0e7"), img("1473966968600-fa801b869a1a"), img("1594938298603-c8148c4dae35")],
    description:
      "Pleated wide-leg trousers in a fluid wool-blend twill with a clean waistband and a precise, flattering break.",
    details: ["Fluid wool-blend twill", "Single forward pleat", "Wide-leg silhouette", "Dry clean only"],
    tags: ["featured"],
    stock: 14,
  },
  {
    id: "nv-009",
    name: "Aurora Quilted Bomber",
    brand: "NOVA Atelier",
    category: "outerwear",
    price: 340,
    compareAt: 0,
    rating: 4.8,
    reviews: 122,
    badge: "Trending",
    colors: ["#1c1c2b", "#2f3b34", "#9c5b3b"],
    sizes: ["S", "M", "L", "XL"],
    images: [img("1551028719-00167b16eac5"), img("1591047139829-d91aecb6caea"), img("1544022613-e87ca75a784a")],
    description:
      "A modern quilted bomber with a matte technical shell, recycled down fill, and a ribbed two-way zip collar.",
    details: ["Matte technical shell", "Recycled down fill", "Two-way YKK zip", "Water-repellent finish"],
    tags: ["trending", "new"],
    stock: 11,
  },
  {
    id: "nv-010",
    name: "Lumen Minimalist Watch",
    brand: "NOVA Studio",
    category: "accessories",
    price: 525,
    compareAt: 0,
    rating: 4.9,
    reviews: 264,
    badge: "Bestseller",
    colors: ["#1c1c2b", "#c9b07a", "#e9e4da"],
    sizes: ["One Size"],
    images: [img("1523275335684-37898b6baf30"), img("1524592094714-0f0654e20314"), img("1547996160-81dfa63595aa")],
    description:
      "A 38mm automatic dress watch with a sapphire crystal, exhibition caseback, and a hand-stitched Italian leather strap.",
    details: ["38mm 316L steel case", "Sapphire crystal, AR-coated", "Automatic movement, 42h reserve", "Italian leather strap"],
    tags: ["trending", "featured"],
    stock: 7,
  },
  {
    id: "nv-011",
    name: "Strato Suede Chelsea Boot",
    brand: "NOVA Studio",
    category: "footwear",
    price: 320,
    compareAt: 380,
    rating: 4.7,
    reviews: 159,
    badge: "",
    colors: ["#8a6d4f", "#34344a", "#1c1c2b"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: [img("1543163521-1bf539c55dd2"), img("1614252369475-531eba835eb1"), img("1549298916-b41d501d3772")],
    description:
      "Italian suede Chelsea boots with elasticated side gussets and a lightweight commando sole for all-day ease.",
    details: ["Premium Italian suede", "Elasticated side gussets", "Lightweight commando sole", "Leather lining"],
    tags: ["featured"],
    stock: 16,
  },
  {
    id: "nv-012",
    name: "Nimbus Structured Tote",
    brand: "NOVA Studio",
    category: "bags",
    price: 380,
    compareAt: 0,
    rating: 4.6,
    reviews: 73,
    badge: "New",
    colors: ["#1c1c2b", "#e9e4da", "#9c5b3b"],
    sizes: ["One Size"],
    images: [img("1553062407-98eeb64c6a62"), img("1548036328-c9fa89d128fa"), img("1584917865442-de89df76afd3")],
    description:
      "A clean-lined structured tote in pebbled leather with a suede-lined interior and a removable laptop sleeve.",
    details: ["Pebbled full-grain leather", "Suede-lined interior", "Removable 15\" laptop sleeve", "Magnetic top closure"],
    tags: ["new", "featured"],
    stock: 13,
  },
];

export const getProductById = (id) => products.find((p) => p.id === id);
export const getRelated = (product, n = 4) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, n);

export const byTag = (tag) => products.filter((p) => p.tags.includes(tag));
export const bestSellers = () => products.filter((p) => p.badge === "Bestseller");

export const brandPartners = ["VOGUE", "GQ", "HARPER'S", "ELLE", "ESQUIRE", "WWD"];

export const testimonials = [
  {
    name: "Amara Lindqvist",
    role: "Creative Director, Stockholm",
    quote:
      "NOVA has quietly become the only label in my rotation. The cut, the cloth, the restraint — it's the closest thing to perfection I own.",
    avatar: img("1494790108377-be9c29b29330", 200),
    rating: 5,
  },
  {
    name: "Julian Mercer",
    role: "Architect, New York",
    quote:
      "Everything arrives feeling considered. The overcoat alone replaced three others in my wardrobe. Faultless craftsmanship.",
    avatar: img("1500648767791-00dcc994a43e", 200),
    rating: 5,
  },
  {
    name: "Sofia Reyes",
    role: "Editor, Milan",
    quote:
      "A rare brand that understands modern luxury isn't loud. The fit is impeccable and the service is genuinely white-glove.",
    avatar: img("1438761681033-6461ffad8d80", 200),
    rating: 5,
  },
  {
    name: "Kenji Watanabe",
    role: "Photographer, Tokyo",
    quote:
      "From packaging to patina, NOVA gets the details right. These are the pieces I'll be wearing a decade from now.",
    avatar: img("1507003211169-0a1dd7228f2d", 200),
    rating: 5,
  },
];

export const faqs = [
  { q: "What is your delivery time?", a: "Standard delivery arrives within 2–4 business days. Express options (next-day) are available at checkout. All orders are dispatched from our atelier with signature-tracked carbon-neutral shipping." },
  { q: "Do you ship internationally?", a: "Yes — we ship to over 90 countries with fully landed pricing, meaning all duties and taxes are calculated at checkout with no surprises on arrival." },
  { q: "What is your returns policy?", a: "Enjoy 30 days of free returns on all unworn items in original condition. Initiate a return from your dashboard and we'll email a prepaid label instantly." },
  { q: "How do I find my size?", a: "Each product page includes a detailed size guide with garment measurements. Our concierge team is also available 24/7 for personalised fit advice." },
  { q: "Are your materials sustainably sourced?", a: "We work exclusively with certified mills and tanneries. 80% of our collection uses traceable, responsibly sourced fibres, and we're targeting 100% by 2027." },
  { q: "Can I track my order?", a: "Absolutely. Every order includes live tracking accessible from the Order Tracking page and your account dashboard, with proactive status notifications." },
];
