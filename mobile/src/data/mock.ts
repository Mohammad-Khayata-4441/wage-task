import { Product } from "@/types/product";

export const PRODUCTS_MOCK_DATA: Product[] = [
  {
    id: 1,
    name: "Minimalist Utility Jacket",
    price: 189,
    oldPrice: 249,
    variants: [
      {
        color: "Matte Black",
        colorCode: "#171717",
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Olive Green",
        colorCode: "#434B3E",
        images: [
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Sand Khaki",
        colorCode: "#C2B29A",
        images: [
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Structured Oversized Hoodie",
    price: 110,
    variants: [
      {
        color: "Charcoal Slate",
        colorCode: "#2E3033",
        images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Cream Ecru",
        colorCode: "#EFECE6",
        images: [
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Relaxed Tapered Trousers",
    price: 145,
    oldPrice: 195,
    variants: [
      {
        color: "Dark Navy",
        colorCode: "#1B2430",
        images: [
          "https://images.unsplash.com/photo-0000000000000-000000000000?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Mocha Brown",
        colorCode: "#4E3629",
        images: [
          "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Ash Grey",
        colorCode: "#8C92AC",
        images: [
          "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Heavyweight Boxy Crewneck",
    price: 85,
    variants: [
      {
        color: "Off White",
        colorCode: "#F5F5F0",
        images: [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Pitch Black",
        colorCode: "#0F0F0F",
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Technical Windbreaker Shell",
    price: 220,
    oldPrice: 280,
    variants: [
      {
        color: "Cobalt Blue",
        colorCode: "#1D4ED8",
        images: [
          "https://images.unsplash.com/photo-1544441892-794166f1e3be?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Anthracite",
        colorCode: "#374151",
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Padded Minimal Puffer",
    price: 295,
    variants: [
      {
        color: "Warm Taupe",
        colorCode: "#8B8589",
        images: [
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Obsidian",
        colorCode: "#0B0B0C",
        images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Merino Wool Knit Cardigan",
    price: 175,
    oldPrice: 225,
    variants: [
      {
        color: "Camel Beige",
        colorCode: "#C19A6B",
        images: [
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Forest Pine",
        colorCode: "#2D4436",
        images: [
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Raw Denim Workwear Overshirt",
    price: 160,
    variants: [
      {
        color: "Indigo Indigo",
        colorCode: "#264348",
        images: [
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Washed Black",
        colorCode: "#323232",
        images: [
          "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Tailored Linen Summer Blazer",
    price: 240,
    oldPrice: 310,
    variants: [
      {
        color: "Natural Stone",
        colorCode: "#D8D2C2",
        images: [
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Midnight Navy",
        colorCode: "#191970",
        images: [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 10,
    name: "Everyday Pleated Chino",
    price: 130,
    variants: [
      {
        color: "Desert Clay",
        colorCode: "#A75D5D",
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1544441892-794166f1e3be?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Muted Olive",
        colorCode: "#5F6F52",
        images: [
          "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Deep Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 11,
    name: "Ribbed Wool Knit Beanie",
    price: 45,
    oldPrice: 60,
    variants: [
      {
        color: "Oatmeal",
        colorCode: "#E3DAC9",
        images: [
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Burnt Orange",
        colorCode: "#CC5500",
        images: [
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  },
  {
    id: 12,
    name: "Commuter Nylon Crossbody Bag",
    price: 95,
    variants: [
      {
        color: "Stealth Black",
        colorCode: "#111111",
        images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=700&q=80"
        ]
      },
      {
        color: "Cement Grey",
        colorCode: "#8E8E93",
        images: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80"
        ]
      }
    ]
  }
];