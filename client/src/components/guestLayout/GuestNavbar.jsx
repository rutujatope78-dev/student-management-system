import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const GuestNavbar = () => {
    return (
        <>
            <style>
                {`
                .navbarStyle {
                    transition: all 0.3s ease;
                }
                .brandStyle {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .textAnimationStyle {
                    font-size: 24px;
                    font-weight: bold;
                    margin-left: 25px;  
                    transition: transform 0.3s ease;
                }
                .textAnimationStyle:hover {
                    transform: scale(1.2);
                }
                .eventStyle {
                    padding-right: 20px;
                    font-size: 32px;
                    color: #ff5733;
                    padding: 0 5px;
                }
                .managementStyle {
                    color: #33c1ff;
                    padding: 0 5px;
                }
                .navItemStyle {
                    font-size: 20px;
                    padding: 15px;
                    transition: all 0.3s ease;
                }
                .navbar:hover {
                    background-color: #333;
                }
                .navbar .nav-item:hover {
                    color: #ffcc00;
                    transform: scale(1.1);
                }
                .zoomEffect {
                    transition: transform 0.3s ease;
                }
                .zoomEffect:hover {
                    transform: scale(1.8);
                }
                @media (max-width: 992px) {
                    .navbar-brand span {
                        font-size: 20px;
                    }
                    .navbar .nav-item {
                        font-size: 14px;
                    }
                }
                @media (max-width: 576px) {
                    .navbar-brand span {
                        font-size: 18px;
                    }
                    .navbar .nav-item {
                        font-size: 12px;
                    }
                }
                `}
            </style>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" className="custom-navbar navbarStyle">
                <Container>
                    <Navbar.Brand as={NavLink} to="/home" className="navbar-brand brandStyle">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN0u26nwGU0_ZWezTY-c4gSdc6YdE9oAHhcQ&s"
                            alt="Student Management System Logo"
                            className="zoomEffect"
                            style={{
                                width: '50px',
                                height: 'auto',
                                borderRadius: "60px"
                            }}
                        />
                        <span className='textAnimationStyle'>
                            <span className='eventStyle'>Student</span>
                            <span className='managementStyle'>Management</span>
                            <span className='managementStyle'>System</span>
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="Toggle navigation" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/home" className="nav-item navItemStyle" >Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/register" className="nav-item navItemStyle" >Register</Nav.Link>
                            <Nav.Link as={NavLink} to="/login" className="nav-item navItemStyle" >Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default GuestNavbar;