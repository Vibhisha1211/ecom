import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import GetProducts from "./Components/getProducts";
import {
  BrowserRouter,
  Routes,
  Route,
  useRouteMatch,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import AddToCart from "./Components/addToCart";
import {
  Grid,
  GridItem,
  Text,
  Image,
  Box,
  Button,
  Center,
} from "@chakra-ui/react";
import minion from "./Assets/minion.jpg";
import CartProvider from "./Store/cart-provider";

function App(props) {
  // your cart state here
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
            <Route path="/AddToCart" element={<AddToCart />}></Route>
            <Route path="/cart" element={<Cart cart={cart} />}></Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ChakraProvider>
  );
}
export default App;
