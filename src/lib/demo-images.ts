/** Curated Unsplash demo images — royalty-free, industry-matched. */
const u = (photoId: string, width = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

export const DEMO_IMAGES = {
  cafe: u("photo-1495474472287-4d71bcdd2085"),
  cafeInterior: u("photo-1554118811-1e0d58224f24"),
  restaurant: u("photo-1517248135467-4c7edcad34c4"),
  restaurantDining: u("photo-1559339352-11d035aa65de"),
  bakery: u("photo-1509440159596-0249088772ff"),
  salon: u("photo-1522337360788-8b13dee7a37e"),
  gym: u("photo-1534438327276-14e5300c3a48"),
  jewellery: u("photo-1605100804763-247f67b3557e"),
  furniture: u("photo-1555041469-a586c61ea9bc"),
  hotel: u("photo-1566073771259-6a8506099945"),
  clinic: u("photo-1576091160399-112ba8d25d1d"),
  realEstate: u("photo-1560518883-ce09059eeffa"),
  photography: u("photo-1452587925148-ce544e77e70d"),
  fashion: u("photo-1445205170230-053b83016050"),
  education: u("photo-1503676260728-1c00da094a0b"),
  workspace: u("photo-1497366216548-37526070297c"),
  teamCollaboration: u("photo-1522071820081-009f0129c71c"),
  laptop: u("photo-1460925895917-afdab827c52f"),
} as const;

export type DemoImageKey = keyof typeof DEMO_IMAGES;

export function demoImage(key: DemoImageKey, width?: number): string {
  return DEMO_IMAGES[key].replace(/w=\d+/, `w=${width ?? 1200}`);
}
