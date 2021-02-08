import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Cart.scss";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import { STORAGE_PRODUCTS_CART, BASE_PATH } from "../../utils/constants";
import { countDuplicatesItemArray, removeArrayDuplicates, removeItemArray } from "../../utils/arrayFunc";



export default function Cart(props) {
    const { productsCart, getProductsCart, products } = props;
    const [carOpen, setCarOpen] = useState(false);
    const widthCartContent = carOpen ? 400 : 0;
    const [singelProductsCart, setSingelProdudtsCart] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const productData = [];//crea un vector
        let totalPrice = 0;
        const allProductsId = removeArrayDuplicates(productsCart);
        allProductsId.forEach(productId => {
            const quantity = countDuplicatesItemArray(productId, productsCart);
            const productValue = {
                id: productId,
                quantity: quantity
            };
            productData.push(productValue);
        });
        if (!products.loading && products.result) {
            products.result.forEach(product => {
                productData.forEach(item => {
                    if (product.id == item.id) {
                        const totalValue = product.price * item.quantity;
                        totalPrice = totalPrice + totalValue;
                    }
                })
            })
        }

        setCartTotalPrice(totalPrice);
    }, [productsCart, products]
    );
    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCart);
        setSingelProdudtsCart(allProductsId);
    }, [productsCart]
    );
    const openCart = () => {
        setCarOpen(true);
        document.body.style.overflow = "hidden";
    };
    const closeCart = () => {
        setCarOpen(false);
        document.body.style.overflow = "scroll";
    };
    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CART);
        getProductsCart();
    }
    const increseQuantity = (id) => {
        const arrayItemsCart = productsCart;
        arrayItemsCart.push(id);
        localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
        getProductsCart();
    }
    const decreaseQuantity = (id) => {
        const arrayItemsCart = productsCart;
        const result = removeItemArray(arrayItemsCart, id.toString());
        localStorage.setItem(STORAGE_PRODUCTS_CART, result);
        getProductsCart();
    }
    return (
        <>
            <Button variant="link" className="cart">
                {productsCart.length > 0 ? (
                    <CartFull onClick={openCart}></CartFull>
                ) : (<CartEmpty onClick={openCart}></CartEmpty>)}

            </Button>
            <div className="cart-content" style={{ width: widthCartContent }}>
                <CartContentHeader closeCart={closeCart} emptyCart={emptyCart}></CartContentHeader>
                <div className="cart-content__products">
                    {singelProductsCart.map((idProductCart, index) => (
                        <CartContentProducts
                            key={index}
                            products={products}
                            idsProductsCart={productsCart}
                            idProductCart={idProductCart} increseQuantity={increseQuantity} decreaseQuantity={decreaseQuantity}> </CartContentProducts>
                    ))}
                </div>
                <CartContentFooter cartTotalPrice={cartTotalPrice}></CartContentFooter>
            </div>

        </>
    );
}

function CartContentHeader(props) {
    const { closeCart, emptyCart } = props;

    return (
        <div className="cart-content__header">
            <div>
                <Close onClick={closeCart}></Close>
                <h2>Cerrar carrito</h2>
            </div>
            <Button variant="link" onClick={emptyCart}> Vaciar
            <Garbage></Garbage>
            </Button>
        </div>
    )
}

function CartContentProducts(props) {
    const { products: { loading, result }, idsProductsCart, idProductCart, increseQuantity, decreaseQuantity } = props;
    if (!loading && result) {
        return result.map((product, index) => {
            if (idProductCart == product.id) {
                const quantity = countDuplicatesItemArray(product.id, idsProductsCart);
                return (<RenderProduct key={index} product={product} quantity={quantity} increseQuantity={increseQuantity} decreaseQuantity={decreaseQuantity}></RenderProduct>);
            }
        })
    }
    return (null);
}
function RenderProduct(props) {
    const { product, quantity, increseQuantity, decreaseQuantity } = props;
    return (
        <div className="cart-content__product">
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name}></img>
            <div className="cart-content__product-info">
                <div>
                    <h3>{product.name.substr(0, 25)}...</h3>
                    <p>$ {product.price.toFixed(2)} /unid. </p>
                </div>
                <div>
                    <p> en el carrito: {quantity} unid.</p>
                    <div>
                        <button onClick={() => increseQuantity(product.id)}>+</button>
                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                    </div>
                </div>
            </div>
        </div>);
}
function CartContentFooter(props) {
    const { cartTotalPrice } = props;
    return (
        <div className="cart-content__footer">
            <div>
                <p>Total aproximado:</p>
                <p>$ {cartTotalPrice.toFixed(2)}</p>

            </div>
            <Button> Tramitar pedido</Button>
        </div>
    );
}