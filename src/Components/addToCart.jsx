import React, { useEffect, useState } from 'react';
import Product from './product';
import { useNavigate, useLocation } from "react-router-dom";
import {
    Button,
    Box,
    Text,
    Link,
    Grid,
    GridItem,
    Center,
    Image
} from "@chakra-ui/react";
const AddToCart = (props) => {
    {
        const [cartList, setCartList] = useState([]);
        const navigate = useNavigate();
        const location = useLocation();
        const [qty, setQty] = useState(0);

        useEffect(() => {

            fetch(`https://fakestoreapi.com/products/${location.state.id}`)
                .then(response => response.json())
                .then(responseData => {
                    const addedProduct = [];
                    console.log(responseData);
                    for (const key in cartList) {
                        console.log("CartList", cartList);
                        console.log("key", key);
                        if (cartList[key].id === responseData.id && cartList[key].qty !== 0) {
                            setQty(qty + 1);
                            console.log("Product already in cart", qty)
                        }
                        else
                            console.log("Product not in cart", qty)
                    }


                    addedProduct.push({
                        id: responseData.id,
                        title: responseData.title,
                        description: responseData.description,
                        rating: { count: responseData.rating.count, rate: responseData.rating.rate },
                        price: responseData.price,
                        image: responseData.image,
                        quantity: { qty }
                    });
                    setCartList(...cartList, addedProduct);
                    console.log(cartList);
                })


        }, [])

        return (
            <>
                <Text>
                    ID: {location.state.id}
                </Text>


                <Grid columns={2} templateColumns="repeat(5, 1fr)" gap={4}>
                    {cartList.map((response) => {
                        return (
                            <>
                                <GridItem maxW="md" padding="4" background="blackAlpha.300">
                                    <Text height='12' noOfLines='2' >{response.title}</Text>
                                    <Box marginBottom='3' marginTop='3'>
                                        <Center>
                                            <Image
                                                src={response.image}
                                                blockSize="120px"
                                                alt={response.title}
                                                align="center"
                                                h='100'
                                                w='35'
                                            />
                                        </Center>
                                    </Box>
                                    <Box>
                                        <Text fontSize="xs" noOfLines='3' height='55'>{response.description}</Text>
                                        <br />
                                        <Text>
                                            <b>Cost ($): </b>
                                            {response.price}
                                        </Text>
                                    </Box>
                                    <br />
                                    <Button backgroundColor="blackAlpha.400">Remove</Button>
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
}
export default AddToCart;
