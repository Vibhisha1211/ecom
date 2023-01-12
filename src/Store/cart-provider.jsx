import CartConext from "./cart-context"
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action === 'ADD') {

    }
    if (action === 'REMOVE') {

    }
    return defaultCartState;
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };

    const cartConext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeITem: removeItemFromCartHandler
    }

    return <CartConext.Provider value={cartConext}>
        {props.children}
    </CartConext.Provider>
};

export default CartProvider;