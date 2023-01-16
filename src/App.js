import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import GetProducts from "./Components/getProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import { Text, Image, Box } from "@chakra-ui/react";
import minion from "./Assets/minion.jpg";
import CartProvider from "./Store/cart-provider";
import { useEffect, useState } from "react";

function App() {
  return (
    <ChakraProvider>
      <CartProvider>
        <div className="App"></div>

        <Box
          bg="blackAlpha.100"
          color="blackAlpha.800"
          paddingBottom="1"
          paddingTop="4"
          marginBottom="3"
          display="flex"
          flexDirection="column"
        >
          <Text w="70%" fontWeight="bold" textAlign="center">
            Vykaa Shopping
          </Text>
          <Box paddingLeft="4" alignSelf="end">
            <Image src={minion} blockSize="50px" alt="Me" borderRadius="50" />
          </Box>
        </Box>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetProducts />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ChakraProvider>
  );
}
export default App;
