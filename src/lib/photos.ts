/**
 * Real photographs of the subject's world, taken from open archives
 * (Wikimedia Commons). Each one is credited on /legal/credits and none is
 * presented as a Mask & Maker product, maker or workshop.
 */
export interface Photo {
  src: string;
  alt: string;
  /** one-line caption that says what the picture is */
  caption: string;
  title: string;
  creator: string;
  license: string;
  licenseUrl: string;
  page: string;
  /** CSS object-position for crops */
  position?: string;
}

const CC_BY_SA_4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" };
const CC_BY_4 = { license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0" };

const raw = {
  carvingBench: {
    src: "/images/photos/carving-bench.jpg",
    alt: "A carver working at a bench of chisels and gouges, shaping a wooden mask",
    caption: "Carving at the bench, Ambalangoda",
    title: "Ambalangoda mask manufacturing 03",
    creator: "Dan arndt",
    ...CC_BY_SA_4,
    page: "https://commons.wikimedia.org/wiki/File:Ambalangoda_mask_manufacturing_03.jpg",
    position: "40% 40%",
  },
  masksWall: {
    src: "/images/photos/masks-wall.jpg",
    alt: "A wall crowded with painted Sri Lankan demon and kolam masks",
    caption: "Masks on a wall in Ambalangoda",
    title: "Traditional masks - Ambalangoda 04",
    creator: "Dan arndt",
    ...CC_BY_SA_4,
    page: "https://commons.wikimedia.org/wiki/File:Traditional_masks_-_Ambalangoda_04.jpg",
  },
  masksWall2: {
    src: "/images/photos/masks-wall-2.jpg",
    alt: "Carved and painted masks hung on a display wall",
    caption: "Carved masks on display, Ambalangoda",
    title: "Traditional masks - Ambalangoda 02",
    creator: "Dan arndt",
    ...CC_BY_SA_4,
    page: "https://commons.wikimedia.org/wiki/File:Traditional_masks_-_Ambalangoda_02.jpg",
  },
  masksBanner: {
    src: "/images/photos/masks-banner.jpg",
    alt: "A row of painted Sri Lankan masks hung side by side",
    caption: "A shelf of traditional masks, Ambalangoda",
    title: "Traditional masks banner- Ambalangoda 03",
    creator: "Dan arndt",
    ...CC_BY_SA_4,
    page: "https://commons.wikimedia.org/wiki/File:Traditional_masks_banner-_Ambalangoda_03.jpg",
    position: "50% 50%",
  },
  kolamDance: {
    src: "/images/photos/kolam-dance.jpg",
    alt: "A kolam dancer in a white wig mask with drummers in a performance hall",
    caption: "A kolam performance in Sri Lanka",
    title: "Kolam Dance, Sri Lanka 0596",
    creator: "Michael Gunther",
    ...CC_BY_SA_4,
    page: "https://commons.wikimedia.org/wiki/File:Kolam_Dance,_Sri_Lanka_0596.jpg",
    position: "50% 30%",
  },
  sanniMasks: {
    src: "/images/photos/sanni-masks.jpg",
    alt: "A large painted Daha Ata Sanniya mask with eighteen small faces carved into its frame",
    caption: "Daha Ata Sanniya, the eighteen-demon mask",
    title: "Daha Ata Sanniya - Raksha masks (5479278854)",
    creator: "Jorge Láscar",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    page: "https://commons.wikimedia.org/wiki/File:Daha_Ata_Sanniya_-_Raksha_masks_(5479278854).jpg",
    position: "50% 40%",
  },
  cobraMask: {
    src: "/images/photos/cobra-mask.jpg",
    alt: "A blue-faced demon mask crowned with cobras, with detachable ear pieces",
    caption: "A blue-faced demon mask with cobras",
    title: "Polychrome demon mask with a blue face and cobras",
    creator: "Wellcome Collection",
    ...CC_BY_4,
    page: "https://commons.wikimedia.org/wiki/File:Blue-faced_demon_mask_Wellcome_L0037001.jpg",
    position: "50% 30%",
  },
  maskDetail: {
    src: "/images/photos/mask-detail.jpg",
    alt: "A frame of stacked demon faces from a Sri Lankan mask",
    caption: "A frame of demon faces, Sri Lanka",
    title: "Detail from a Sri Lankan mask",
    creator: "Wellcome Collection",
    ...CC_BY_4,
    page: "https://commons.wikimedia.org/wiki/File:Detail_from_a_Sri_Lankan_mask_Wellcome_L0037277.jpg",
    position: "50% 35%",
  },
  sohonaYakka: {
    src: "/images/photos/sohona-yakka.jpg",
    alt: "The Maha Sohona Yakka mask, a wild-haired demon with a lolling red tongue, on grass",
    caption: "Maha Sohona Yakka, the graveyard demon",
    title: "Mask of the demon Maha Sohona Yakka from Ambalangoda Masks Museum",
    creator: "Jan Benda",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    page: "https://commons.wikimedia.org/wiki/File:Mask_of_the_demon_Maha_Sohona_Yakka_from_Ambalangoda_Masks_Museum.jpg",
    position: "50% 50%",
  },
  ceylonMap: {
    src: "/images/photos/ceylon-map.jpg",
    alt: "An engraved seventeenth-century map of the island of Ceylon",
    caption: "Ceylon, engraved map of 1692 (Knox)",
    title: "Map of Ceylon, c. 1692",
    creator: "R. Knox, Engelsman",
    license: "Public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:Map-of-ceylon-c1692.jpg",
  },
} satisfies Record<string, Photo>;

export const photos: Record<keyof typeof raw, Photo> = raw;
export type PhotoKey = keyof typeof raw;

/** Tradition → its photograph, used on the folklore cards and detail headers. */
export const traditionPhoto: Record<string, Photo> = {
  raksha: photos.cobraMask,
  sanni: photos.sanniMasks,
  kolam: photos.kolamDance,
};
