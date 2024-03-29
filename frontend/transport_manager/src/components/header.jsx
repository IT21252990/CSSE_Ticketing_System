import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './header.css';

const navLinks = [
 {
    path: '/home',
    display: 'Home'
 },
 {
    path: '/busTimetable',
    display: 'Timetables'
 },
 {
  path: '/price',
  display: 'Price'
},
 {
    path: '/login', 
    display: 'Logout' 
 }
];

const Header = () => {
 return (
    <header className="header" style={{ height: '80px' }}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={8}>
            <div className='appname'>
              <h2>WayFare Ticketing System</h2>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <nav className='navigation'>
              <ul className="menu">
                {navLinks.map((item, index) => (
                 <li className='nav__item' key={index}>
                    <NavLink to={item.path} className={`nav-link ${item.display === 'Logout' ? 'logout-btn' : ''}`} activeClassName="active">{item.display}</NavLink>
                 </li>
                ))}
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </header>
 );
}

export default Header;
