import React, { useState, useEffect } from "react";
import BabyloniaIcon from "@assets/images/menu_icons/icon_home_03.svg";
import BettingIcon from "@assets/images/menu_icons/Icon_betting_02.svg";
import ContactIcon from "@assets/images/menu_icons/Icon_partners_03.svg";
import DividendIcon from "@assets/images/menu_icons/icon_pool_02.svg";
import GameIcon from "@assets/images/menu_icons/Icon_game_02.svg";
import LogsIcon from "@assets/images/menu_icons/Icon_log_01.svg";
import MEDIAIcon from "@assets/images/menu_icons/icon_media_01.svg";
import NFTIcon from "@assets/images/menu_icons/icon_NFT_03.svg";
import RoadmapIcon from "@assets/images/menu_icons/Icon_roadmap_01.svg";
import TokenomicIcon from "@assets/images/menu_icons/Icon_tockenomics_02.svg";
import { Box } from "@chakra-ui/react";

interface SvgProps {
  title: keyof SvgIconsListType;
  styles?: string;
  size?: Number;
}

const SvgIconsList: SvgIconsListType = {
  BabyloniaIcon: BabyloniaIcon,
  BettingIcon: BettingIcon,
  DividendIcon: DividendIcon,
  GameIcon: GameIcon,
  LogsIcon: LogsIcon,
  NFTIcon: NFTIcon,
  MEDIAIcon: MEDIAIcon,
  ContactIcon: ContactIcon,
  RoadmapIcon: RoadmapIcon,
  TokenomicIcon: TokenomicIcon,
};
interface SvgIconsListType {
  BabyloniaIcon: any;
  BettingIcon: any;
  DividendIcon: any;
  GameIcon: any;
  LogsIcon: any;
  NFTIcon: any;
  MEDIAIcon: any;
  ContactIcon: any;
  RoadmapIcon: any;
  TokenomicIcon: any;
}

const SvgSelector = ({ title, styles, size = 50 }: SvgProps) => {
  const RenderSVG = SvgIconsList[title];

  if (!RenderSVG) return null;

  return (
    <RenderSVG
      viewBox="0 0 512 512"
      width={`${size}px`}
      height={`${size}px`}
      className={styles}
    />
  );
};

export default SvgSelector;
