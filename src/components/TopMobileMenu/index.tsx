import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import BabyMenuTextItem from "../BabyMenuTextItem";
import InvestIcon from "../../assets/icon_invest_001_128x128.png";
import DashboardIcon from "../../assets/icons8-dashboard-60.png";
import AccountModal from "../AccountModal";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { GrClose as CloseIcon } from "react-icons/gr";

import { useRef, useEffect, useState } from "react";
import BuyIcon from "../../assets/Icon_Buy_001_128x128.png";
import NetworksIcon from "../../assets/networks/online-security.png";

const TopMobileMenu = (props: any) => {
  // const { toggle, isToggleOpen } = props;
  const btnRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const toggle = () => setIsToggleOpen(!isToggleOpen);

  return (
    <Stack>
      <Box
        display={{ base: "block", md: "block", xl: "none" }}
        onClick={toggle}
        pr="30px"
        h="50px"
      >
        <Button h="50px" borderRadius="15px" ref={btnRef} onClick={onOpen}>
          {isOpen ? <CloseIcon size="40px" /> : <MenuIcon size="40px" />}
        </Button>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        // size="full"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            {/* <CgArrowLeftR size="50px" onClick={onClose} /> */}
            <CloseIcon size="40px" onClick={onClose} />
            <Divider mt="20px" />
          </DrawerHeader>
          <DrawerBody>
            {/* <ConnectButton handleOpenModal={props.onOpenModalConnectButton} /> */}
            <AccountModal
              isOpen={props.isOpenModalConnectButton}
              onClose={props.onCloseModalConnectButton}
            />
            <BabyMenuTextItem
              key="menuText-1"
              to="/"
              icon={DashboardIcon}
              label="My NFT"
            ></BabyMenuTextItem>
            <BabyMenuTextItem
              key="menuText-2"
              to="/Marketplace"
              icon={InvestIcon}
              label="MarketPlace"
            ></BabyMenuTextItem>
            <BabyMenuTextItem
              key="menuText-3"
              to="/NFTStaking"
              icon={BuyIcon}
              label="NFT Staking"
            ></BabyMenuTextItem>
            <BabyMenuTextItem
              key="menuText-3"
              to="/Minting"
              icon={NetworksIcon}
              label="Minting"
            ></BabyMenuTextItem>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button mb="15px" colorScheme="blue" mr={3} onClick={onClose}>
              close
            </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default TopMobileMenu;
