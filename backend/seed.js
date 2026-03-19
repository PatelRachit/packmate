import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const DB_NAME = process.env.DB_NAME

const climates = ['tropical', 'cold', 'desert', 'mediterranean']
const tripTypes = ['beach', 'hiking', 'business', 'backpacking', 'city']
const luggageTypes = ['carry-on', 'checked', 'backpack']
const statuses = ['planning', 'ongoing', 'completed']

const destinations = {
  tropical: [
    ['Bali', 'Indonesia'],
    ['Phuket', 'Thailand'],
    ['Maldives', 'Maldives'],
    ['Cancun', 'Mexico'],
    ['Colombo', 'Sri Lanka'],
    ['Manila', 'Philippines'],
    ['Ho Chi Minh City', 'Vietnam'],
    ['Krabi', 'Thailand'],
    ['Nassau', 'Bahamas'],
    ['Havana', 'Cuba'],
  ],
  cold: [
    ['Tokyo', 'Japan'],
    ['Reykjavik', 'Iceland'],
    ['Oslo', 'Norway'],
    ['Queenstown', 'New Zealand'],
    ['Montreal', 'Canada'],
    ['Helsinki', 'Finland'],
    ['Zurich', 'Switzerland'],
    ['Vienna', 'Austria'],
    ['Stockholm', 'Sweden'],
    ['Prague', 'Czech Republic'],
  ],
  desert: [
    ['Dubai', 'UAE'],
    ['Marrakech', 'Morocco'],
    ['Phoenix', 'USA'],
    ['Riyadh', 'Saudi Arabia'],
    ['Las Vegas', 'USA'],
    ['Cairo', 'Egypt'],
    ['Doha', 'Qatar'],
    ['Tucson', 'USA'],
    ['Abu Dhabi', 'UAE'],
    ['Muscat', 'Oman'],
  ],
  mediterranean: [
    ['Barcelona', 'Spain'],
    ['Santorini', 'Greece'],
    ['Rome', 'Italy'],
    ['Nice', 'France'],
    ['Dubrovnik', 'Croatia'],
    ['Lisbon', 'Portugal'],
    ['Valencia', 'Spain'],
    ['Athens', 'Greece'],
    ['Palermo', 'Italy'],
    ['Split', 'Croatia'],
  ],
}

const firstNames = [
  'Emma',
  'Liam',
  'Olivia',
  'Noah',
  'Ava',
  'Lucas',
  'Sophia',
  'Mason',
  'Isabella',
  'Ethan',
  'Mia',
  'James',
  'Charlotte',
  'Oliver',
  'Amelia',
  'Elijah',
  'Harper',
  'William',
  'Evelyn',
  'Benjamin',
  'Abigail',
  'Michael',
  'Emily',
  'Daniel',
  'Ella',
  'Henry',
  'Elizabeth',
  'Jackson',
  'Sofia',
  'Sebastian',
  'Madison',
  'Aiden',
  'Avery',
  'Matthew',
  'Scarlett',
  'Samuel',
  'Victoria',
  'David',
  'Aria',
  'Joseph',
  'Grace',
  'Carter',
  'Chloe',
  'Owen',
  'Penelope',
  'Wyatt',
  'Riley',
  'John',
  'Zoey',
  'Jack',
]
const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Martinez',
  'Wilson',
  'Anderson',
  'Taylor',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
  'Torres',
  'Nguyen',
  'Hill',
  'Flores',
  'Green',
  'Adams',
  'Nelson',
  'Baker',
  'Hall',
  'Rivera',
  'Campbell',
  'Mitchell',
  'Carter',
  'Roberts',
  'Patel',
  'Evans',
  'Turner',
  'Phillips',
  'Collins',
  'Stewart',
  'Morris',
  'Rogers',
  'Reed',
  'Cook',
  'Morgan',
  'Bell',
  'Murphy',
]

const tripNameTemplates = {
  beach: (dest) => [
    `${dest} Beach Escape`,
    `Sun & Sea in ${dest}`,
    `${dest} Coastal Retreat`,
    `${dest} Summer Getaway`,
  ],
  hiking: (dest) => [
    `${dest} Trail Adventure`,
    `Hiking the ${dest} Mountains`,
    `${dest} Peak Challenge`,
    `${dest} Wilderness Trek`,
  ],
  business: (dest) => [
    `${dest} Business Trip`,
    `${dest} Conference Visit`,
    `Work Week in ${dest}`,
    `${dest} Client Meeting`,
  ],
  backpacking: (dest) => [
    `${dest} Backpacking Adventure`,
    `Exploring ${dest} on a Budget`,
    `${dest} Solo Journey`,
    `${dest} Backpacker Experience`,
  ],
  city: (dest) => [
    `${dest} City Break`,
    `Weekend in ${dest}`,
    `${dest} Urban Exploration`,
    `Discovering ${dest}`,
  ],
}

const itemsByClimateAndType = {
  tropical: {
    beach: ['i6', 'i7', 'i8', 'i17', 'i11', 'i18', 'i5', 'i21', 'i12', 'i13'],
    hiking: ['i9', 'i11', 'i17', 'i18', 'i20', 'i21', 'i5', 'i12', 'i13'],
    business: ['i14', 'i15', 'i5', 'i19', 'i12', 'i13', 'i24', 'i16'],
    backpacking: [
      'i18',
      'i20',
      'i17',
      'i11',
      'i21',
      'i22',
      'i23',
      'i12',
      'i13',
      'i5',
    ],
    city: ['i5', 'i16', 'i18', 'i19', 'i21', 'i12', 'i13', 'i24'],
  },
  cold: {
    beach: ['i1', 'i2', 'i3', 'i4', 'i11', 'i18', 'i5', 'i21', 'i12', 'i13'],
    hiking: ['i1', 'i3', 'i9', 'i10', 'i11', 'i18', 'i20', 'i5', 'i12', 'i13'],
    business: [
      'i1',
      'i2',
      'i14',
      'i15',
      'i19',
      'i25',
      'i5',
      'i12',
      'i13',
      'i24',
    ],
    backpacking: [
      'i1',
      'i3',
      'i4',
      'i9',
      'i11',
      'i18',
      'i20',
      'i22',
      'i5',
      'i12',
    ],
    city: ['i1', 'i2', 'i3', 'i4', 'i5', 'i19', 'i21', 'i12', 'i13', 'i24'],
  },
  desert: {
    beach: ['i6', 'i7', 'i8', 'i18', 'i11', 'i5', 'i21', 'i12', 'i13'],
    hiking: ['i9', 'i11', 'i18', 'i20', 'i5', 'i21', 'i12', 'i13'],
    business: ['i14', 'i15', 'i5', 'i19', 'i12', 'i13', 'i24', 'i25'],
    backpacking: ['i9', 'i11', 'i18', 'i20', 'i22', 'i5', 'i12', 'i13'],
    city: ['i5', 'i18', 'i19', 'i21', 'i12', 'i13', 'i24'],
  },
  mediterranean: {
    beach: ['i6', 'i7', 'i8', 'i16', 'i11', 'i18', 'i5', 'i21', 'i12', 'i13'],
    hiking: ['i9', 'i10', 'i11', 'i18', 'i20', 'i5', 'i21', 'i12', 'i13'],
    business: ['i14', 'i15', 'i19', 'i25', 'i5', 'i12', 'i13', 'i24'],
    backpacking: ['i9', 'i11', 'i18', 'i20', 'i22', 'i23', 'i16', 'i5', 'i12'],
    city: ['i5', 'i16', 'i18', 'i19', 'i21', 'i12', 'i13', 'i24'],
  },
}

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randBool = (prob = 0.5) => Math.random() < prob

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function generateTrip(itemIds) {
  const climate = rand(climates)
  const tripType = rand(tripTypes)
  const status = rand(statuses)
  const [dest, country] = rand(destinations[climate])
  const duration = randInt(3, 21)
  const email = `${rand(firstNames).toLowerCase()}.${rand(lastNames).toLowerCase()}${randInt(1, 999)}@example.com`
  const names = tripNameTemplates[tripType](dest)
  const tripName = rand(names)
  const luggage = rand(luggageTypes)

  const startOffset = randInt(-60, 180)
  const startDate = addDays(new Date(), startOffset)
  const endDate = addDays(startDate, duration)

  const baseItemIds = itemsByClimateAndType[climate][tripType]
  const numItems = randInt(
    Math.floor(baseItemIds.length * 0.5),
    baseItemIds.length,
  )
  const chosenIds = [...baseItemIds]
    .sort(() => Math.random() - 0.5)
    .slice(0, numItems)

  const checkedProb =
    status === 'completed' ? 0.95 : status === 'ongoing' ? 0.5 : 0.15

  const items = chosenIds
    .map((mockId) => {
      const realId = itemIds[mockId]
      if (!realId) return null
      return {
        itemId: realId,
        isChecked: randBool(checkedProb),
        isCustom: false,
        customName: null,
      }
    })
    .filter(Boolean)

  if (randBool(0.3)) {
    const customNames = {
      beach: ['Beach towel', 'Snorkelling mask', 'Waterproof phone case'],
      hiking: ['Gaiters', 'Emergency whistle', 'Headlamp'],
      business: ['Portable monitor', 'Business suit', 'Presentation clicker'],
      backpacking: ['Hammock', 'Journal', 'Padlock'],
      city: ['City map', 'Reusable bag', 'Umbrella'],
    }
    const customName = rand(customNames[tripType])
    items.push({
      itemId: `custom_${Date.now()}_${randInt(0, 9999)}`,
      isChecked: randBool(checkedProb),
      isCustom: true,
      customName,
    })
  }

  const now = new Date()
  return {
    email,
    tripName,
    destination: dest,
    country,
    climate,
    tripType,
    luggageType: luggage,
    durationDays: duration,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    status,
    items,
    createdAt: addDays(now, -randInt(0, 180)),
    updatedAt: now,
  }
}

async function seed() {
  const client = new MongoClient(MONGO_URI)

  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db(DB_NAME)

    const existing = await db.collection('trips').countDocuments()
    if (existing >= 1500) {
      console.log(
        `trips collection already has ${existing} documents. Skipping.`,
      )
      console.log('To re-seed, drop the collection first: db.trips.drop()')
      return
    }

    const dbItems = await db
      .collection('items')
      .find({}, { projection: { _id: 1, name: 1 } })
      .toArray()
    if (dbItems.length === 0) {
      console.log('No items found. Run seed:items first.')
      process.exit(1)
    }

    const mockToRealId = {
      i1: null,
      i2: null,
      i3: null,
      i4: null,
      i5: null,
      i6: null,
      i7: null,
      i8: null,
      i9: null,
      i10: null,
      i11: null,
      i12: null,
      i13: null,
      i14: null,
      i15: null,
      i16: null,
      i17: null,
      i18: null,
      i19: null,
      i20: null,
      i21: null,
      i22: null,
      i23: null,
      i24: null,
      i25: null,
    }

    const nameToMockId = {
      'Thermal Underlayer': 'i1',
      'Winter Coat': 'i2',
      'Wool Socks (5 pairs)': 'i3',
      'Gloves & Scarf': 'i4',
      'Travel Adapter': 'i5',
      Swimsuit: 'i6',
      'Reef-Safe Sunscreen': 'i7',
      'Waterproof Sandals': 'i8',
      'Hiking Boots': 'i9',
      'Trekking Poles': 'i10',
      'First Aid Kit': 'i11',
      'Passport & Copies': 'i12',
      'Travel Insurance Docs': 'i13',
      'Laptop & Charger': 'i14',
      'Business Cards': 'i15',
      'Linen Shirts (3)': 'i16',
      'Insect Repellent': 'i17',
      'Reusable Water Bottle': 'i18',
      'Noise-Cancelling Headphones': 'i19',
      'Lightweight Rain Jacket': 'i20',
      'Portable Power Bank': 'i21',
      'Packing Cubes (set)': 'i22',
      'Quick-Dry Towel': 'i23',
      'Prescription Medications': 'i24',
      'Formal Dress Shoes': 'i25',
    }

    dbItems.forEach((item) => {
      const mockId = nameToMockId[item.name]
      if (mockId) mockToRealId[mockId] = item._id
    })

    const BATCH = 100
    const TOTAL = 1500
    let inserted = 0

    for (let i = 0; i < TOTAL; i += BATCH) {
      const batch = Array.from({ length: Math.min(BATCH, TOTAL - i) }, () =>
        generateTrip(mockToRealId),
      )
      await db.collection('trips').insertMany(batch)
      inserted += batch.length
      console.log(`Inserted ${inserted} / ${TOTAL}`)
    }

    console.log(`Done. Seeded ${inserted} trips.`)
  } catch (err) {
    console.error('Seed failed:', err.message)
    process.exit(1)
  } finally {
    await client.close()
  }
}

seed()
