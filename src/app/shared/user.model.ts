import { Activity } from "./activity.model";
import { Cart } from "./Cart.model";
import { Covoiturage } from "./Communauty.model";
import { Review } from "./Review.model";
import { UserPreference } from "./UserPreference.model";

export interface User {
    id?: number;
    token?: string;
    gaeaUserId?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    country?: string;
    region?: string;
    city?: string;
    street?: string;
    streetnumber?: string;
    postcode?: string;
    dateBirth?: Date;
    emailValidated?: boolean;
    activated?: boolean;
    role?: string;
    created_at?: string;
    discr?: string;
    inscriptiondate?: Date;
    activities?: Activity[];
    carts?: Cart[];
    reviews?: Review[];
    covoiturages?: Covoiturage[];
    userPreferences?: UserPreference[];
    url?:string
}