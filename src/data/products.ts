export type Category = 'swimwear' | 'casual' | 'dresses' | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  category: Category;
  sizes?: string[];   // Tallas disponibles, ej: ['S', 'M', 'L', 'XL']
  stock?: number;     // Unidades disponibles en total
}

export const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'Todos los Productos',
  swimwear: 'Trajes de Baño',
  casual: 'Ropa Casual',
  dresses: 'Vestidos',
  accessories: 'Accesorios',
};

export const DISCOUNTS: Record<string, string> = {
  '1': '-20% OFF', '2': '-22% OFF', '3': '-33% OFF',
  '4': '-15% OFF', '5': '-40% OFF', '6': '-10% OFF',
  '7': '-25% OFF', '8': '-18% OFF', '9': '-30% OFF',
  '10': '-12% OFF', '11': '-20% OFF', '12': '-35% OFF',
  '13': '-15% OFF', '14': '-28% OFF', '15': '-50% OFF',
  '16': '-22% OFF', '17': '-10% OFF', '18': '-20% OFF',
};

export const products: Product[] = [
  {
    "name": "Sueter Color Mostaza",
    "price": 25,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774650270022.png",
    "id": "custom-1774650270022"
  },
  {
    "name": "Camisa Beige botones dorados",
    "price": 20,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774650538480.png",
    "id": "custom-1774650538480"
  },
  {
    "name": "Vestido marron con lineas",
    "price": 50,
    "brand": "SHEIN",
    "category": "dresses",
    "image": "/product-images/custom-1774651159440.png",
    "id": "custom-1774651159440"
  },
  {
    "name": "Blusa rosa con brillos",
    "price": 35,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774651189590.png",
    "id": "custom-1774651189590"
  },
  {
    "name": "Blusa gris y blanca",
    "price": 40,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774651983856.png",
    "id": "custom-1774651983856"
  },
  {
    "name": "Body morado",
    "price": 45,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774652024913.png",
    "id": "custom-1774652024913"
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
    "name": "Set de Estrella Azul",
    "price": 40,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774668736917.png",
    "stock": 1,
    "id": "custom-1774668736917"
  },
  {
    "name": "Set casual negro",
    "price": 25,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1774669619983.png",
    "stock": 2,
    "id": "custom-1774669619983"
  },
  {
    "name": "Franela con corset de jean",
    "price": 30,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779752626477.png",
    "stock": 1,
    "id": "custom-1779752626477"
  },
  {
    "name": "Franela fucsia con brillo",
    "price": 25,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779752674505.png",
    "stock": 1,
    "id": "custom-1779752674505"
  },
  {
    "name": "Blusa de rayas gris y turquesa",
    "price": 25,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779764949848.png",
    "id": "custom-1779764949848"
  },
  {
    "name": "Franela Corazon",
    "price": 20,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779766958031.png",
    "id": "custom-1779766958031"
  },
  {
    "name": "Blusa roja de reno",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767079132.png",
    "id": "custom-1779767079132"
  },
  {
    "name": "Frenala manga larga gris",
    "price": 25,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767161505.png",
    "id": "custom-1779767161505"
  },
  {
    "name": "Blusa Rosada",
    "price": 20,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767218020.png",
    "id": "custom-1779767218020"
  },
  {
    "name": "Chaleco de vestir Rosa",
    "price": 25,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767245902.png",
    "id": "custom-1779767245902"
  },
  {
    "name": "Blusa blanca",
    "price": 20,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767288206.png",
    "id": "custom-1779767288206"
  },
  {
    "name": "Franela Hell boy",
    "price": 20,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767340353.png",
    "id": "custom-1779767340353"
  },
  {
    "name": "Franela animal print",
    "price": 15,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767436580.png",
    "id": "custom-1779767436580"
  },
  {
    "name": "Blusa transparente con flores",
    "price": 15,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779767464195.png",
    "id": "custom-1779767464195"
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
    "name": "Franela celeste con rayas vino y negras",
    "price": 20,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779827783615.png",
    "id": "custom-1779827783615"
  },
  {
    "name": "Franela rosa de rallas blancas",
    "price": 15,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779828895681.png",
    "id": "custom-1779828895681"
  },
  {
    "name": "Franela blanca de rallas grises",
    "price": 15,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779828923051.png",
    "id": "custom-1779828923051"
  },
  {
    "name": "Chaleco beige de rayas blancas",
    "price": 20,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829046201.png",
    "id": "custom-1779829046201"
  },
  {
    "name": "Franela basica vibrando bonito",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829093586.png",
    "id": "custom-1779829093586"
  },
  {
    "name": "Franela basica Vitamina",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829124513.png",
    "id": "custom-1779829124513"
  },
  {
    "name": "Franela basica life is better",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829154690.png",
    "id": "custom-1779829154690"
  },
  {
    "name": "Franela basica bichota",
    "price": 10,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829173995.png",
    "id": "custom-1779829173995"
  },
  {
    "name": "Jean con flores",
    "price": 40,
    "brand": "SHEIN",
    "category": "casual",
    "image": "/product-images/custom-1779829197029.png",
    "id": "custom-1779829197029"
  }
];
