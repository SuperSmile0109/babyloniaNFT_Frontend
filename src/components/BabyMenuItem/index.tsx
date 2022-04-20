import { Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import ButtonWithIcon from "../ButtonWithIcon";
const BabyMenuItem = ({
  isLast = true,
  to = "/",
  icon = {},
  label = "Button",
  ...rest
}) => {
  return (
    <Link href={to} passHref>
      <a>
        <ButtonWithIcon
          pathname={to}
          icon={icon}
          label={label}
        ></ButtonWithIcon>
      </a>
    </Link>
  );
};
export default BabyMenuItem;
