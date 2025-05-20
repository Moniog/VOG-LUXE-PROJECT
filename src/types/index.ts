export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CategoryProduct extends Product {
  brand?: string;
  colors?: string[];
  sizes?: string[];
}

export interface CategoryItem {
  name: string;
  priceRange: string;
}

export interface CategorySection {
  name: string;
  items: CategoryItem[];
}

export interface Subcategory {
  name: string;
  sections: CategorySection[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  itemCount: number;
  subcategories: Subcategory[];
  products: CategoryProduct[];
}