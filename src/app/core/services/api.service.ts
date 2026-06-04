import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  // Mappings from local Alpinestars Motorsport Shop Database
  private mapProduct(p: Product): Product {
    const alpinestarsDb: { [key: number]: Partial<Product> } = {
      1: {
        title: "Mochila Alpinestars Charger Pro",
        price: 199.95,
        category: "Accesorios",
        description: "Mochila aerodinámica semirrígida diseñada específicamente para motociclistas. Cuenta con un arnés ajustable Lite Tech, compartimento para protector de espalda Nucleon y capacidad expandible de 22 litros. Ideal para trayectos rápidos y viajes largos en carretera.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
      },
      2: {
        title: "Camiseta Alpinestars Ageless Logo",
        price: 34.95,
        category: "Ropa",
        description: "Camiseta de algodón premium con el logotipo clásico de Alpinestars estampado en el pecho. Ajuste moderno, tejido suave de 150g y costuras reforzadas en hombros para máxima durabilidad en el uso diario.",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800"
      },
      3: {
        title: "Chaqueta Alpinestars T-GP Plus R V3 Air",
        price: 399.95,
        category: "Protecciones",
        description: "Chaqueta textil deportiva ultra ventilada con paneles de malla en el torso y los brazos. Incorpora protectores Nucleon Flex Plus en hombros y codos (Nivel 1 CE), deslizadores de hombro GP Lite y compatibilidad total con el sistema de airbag Tech-Air 5.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
      },
      4: {
        title: "Pantalón Alpinestars Copper Out Riding",
        price: 189.95,
        category: "Ropa",
        description: "Pantalón vaquero de corte recto reforzado con paneles de fibra de aramida en rodillas y caderas para una excelente resistencia a la abrasión. Protectores de rodilla ajustables con certificación CE y triple costura de seguridad.",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"
      },
      5: {
        title: "Muñequera Alpinestars Speed Metal",
        price: 19.95,
        category: "Accesorios",
        description: "Muñequera elástica deportiva oficial Alpinestars. Absorbe el sudor de forma eficiente. Fabricada en algodón elástico suave con logotipo bordado de alta resolución. Ideal para deportes o conducción en circuito.",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800"
      },
      6: {
        title: "Gorra Alpinestars Red Premium Logo",
        price: 29.95,
        category: "Accesorios",
        description: "Gorra clásica ajustable con visera curva de alta calidad. Logotipo de la marca bordado en relieve 3D rojo y negro. Paneles traseros de malla para máxima transpirabilidad y comodidad total bajo el sol.",
        image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800"
      },
      7: {
        title: "Pastillas de Rodilla Alpinestars Titanium",
        price: 39.95,
        category: "Protecciones",
        description: "Pastillas de rodilla fabricadas en compuesto de poliuretano de alta resistencia e inserciones de titanio que producen chispas al contacto con el asfalto. Forma ergonómica y velcro de alto agarre para trajes de cuero de circuito.",
        image: "https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?w=800"
      },
      8: {
        title: "Tapones de Válvula Alpinestars Red",
        price: 9.95,
        category: "Accesorios",
        description: "Tapones de válvula de neumático mecanizados en aluminio anodizado rojo y negro de alta calidad. Logotipo grabado con láser y junta tórica de goma interna para prevenir fugas de aire en conducción extrema.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"
      },
      9: {
        title: "Sistema de Airbag Alpinestars Tech-Air 5",
        price: 849.95,
        category: "Protecciones",
        description: "El sistema de airbag electrónico autónomo más avanzado del mundo. Ofrece una protección inigualable para la parte superior del cuerpo cubriendo hombros, pecho, costillas y espalda completa. Detección de colisión ultra rápida mediante sensores integrados.",
        image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800"
      },
      10: {
        title: "Protector de Espalda Alpinestars Nucleon",
        price: 89.95,
        category: "Protecciones",
        description: "Protector de espalda extremadamente ligero y flexible con estructura de celda ergonómica que absorbe los impactos y maximiza el flujo de aire. Nivel 1 de homologación CE y cinturón lumbar ajustable para máxima estabilidad.",
        image: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=800"
      },
      11: {
        title: "Protectores de Pecho Alpinestars Bio Armor",
        price: 69.95,
        category: "Protecciones",
        description: "Protectores de pecho ergonómicos de doble densidad diseñados para insertarse en chaquetas compatibles Alpinestars. Proporcionan absorción de impactos certificada sin comprometer la comodidad ni la ventilación del piloto.",
        image: "https://images.unsplash.com/photo-1513224502586-d1e602410265?w=800"
      },
      12: {
        title: "Airbag de Competición Alpinestars Tech-Air 10",
        price: 1099.95,
        category: "Protecciones",
        description: "Chaleco airbag de competición de última generación desarrollado directamente en MotoGP. Ofrece una cobertura extendida sin precedentes en caderas, espalda, pecho y hombros. Algoritmo de choque inteligente e interactivo mediante Bluetooth.",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800"
      },
      13: {
        title: "Casco Alpinestars Supertech S-M10 Carbon",
        price: 649.95,
        category: "Equipamiento",
        description: "Casco de motocross de gama alta fabricado en fibra de carbono multi-compuesto de densidad múltiple. Cuenta con el sistema A-Head ajustable patentado, sistema de liberación rápida de visera de seguridad y ventilación extrema de 28 puertos.",
        image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800"
      },
      14: {
        title: "Mono de Cuero Alpinestars GP Tech V4",
        price: 1499.95,
        category: "Equipamiento",
        description: "Traje de piel de canguro y vaca de competición profesional. Incorpora elasticidad de Kevlar y paneles elásticos en acordeón. Diseñado específicamente para albergar el sistema de airbag Tech-Air 10 y ofrecer el máximo nivel de seguridad en pista.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800"
      },
      15: {
        title: "Chaqueta Stella Alpinestars T-GP Plus R",
        price: 399.95,
        category: "Protecciones",
        description: "Chaqueta deportiva adaptada anatómicamente a la figura femenina. Confeccionada en poliéster altamente resistente con inserciones elásticas. Cuenta con forro térmico extraíble y protecciones Nucleon Flex Plus perfiladas.",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800"
      },
      16: {
        title: "Chaleco Stella Alpinestars Denali Riding",
        price: 139.95,
        category: "Ropa",
        description: "Chaleco térmico acolchado diseñado específicamente para conducción en climas fríos. Construcción cortavientos con paneles elásticos en los costados para permitir una total libertad de movimiento en la moto.",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800"
      },
      17: {
        title: "Chaqueta Impermeable Stella Hurricane",
        price: 89.95,
        category: "Ropa",
        description: "Chaqueta impermeable ligera de alta visibilidad en color negro y detalles de alta reflectancia. Ajustable en brazos y cintura, incluye bolsa de transporte compacta para guardarla bajo el asiento.",
        image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800"
      },
      18: {
        title: "Sudadera Alpinestars Chrome Sport",
        price: 199.95,
        category: "Ropa",
        description: "Sudadera de estilo urbano reforzada interiormente con fibra de aramida en hombros, codos y espalda. Protectores Nucleon Flex Plus extraíbles para un look casual en el día a día sin sacrificar la seguridad vial.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
      },
      19: {
        title: "Guantes Alpinestars GP Pro R3 Racing",
        price: 259.95,
        category: "Equipamiento",
        description: "Guantes de carreras premium de caña larga fabricados en cuero vacuno, cabra y canguro. Cuenta con protectores rígidos Dynamic Friction Shield (DFS) en los nudillos con ventilación avanzada y puente de dedo patentado.",
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800"
      },
      20: {
        title: "Botas Alpinestars Faster-3 Ride Shoes",
        price: 169.95,
        category: "Equipamiento",
        description: "Zapatos de conducción deportiva muy ligeros y confortables. Confeccionados en microfibra resistente a la abrasión con inserciones protectoras de tobillo TPR en 3D, forro de malla transpirable y suela de alta tracción.",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800"
      }
    };

    const override = alpinestarsDb[p.id];
    if (override) {
      return {
        ...p,
        title: override.title || p.title,
        price: Math.round((override.price ?? p.price) * 4000),
        category: override.category || p.category,
        description: override.description || p.description,
        image: override.image || p.image,
        rating: {
          rate: Number((4.2 + (p.id % 9) * 0.1).toFixed(1)),
          count: p.rating.count + 50
        }
      };
    }
    return {
      ...p,
      price: Math.round(p.price * 4000)
    };
  }

  private mapCategoryToFakeStore(category: string): string {
    switch (category) {
      case 'Protecciones': return 'electronics';
      case 'Accesorios': return 'jewelery';
      case 'Ropa': return "men's clothing";
      case 'Equipamiento': return "women's clothing";
      default: return category;
    }
  }

  /**
   * Fetches initial list of products (default limit is 20)
   */
  getProducts(limit: number = 20): Observable<Product[]> {
    return this.http.get<Product[]>(`/products?limit=${limit}`).pipe(
      map(products => products.map(p => this.mapProduct(p)))
    );
  }

  /**
   * Fetches a single product details by ID
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`).pipe(
      map(p => this.mapProduct(p))
    );
  }

  /**
   * Fetches all categories mapped to Alpinestars categories
   */
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('/products/categories').pipe(
      map(() => ['Accesorios', 'Ropa', 'Protecciones', 'Equipamiento'])
    );
  }

  /**
   * Fetches products in a specific category
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    const fakeCat = this.mapCategoryToFakeStore(category);
    return this.http.get<Product[]>(`/products/category/${encodeURIComponent(fakeCat)}`).pipe(
      map(products => products.map(p => this.mapProduct(p)))
    );
  }

  /**
   * Searches products by matching title or description locally
   */
  searchProducts(query: string): Observable<Product[]> {
    return this.getProducts(100).pipe(
      map(products => {
        if (!query || query.trim() === '') {
          return products;
        }
        const term = query.toLowerCase().trim();
        return products.filter(p => 
          p.title.toLowerCase().includes(term) || 
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
        );
      })
    );
  }
}
