const { Box } = require("@mui/material");
const { styled } = require("@mui/system"); // reuse styles/css in a component-like manner

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
