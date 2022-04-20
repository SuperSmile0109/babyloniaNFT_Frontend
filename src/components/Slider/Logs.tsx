import { NextComponentType } from "next";
import { Box, Text } from "@chakra-ui/react";

import useAppState from "src/hooks/useAppState";

const Logs: NextComponentType = () => {
  const {
    state: { logs },
  } = useAppState();

  return (
    <Box>
      <Box
        dangerouslySetInnerHTML={{ __html: logs }}
        sx={{
          color: "#24292e",
          fontFamily:
            '"Ropa Sans",-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
          fontSize: "16px",
          lineHeight: 1.5,
          wordWrap: "break-word",
          marginTop: "30px",
          marginBottom: "30px",

          h2: {
            fontSize: "1.5em",
            paddingBottom: "0.3em",
            borderBottom: "1px solid #eaecef",
            color: "#fff",
            marginBottom: "16px",
            fontWeight: 600,
            lineHeight: 1.25,
            fontFamily:
              '"Ropa Sans","Changa",Helvetica,Arial,Lucida,sans-serif!important',
            marginLeft: "30px",
            marginRight: "30px",
          },
          blockquote: {
            padding: "0 1em",
            color: "#6a737d",
            borderLeft: "0.25em solid #dfe2e5",
            marginTop: "0",
            marginBottom: "16px",
            borderColor: "#2ea3f2",
          },
          p: {
            fontFamily:
              '"Ropa Sans","Changa",Helvetica,Arial,Lucida,sans-serif!important',
            fontSize: "24px!important",
            color: "#ced6dd!important",
            marginLeft: "30px",
            marginRight: "30px",
            marginRop: "30px",
            marginBottom: "16px",
          },
          hr: {
            height: "0.25em",
            padding: "0",
            margin: "24px 0",
            backgroundColor: "#e1e4e8",
          },
        }}
      />
    </Box>
  );
};

export default Logs;
