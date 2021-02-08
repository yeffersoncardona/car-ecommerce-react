import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Cart from "../Cart";
import "./TopMenu.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

export default function TopMenu(props) {
    const { productsCart, getProductsCart, products } = props;
    return (
        <Navbar bg="dark" variant="dark" className="top-menu">
            <Container>
                <BrandNav></BrandNav>
                { /*<MenuNav></MenuNav>*/}
                {/* Carrito*/}
                <Cart productsCart={productsCart} getProductsCart={getProductsCart} products={products}></Cart>
            </Container>
        </Navbar>
    );
}

function BrandNav() {
    return (
        <Navbar.Brand>
            <Logo></Logo>
            <h2> La casa de los helados</h2>
        </Navbar.Brand>
    );
}
function MenuNav() {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="#">Aperitivos</Nav.Link>
            <Nav.Link href="#">Postres</Nav.Link>
            <Nav.Link href="#">Helados</Nav.Link>
        </Nav>
    );
}