import type { Review } from "./review";
import type { User } from "./user";

export interface Tour {
    _id: string;
    name: string;
    slug: string;
    duration: number;
    maxGroupSize: number;
    difficulty: 'easy' | 'medium' | 'difficult';
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    priceDiscount?: number;
    summary?: string;
    description: string;
    imageCover: string;
    images: string[];
    createdAt: string;
    startDates: string[];
    startLocation: {
      type: 'Point';
      coordinates: [number, number];
      address: string;
      description: string;
    };
    locations: {
      type: 'Point';
      coordinates: [number, number];
      address: string;
      description: string;
      day: number;
    }[];
    guides: User[];
    reviews?: Review[];
  }
  