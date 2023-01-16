import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Grid,
    GridItem,
    Text,
    Image,
    Box,
    Button,
    Center,
    Link,
    Stack,
    Select
} from "@chakra-ui/react";
import Product from './product';

const Cart = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [cartList, setCartList] = useState(state.cart);
    console.log("cartList", cartList);

    const removeFromCart = (e, itemId) => {
        e.preventDefault();
        console.log("In remove function", itemId);
        setCartList(cartList => cartList.filter((cart) => cart.id !== itemId))
    }

    const changeQty = (e, itemId) => {
        console.log("Quantity of item", e.target.value);
    }

    return (
        <>
            <Grid columns={4} templateColumns="repeat(5, 1fr)" gap={4}>
                {cartList.map((cartItem) => {
                    return (
                        <>
                            <GridItem maxW="md" padding="4" background="blackAlpha.300">
                                <Text height='12' noOfLines='2' >{cartItem.title}</Text>
                                <Box marginBottom='3' marginTop='3'>
                                    <Center>
                                        <Image
                                            src={cartItem.image}
                                            blockSize="120px"
                                            alt={cartItem.title}
                                            align="center"
                                            h='100'
                                            w='35'
                                        />
                                    </Center>
                                </Box>
                                <Box>
                                    <Text fontSize="xs" noOfLines='3' height='55'>{cartItem.description}</Text>
                                    <br />
                                    <Text>
                                        <b>Cost ($): </b>
                                        {cartItem.price}
                                    </Text>
                                </Box>
                                <br />
                                <Stack display='flex' w={40}>
                                    <Select placeholder='Select' onChange={e => changeQty(e, cartItem.id)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </Select>
                                </Stack>
                                <Button backgroundColor="blackAlpha.400" onClick={e => removeFromCart(e, cartItem.id)}>Remove</Button>
                            </GridItem>
                        </>
                    );
                })}
            </Grid>
            <Box alignSelf='baseline' verticalAlign='end'>
                <Link onClick={() => navigate(-1)}>Go To Products</Link>
            </Box>
        </>
    )
}

export default Cart;