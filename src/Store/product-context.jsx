import React from 'react';
const ProductContext = React.createContext({
    title: "",
    description: "",
    id: 0,
    price: 0,
    image: ""
});
export default ProductContext