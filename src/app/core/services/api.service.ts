import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

// ─────────────────────────────────────────────
// Catálogo completo en español
// ─────────────────────────────────────────────
const CATALOG: Product[] = [
  // CAMISAS
  { id: 1, title: 'Camisa Slim Fit Blanca', price: 89900, description: 'Camisa de algodón premium corte slim fit, ideal para ocasiones formales e informales.', category: 'Camisas', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80', rating: { rate: 4.5, count: 210 } },
  { id: 2, title: 'Camisa Cuadros Flannel', price: 109900, description: 'Camisa de franela con estampado de cuadros, perfecta para looks casuales de temporada.', category: 'Camisas', image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&q=80', rating: { rate: 4.3, count: 175 } },
  { id: 3, title: 'Camisa Lino Manga Larga', price: 129900, description: 'Camisa de lino transpirable, ideal para clima cálido. Corte relajado y elegante.', category: 'Camisas', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80', rating: { rate: 4.6, count: 198 } },
  { id: 4, title: 'Camisa Oxford Azul Marino', price: 99900, description: 'Camisa Oxford clásica en azul marino, combinable con cualquier pantalón.', category: 'Camisas', image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&q=80', rating: { rate: 4.4, count: 143 } },
  { id: 5, title: 'Camisa Polo Clásica Negra', price: 79900, description: 'Polo de algodón peinado, cuello tejido y botones resistentes. Estilo atemporal.', category: 'Camisas', image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=400&q=80', rating: { rate: 4.2, count: 220 } },

  // CAMISETAS
  { id: 6, title: 'Camiseta Básica Gris', price: 49900, description: 'Camiseta de algodón suave en gris melange. Esencial en cualquier armario.', category: 'Camisetas', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', rating: { rate: 4.1, count: 310 } },
  { id: 7, title: 'Camiseta Estampada Vintage', price: 59900, description: 'Camiseta con estampado vintage de edición limitada, 100% algodón orgánico.', category: 'Camisetas', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80', rating: { rate: 4.4, count: 189 } },
  { id: 8, title: 'Camiseta Oversize Negra', price: 64900, description: 'Camiseta oversize de tendencia, tela gruesa y duradera. Unisex.', category: 'Camisetas', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80', rating: { rate: 4.5, count: 275 } },
  { id: 9, title: 'Camiseta Tie Dye Multicolor', price: 54900, description: 'Camiseta de teñido anudado, cada pieza es única. Algodón 100%.', category: 'Camisetas', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80', rating: { rate: 4.0, count: 155 } },
  { id: 10, title: 'Camiseta Deportiva Dry-Fit', price: 69900, description: 'Camiseta deportiva con tecnología de secado rápido. Ideal para entrenar.', category: 'Camisetas', image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80', rating: { rate: 4.6, count: 241 } },

  // PANTALONES
  { id: 11, title: 'Pantalón Jean Slim Azul', price: 149900, description: 'Jean de corte slim en denim clásico azul. Cómodo, duradero y versátil.', category: 'Pantalones', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', rating: { rate: 4.5, count: 332 } },
  { id: 12, title: 'Pantalón Chino Beige', price: 139900, description: 'Chino de corte recto en gabardina beige. Elegante y cómodo para el día a día.', category: 'Pantalones', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80', rating: { rate: 4.3, count: 214 } },
  { id: 13, title: 'Pantalón Deportivo Jogger', price: 119900, description: 'Jogger de algodón con elástico en tobillo. Perfecto para entrenar o relajarse.', category: 'Pantalones', image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80', rating: { rate: 4.4, count: 196 } },
  { id: 14, title: 'Pantalón de Lino Gris', price: 159900, description: 'Pantalón de lino ligero para clima cálido. Corte relajado y estilo mediterráneo.', category: 'Pantalones', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80', rating: { rate: 4.2, count: 167 } },
  { id: 15, title: 'Jean Baggy Negro', price: 169900, description: 'Jean de corte baggy en negro oscuro. La tendencia streetwear del momento.', category: 'Pantalones', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&q=80', rating: { rate: 4.6, count: 288 } },

  // PANTALONETAS
  { id: 16, title: 'Pantaloneta Deportiva Azul', price: 79900, description: 'Short deportivo con forro interior y bolsillos laterales. Ideal para correr o ir al gym.', category: 'Pantalonetas', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80', rating: { rate: 4.5, count: 203 } },
  { id: 17, title: 'Pantaloneta de Playa Tropical', price: 89900, description: 'Short de baño con estampado tropical, secado rápido y bolsillos con cierre.', category: 'Pantalonetas', image: 'https://images.unsplash.com/photo-1562183241-840b8af0721e?w=400&q=80', rating: { rate: 4.3, count: 178 } },
  { id: 18, title: 'Pantaloneta Casual Cargo', price: 99900, description: 'Short cargo con múltiples bolsillos, perfecta para actividades al aire libre.', category: 'Pantalonetas', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80', rating: { rate: 4.4, count: 156 } },
  { id: 19, title: 'Pantaloneta Running Compresión', price: 109900, description: 'Short de compresión para running con bolsillo trasero con cierre.', category: 'Pantalonetas', image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=400&q=80', rating: { rate: 4.7, count: 224 } },
  { id: 20, title: 'Pantaloneta Denim Corta', price: 84900, description: 'Short de jean con acabado desgastado, muy versátil para el verano.', category: 'Pantalonetas', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&q=80', rating: { rate: 4.1, count: 134 } },

  // ZAPATOS
  { id: 21, title: 'Zapatos Oxford Cuero Negro', price: 349900, description: 'Zapatos Oxford de cuero genuino, suela de goma antideslizante. Elegancia clásica.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80', rating: { rate: 4.7, count: 189 } },
  { id: 22, title: 'Tenis Casual Blanco', price: 229900, description: 'Tenis minimalista de cuero blanco con suela vulcanizada. Icono del estilo urbano.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80', rating: { rate: 4.8, count: 512 } },
  { id: 23, title: 'Botas de Trabajo Café', price: 399900, description: 'Botas de cuero resistente con punta reforzada. Ideales para trabajo y aventura.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&q=80', rating: { rate: 4.6, count: 223 } },
  { id: 24, title: 'Sandalias Deportivas', price: 179900, description: 'Sandalias con sistema de ajuste rápido, plantilla acolchada y suela antideslizante.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80', rating: { rate: 4.3, count: 165 } },
  { id: 25, title: 'Zapatillas Running Pro', price: 319900, description: 'Zapatillas para correr con amortiguación máxima y upper transpirable. Rendimiento elite.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', rating: { rate: 4.9, count: 437 } },
  { id: 26, title: 'Mocasines Cuero Café', price: 289900, description: 'Mocasines de cuero natural con plantilla de confort. Estilo sofisticado sin cordones.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&q=80', rating: { rate: 4.5, count: 198 } },

  // CHAQUETAS
  { id: 27, title: 'Chaqueta de Cuero Negra', price: 599900, description: 'Chaqueta de cuero genuino con forro interior. Diseño clásico y atemporal.', category: 'Chaquetas', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80', rating: { rate: 4.7, count: 267 } },
  { id: 28, title: 'Chaqueta Vaquera Azul', price: 249900, description: 'Chaqueta de denim con acabado stone-washed. Perfecta para looks casuales.', category: 'Chaquetas', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80', rating: { rate: 4.4, count: 212 } },
  { id: 29, title: 'Cortavientos Impermeable', price: 279900, description: 'Cortavientos ligero con membrana impermeable. Ideal para senderismo y deporte.', category: 'Chaquetas', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=400&q=80', rating: { rate: 4.6, count: 183 } },
  { id: 30, title: 'Chaqueta Bomber Verde', price: 329900, description: 'Bomber con forro satinado y bolsillos con cierre. Estilo streetwear moderno.', category: 'Chaquetas', image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&q=80', rating: { rate: 4.5, count: 194 } },

  // ACCESORIOS
  { id: 31, title: 'Cinturón de Cuero Negro', price: 89900, description: 'Cinturón de cuero genuino con hebilla metálica plateada. Talla ajustable.', category: 'Accesorios', image: 'https://images.unsplash.com/photo-1624222247344-550fb8ec55db?w=400&q=80', rating: { rate: 4.4, count: 145 } },
  { id: 32, title: 'Gorra Snapback Negra', price: 69900, description: 'Gorra snapback con panel frontal bordado y cierre ajustable en la parte trasera.', category: 'Accesorios', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80', rating: { rate: 4.2, count: 198 } },
  { id: 33, title: 'Mochila Urban 30L', price: 219900, description: 'Mochila resistente al agua con compartimento para laptop 15" y puerto USB.', category: 'Accesorios', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', rating: { rate: 4.6, count: 312 } },
  { id: 34, title: 'Billetera Slim Cuero', price: 119900, description: 'Billetera minimalista de cuero con ranuras para tarjetas y compartimento para billetes.', category: 'Accesorios', image: 'https://images.unsplash.com/photo-1627123424574-724758594785?w=400&q=80', rating: { rate: 4.5, count: 267 } },
  { id: 35, title: 'Reloj Analógico Clásico', price: 489900, description: 'Reloj de cuarzo con correa de cuero y esfera minimalista. Movimiento japonés.', category: 'Accesorios', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80', rating: { rate: 4.7, count: 389 } },

  // ROPA DEPORTIVA
  { id: 36, title: 'Buzo Hoodie Oversize Gris', price: 159900, description: 'Hoodie de algodón pesado con capucha y bolsillo canguro. Perfecto para el frío.', category: 'Ropa Deportiva', image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80', rating: { rate: 4.5, count: 423 } },
  { id: 37, title: 'Sudadera Deportiva Azul', price: 139900, description: 'Sudadera de algodón con tecnología anti-pilling. Diseño moderno con ribetes contrastantes.', category: 'Ropa Deportiva', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80', rating: { rate: 4.3, count: 234 } },
  { id: 38, title: 'Conjunto Deportivo Completo', price: 219900, description: 'Set de camiseta y pantaloneta a juego. Tela transpirable y de secado rápido.', category: 'Ropa Deportiva', image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&q=80', rating: { rate: 4.4, count: 187 } },
  { id: 39, title: 'Leggings Deportivos Premium', price: 129900, description: 'Leggings de compresión con cintura alta y bolsillo lateral. 4-way stretch.', category: 'Ropa Deportiva', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80', rating: { rate: 4.6, count: 298 } },
  { id: 40, title: 'Top Deportivo Sin Mangas', price: 89900, description: 'Top deportivo con espalda cruzada y tela de alto rendimiento. Ideal para yoga o gym.', category: 'Ropa Deportiva', image: 'https://images.unsplash.com/photo-1593769560753-c4d399ec6a37?w=400&q=80', rating: { rate: 4.5, count: 213 } },

  // ROPA FORMAL
  { id: 41, title: 'Traje Sastre Gris Antracita', price: 899900, description: 'Traje de dos piezas en mezcla de lana. Corte moderno con solapa angosta.', category: 'Ropa Formal', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80', rating: { rate: 4.8, count: 145 } },
  { id: 42, title: 'Corbata Seda Azul Rey', price: 129900, description: 'Corbata de seda pura en azul rey. Tejido jacquard con acabado brillante.', category: 'Ropa Formal', image: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=400&q=80', rating: { rate: 4.4, count: 98 } },
  { id: 43, title: 'Blazer Slim Negro', price: 549900, description: 'Blazer de corte slim en paño negro. Forro interior de seda y botones nacarados.', category: 'Ropa Formal', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&q=80', rating: { rate: 4.7, count: 178 } },
  { id: 44, title: 'Pantalón Vestir Beige', price: 199900, description: 'Pantalón de vestir en gabardina beige, corte recto clásico con pinzas.', category: 'Ropa Formal', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=400&q=80', rating: { rate: 4.5, count: 156 } },

  // CALZADO DEPORTIVO
  { id: 45, title: 'Tenis Basket High Top', price: 359900, description: 'Tenis de baloncesto con caña alta y sistema de amortiguación avanzado.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80', rating: { rate: 4.6, count: 312 } },
  { id: 46, title: 'Zapatillas Fútbol Sala', price: 289900, description: 'Zapatillas para fútbol sala con suela no marcadora y upper de malla.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&q=80', rating: { rate: 4.4, count: 198 } },
  { id: 47, title: 'Botines Chelsea Cuero', price: 419900, description: 'Botines estilo Chelsea en cuero pulido. Elásticos laterales y suela de cuero.', category: 'Zapatos', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&q=80', rating: { rate: 4.7, count: 224 } },

  // MÁS CAMISAS / PRENDAS EXTRA
  { id: 48, title: 'Camisa Hawaiana Verano', price: 99900, description: 'Camisa estampada de verano en viscosa ligera. Estilo resort y vacacional.', category: 'Camisas', image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ef65?w=400&q=80', rating: { rate: 4.2, count: 167 } },
  { id: 49, title: 'Chaleco Acolchado Azul', price: 229900, description: 'Chaleco sin mangas con relleno de plumón sintético. Ligero y abrigador.', category: 'Chaquetas', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80', rating: { rate: 4.5, count: 189 } },
  { id: 50, title: 'Bermuda Surf Board', price: 94900, description: 'Pantaloneta de surf con cordón ajustable y estampado de olas. Tela de nylon resistente.', category: 'Pantalonetas', image: 'https://images.unsplash.com/photo-1562183241-840b8af0721e?w=400&q=80', rating: { rate: 4.3, count: 142 } },
];

const CATEGORIES = ['Camisas', 'Camisetas', 'Pantalones', 'Pantalonetas', 'Zapatos', 'Chaquetas', 'Accesorios', 'Ropa Deportiva', 'Ropa Formal'];

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getProducts(limit: number = 20): Observable<Product[]> {
    const sliced = CATALOG.slice(0, limit);
    return of(sliced);
  }

  getProductById(id: number): Observable<Product> {
    const product = CATALOG.find(p => p.id === id) ?? CATALOG[0];
    return of(product);
  }

  getCategories(): Observable<string[]> {
    return of(CATEGORIES);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    if (category === 'all') return of(CATALOG);
    return of(CATALOG.filter(p => p.category === category));
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query || query.trim() === '') return of(CATALOG);
    const term = query.toLowerCase().trim();
    return of(CATALOG.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    ));
  }
}
