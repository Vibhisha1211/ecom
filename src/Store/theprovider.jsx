import CartConext from "./cart-context"
import { useReducer, useState } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE') {
        console.log("In Remove");
        let newList = state.items;
        let newTotalAmt = 0;
        state.items.map((item) => {
            if (item.id === action.id) {
                newTotalAmt = state.totalAmount - item.price * item.quantity
            } return newTotalAmt;
        })
        newList = newList.filter((cart) => cart.id !== action.id)
        console.log("NewList", newList);
        return {
            items: newList,
            totalAmount: newTotalAmt
        }
    }
    if (action.type === 'UPDATE') {
        console.log("In update quantity")
        let newtotalAmount = 0;
        const updatedItem = state.items.map((item) => {
            if (item.id === action.id) {
                const updatedItem = {
                    ...item,
                    quantity: action.quantity,
                };
                newtotalAmount = state.totalAmount - item.price * item.quantity + item.price * action.quantity;
                console.log(updatedItem);
                return updatedItem;
            }
            return item;
        });
        return {
            items: updatedItem,
            totalAmount: newtotalAmount
        }
    }
    return defaultCartState;
}



const TheProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const [products, setProducts] = useState([]);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
        console.log("In add dispatch", item);
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };

    const changeQtyHandler = (id, quantity) => {
        dispatchCartAction({ type: 'UPDATE', id: id, quantity: quantity })
    };

    const setProductListHandler = (item) => {
        setProducts(item);
        console.log("Products in Ctx", products)
    }

    const deleteProdHandler = (id) => {
        setProducts(products.filter((prod) => prod.id !== id));
    }

    const addProdHandler = (item) => {
        const updatedItems = products.concat(item);
        console.log(item);
        console.log(products);
        setProducts(updatedItems)
    }

    const cartConext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        updateQuantity: changeQtyHandler,
        products: products,
        setProducts: setProductListHandler,
        deleteProduct: deleteProdHandler,
        addProduct: addProdHandler
    }

    return <CartConext.Provider value={cartConext}>
        {props.children}
    </CartConext.Provider>
};

export default TheProvider;