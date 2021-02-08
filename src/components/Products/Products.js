import React from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../Product";
import Loading from "../Loading";

export default function Products(props) {
    const { products: { result, loading, error }, addProductCart } = props;
    //condicion {variable en true || !result <-- esta vacio ? (condicion afirmativa):(condicion negativa ) }
    return (
        <Container>
            <Row>
                {loading || !result ? (
                    <Loading></Loading>
                ) :
                    result.map((product, index) => <Product key={index} product={product} addProductCart={addProductCart}></Product>)
                }
            </Row>
        </Container>
    );
}