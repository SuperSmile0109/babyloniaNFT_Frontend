import type { NextComponentType } from "next";
import { useState } from "react";
import { Button, Grid, List, ListItem, Tooltip } from "@chakra-ui/react";

import Image from "src/components/Common/Image";
import Betting from "../Slider/Betting";
import Contact from "../Slider/Contact";
import Games from "../Slider/Games";
import Logs from "../Slider/Logs";
import NFT from "../Slider/Nft";
import Roadmap from "../Slider/Roadmap";
import SliderLayout from "../Slider/SliderLayout";
import Tokenomics from "../Slider/Tokenomics";
import BabyloniaIcon from "@assets/icons/general/icon_diary_64x64.png";
import BettingIcon from "@assets/icons/general/Icon_Betting_001_128x128.png";
import PoolIcon from "@assets/icons/general/icon_dividend_001_128x128.png";
import GameIcon from "@assets/icons/general/Icon_Game_001_128x128.png";
import LogIcon from "@assets/icons/general/Icon_Log_001_128x128.png";
import PartnersIcon from "@assets/icons/general/Icon_Partners_002_128x128.png";
import RoadmapIcon from "@assets/icons/general/Icon_Roadmap_001_128x128.png";
import TokenomicsIcon from "@assets/icons/general/Icon_Tokenomics_001_128x128.png";
import { useAppSelector, useAppDispatch } from "@hooks";
import SvgSelector from "src/utils/SvgSelector";
type idleFunctionType = any;
interface IMenuItem {
  name: string;
  img: any;
  href: string;
  Content?: NextComponentType;
  width?: string;
  height?: string;
}

export const menuItems: IMenuItem[] = [
  {
    name: "babylonia",
    img: "BabyloniaIcon",
    href: "https://docs.babylonia.app/babylonia.app/",
  },
  {
    name: "Betting",
    img: "BettingIcon",
    href: "https://docs.babylonia.app/babylonia.app/betting",
    Content: Betting,
  },
  {
    name: "Pool",
    img: "DividendIcon",
    href: "https://pool.babylonia.app/",
  },
  {
    name: "Games",
    img: "GameIcon",
    href: "https://docs.babylonia.app/babylonia.app/games",
    Content: Games,
  },
  // {
  //   name: "NFT",
  //   img: "NFTIcon",
  //   href: "https://nft.babylonia.app/",
  //   // href: "https://docs.babylonia.app/babylonia.app/nfts",
  //   // Content: NFT,
  // },
  {
    name: "Media",
    img: "MEDIAIcon",
    href: "https://media.babylonia.app/",
    // href: "https://docs.babylonia.app/babylonia.app/nfts",
    // Content: NFT,
  },
  {
    name: "Logs",
    img: "LogsIcon",
    href: "https://docs.babylonia.app/babylonia.app/logs",
    Content: Logs,
  },
  {
    name: "Contact",
    img: "ContactIcon",
    href: "https://docs.babylonia.app/babylonia.app/contact",
    Content: Contact,
  },
  {
    name: "Roadmap",
    img: "RoadmapIcon",
    href: "https://docs.babylonia.app/babylonia.app/roadmap",
    Content: Roadmap,
    width: "1400px",
    height: "1600px",
  },
  {
    name: "Tokenomics",
    img: "TokenomicIcon",
    href: "https://docs.babylonia.app/babylonia.app/tokenomics",
    Content: Tokenomics,
  },
];

const Index: NextComponentType = (props: any) => {
  const [activeSlider, setActiveSlider] = useState<number | null>(null);
  const {
    Content = null,
    href = null,
    name = "",
  } = activeSlider !== null ? menuItems[activeSlider] : {};

  const handleClose = () => setActiveSlider(null);
  const handleOpen = (index: number) => () => setActiveSlider(index);
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  return (
    <>
      <List
        display={{ base: "none", sm: "none", md: "block", xl: "block" }}
        position="fixed"
        marginTop="3%"
        left="0"
        top="45%"
        ml="10px"
        padding="12px"
        borderRadius="15px"
        backgroundColor="rgba(0,0,0,0.2)"
        transform="translateY(-50%)"
        zIndex="12"
        width={70}
        id="list"
        pointerEvents="all"
        // className={styles.list}
      >
        {menuItems.map(({ Content, img, href, name, width, height }, idx) => (
          <ListItem
            // onMouseEnter={() => handleMouseEnter(idx)}
            // onMouseLeave={() => handleMouseLeave(idx)}
            key={name}
            mb="10px"
            _hover={{
              "& > a, & > button": {
                background: "transparent",
                transform: "translateX(10%)",
              },
            }}
          >
            <Button
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              as={!Content ? "a" : "button"}
              height="42px"
              width="42px"
              background="transparent"
              transition="0.3s"
              onClick={Content && handleOpen(idx)}
              {...(!Content ? { target: "_blank", href } : {})}
            >
              <div>
                <div id="imageContainer">
                  <div>
                    <SvgSelector title={img} size={40}/>
                  </div>
                  {/* <p
                    className={
                      idx === animationState
                        ? `${styles.text} ${styles.itemTextWithAnimation}`
                        : `${styles.text} ${styles.itemText} `
                    }
                  >
                    {name.toUpperCase()}
                  </p> */}
                </div>
              </div>
            </Button>
          </ListItem>
        ))}
      </List>
      {activeSlider !== null && Content && (
        <SliderLayout title={name} href={href} onClose={handleClose}>
          <Content />
        </SliderLayout>
      )}
    </>
  );
};

export default Index;
