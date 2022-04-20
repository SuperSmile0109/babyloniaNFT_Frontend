// Identicon.tsx
import { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import styled from "@emotion/styled";
import { AtSignIcon } from "@chakra-ui/icons";
// import Jazzicon from "@metamask/jazzicon";

export default function Identicon() {
  const ref = useRef<HTMLDivElement>();
  const { account } = useEthers();
  const StyledIdenticon = styled.div`
    height: 1rem;
    width: 1rem;
    border-radius: 1.125rem;
    background-color: black;
  `;
  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      let parr = document.createElement("p");
      // ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
      ref.current.appendChild(parr);
    }
  }, [account]);

  return <StyledIdenticon ref={ref as any} />;
}
