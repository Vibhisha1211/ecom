import React, { useContext, useState } from "react";
import "./product.css";
import CartConext from "../Store/cart-context";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    GridItem,
    Text,
    Image,
    Box,
    Button,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { observer } from "mobx-react-lite"
import Timer from "../MobX/Timer";

const Product = ({ handleAddToCart, onClickDeleteProduct }) => {

    const CartCtx = useContext(CartConext);
    const productList = CartCtx.products;
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [defualtNewProd, setNewProd] = useState([]);
    const AddProdSubmitHandler = () => {
        setNewProd({ ...defualtNewProd, image: 'https://i.pravatar.cc', id: 1 + Math.random() });
        CartCtx.addProduct(defualtNewProd);
    }
    const myTimer = new Timer();
    const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

    return (
        <Box display='flex' flexDirection='column' gap='2'>
            <Button rightIcon={<AiOutlineShoppingCart />} alignSelf={'end'} onClick={() => navigate("/Cart")}>My Cart - {CartCtx.items.length}</Button>
            <TimerView timer={myTimer} />
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
                                        {CartCtx.items.find(item => { if (item.id === product.id) return true; return false; }) ? 'In Cart' : 'Add to Cart'}
                                    </Button>
                                    <Button alignSelf='end' backgroundColor="blackAlpha.400" onClick={() => onClickDeleteProduct(product.id)} leftIcon={<AiFillDelete />}></Button>
                                </Box>
                            </GridItem>

                        </>
                    );
                })}
            </Grid>
            <Button backgroundColor="blackAlpha.400" onClick={onOpen} alignSelf='end'>+ Add New Product</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add the product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Product Title" onChange={(e) => { setNewProd({ ...defualtNewProd, title: e.target.value }) }}></Input>
                        <Textarea placeholder="Product Description" onChange={(e) => { setNewProd({ ...defualtNewProd, description: e.target.value }) }}></Textarea>
                        <Input placeholder="Price ($)" onChange={(e) => { setNewProd({ ...defualtNewProd, price: e.target.value }) }}></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={AddProdSubmitHandler}>Submit</Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button></ModalFooter>
                </ModalContent>

            </Modal>
        </Box >
    );
};
export default Product;
