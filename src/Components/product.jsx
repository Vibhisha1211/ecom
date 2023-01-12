import React from "react";
import "./product.css";

import { useNavigate } from "react-router-dom";
import AddToCart from "./addToCart";

import {
    Grid,
    GridItem,
    Text,
    Image,
    Box,
    Button,
    Center
} from "@chakra-ui/react";

const Product = (props) => {
    const productList = props.prodList;
    const x = props.onClickAddNewProduct;
    const navigate = useNavigate();
    return (
        <>
            <Grid columns={4} templateColumns="repeat(5, 1fr)" gap={4}>
                {productList.map((product) => {
                    return (
                        <>
                            <GridItem maxW="md" padding="4" background="blackAlpha.300">
                                <Text height='12' noOfLines='2' >{product.title}</Text>
                                <Box marginBottom='3' marginTop='3'>
                                    <Center>
                                        <Image
                                            src={product.image}
                                            blockSize="120px"
                                            alt={product.title}
                                            align="center"
                                            h='100'
                                            w='35'
                                        />
                                    </Center>
                                </Box>
                                <Box>
                                    <Text fontSize="xs" noOfLines='3' height='55'>{product.description}</Text>
                                    <br />
                                    <Text>
                                        <b>Cost ($): </b>
                                        {product.price}
                                    </Text>
                                </Box>
                                <br />
                                <Button backgroundColor="blackAlpha.400" marginRight='62' onClick={() => props.handleAddToCart(product.id)}>
                                    {product.quantity ? 'In Cart' : 'Add to Cart'}
                                </Button>
                                <Button backgroundColor="blackAlpha.400" onClick={() => props.onClickDeleteProduct(product.id)}>Delete</Button>
                            </GridItem>

                        </>
                    );
                })}
            </Grid>
            <Button backgroundColor="blackAlpha.400" onClick={x}>+ Add New Product</Button>

        </>
    );
};
export default Product;
