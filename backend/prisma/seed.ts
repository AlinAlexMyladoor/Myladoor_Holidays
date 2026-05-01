import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const vehicles = [
  {
    name: 'Compact Sedan',
    category: 'sedan',
    capacity: 4,
    pricePerDay: 1800,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
    features: ['AC', 'GPS', 'Music System'],
  },
  {
    name: 'Innova Crysta',
    category: 'suv',
    capacity: 7,
    pricePerDay: 2500,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
    features: ['AC', 'GPS', 'Luxury Interior', 'Spacious'],
  },
  {
    name: 'Urbania Luxury',
    category: 'van',
    capacity: 12,
    pricePerDay: 7500,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200',
    features: ['Panoramic Roof', 'Leather Seats', 'WiFi', 'Premium Sound'],
  },
  {
    name: 'Executive Van 14',
    category: 'van',
    capacity: 14,
    pricePerDay: 4500,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    features: ['AC', 'Push-back Seats', 'USB Charging'],
  },
  {
    name: 'SML Mini Bus',
    category: 'coach',
    capacity: 36,
    pricePerDay: 9000,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200',
    features: ['PA System', 'TV', 'Ample Luggage Space'],
  },
  {
    name: 'Grand Coach 49',
    category: 'coach',
    capacity: 49,
    pricePerDay: 12000,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    features: ['Full AC', 'Recliner Seats', 'Washroom (On request)'],
  },
];

async function main() {
  console.log('Seeding vehicles...');
  for (const v of vehicles) {
    await prisma.vehicle.create({ data: v });
  }
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
