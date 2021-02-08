import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TopMenu from "./components/TopMenu";
import useFetch from "./hooks/useFetch";
import { URLAPIPRODUCTS, STORAGE_PRODUCTS_CART } from "./utils/constants";
import Products from "./components/Products";




function App() {


  const products = useFetch(URLAPIPRODUCTS, null);
  const [productsCart, setProductsCart] = useState([]);
  useEffect(() => {
    getProductsCart();
  }, []);

  //esta funcion recupera los valores del local storage para preservar el carrito al actualizar la pagina
  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);
    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(',');
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }

  };

  const addProductCart = (id, name) => {
    // console.log(`Has añadido el producto ${name} con el ID: ${id} al carrito.`);
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
    getProductsCart();
    toast.success(`${name} añadido al carrito correctamente.`)
  };

  return (
    <div className="App">
      <p></p>
      <TopMenu productsCart={productsCart} getProductsCart={getProductsCart} products={products}></TopMenu>
      <Products products={products} addProductCart={addProductCart}></Products>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar newestOnTop rtl={false} pauseOnVisibility={false} draggable pauseOnHover={false}></ToastContainer>
    </div>
  );
}

export default App;
