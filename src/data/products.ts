export type Category = 'swimwear' | 'casual' | 'dresses' | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  images?: string[];   // Fotos adicionales de la galería (además de la portada)
  category: Category;
  sizes?: string[];    // Tallas disponibles, ej: ['S', 'M', 'L', 'XL']
  colors?: string[];   // Colores disponibles, ej: ['Negro', 'Blanco']
  stock?: number;      // Unidades disponibles en total
  discount?: string;   // Etiqueta de descuento, ej: '-20% OFF'. Opcional: sin descuento si no se define.
}

export const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'Todos los Productos',
  swimwear: 'Trajes de Baño',
  casual: 'Ropa Casual',
  dresses: 'Vestidos',
  accessories: 'Accesorios',
};

export const products: Product[] = [
  {
    "name": "Sueter Color Mostaza",
    "price": 18,
    "brand": "FOREVER21",
    "category": "casual",
    "image": "/product-images/custom-1774650270022.png",
    "id": "custom-1774650270022",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Camisa Beige botones dorados",
    "price": 18,
    "brand": "PRINCESS",
    "category": "casual",
    "image": "/product-images/custom-1774650538480.png",
    "id": "custom-1774650538480",
    "sizes": [
      "L"
    ],
    "stock": 1
  },
  {
    "name": "Vestido marron con lineas",
    "price": 25,
    "brand": "FOREVER21",
    "category": "dresses",
    "image": "/product-images/custom-1774651159440.png",
    "id": "custom-1774651159440",
    "sizes": [
      "S"
    ],
    "colors": [
      "MARRON"
    ],
    "stock": 1
  },
  {
    "name": "Blusa fucsia con brillos",
    "price": 18,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1774651189590.png",
    "id": "custom-1774651189590",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Basic de rayas",
    "price": 15,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774651983856.png",
    "id": "custom-1774651983856"
  },
  {
    "name": "Bodysuit",
    "price": 20,
    "brand": "FOREVER21",
    "category": "casual",
    "image": "/product-images/custom-1774652024913.png",
    "id": "custom-1774652024913",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Set De Vestir Negro",
    "price": 25,
    "brand": "JOYSTAR",
    "category": "casual",
    "image": "/product-images/custom-1774668284021.png",
    "sizes": [
      "S"
    ],
    "stock": 1,
    "id": "custom-1774668284021"
  },
  {
    "name": "SETS ESTRELLA",
    "price": 30,
    "brand": "Star",
    "category": "casual",
    "image": "/product-images/custom-1774668736917.png",
    "stock": 1,
    "id": "custom-1774668736917",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Sets estilo pádel ",
    "price": 25,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774669619983.png",
    "stock": 2,
    "id": "custom-1774669619983"
  },
  {
    "name": "Basic moderna",
    "price": 15,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779752626477.png",
    "stock": 1,
    "id": "custom-1779752626477"
  },
  {
    "name": "Basic de rayas ",
    "price": 15,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779764949848.png",
    "id": "custom-1779764949848"
  },
  {
    "name": "Basic de corazón ",
    "price": 15,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779766958031.png",
    "id": "custom-1779766958031",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Basic de navidad",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767079132.png",
    "id": "custom-1779767079132"
  },
  {
    "name": "Manga larga de encaje ",
    "price": 18,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779767161505.png",
    "id": "custom-1779767161505",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Basic roja",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767218020.png",
    "id": "custom-1779767218020",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Chaleco de vestir Rosa",
    "price": 20,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779767245902.png",
    "id": "custom-1779767245902",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Blusa Sofía ",
    "price": 15,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779767288206.png",
    "id": "custom-1779767288206",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Franela Hellfire Club (stranger things)",
    "price": 12,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779767340353.png",
    "id": "custom-1779767340353"
  },
  {
    "name": "chaleco de punto con estampado de leopardo",
    "price": 15,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779767436580.png",
    "id": "custom-1779767436580",
    "sizes": [
      "S",
      "M"
    ],
    "colors": [
      "Beige",
      "negro"
    ],
    "stock": 2
  },
  {
    "name": "Sobre todo transparente con flores",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767464195.png",
    "id": "custom-1779767464195",
    "sizes": [
      "M"
    ]
  },
  {
    "name": "Blusa con manchas negras",
    "price": 20,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779827720493.png",
    "id": "custom-1779827720493"
  },
  {
    "name": "Basic celeste con rayas vino y negras",
    "price": 15,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779827783615.png",
    "id": "custom-1779827783615"
  },
  {
    "name": "Básica ",
    "price": 15,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779828895681.png",
    "id": "custom-1779828895681",
    "sizes": [
      "S"
    ],
    "colors": [
      "Rosada con blanco",
      "blanco con negro",
      "beige con blanco"
    ],
    "stock": 3
  },
  {
    "name": "Basic Oversize ",
    "price": 12,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829093586.png",
    "id": "custom-1779829093586"
  },
  {
    "name": "Basic",
    "price": 10,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1779829124513.png",
    "id": "custom-1779829124513",
    "sizes": [
      "S"
    ]
  },
  {
    "name": "Basic Oversize ",
    "price": 12,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829154690.png",
    "id": "custom-1779829154690"
  },
  {
    "name": "Basic Oversize ",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829173995.png",
    "id": "custom-1779829173995"
  },
  {
    "name": "Jeans ",
    "price": 40,
    "brand": "SE BUSCA",
    "category": "casual",
    "image": "/product-images/custom-1779829197029.png",
    "id": "custom-1779829197029",
    "colors": [
      "Talla 7"
    ]
  },
  {
    "name": "Blusas foreverch ",
    "price": 18,
    "brand": "FOREVER CH",
    "category": "casual",
    "image": "/product-images/custom-1786080846795.png",
    "colors": [
      "Blanco",
      "marrón"
    ],
    "id": "custom-1786080846795"
  },
  {
    "name": "Bodysuit ",
    "price": 20,
    "brand": "FOREVER CH",
    "category": "casual",
    "image": "/product-images/custom-1786080908731.png",
    "sizes": [
      "M",
      "L"
    ],
    "colors": [
      "Crema",
      "Negro"
    ],
    "id": "custom-1786080908731"
  },
  {
    "name": "Bodysuit",
    "price": 18,
    "brand": "",
    "category": "casual",
    "image": "/product-images/custom-1786080969984.png",
    "colors": [
      "Negro"
    ],
    "id": "custom-1786080969984"
  },
  {
    "name": "Bra con brillos ",
    "price": 12,
    "brand": "SHEIN",
    "category": "swimwear",
    "image": "/product-images/custom-1786081016994.jpg",
    "sizes": [
      "S"
    ],
    "id": "custom-1786081016994"
  },
  {
    "name": "Blusa de lazos ",
    "price": 18,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1786081067623.jpg",
    "sizes": [
      "M"
    ],
    "id": "custom-1786081067623"
  },
  {
    "name": "Trajes de baño red",
    "price": 10,
    "brand": "SHEIN",
    "category": "swimwear",
    "image": "/product-images/custom-1786081132670.jpg",
    "sizes": [
      "L"
    ],
    "colors": [
      "Rojo"
    ],
    "id": "custom-1786081132670"
  },
  {
    "name": "Traje de baño animal print pink",
    "price": 10,
    "brand": "SHEIN",
    "category": "swimwear",
    "image": "/product-images/custom-1786081183935.jpg",
    "id": "custom-1786081183935"
  },
  {
    "name": "Traje de baño enterizo",
    "price": 10,
    "brand": "SHEIN",
    "category": "swimwear",
    "image": "/product-images/custom-1786081220046.jpg",
    "sizes": [
      "S",
      "M"
    ],
    "id": "custom-1786081220046"
  },
  {
    "name": "Blusa con encaje ",
    "price": 18,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1786082680074.jpg",
    "sizes": [
      "M"
    ],
    "colors": [
      "Negro"
    ],
    "id": "custom-1786082680074"
  },
  {
    "name": "Blusa con botones ",
    "price": 18,
    "brand": "PRINCESS",
    "category": "casual",
    "image": "/product-images/custom-1786082847199.png",
    "colors": [
      "Celeste",
      "Marrón"
    ],
    "id": "custom-1786082847199",
    "images": [
      "/product-images/custom-1786082847199-0.jpg"
    ]
  },
  {
    "name": "Camisa de puntos",
    "price": 18,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1786082888857.jpg",
    "sizes": [
      "L"
    ],
    "id": "custom-1786082888857"
  },
  {
    "name": "Sweater university ",
    "price": 25,
    "brand": "FOREVER CH",
    "category": "casual",
    "image": "/product-images/custom-1786083112605.png",
    "sizes": [
      "L"
    ],
    "colors": [
      "Negro",
      "Gris"
    ],
    "id": "custom-1786083112605"
  },
  {
    "name": "Sweater Maru ",
    "price": 30,
    "brand": "FOREVER CH",
    "category": "casual",
    "image": "/product-images/custom-1786083232136.png",
    "colors": [
      "Crema",
      "Azul"
    ],
    "id": "custom-1786083232136"
  },
  {
    "name": "COMFYSETS",
    "price": 30,
    "brand": "ML",
    "category": "swimwear",
    "image": "/product-images/custom-1786084309601.jpg",
    "images": [
      "/product-images/custom-1786084309601-0.jpg",
      "/product-images/custom-1786084309601-1.jpg",
      "/product-images/custom-1786084309601-2.jpg"
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Negro",
      "Rosado",
      "Marrón"
    ],
    "id": "custom-1786084309601"
  },
  {
    "name": "SETS DENIM",
    "price": 30,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1786084499560.jpg",
    "sizes": [
      "S",
      "M"
    ],
    "id": "custom-1786084499560"
  }
];
