export type Category = 'swimwear' | 'casual' | 'dresses' | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
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
  }
];
