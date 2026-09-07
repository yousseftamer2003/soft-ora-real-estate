import { Link } from 'react-router-dom'
import arrow from '../assets/figma/arrow-up-white.svg'
import fb from '../assets/figma/social-fb.svg'
import ig from '../assets/figma/social-ig.svg'
import x from '../assets/figma/social-x.svg'
import li from '../assets/figma/social-in.svg'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>Need More Help?</h2>
        <Link to="/contact" className="btn-primary">
          Contact Us
          <img src={arrow} alt="" width={24} height={24} />
        </Link>
      </div>
      <div className="socials">
        <p>Find us at</p>
        <div className="socials__row">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src={fb} alt="Facebook" width={40} height={40} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src={ig} alt="Instagram" width={40} height={40} />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer">
            <img src={x} alt="X" width={40} height={40} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <img src={li} alt="LinkedIn" width={40} height={40} />
          </a>
        </div>
      </div>
    </footer>
  )
}
