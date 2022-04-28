import { Subcategory } from "./Subcategory.model";

export interface Category {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    slug?: string;
    companies?: any;
    subcategories?: Subcategory[];
    favorite?: boolean;
}