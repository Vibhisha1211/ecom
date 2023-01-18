import React, { useContext, useEffect } from 'react';
import Product from './product';
import CartConext from '../Store/cart-context';

const GetProducts = () => {
    const CartCtx = useContext(CartConext);

    useEffect(() => {
        if (CartCtx.products.length) return
        fetch('https://fakestoreapi.com/products?sort=desc')
            .then(response => response.json())
            .then(responseData => {
                const loadedProducts = [];
                for (const key in responseData) {
                    loadedProducts.push({
                        id: responseData[key].id,
                        title: responseData[key].title,
                        image: responseData[key].image,
                        price: responseData[key].price,
                        rating: { count: responseData[key].rating.count, rate: responseData[key].rating.rate },
                        description: responseData[key].description,
                        quantity: 0
                    });
                }
                CartCtx.setProducts(loadedProducts);
            })
    }, [])

    // axios.post(`https://fakestoreapi.com/products`, { title, description, price, image, category })
    //     .then(response => { console.log(response); });


    const deleteProductHandler = (id) => {
        CartCtx.deleteProduct(id);
    }

    function handleAddToCart(productId) {
        const product = CartCtx.products.find(product => product.id === productId);
        if (product) {
            product['quantity'] = 1;
            CartCtx.addItem(product);
        }
    }

    return (
        <div>
            <Product handleAddToCart={handleAddToCart} onClickDeleteProduct={deleteProductHandler} />
        </div>
    );
};
export default GetProducts;