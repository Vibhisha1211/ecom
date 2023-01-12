import React from 'react';

const CartConext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeITem: (id) => 0

});
export default CartConext