export interface CreateCategory {
  name: string;
  filters: CategoryFilter[];
}

export interface UpdateCategory extends Category {}

export interface CreateCategoryFilter {
  id: number;
}

export interface Category extends CreateCategory {
  id: number;
}

export interface CategoryFilter {
  key: string;
  value: string;
}

export interface categoryId {
  id: string;
}
