import { useState } from "react";
import { Container, Nav, Navbar, Row, Button } from 'react-bootstrap';
import { Dashboard } from './pages/Dashboard'
import { Statistics } from './pages/Statistics'
import './App.css';

export function App() {

  const [page, setPage] = useState('/Dashboard');

  const switcher = (page: any) => {
    switch (page) {
      case 'home':
        return (<Dashboard />)
      case 'statistics':
        return (<Statistics />)
      default:
        return (<Dashboard />)
    }
  }

  return (
    <Container>
      <div className="App">
        <Navbar bg="light" expand="xxl" collapseOnSelect={true}>
          <Container>
            <Navbar.Brand href='#home' onClick={() => { switcher('home'); setPage('home') }}>myJobs</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="container-fluid">
                <Nav.Item>
                  <Nav.Link href='#home' onClick={() => { switcher('home'); setPage('home') }}>Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='#statistics' onClick={() => { switcher('statistics'); setPage('statistics') }}>Statistics</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-auto">
                  <Nav.Link href="#settings" onClick={() => { switcher('settings'); setPage('settings') }}>Settings</Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav className="justify-content-end">
                <Nav.Item className="ml-auto">
                  <Nav.Link href="#auth"  >Login</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <body>
          <Row>
            {switcher(page)}
          </Row>
        </body>
      </div >
    </Container>
  );
}

export default App;
