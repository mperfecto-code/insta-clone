import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { API_ENPOINT } from '../Api';
import '../stylesheets/Login.css';  

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                jwtDecode(token);
                navigate('/dashboard');  
            } catch {
                console.error("Error decoding token", error);
                localStorage.removeItem('token');
                navigate("/login"); 
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please enter username and password');
            return;
        }
        try {
            const response = await axios.post(`${API_ENPOINT}/auth/login`, { username, password });

            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                setError('');  // Clear error message
                navigate('/dashboard');  // Redirect on success
            } else {
                throw new Error("Token not found");
            }
        } catch (err) {
            setError('Invalid username or password');  
            console.error("Login error:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }

    return (
        <Container className="login-container">
            <Row className="justify-content-center">
                <div className="login-content">
                    {/* Instagram Logo */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/120px-Instagram_logo_2022.svg.png" 
                        alt="Instagram Logo" 
                        className="logo" 
                        width="150" 
                    />
                    
                    {/* Instagram Login Form */}
                    <Col md={4} className="login-form" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        {/* Error message */}
                        {error && <div className="alert alert-danger" style={{ backgroundColor: '#ff4d4d', color: 'white', textAlign: 'center' }}>{error}</div>}

                        <Form onSubmit={handleSubmit} className="login-form_1">
                            {/* Username input */}
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Control 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className="custom-input"
                                    style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd', backgroundColor: '#fafafa' }}
                                    placeholder="Phone, email, or username" 
                                />
                            </Form.Group>

                            {/* Password input */}
                            <Form.Group controlId="password" className="mb-3">
                                <Form.Control 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="custom-input"
                                    style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd', backgroundColor: '#fafafa' }}
                                    placeholder="Password" 
                                />
                            </Form.Group>

                            {/* Login button */}
                            <Button 
                                variant="primary" 
                                type="submit" 
                                style={{ 
                                    backgroundColor: '#0095F6', 
                                    color: 'white', 
                                    padding: '12px', 
                                    width: '100%', 
                                    borderRadius: '5px',
                                    border: 'none',
                                    fontSize: '16px'
                                }}
                            >
                                Log In
                            </Button>

                            {/* Forgot password */}
                            <p className="forgot-password" style={{ textAlign: 'center', marginTop: '10px', color: '#0095F6', fontSize: '14px' }}>Forgot password?</p>

                            <div style={{ marginTop: '15px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                                {/* Create new account */}
                                <p style={{ textAlign: 'center', fontSize: '14px' }}>
                                    Don't have an account? 
                                    <Button 
                                        variant="link" 
                                        style={{ color: '#0095F6', textDecoration: 'none' }}
                                    >
                                        Sign up
                                    </Button>
                                </p>
                            </div>
                        </Form>
                    </Col>

                </div>
            </Row>
        </Container>
    );
}

export default Login;
