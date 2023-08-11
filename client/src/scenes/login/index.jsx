import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="secondary">
          📦 BEAST INVENTORY
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome back, Admin! Let's have a look at our inventory!
        </Typography>
        <Typography sx={{ mb: "1.5rem" }}>
          Sample account (with affiliate sales):
          <br />
          Email: wbicknell3f@taobao.com
          <br />
          Password: EJRM6LjGs
          <br />
          <br />
          Sample account (without affiliate sales):
          <br />
          Email: ahouseman1u@usa.gov
          <br />
          Password: Tdj392C7Cz
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
