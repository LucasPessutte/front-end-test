import { PrismaClient } from "@prisma/client";
import { DogBreed } from "../src/enums/breed.enum";
import { DogTemperament } from "../src/enums/temperament.enum";
import { DogSex } from "../src/enums/sex.enum";

const prisma = new PrismaClient();

// Realistic dog names
const DOG_NAMES = [
  "Max",
  "Bella",
  "Charlie",
  "Luna",
  "Cooper",
  "Lucy",
  "Rocky",
  "Daisy",
  "Buddy",
  "Molly",
  "Duke",
  "Sadie",
  "Bear",
  "Sophie",
  "Zeus",
  "Chloe",
  "Jack",
  "Bailey",
  "Tucker",
  "Maggie",
  "Oliver",
  "Stella",
  "Bentley",
  "Penny",
  "Milo",
  "Lola",
  "Leo",
  "Zoe",
  "Toby",
  "Lily",
  "Jasper",
  "Rosie",
  "Finn",
  "Ruby",
  "Winston",
  "Ellie",
  "Oscar",
  "Abby",
  "Blue",
  "Nala",
  "Thor",
  "Maya",
  "Atlas",
  "Coco",
  "Apollo",
  "Willow",
  "Ace",
  "Angel",
  "Ranger",
  "Princess",
  "Bruno",
  "Izzy",
  "Cash",
  "Athena",
  "Storm",
  "Nova",
  "Rex",
  "Honey",
  "Shadow",
  "Gracie",
  "Diesel",
  "Mia",
  "Gunner",
  "Roxy",
  "Tank",
  "Emma",
  "King",
  "Annie",
  "Moose",
  "Millie",
  "Simba",
  "Hazel",
  "Prince",
  "Kona",
  "Bandit",
  "Piper",
  "Maverick",
  "Winnie",
  "Scout",
  "Amber",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomBirthDate(): Date {
  const currentDate = new Date();
  const yearsAgo = Math.floor(Math.random() * 15); // 0-15 years old
  const monthsAgo = Math.floor(Math.random() * 12);
  const daysAgo = Math.floor(Math.random() * 30);

  const birthDate = new Date(currentDate);
  birthDate.setFullYear(currentDate.getFullYear() - yearsAgo);
  birthDate.setMonth(currentDate.getMonth() - monthsAgo);
  birthDate.setDate(currentDate.getDate() - daysAgo);

  return birthDate;
}

async function seedDatabase() {
  console.log("🌱 Starting database seed...");

  // Clear existing dogs
  await prisma.dog.deleteMany({});
  console.log("🗑️  Cleared existing dogs");

  const breeds = Object.values(DogBreed);
  const temperaments = Object.values(DogTemperament);
  const sexes = Object.values(DogSex);

  const dogsToCreate = 200;
  const dogs = [];

  for (let i = 0; i < dogsToCreate; i++) {
    dogs.push({
      name: `${getRandomElement(DOG_NAMES)} ${i + 1}`,
      birth_date: getRandomBirthDate(),
      breed: getRandomElement(breeds),
      temperament: getRandomElement(temperaments),
      sex: getRandomElement(sexes),
    });
  }

  // Batch create for better performance
  const batchSize = 50;
  for (let i = 0; i < dogs.length; i += batchSize) {
    const batch = dogs.slice(i, i + batchSize);
    await prisma.dog.createMany({
      data: batch,
    });
    console.log(
      `✅ Created dogs ${i + 1} to ${Math.min(i + batchSize, dogs.length)}`,
    );
  }

  console.log(`🎉 Successfully seeded ${dogsToCreate} dogs!`);

  // Show statistics
  const stats = await prisma.dog.groupBy({
    by: ["breed"],
    _count: true,
  });

  console.log("\n📊 Breed statistics:");
  stats.forEach((stat) => {
    console.log(`  ${stat.breed}: ${stat._count} dogs`);
  });
}

seedDatabase()
  .catch((error) => {
    console.error("❌ Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
