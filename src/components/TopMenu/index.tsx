import { Center, Flex, Stack } from "@chakra-ui/react";
import BabyMenuItem from "@c/BabyMenuItem";

const TopMenu = (props: any) => {
  return (
    <Stack
      display={{ base: "none", sm: "none", md: "none", xl: "block" }}
      direction={["column", "row"]}
    >
      <Flex>
        <Center>
          {/* <BabyMenuItem key="menu11" to="/" label="My NFT"></BabyMenuItem> */}
          <BabyMenuItem key="menu22" to="/" label="MarketPlace"></BabyMenuItem>
          <BabyMenuItem
            key="menu33"
            to="/NFTStaking"
            label="NFT Staking"
          ></BabyMenuItem>
          <BabyMenuItem
            key="menu44"
            to="/Creating"
            label="Creating"
          ></BabyMenuItem>
        </Center>
      </Flex>
    </Stack>
  );
};

export default TopMenu;
