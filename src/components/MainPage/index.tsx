import Header from "../Header";
import Footer from "../Footer";
import Body from "../Body";
import Menu from "../Menu";

import { Container } from "@chakra-ui/react";

const MainPage = () => {
  return (
    <Container maxW="100vw" pt="0" pb="0" pl="0" pr="0">
      <Header></Header>
      <Body></Body>
      <Menu></Menu>
      <Footer></Footer>
    </Container>
  );
};

export default MainPage;
