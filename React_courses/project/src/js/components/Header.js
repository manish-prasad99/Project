import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/header.css';

export default function Header() {
    const [courses, setCourses] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Fetch the list of courses from the backend
        fetch('http://localhost:8080/api/course')
            .then(response => response.json())
            .then(data => {
                // Filter only active course
                setCourses(data);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mt-3">
            <Navbar.Brand href="/Home">MyLogo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/Home">
                        <Nav.Link className={`nav-link ${location.pathname === '/Home' ? 'active' : ''}`}>HOME</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/About">
                        <Nav.Link className={`nav-link ${location.pathname === '/About' ? 'active' : ''}`}>ABOUT</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/Contactus">
                        <Nav.Link className={`nav-link ${location.pathname === '/Contactus' ? 'active' : ''}`}>CONTACT</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/Placement">
                        <Nav.Link className={`nav-link ${location.pathname === '/Placement' ? 'active' : ''}`}>Placement</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/CampusLife">
                        <Nav.Link className={`nav-link ${location.pathname === '/CampusLife' ? 'active' : ''}`}>CampusLife</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/Faculty">
                        <Nav.Link className={`nav-link ${location.pathname === '/Faculty' ? 'active' : ''}`}>Faculty</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="Courses" id="basic-nav-dropdown">
                        {courses.map(course => (
                            <LinkContainer key={course.courseName} to={`/course/${course}`}>
                                <NavDropdown.Item>{course}</NavDropdown.Item>
                            </LinkContainer>
                        ))}
                    </NavDropdown>
                </Nav>
                <div className="nav-spacer"></div>
                <Nav className="ml-auto">
                    <LinkContainer to="/SignUp">
                        <Nav.Link className={`nav-link signup-signin-link1 ${location.pathname === '/SignUp' ? 'active' : ''}`}>SIGN UP</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/SignIn">
                        <Nav.Link className={`nav-link signup-signin-link ${location.pathname === '/SignIn' ? 'active' : ''}`}>SIGN IN</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
