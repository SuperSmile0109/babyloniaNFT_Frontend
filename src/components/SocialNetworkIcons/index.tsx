import React from "react";
import { Image, Box, Flex, Link } from "@chakra-ui/react";
import TwitterIcon from "../../assets/Twitter-1.png";
import TelegramIcon from "../../assets/Telegram-1.png";
// import RedditIcon from "../../assets/Reddit.png";
import EmailIcon from "../../assets/Email-1.png";
import InstagramIcon from "../../assets/icon_instagram_128x128.png";
import NextLink from "next/link";
import { useAppSelector, useAppDispatch } from "@hooks";
function SocialNetworkIcons() {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  return (
    <Box
      w={["200px", "200px", "200px"]}
      h="40px"
      borderRadius="15px"
      // mt="150px"
      backgroundColor={grayscaleMode=="gray"?"gray.200":"teal.400"}
      // boxShadow="2xl"
      p="5px"
    >
      <Flex>
        <NextLink href="https://twitter.com/AppBabylonia" passHref>
          <Link isExternal>
            <Image
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              mx="10px"
              w="30px"
              h="30px"
              src={TwitterIcon.src}
              alt="Twitter Icon"
              transitionTimingFunction="ease-in-out"
              _hover={{
                transform: "scale(1.1)",
                transitionDuration: "300ms",
              }}
            ></Image>
          </Link>
        </NextLink>
        <NextLink href="https://t.me/babyloniageneralchat" passHref>
          <Link isExternal>
            <Image
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              mx="10px"
              w="30px"
              h="30px"
              src={TelegramIcon.src}
              alt="Telegram Icon"
              _hover={{ transform: "scale(1.1)", transitionDuration: "300ms" }}
            ></Image>
          </Link>
        </NextLink>
        <NextLink href="https://www.instagram.com/appbabylonia/" passHref>
          <Link isExternal>
            <Image
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              mx="10px"
              w="30px"
              h="30px"
              src={InstagramIcon.src}
              alt="Instagram Icon"
              _hover={{ transform: "scale(1.1)", transitionDuration: "300ms" }}
            ></Image>
          </Link>
        </NextLink>
        <NextLink href="/EmailPage" passHref>
          <Link>
            <Image
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              mx="10px"
              w="30px"
              h="30px"
              src={EmailIcon.src}
              alt="Email Icon"
              _hover={{ transform: "scale(1.1)", transitionDuration: "300ms" }}
            ></Image>
          </Link>
        </NextLink>
      </Flex>
    </Box>
  );
}

export default SocialNetworkIcons;
