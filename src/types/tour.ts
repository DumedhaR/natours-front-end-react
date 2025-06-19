export interface Tour {
    _id: string;
    name: string;
    slug?: string;
    duration: number;
    maxGroupSize: number;
    difficulty: 'easy' | 'medium' | 'difficult';
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    priceDiscount?: number;
    summary: string;
    description?: string;
    imageCover: string;
    images?: string[];
    startDates: string[];
    startLocation: {
      type: 'Point';
      coordinates: number[];
      address?: string;
      description?: string;
    };
    locations: {
      type: 'Point';
      coordinates: number[];
      address?: string;
      description?: string;
      day?: number;
    }[];
    guides?: {
      _id: string;
      name: string;
      email: string;
      photo?: string;
    }[];
  }
  