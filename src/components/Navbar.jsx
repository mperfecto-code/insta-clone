import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaHeart, FaPaperPlane, FaUserAlt } from 'react-icons/fa'; 
import '../stylesheets/Navbar.css';

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Navbar expand="lg" variant="dark" sticky="top" className="navbar" style={{ backgroundColor: '#fff', borderBottom: '1px solid #dbdbdb', paddingLeft: '10px', paddingRight: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between' }}>
            {/* Logo */}
            <Navbar.Brand as={Link} to="/dashboard" className="navbar-brand-left" style={{ fontSize: '30px', fontWeight: 'bold', color: '#000' }}>
                <img src="https://www.pngplay.com/wp-content/uploads/5/Instagram-Logo-PNG-Image-PNG.png" alt="Logo" style={{ width: '50px' }} />
            </Navbar.Brand>

            {/* Search Bar */}
            <Nav className="navbar-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: '30px', padding: '8px 15px', width: '300px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                    <FaSearch style={{ color: '#999', fontSize: '18px', marginRight: '10px' }} />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="navbar-search" 
                        style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', backgroundColor: 'transparent', width: '100%' }} 
                    />
                </div>
            </Nav>

            {/* Icons */}
            <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Nav.Link as={Link} to="/dashboard" className="navbar-icon">
                    <FaHome style={{ fontSize: '24px', color: '#333' }} />
                </Nav.Link>

                <Nav.Link as={Link} to="/explore" className="navbar-icon">
                    <FaSearch style={{ fontSize: '24px', color: '#333' }} />
                </Nav.Link>

                <Nav.Link as={Link} to="/activity" className="navbar-icon">
                    <FaHeart style={{ fontSize: '24px', color: '#333' }} />
                </Nav.Link>

                <Nav.Link as={Link} to="/messages" className="navbar-icon">
                    <FaPaperPlane style={{ fontSize: '24px', color: '#333' }} />
                </Nav.Link>

                <NavDropdown title={<FaUserAlt style={{ fontSize: '24px', color: '#333' }} />} id="basic-nav-dropdown" align="end">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </div>
        </Navbar>
    );
}

export default NavBar;
