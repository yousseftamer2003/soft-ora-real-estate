import img1 from '../assets/figma/property-1.jpg'
import img2 from '../assets/figma/property-2.jpg'
import imgH from '../assets/figma/property-h.jpg'
import hero from '../assets/figma/hero.jpg'

const blurb =
  'Spacious 2 Floors, 6 Bedroom, 6 Bathroom with City Views, Installment Plan available up to 12 years'

export const properties = [
  {
    id: 'p1',
    title: 'Mountain View Villa',
    price: 'EGP 4,500,000',
    location: 'New Cairo, Egypt',
    type: 'Villa',
    area: '440 m²',
    beds: 4,
    baths: 6,
    description: blurb,
    image: img1,
  },
  {
    id: 'p2',
    title: 'North Coast Residence',
    price: 'EGP 6,200,000',
    location: 'North Coast, Egypt',
    type: 'Apartment',
    area: '210 m²',
    beds: 3,
    baths: 3,
    description: blurb,
    image: img2,
  },
  {
    id: 'p3',
    title: 'Palm Hills Townhouse',
    price: 'EGP 8,900,000',
    location: '6th of October, Egypt',
    type: 'Townhouse',
    area: '320 m²',
    beds: 4,
    baths: 4,
    description: blurb,
    image: imgH,
  },
  {
    id: 'p4',
    title: 'Zayed Lakeside Home',
    price: 'EGP 5,150,000',
    location: 'Sheikh Zayed, Egypt',
    type: 'Villa',
    area: '380 m²',
    beds: 5,
    baths: 5,
    description: blurb,
    image: hero,
  },
  {
    id: 'p5',
    title: 'Smouha Garden Flat',
    price: 'EGP 3,250,000',
    location: 'Alexandria, Egypt',
    type: 'Apartment',
    area: '165 m²',
    beds: 3,
    baths: 2,
    description: blurb,
    image: img2,
  },
]

export const projects = [
  {
    id: 'j1',
    title: 'Mountain View Villa',
    price: 'From EGP 4,500,000 - EGP 12,200,000',
    location: 'New Cairo, Egypt',
    description: blurb,
    image: img2,
  },
  {
    id: 'j2',
    title: 'Marassi Red Sea',
    price: 'From EGP 8,000,000 - EGP 28,000,000',
    location: 'Red Sea, Egypt',
    description: blurb,
    image: hero,
  },
  {
    id: 'j3',
    title: 'SODIC Eastown',
    price: 'From EGP 3,800,000 - EGP 15,400,000',
    location: 'New Cairo, Egypt',
    description: blurb,
    image: img1,
  },
  {
    id: 'j4',
    title: 'Emaar Mivida',
    price: 'From EGP 5,200,000 - EGP 18,600,000',
    location: 'New Cairo, Egypt',
    description: blurb,
    image: imgH,
  },
]

export const featured = {
  label: 'Featured Property',
  title: 'Marassi Red Sea',
  subtitle: "More than a destination, it's a refined way of life.",
  detail: 'Luxury Villa and apartment starting at 18M and 12 years of installments',
  location: 'Red Sea, Egypt',
}

export const whyChoose = [
  {
    title: 'Strong Developer Network',
    text: 'We work directly with top developers in Egypt and Dubai to secure the best deals for our clients.',
    icon: 'network',
  },
  {
    title: 'Real Market Insights',
    text: 'We provide accurate, data-driven advisory to help you make confident decisions.',
    icon: 'insights',
  },
  {
    title: 'End-to-End Support',
    text: 'From choosing the right unit to closing the deal, we support you step-by-step.',
    icon: 'support',
  },
  {
    title: 'Investment-Focused Approach',
    text: 'We recommend strong, high-return investment opportunities tailored to your goals.',
    icon: 'invest',
  },
]

export const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Duplex', 'Studio']
export const developers = ['Palm Hills', 'SODIC', 'Mountain View', 'Emaar', 'Tatweer Misr']

export const amenities = [
  'Waterfall',
  'Internet',
  'Mountain',
  'Car Entrance',
  'Sea View',
  'Security',
  'Add. Lighting',
  "Children's Toys",
  'Balcony',
  'PlayStation',
]
