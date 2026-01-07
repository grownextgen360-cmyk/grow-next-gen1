
import React from 'react';
import { 
  BarChart3, 
  Target, 
  Video, 
  MousePointerClick, 
  Layers, 
  TrendingUp, 
  LineChart, 
  CheckCircle2,
  Zap,
  Globe,
  PieChart,
  ShieldCheck,
  Rocket,
  MessageSquare
} from 'lucide-react';
import { Service, PortfolioItem, Testimonial, PricingPlan } from './types';

export const SERVICES: Service[] = [
  {
    id: 'performance',
    title: 'Performance Marketing',
    description: 'Data-driven campaigns across Meta and Google ecosystems to drive immediate ROI.',
    icon: <Target className="w-8 h-8 text-[#ccff00]" />,
    tags: ['Facebook Ads', 'Google Ads', 'Lead Gen']
  },
  {
    id: 'content',
    title: 'Content & Creative Strategy',
    description: 'High-converting reels, video ads, and copy that stops the scroll.',
    icon: <Video className="w-8 h-8 text-[#ccff00]" />,
    tags: ['Reels', 'Video Ads', 'Copywriting']
  },
  {
    id: 'social',
    title: 'Social Media Management',
    description: 'Strategic planning and engagement growth for high-end lifestyle brands.',
    icon: <Globe className="w-8 h-8 text-[#ccff00]" />,
    tags: ['Planning', 'Posting', 'Engagement']
  },
  {
    id: 'funnels',
    title: 'Funnels & Websites',
    description: 'Optimized landing pages and sales funnels designed for maximum conversion.',
    icon: <Layers className="w-8 h-8 text-[#ccff00]" />,
    tags: ['Landing Pages', 'Sales Funnels', 'CRO']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Growth',
    description: 'Scale your Shopify store with precision ROAS optimization and scaling tactics.',
    icon: <TrendingUp className="w-8 h-8 text-[#ccff00]" />,
    tags: ['Shopify', 'Product Scaling', 'ROAS']
  },
  {
    id: 'analytics',
    title: 'Analytics & Tracking',
    description: 'Advanced pixel setup and custom performance reporting to see every dollar.',
    icon: <BarChart3 className="w-8 h-8 text-[#ccff00]" />,
    tags: ['Pixel', 'Tracking', 'Reports']
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Data-Driven Strategy',
    description: 'We don\'t guess. Every decision is backed by deep market research and historical performance data.',
    icon: <PieChart className="w-6 h-6" />
  },
  {
    title: 'ROI Focused Campaigns',
    description: 'Our primary metric is your profit. We optimize for high-quality leads and actual sales, not just clicks.',
    icon: <MousePointerClick className="w-6 h-6" />
  },
  {
    title: 'Creative + Performance Balance',
    description: 'Beautiful aesthetics meet aggressive direct response techniques for the perfect brand mix.',
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: 'Transparent Reporting',
    description: 'Real-time dashboards and weekly deep-dives so you always know exactly where your budget goes.',
    icon: <LineChart className="w-6 h-6" />
  },
  {
    title: 'Scalable Growth Systems',
    description: 'We build infrastructures that don\'t break when you double your ad spend.',
    icon: <Rocket className="w-6 h-6" />
  },
  {
    title: 'Long-Term Mindset',
    description: 'We treat your business like our own, focusing on sustainable scale and brand longevity.',
    icon: <ShieldCheck className="w-6 h-6" />
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Beauty Brand Scaling',
    client: 'Lumina Skincare',
    category: 'E-commerce Growth',
    image: 'https://picsum.photos/seed/skincare/800/600',
    results: [
      { label: 'ROAS', value: '6.4x', trend: 'up' },
      { label: 'Revenue Increase', value: '240%', trend: 'up' }
    ]
  },
  {
    id: '2',
    title: 'Fintech Lead Generation',
    client: 'NovaPay',
    category: 'Performance Marketing',
    image: 'https://picsum.photos/seed/fintech/800/600',
    results: [
      { label: 'CPA Reduction', value: '45%', trend: 'down' },
      { label: 'Monthly Leads', value: '1,200+', trend: 'up' }
    ]
  },
  {
    id: '3',
    title: 'SaaS Launch Strategy',
    client: 'CloudFlow',
    category: 'Funnels & Strategy',
    image: 'https://picsum.photos/seed/saas/800/600',
    results: [
      { label: 'Conversion Rate', value: '18%', trend: 'up' },
      { label: 'User Growth', value: '3x', trend: 'up' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Marketing Director',
    company: 'Urban Threads',
    content: 'Grow Next Gen transformed our ad strategy. Within 3 months, our ROAS jumped from 2.5x to 5.2x consistently. They are true growth partners.',
    rating: 5,
    image: 'https://picsum.photos/seed/woman1/100/100'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Founder',
    company: 'Peak Performance',
    content: 'Their data-driven approach is refreshing. No fluff, just results. The creative production quality is unmatched in this price range.',
    rating: 5,
    image: 'https://picsum.photos/seed/man1/100/100'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$2,500',
    description: 'Ideal for startups looking to find product-market fit and start scaling.',
    features: [
      'Single Channel Management',
      'Basic Creative Production',
      'Weekly Reporting',
      'Standard Pixel Setup',
      'Support via Email'
    ]
  },
  {
    name: 'Growth',
    price: '$5,000',
    description: 'Perfect for established brands ready to dominate multiple channels.',
    features: [
      'Multi-Channel Management',
      'Full Creative Production (Reels/Videos)',
      'Sales Funnel Optimization',
      'Real-time Performance Dashboard',
      'Monthly Strategy Deep-Dive',
      'Priority Support'
    ],
    recommended: true
  },
  {
    name: 'Scale',
    price: 'Custom',
    description: 'Aggressive scaling for market leaders with high budgets.',
    features: [
      'Omni-channel Strategy',
      'Dedicated Content Team',
      'Advanced BI Integration',
      'International Expansion Scaling',
      '24/7 Priority Concierge',
      'Custom CRM Automations'
    ]
  }
];
