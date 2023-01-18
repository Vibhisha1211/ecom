import React from 'react';

const CartConext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => 0,
    updateQuantity: (id, quantity) => (0),
    products: [],
    setProducts: (item) => { },
    deleteProduct: (id) => 0,
    addProduct: (item) => { }
});
export default CartConext