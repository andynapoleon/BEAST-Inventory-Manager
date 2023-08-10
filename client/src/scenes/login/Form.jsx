import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik"; // form library
import * as yup from "yup"; // validation library
import { useNavigate } from "react-router-dom"; // navigate when they finish register (to login)
import { useDispatch } from "react-redux"; // store user information - update state
import { setLogin } from "state"; // redux - user will login

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

// this is the React Form Component being set up
const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      process.env.REACT_APP_BASE_URL + "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), // pass the values in directly (values are already formatted in the correct way!)
      }
    );

    const loggedIn = await loggedInResponse.json(); // get res from back-end as JSON object (two props: user and token)
    onSubmitProps.resetForm();
    if (loggedIn.user) {
      dispatch(
        setLogin({
          userId: loggedIn.user._id, // pass a JSON object like this to setLogin to get action payload - just a toolkit of Redux
          token: loggedIn.token, // set the token
        })
      );
      navigate("/dashboard");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // the parameters
    login(values, onSubmitProps);
  };

  return (
    <Formik // formik basically has all of the handlers for us to use for our form!
      onSubmit={handleFormSubmit} // handle form submission (above)
      initialValues={initialValuesLogin} // pass in initial values
      validationSchema={loginSchema} // pass in schemas (created from Yup above)
    >
      {({
        values, // the values passed in of login or register objects
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit, // this gets the handleFormSubmit function above - this will be triggered on click below
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" // split the grid into 4 cols
            sx={{
              // this means any div that are children classes of this Box component
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, // on mobile on span 4, on normal just 2 for each textfield - two textfields per row!
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password" // this will make password hidden - same as html <input> tag
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.secondary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.neutral.main },
              }}
            >
              LOGIN
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
