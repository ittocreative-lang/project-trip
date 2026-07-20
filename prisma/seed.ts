import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    {
      name: "Highlights",
      slug: "highlights",
      sortOrder: 0,
    },
    {
      name: "Facilities",
      slug: "facilities",
      sortOrder: 1,
    },
    {
      name: "Room Features",
      slug: "room-features",
      sortOrder: 2,
    },
    {
      name: "Relax & Leisure",
      slug: "relax-and-leisure",
      sortOrder: 3,
    },
    {
      name: "Accessibility",
      slug: "accessibility",
      sortOrder: 4,
    },
    {
      name: "Family Friendly",
      slug: "family-friendly",
      sortOrder: 5,
    },
  ]

  for (const category of categories) {
    await prisma.amenityCategory.upsert({
      where: {
        slug: category.slug,
      },
      update: {},
      create: category,
    })
  }

  // =========================
  // GET CATEGORY IDS
  // =========================

  const highlights = await prisma.amenityCategory.findUnique({
    where: { slug: "highlights" },
  })

  const facilities = await prisma.amenityCategory.findUnique({
    where: { slug: "facilities" },
  })

  const roomFeatures = await prisma.amenityCategory.findUnique({
    where: { slug: "room-features" },
  })

  const relax = await prisma.amenityCategory.findUnique({
    where: { slug: "relax-and-leisure" },
  })

  const accessibility = await prisma.amenityCategory.findUnique({
    where: { slug: "accessibility" },
  })

  const family = await prisma.amenityCategory.findUnique({
    where: { slug: "family-friendly" },
  })

  // =========================
  // AMENITIES
  // =========================

  const amenities = [
    // Highlights
    {
      name: "Free WiFi",
      slug: "free-wifi",
      icon: "wifi",
      categoryId: highlights!.id,
      isPopular: true,
    },
    {
      name: "Breakfast Included",
      slug: "breakfast-included",
      icon: "coffee",
      categoryId: highlights!.id,
      isPopular: true,
    },
    {
      name: "Free Parking",
      slug: "free-parking",
      icon: "car",
      categoryId: highlights!.id,
      isPopular: true,
    },
    {
      name: "Swimming Pool",
      slug: "swimming-pool",
      icon: "waves",
      categoryId: highlights!.id,
      isPopular: true,
    },

    // Facilities
    {
      name: "Restaurant",
      slug: "restaurant",
      icon: "utensils-crossed",
      categoryId: facilities!.id,
      isPopular: false,
    },
    {
      name: "Fitness Center",
      slug: "fitness-center",
      icon: "dumbbell",
      categoryId: facilities!.id,
      isPopular: false,
    },
    {
      name: "Spa",
      slug: "spa",
      icon: "sparkles",
      categoryId: facilities!.id,
      isPopular: false,
    },
    {
      name: "Airport Shuttle",
      slug: "airport-shuttle",
      icon: "plane",
      categoryId: facilities!.id,
      isPopular: false,
    },

    // Room Features
    {
      name: "Air Conditioning",
      slug: "air-conditioning",
      icon: "snowflake",
      categoryId: roomFeatures!.id,
      isPopular: false,
    },
    {
      name: "Private Bathroom",
      slug: "private-bathroom",
      icon: "bath",
      categoryId: roomFeatures!.id,
      isPopular: false,
    },
    {
      name: "Balcony",
      slug: "balcony",
      icon: "building",
      categoryId: roomFeatures!.id,
      isPopular: false,
    },
    {
      name: "Smart TV",
      slug: "smart-tv",
      icon: "tv",
      categoryId: roomFeatures!.id,
      isPopular: false,
    },

    // Relax & Leisure
    {
      name: "Beach Access",
      slug: "beach-access",
      icon: "umbrella",
      categoryId: relax!.id,
      isPopular: false,
    },
    {
      name: "Yoga Class",
      slug: "yoga-class",
      icon: "flower",
      categoryId: relax!.id,
      isPopular: false,
    },
    {
      name: "Massage",
      slug: "massage",
      icon: "heart-handshake",
      categoryId: relax!.id,
      isPopular: false,
    },

    // Accessibility
    {
      name: "Wheelchair Accessible",
      slug: "wheelchair-accessible",
      icon: "accessibility",
      categoryId: accessibility!.id,
      isPopular: false,
    },
    {
      name: "Elevator Access",
      slug: "elevator-access",
      icon: "move-vertical",
      categoryId: accessibility!.id,
      isPopular: false,
    },

    // Family Friendly
    {
      name: "Family Room",
      slug: "family-room",
      icon: "users",
      categoryId: family!.id,
      isPopular: false,
    },
    {
      name: "Kids Pool",
      slug: "kids-pool",
      icon: "baby",
      categoryId: family!.id,
      isPopular: false,
    },
    {
      name: "Baby Crib",
      slug: "baby-crib",
      icon: "bed",
      categoryId: family!.id,
      isPopular: false,
    },
  ]

  const extraAmenities = [
  // =========================
  // HIGHLIGHTS
  // =========================
  {
    name: "Ocean View",
    slug: "ocean-view",
    icon: "waves",
    categoryId: highlights!.id,
    isPopular: true,
  },
  {
    name: "City View",
    slug: "city-view",
    icon: "building-2",
    categoryId: highlights!.id,
    isPopular: true,
  },
  {
    name: "Pet Friendly",
    slug: "pet-friendly",
    icon: "paw-print",
    categoryId: highlights!.id,
    isPopular: true,
  },
  {
    name: "Luxury Hotel",
    slug: "luxury-hotel",
    icon: "gem",
    categoryId: highlights!.id,
    isPopular: true,
  },
  {
    name: "Boutique Hotel",
    slug: "boutique-hotel",
    icon: "hotel",
    categoryId: highlights!.id,
    isPopular: false,
  },
  {
    name: "All Inclusive",
    slug: "all-inclusive",
    icon: "badge-check",
    categoryId: highlights!.id,
    isPopular: true,
  },

  // =========================
  // FACILITIES
  // =========================
  {
    name: "Bar",
    slug: "bar",
    icon: "wine",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Cafe",
    slug: "cafe",
    icon: "coffee",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "24 Hour Front Desk",
    slug: "24-hour-front-desk",
    icon: "clock-3",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Concierge Service",
    slug: "concierge-service",
    icon: "bell",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Laundry Service",
    slug: "laundry-service",
    icon: "shirt",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Room Service",
    slug: "room-service",
    icon: "cloche",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Business Center",
    slug: "business-center",
    icon: "briefcase",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Meeting Room",
    slug: "meeting-room",
    icon: "presentation",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Garden",
    slug: "garden",
    icon: "trees",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Terrace",
    slug: "terrace",
    icon: "sun",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Shared Lounge",
    slug: "shared-lounge",
    icon: "sofa",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "ATM",
    slug: "atm",
    icon: "credit-card",
    categoryId: facilities!.id,
    isPopular: false,
  },
  {
    name: "Elevator",
    slug: "elevator",
    icon: "move-vertical",
    categoryId: facilities!.id,
    isPopular: false,
  },

  // =========================
  // ROOM FEATURES
  // =========================
  {
    name: "Mini Bar",
    slug: "mini-bar",
    icon: "glass-water",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },
  {
    name: "Refrigerator",
    slug: "refrigerator",
    icon: "refrigerator",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },
  {
    name: "Coffee Machine",
    slug: "coffee-machine",
    icon: "coffee",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },
  {
    name: "Hair Dryer",
    slug: "hair-dryer",
    icon: "wind",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },
  {
    name: "Work Desk",
    slug: "work-desk",
    icon: "desk",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },
  {
    name: "Safe Deposit Box",
    slug: "safe-deposit-box",
    icon: "shield-check",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },
  {
    name: "Soundproof Room",
    slug: "soundproof-room",
    icon: "volume-x",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },
  {
    name: "Kitchenette",
    slug: "kitchenette",
    icon: "chef-hat",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },
  {
    name: "Microwave",
    slug: "microwave",
    icon: "cooking-pot",
    categoryId: roomFeatures!.id,
    isPopular: false,
  },

  // =========================
  // RELAX & LEISURE
  // =========================
  {
    name: "Private Beach",
    slug: "private-beach",
    icon: "umbrella",
    categoryId: relax!.id,
    isPopular: false,
  },
  {
    name: "Snorkeling",
    slug: "snorkeling",
    icon: "fish",
    categoryId: relax!.id,
    isPopular: false,
  },
  {
    name: "Diving",
    slug: "diving",
    icon: "waves",
    categoryId: relax!.id,
    isPopular: false,
  },
  {
    name: "Surfing",
    slug: "surfing",
    icon: "sailboat",
    categoryId: relax!.id,
    isPopular: false,
  },
  {
    name: "Bicycle Rental",
    slug: "bicycle-rental",
    icon: "bike",
    categoryId: relax!.id,
    isPopular: false,
  },
  {
    name: "Live Music",
    slug: "live-music",
    icon: "music-4",
    categoryId: relax!.id,
    isPopular: false,
  },
  {
    name: "BBQ Area",
    slug: "bbq-area",
    icon: "flame",
    categoryId: relax!.id,
    isPopular: false,
  },
  {
    name: "Game Room",
    slug: "game-room",
    icon: "gamepad-2",
    categoryId: relax!.id,
    isPopular: false,
  },
  {
    name: "Golf Course",
    slug: "golf-course",
    icon: "flag",
    categoryId: relax!.id,
    isPopular: false,
  },

  // =========================
  // ACCESSIBILITY
  // =========================
  {
    name: "Accessible Parking",
    slug: "accessible-parking",
    icon: "parking-circle",
    categoryId: accessibility!.id,
    isPopular: false,
  },
  {
    name: "Roll In Shower",
    slug: "roll-in-shower",
    icon: "shower-head",
    categoryId: accessibility!.id,
    isPopular: false,
  },
  {
    name: "Step Free Access",
    slug: "step-free-access",
    icon: "footprints",
    categoryId: accessibility!.id,
    isPopular: false,
  },

  // =========================
  // FAMILY FRIENDLY
  // =========================
  {
    name: "Kids Club",
    slug: "kids-club",
    icon: "baby",
    categoryId: family!.id,
    isPopular: false,
  },
  {
    name: "Babysitting Service",
    slug: "babysitting-service",
    icon: "heart-handshake",
    categoryId: family!.id,
    isPopular: false,
  },
  {
    name: "Playground",
    slug: "playground",
    icon: "toy-brick",
    categoryId: family!.id,
    isPopular: false,
  },
  {
    name: "Connecting Rooms",
    slug: "connecting-rooms",
    icon: "door-open",
    categoryId: family!.id,
    isPopular: false,
  },
]

for (const amenity of extraAmenities) {
  await prisma.amenity.upsert({
    where: {
      slug: amenity.slug,
    },
    update: {},
    create: amenity,
  })
}

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: {
        slug: amenity.slug,
      },
      update: {},
      create: amenity,
    })
  }

  console.log("✅ Amenity seed completed")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


  