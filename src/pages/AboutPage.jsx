import { Link } from 'react-router-dom'
import hero from '../assets/figma/hero.jpg'
import villa from '../assets/figma/property-1.jpg'
import arrow from '../assets/figma/arrow-up-white.svg'

const expertise = [
  {
    title: 'North Coast Partnerships',
    text: 'Marketing and selling units from top North Coast developers.',
  },
  {
    title: 'Dubai Project Expertise',
    text: 'Launching and marketing major projects with leading Dubai developers.',
  },
  {
    title: 'Deal Execution',
    text: 'Executing contracts and delivering strong investment results.',
  },
  {
    title: 'Market Advisory',
    text: 'Providing accurate guidance based on real-time market analysis.',
  },
]

const services = [
  'Buying & Selling',
  'Long-term Rentals',
  'Furnished Rentals',
  'Property Management',
  'Real Estate Marketing',
  'Property Valuation',
  'Investment Opportunity Recommendations',
]

export default function AboutPage() {
  return (
    <>
      <div className="wrap section">
        <img className="about-hero-img" src={hero} alt="" width={1280} height={320} />
        <div className="about-split">
          <div>
            <h2>About Us — Soft-Ora</h2>
            <p className="kicker">Your Trusted Partner in Real Estate Excellence</p>
            <p>
              Soft-Ora is a software house building a ready-to-brand real estate website for
              agencies. This live demo shows how an agency site looks and feels. Later, each
              buyer replaces the Soft-Ora name, logo, and sample listings with their own
              identity and data. The platform is designed for professional sales, rentals,
              property management, and marketing — with clear guidance and no extra
              complexity.
            </p>
          </div>
          <img className="about-photo" src={villa} alt="" width={418} height={522} />
        </div>
      </div>

      <div className="wrap expertise">
        <h2>Our Expertise & Achievements</h2>
        <p className="kicker">Your Trusted Partner in Real Estate Excellence</p>
        <div className="expertise-grid">
          {expertise.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap services-split">
        <img className="about-photo" src={hero} alt="" width={481} height={588} />
        <div>
          <h2>Our Services</h2>
          <p>We provide a full spectrum of real estate services, including:</p>
          <ul className="checks">
            {services.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p>
            We offer a wide range of units across all budgets, including apartments, villas,
            shops, administrative units, commercial properties, and investment opportunities.
          </p>
        </div>
      </div>

      <div className="promise">
        <h2>Our Promise</h2>
        <p>
          At Soft-Ora, our goal is that every agency — and every end client — understands each
          step and finds the unit that matches their needs, whether for living or investment,
          with a high standard of service.
        </p>
        <Link to="/contact" className="btn-accent lg">
          Get in touch
          <img src={arrow} alt="" width={24} height={24} />
        </Link>
      </div>
    </>
  )
}
