/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DiscountType,
  PricingPack,
  PrismaClient,
  SpacePricing,
  SpaceType,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed shared spaces
  const sharedSpace1 = await prisma.sharedSpace.create({
    data: {
      delegate_aux_space: {
        create: {
          spaceType: SpaceType.SHARED_DESK,
          imageUrls: [],
          accomodations: ['Desk', 'Chair', 'Power outlet'],
        },
      },
    },
  });

  // Seed personal spaces
  const personalSpace1 = await prisma.personalSpace.create({
    data: {
      delegate_aux_space: {
        create: {
          spaceType: SpaceType.PRIVATE_OFFICE,
          imageUrls: [],
          accomodations: ['Desk', 'Chair', 'Power outlet', 'Lockable door'],
        },
      },
    },
  });

  // Seed team spaces
  await prisma.teamSpace.create({
    data: {
      delegate_aux_space: {
        create: {
          spaceType: SpaceType.TEAM_SPACE,
          imageUrls: [],
          accomodations: ['Desks', 'Chairs', 'Whiteboard', 'Conference table'],
        },
      },
    },
  });

  const standardPrices: Omit<SpacePricing, 'spaceId' | 'id'>[] = [
    {
      pack: PricingPack.STUDENT,
      price: 5,
      timeInterval: 0.5,
      discountType: DiscountType.PERCENTAGE,
      discountValue: 0.5,
    },
    {
      pack: PricingPack.STUDENT,
      price: 80,
      timeInterval: 14,
      discountType: DiscountType.PERCENTAGE,
      discountValue: 0.5,
    },
    {
      pack: PricingPack.STUDENT,
      price: 120,
      timeInterval: 30,
      discountType: DiscountType.PERCENTAGE,
      discountValue: 0.5,
    },
    {
      pack: PricingPack.PROFESSIONAL,
      price: 10,
      timeInterval: 0.5,
      discountType: DiscountType.NONE,
      discountValue: 0,
    },
    {
      pack: PricingPack.PROFESSIONAL,
      price: 120,
      timeInterval: 14,
      discountType: DiscountType.NONE,
      discountValue: 0,
    },
    {
      pack: PricingPack.PROFESSIONAL,
      price: 180,
      timeInterval: 30,
      discountType: DiscountType.NONE,
      discountValue: 0,
    },
  ];

  await prisma.spacePricing.createMany({
    data: Object.values(SpaceType)
      .map((spaceType, i) =>
        standardPrices.map(
          (pricingPack) =>
            ({
              ...pricingPack,
              spaceId: i % 2 === 0 ? sharedSpace1.id : personalSpace1.id,
            }) as const
        )
      )
      .flat(),
  });
  // Seed cinema spaces and event spaces (if applicable)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
