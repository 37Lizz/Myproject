import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>{user ? `Привет, ${user.name}` : 'Привет, гость'}</Navbar.Brand>
        <Nav className="me-auto" style={{ paddingTop: '15px' }}>
          {!user ? (
            <>
            <div style={{ paddingRight: '15px' }}>
              <Link to={'/signup'}>Зарегистрироваться</Link>
            </div>
            <div style={{ paddingRight: '15px' }}>
              <Link to={'/login'}>Войти</Link>
            </div>
          </>
          ) : (
            <>
            <div style={{ paddingRight: '15px' }}>
              <Link to={'/'}>Главная</Link>
            </div>

            <Button variant="danger" onClick={() => logoutHandler()}>
              Выход
            </Button>
          </>
      
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
