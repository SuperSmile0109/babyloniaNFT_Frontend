import React, { useState, useEffect, useRef } from "react";
import { init as initEmail } from "@emailjs/browser";
import {
  Select,
  Input,
  Image,
  Center,
  Button,
  Divider,
  Box,
  Spacer,
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  HStack,
  keyframes,
  VStack,
  Textarea,
  Tooltip,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { SettingsIcon, RepeatIcon } from "@chakra-ui/icons";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { useMediaQuery } from "@chakra-ui/react";
import { RiSwapBoxLine } from "react-icons/ri";
import TwitterIcon from "../../assets/Twitter-1.png";
import TelegramIcon from "../../assets/Telegram-1.png";
import RedditIcon from "../../assets/Reddit.png";
import EmailIcon from "../../assets/Email-1.png";
// import { Link as LinkRouter, useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AlertPop from "../AlertPop";
import AxiosInstance from "../../helpers/axios";

import HCaptcha from "../../helpers/captcha";
import { useRouter } from "next/router";
import Link from "next/link";

function SocialNetworkIcons() {
  const bgColor = useColorModeValue("gray.400", "gray.800");
  const bgInputBGColor = useColorModeValue("gray.100", "gray.800");
  const InputTextColor = useColorModeValue("gray.800", "gray.300");
  const bgInputPlaceHolderColor = useColorModeValue("gray.400", "gray.800");

  const [token, setToken] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  const { activateBrowserWallet, account } = useEthers();
  const [isTablet] = useMediaQuery("(min-width: 750px)");
  const [isMobile] = useMediaQuery("(min-width: 320px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState();
  const [subjectOther, setSubjectOther] = useState("");
  const toast = useToast();
  // const navigate = useNavigate();
  const SendEmail = async (data: any) => {
    const router = useRouter();
    var data_for_send = {
      service_id: "service_13emnpz",
      template_id: "template_16wgnld",
      user_id: "user_0whdHF0zdTy0m9oTiERMl",
      template_params: data,
    };
    console.log(data_for_send);
    await AxiosInstance.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      data_for_send
    )
      .then((resp) => {
        console.log("send email =========>", resp.data.message);
      })
      .catch((error) => {
        console.log("error in email sending : ", error);
      });
  };

  const router = useRouter();
  const onSubmit = async (data: any) => {
    if (token !== "") {
      setData(data);
      await AxiosInstance.post("contactformverify", { token: token })
        .then((resp) => {
          console.log("=========>", resp.data.message.success);
          if (resp.data.message.success) {
            console.log(data);
            SendEmail(data);
            toast({
              title: "Sending Email...",
              description: "Your message sent successfully.",
              status: "success",
              duration: 10000,
              isClosable: true,
            });
            router.push("/");
          }
        })
        .catch((error) => {
          console.log("error???????????", error);
        });
    }
    // {"message": {"success": true, "challenge_ts": "2022-01-08T17:05:06.000000Z", "hostname": "localhost", "credit": false}}
    // captchaRef?.current?.execute();
  };

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    //    captchaRef?.current?.execute();
  };

  useEffect(() => {
    initEmail("user_0whdHF0zdTy0m9oTiERMl");
  }, []);

  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
  }, [token]);

  return (
    <Flex
      mt={["0px", "10px", "100px", "100px"]}
      pt={["10px", "10px", "10px", "10px"]}
      w={["95vw", "95vw", "50vw", "50vw", "35vw"]}
      // align="flex-start"
      bg={bgColor}
      borderRadius="15px"
      pb={["20px", "20px", "20px", "20px"]}
      mb={["20px", "20px", "20px", "20px"]}
      h={["full", "full", "full", "full"]}
      // alignItems="center"
      // justifyContent="center"
    >
      <VStack>
        <Text> Fill this form and submit your message :</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            w={["95vw", "95vw", "50vw", "50vw", "35vw"]}
            justifyContent="center"
          >
            <VStack
              w={["90vw", "90vw", "47vw", "45vw", "32vw"]}
              bg="gray.600"
              // m="0"
              p={["2", "3", "3"]}
              borderRadius="15px"
              justifyContent="center"
            >
              <Input
                color="black"
                bg={bgInputBGColor}
                textColor={InputTextColor}
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Enter your name",
                  minLength: 3,
                  maxLength: 80,
                })}
              />
              {errors.name && <AlertPop title={errors.name.message} />}

              <Input
                color="black"
                bg={bgInputBGColor}
                textColor={InputTextColor}
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Enter your email",
                  minLength: 3,
                  maxLength: 100,
                })}
              />
              {errors.email && <AlertPop title={errors.email.message} />}

              <Select
                color="black"
                bg={bgInputBGColor}
                textColor={InputTextColor}
                placeholder="Select a subject"
                {...register("Subject", {
                  required: "Select a subject",
                  minLength: 3,
                  maxLength: 100,
                })}
                onChange={(e) => {
                  setSubjectOther(e.target.value);
                }}
              >
                <option value="Partnering">Partnering</option>
                <option value="Investment">Investment</option>
                <option value="Complaint">Complaint</option>
                <option value="Suggestion">Suggestion</option>
                <option value="Report Problem / Bug">
                  Report Problem / Bug
                </option>
                <option value="Hiring / Jobs">Hiring / Jobs</option>
                <option value="Others">Others</option>
              </Select>
              {errors.Subject && subjectOther !== "Others" && (
                <AlertPop title={errors.Subject.message} />
              )}

              {subjectOther === "Others" && (
                <Input
                  color="black"
                  bg={bgInputBGColor}
                  textColor={InputTextColor}
                  type="text"
                  placeholder="Other Subject"
                  {...register("OtherSubject", {
                    required: "Enter a subject",
                    minLength: 3,
                    maxLength: 100,
                  })}
                />
              )}
              {errors.OtherSubject && subjectOther === "Others" && (
                <AlertPop title={errors.OtherSubject.message} />
              )}

              <Textarea
                color="black"
                bg={bgInputBGColor}
                textColor={InputTextColor}
                h="20px"
                placeholder="Message"
                {...register("Message", {
                  required: "Enter your Message",
                  minLength: { value: 8, message: "Too short" },
                })}
              />
              {errors.Message && <AlertPop title={errors.Message.message} />}

              <HStack>
                <Button
                  borderRadius="md"
                  bg="green.600"
                  _hover={{ bg: "cyan.200" }}
                  variant="ghost"
                  type="submit"
                >
                  Submit
                </Button>
                <Link href="/" passHref>
                  <Button
                    borderRadius="md"
                    bg="teal.600"
                    _hover={{ bg: "teal.400" }}
                    variant="ghost"
                    onClick={() => {}}
                  >
                    close
                  </Button>
                </Link>
              </HStack>
              <HCaptcha
                sitekey="4eb3a5c2-a319-4809-a0bb-e805f0cc4a06"
                // languageOverride="hy"
                onLoad={onLoad}
                onVerify={setToken}
                ref={captchaRef}
              />
            </VStack>
          </Flex>
        </form>
      </VStack>
    </Flex>
  );
}

export default SocialNetworkIcons;
// Sitekey : 4eb3a5c2-a319-4809-a0bb-e805f0cc4a06
// secret : 0xA65A8113847eF0ad76f07d2a5E6A4A22Ff45B1f5

// Sitekey : a5ad3c92-fd24-4df2-8961-da5a09e9934b
// Secret : 0x84c70Fff34593D9E71C01FF5CCa73915b2D35a86
