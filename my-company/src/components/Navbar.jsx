import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav style={{ backgroundColor: 'gray', }}>
        <ul style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', listStyle: 'none'}}>
            <li style={{ textDecoration: 'none'}}><Link style={{ color: 'white'}} to ="/">Home</Link></li>
            <li><Link style={{ color: 'white'}} to ="/about">About</Link></li>
            <li><Link style={{ color: 'white'}} to ="/services">Services</Link></li>
            <li><Link style={{ color: 'white'}} to ="/contact">Contact</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
