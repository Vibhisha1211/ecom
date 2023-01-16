import React from "react";
import "./product.css";

import {
    Grid,
    GridItem,
    Text,
    Image,
    Box,
    Button,
    Center
} from "@chakra-ui/react";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";


const Product = ({ gotoCart, prodList, onClickAddNewProduct, handleAddToCart,
    onClickDeleteProduct }) => {
    const productList = prodList;
    const x = onClickAddNewProduct;

    return (
        <Box display='flex' flexDirection='column' gap='2'>

            <Button rightIcon={<AiOutlineShoppingCart />} alignSelf={'end'} onClick={gotoCart}>My Cart</Button>
            <Grid columns={4} templateColumns="repeat(5, 1fr)" gap={4}>
                {productList.map((product) => {
                    return (
                        <>
                            <GridItem maxW="md" padding="4" background="blackAlpha.300">
                                <Text height='12' noOfLines='2' >{product.title}</Text>
                                <Box marginBottom='3' marginTop='3' >
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
                                <Box display="flex" flexDirection='revert' Spacing={3}>
                                    <Button backgroundColor="blackAlpha.400" onClick={() => handleAddToCart(product.id)} >
                                        {product.quantity ? 'In Cart' : 'Add to Cart'}
                                    </Button>
                                    <Button alignSelf='end' backgroundColor="blackAlpha.400" onClick={() => onClickDeleteProduct(product.id)} leftIcon={<AiFillDelete />}></Button>
                                </Box>
                            </GridItem>

                        </>
                    );
                })}
            </Grid>
            <Button backgroundColor="blackAlpha.400" onClick={x} alignSelf='end'>+ Add New Product</Button>

        </Box >
    );
};
export default Product;
