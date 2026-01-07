
// Added React import to resolve 'Cannot find namespace React' error
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  image: string;
  results: {
    label: string;
    value: string;
    trend: 'up' | 'down';
  }[];
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}