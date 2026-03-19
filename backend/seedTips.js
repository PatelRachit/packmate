import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const DB_NAME = process.env.DB_NAME

const tips = [
  {
    email: 'sarah.miller@example.com',
    title: 'Roll your clothes to save space',
    description:
      'Rolling instead of folding cuts volume by nearly a third and reduces creases. Works best for t-shirts, jeans, and casual wear.',
    tripTypeTags: ['backpacking', 'beach', 'city'],
    climateTags: ['tropical', 'mediterranean'],
    upvoteCount: 142,
    isVerified: true,
    isFeatured: true,
    upvotedBy: [],
  },
  {
    email: 'james.chen@example.com',
    title: 'Always carry a power strip',
    description:
      'Hotel rooms rarely have enough outlets. A compact power strip lets you charge everything at once without fighting over sockets.',
    tripTypeTags: ['business', 'city'],
    climateTags: ['cold', 'mediterranean'],
    upvoteCount: 98,
    isVerified: true,
    isFeatured: true,
    upvotedBy: [],
  },
  {
    email: 'priya.sharma@example.com',
    title: 'A lightweight scarf does everything',
    description:
      'Use it as a blanket on cold flights, a towel at the beach, or a modesty cover in temples. Most versatile item in any bag.',
    tripTypeTags: ['city', 'beach', 'backpacking'],
    climateTags: ['tropical', 'cold', 'mediterranean'],
    upvoteCount: 76,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'alex.rodriguez@example.com',
    title: 'Download offline maps before you board',
    description:
      'Google Maps offline or Maps.me are lifesavers when you have no data roaming. Download your destination city before the flight.',
    tripTypeTags: ['backpacking', 'city', 'beach'],
    climateTags: ['tropical', 'cold', 'desert', 'mediterranean'],
    upvoteCount: 115,
    isVerified: true,
    isFeatured: true,
    upvotedBy: [],
  },
  {
    email: 'priya.sharma@example.com',
    title: 'Sock liners prevent blisters on long hikes',
    description:
      'A thin liner sock under your hiking socks dramatically reduces friction. Game changer for multi-day trails.',
    tripTypeTags: ['hiking'],
    climateTags: ['cold', 'mediterranean'],
    upvoteCount: 88,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'marcus.johnson@example.com',
    title: 'Screenshot all your booking confirmations',
    description:
      'Screenshots of hotel, flight, and insurance info work without internet and save you at every checkpoint.',
    tripTypeTags: ['city', 'backpacking', 'hiking'],
    climateTags: ['tropical', 'cold', 'desert', 'mediterranean'],
    upvoteCount: 54,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'nina.patel@example.com',
    title: 'Pack reef-safe sunscreen for beach trips',
    description:
      'Regular sunscreen damages coral reefs. Reef-safe options protect both you and the ocean. Check the label for oxybenzone-free formulas.',
    tripTypeTags: ['beach'],
    climateTags: ['tropical', 'mediterranean'],
    upvoteCount: 67,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'tom.walker@example.com',
    title: 'Use packing cubes for every trip',
    description:
      'Packing cubes compress clothes and keep your bag organised. Assign one cube per category — tops, bottoms, accessories.',
    tripTypeTags: ['city', 'business', 'beach', 'hiking', 'backpacking'],
    climateTags: ['tropical', 'cold', 'desert', 'mediterranean'],
    upvoteCount: 109,
    isVerified: true,
    isFeatured: true,
    upvotedBy: [],
  },
  {
    email: 'lisa.nguyen@example.com',
    title: 'Bring a portable water filter for desert hikes',
    description:
      'A lightweight filter like Sawyer Squeeze means you can drink from any water source. Essential in remote desert terrain.',
    tripTypeTags: ['hiking', 'backpacking'],
    climateTags: ['desert'],
    upvoteCount: 73,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'david.kim@example.com',
    title: 'Book airport lounges in advance for business travel',
    description:
      'Day passes to lounges are often cheaper booked online versus at the door. Fast wifi, food, and showers make long layovers bearable.',
    tripTypeTags: ['business'],
    climateTags: ['cold', 'tropical', 'desert', 'mediterranean'],
    upvoteCount: 84,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'sarah.miller@example.com',
    title: 'Waterproof everything in tropical climates',
    description:
      'Sudden downpours are guaranteed in tropical destinations. A dry bag for electronics and waterproof sandals will save your trip.',
    tripTypeTags: ['beach', 'backpacking', 'hiking'],
    climateTags: ['tropical'],
    upvoteCount: 61,
    isVerified: false,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'james.chen@example.com',
    title: 'Layer up for cold city trips',
    description:
      'Three thin layers beat one thick coat for cold city travel. You can peel off layers on the metro and add them back outside.',
    tripTypeTags: ['city', 'business'],
    climateTags: ['cold'],
    upvoteCount: 92,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'alex.rodriguez@example.com',
    title: 'Carry electrolyte sachets in the desert',
    description:
      'Dehydration sneaks up on you in dry heat. Electrolyte sachets weigh nothing and can prevent headaches and fatigue on long days.',
    tripTypeTags: ['hiking', 'backpacking', 'city'],
    climateTags: ['desert'],
    upvoteCount: 48,
    isVerified: false,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'nina.patel@example.com',
    title: 'Pack a first aid kit for any outdoor trip',
    description:
      'Blister plasters, antiseptic wipes, and rehydration salts are the three things most people wish they had brought. Keep it small.',
    tripTypeTags: ['hiking', 'beach', 'backpacking'],
    climateTags: ['tropical', 'cold', 'desert', 'mediterranean'],
    upvoteCount: 130,
    isVerified: true,
    isFeatured: true,
    upvotedBy: [],
  },
  {
    email: 'tom.walker@example.com',
    title: 'Noise-cancelling headphones are worth it',
    description:
      'Long-haul flights and busy city commutes are transformed with good noise-cancelling headphones. The investment pays off on day one.',
    tripTypeTags: ['city', 'business', 'backpacking'],
    climateTags: ['cold', 'tropical', 'desert', 'mediterranean'],
    upvoteCount: 77,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'lisa.nguyen@example.com',
    title: 'Keep copies of your passport in the cloud',
    description:
      'Upload scans to Google Drive or iCloud. If your passport is lost or stolen, you need those details instantly to report to your embassy.',
    tripTypeTags: ['city', 'business', 'beach', 'hiking', 'backpacking'],
    climateTags: ['tropical', 'cold', 'desert', 'mediterranean'],
    upvoteCount: 156,
    isVerified: true,
    isFeatured: true,
    upvotedBy: [],
  },
  {
    email: 'david.kim@example.com',
    title: 'Mediterranean summers need sun protection all day',
    description:
      'Even overcast Mediterranean days carry strong UV. Reapply SPF every two hours, especially near water or white-washed buildings.',
    tripTypeTags: ['beach', 'city'],
    climateTags: ['mediterranean'],
    upvoteCount: 55,
    isVerified: false,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'marcus.johnson@example.com',
    title: 'Budget extra luggage weight for hiking gear',
    description:
      'Boots, poles, and sleeping bags add up fast. Weigh your bag before leaving home to avoid airport surprise fees.',
    tripTypeTags: ['hiking', 'backpacking'],
    climateTags: ['cold', 'desert', 'mediterranean'],
    upvoteCount: 43,
    isVerified: false,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'priya.sharma@example.com',
    title: 'Insect repellent is non-negotiable in the tropics',
    description:
      'DEET or picaridin-based repellents are the only ones proven to work against mosquitoes carrying dengue and malaria. Do not skip this.',
    tripTypeTags: ['beach', 'hiking', 'backpacking'],
    climateTags: ['tropical'],
    upvoteCount: 119,
    isVerified: true,
    isFeatured: true,
    upvotedBy: [],
  },
  {
    email: 'sarah.miller@example.com',
    title: 'Bring business cards to every conference',
    description:
      'Digital cards are fine but physical cards still make a stronger impression at international business events. Keep 20 in your wallet.',
    tripTypeTags: ['business'],
    climateTags: ['cold', 'tropical', 'desert', 'mediterranean'],
    upvoteCount: 38,
    isVerified: false,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'james.chen@example.com',
    title: 'A reusable bottle saves money and plastic',
    description:
      'Buying water in tourist areas is expensive and wasteful. A filtered bottle pays for itself in two days in any destination.',
    tripTypeTags: ['hiking', 'city', 'beach', 'backpacking'],
    climateTags: ['tropical', 'cold', 'desert', 'mediterranean'],
    upvoteCount: 101,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'nina.patel@example.com',
    title: 'Cold weather triples your bag weight — plan carefully',
    description:
      'Thermal layers, heavy boots, and a winter coat fill a bag fast. Lay everything out before packing and cut at least one item.',
    tripTypeTags: ['city', 'hiking', 'business'],
    climateTags: ['cold'],
    upvoteCount: 66,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'alex.rodriguez@example.com',
    title: 'Quick-dry towels are essential for backpacking',
    description:
      'Regular towels take hours to dry and grow mildew fast. A microfibre travel towel dries in 30 minutes and fits in a side pocket.',
    tripTypeTags: ['backpacking', 'beach', 'hiking'],
    climateTags: ['tropical', 'mediterranean'],
    upvoteCount: 82,
    isVerified: true,
    isFeatured: false,
    upvotedBy: [],
  },
  {
    email: 'tom.walker@example.com',
    title: 'Always pack prescription meds in your carry-on',
    description:
      'Checked bags get lost. Keeping medications in your carry-on ensures you never miss a dose even if your luggage is delayed for days.',
    tripTypeTags: ['city', 'business', 'beach', 'hiking', 'backpacking'],
    climateTags: ['tropical', 'cold', 'desert', 'mediterranean'],
    upvoteCount: 147,
    isVerified: true,
    isFeatured: true,
    upvotedBy: [],
  },
  {
    email: 'lisa.nguyen@example.com',
    title: 'Formal shoes are worth the weight for business trips',
    description:
      'You can skip most extras but not your formal shoes at a business conference. Scuffed or casual footwear leaves a lasting impression.',
    tripTypeTags: ['business'],
    climateTags: ['cold', 'mediterranean'],
    upvoteCount: 29,
    isVerified: false,
    isFeatured: false,
    upvotedBy: [],
  },
]

async function seed() {
  const client = new MongoClient(MONGO_URI)

  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db(DB_NAME)
    const collection = db.collection('communityTips')

    const existing = await collection.countDocuments()
    if (existing > 0) {
      console.log(`Collection already has ${existing} tips. Skipping seed.`)
      console.log(
        'To re-seed, drop the collection first using: db.communityTips.drop()',
      )
      return
    }

    const now = new Date()
    const docs = tips.map((tip) => ({ ...tip, createdAt: now }))

    const result = await collection.insertMany(docs)
    console.log(
      `Seeded ${result.insertedCount} tips into the communityTips collection`,
    )
  } catch (err) {
    console.error('Seed failed:', err.message)
    process.exit(1)
  } finally {
    await client.close()
  }
}

seed()
