import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartConext from "../Store/cart-context"

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

const Cart = () => {
    const navigate = useNavigate();
    const CartCtx = useContext(CartConext);

    const removeFromCart = (e, itemId) => {
        e.preventDefault();
        CartCtx.removeItem(itemId);
    }

    const changeQty = (e, itemId) => {
        CartCtx.updateQuantity(itemId, e.target.value);
    };

    return (
        <>
            <Grid columns={4} templateColumns="repeat(5, 1fr)" gap={4}>
                {CartCtx.items.map((cartItem) => {
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
                                    <Select placeholder='Select' onChange={e => changeQty(e, cartItem.id)} value={cartItem.quantity}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </Select>
                                </Stack>
                                <Button backgroundColor="blackAlpha.400" onClick={e => removeFromCart(e, cartItem.id)}>Remove</Button>
                            </GridItem>
                        </>

                    );
                })}
            </Grid>
            <Box alignSelf='baseline' verticalAlign='end'>
                <Text>Total Price: {CartCtx.totalAmount.toFixed(2)}</Text>
                <Link onClick={() => navigate(-1)}>Go To Products</Link>
            </Box>
        </>
    )
}

export default Cart;