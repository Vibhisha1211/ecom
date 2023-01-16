import React, { useEffect, useState } from 'react';
import Product from './product';
import axios, { isCancel, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';



const GetProducts = () => {
    const [cart, setCart] = useState([]);
    const [list1, setList] = useState([]);
    const newProduct = { id: 11, title: 'New Title Added', price: 13.5, description: 'New desc', image: 'https://i.pravatar.cc' }
    const navigate = useNavigate();
    function gotoCart(event) {
        event.preventDefault();
        console.log("goto cart")
        navigate('/cart', { state: { cart } })
    }

    useEffect(() => {
        if (list1.length) return
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
                        description: responseData[key].description
                    });
                }
                setList(loadedProducts);
            })
    }, [])

    const addProductHandler = (e) => {
        console.log("Event", e);
        // axios.post(`https://fakestoreapi.com/products`, { title, description, price, image, category })
        //     .then(response => { console.log(response); });
        setList([...list1, newProduct]);
    }

    const deleteProductHandler = (id) => {
        setList((x) =>
            x.filter((list1) => {
                return list1.id !== id;
            })
        );
    }

    useEffect(() => {
        console.log('Added to cart', cart)
    }, [cart])

    function handleAddToCart(productId) {
        const product = list1.find(product => product.id === productId);
        if (product) {
            product['quantity'] = 1;
            setCart([product, ...cart]);
        }
    }

    return (
        <div>
            <Product prodList={list1} gotoCart={gotoCart} onClickAddNewProduct={addProductHandler} handleAddToCart={handleAddToCart} onClickDeleteProduct={deleteProductHandler} />
        </div>
    );
};
export default GetProducts;