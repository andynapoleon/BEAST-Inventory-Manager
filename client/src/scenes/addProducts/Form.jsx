import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik"; // form library
import * as yup from "yup"; // validation library
import { useNavigate } from "react-router-dom"; // navigate when they finish register (to login)
import { useSelector } from "react-redux"; // store user information - update state
//import { setUser } from "state"; // redux - user will login

// validation for registration
const addSchema = yup.object().shape({
  // a registration form object from Yup! - every field is required!
  name: yup.string().required("required"),
  price: yup.string().required("required"),
  description: yup.string().required("required"),
  category: yup.string().required("required"),
  rating: yup.string().required("required"),
  supply: yup.string().required("required"),
});

// set up the initial values for the form
const initialValuesadd = {
  name: "",
  price: 0,
  description: "",
  category: "",
  rating: 0,
  supply: 0,
};

// this is the React Form Component being set up
const Form = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = useSelector((state) => state.global.token);

  const add = async (values, onSubmitProps) => {
    const savedProductResponse = await fetch(
      process.env.REACT_APP_BASE_URL + `/client/addProducts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // send it to the back-end
      }
    );

    const savedProduct = await savedProductResponse.json(); // waiting for the response from the back-end
    onSubmitProps.resetForm(); // onSubmitProps has some functions from Formik that we can use - resetForm() is one of them!

    if (savedProduct) {
      navigate("/dashboard");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // the parameters
    await add(values, onSubmitProps);
    // console.log("hihi");
  };

  return (
    <Formik // formik basically has all of the handlers for us to use for our form!
      onSubmit={handleFormSubmit} // handle form submission (above)
      initialValues={initialValuesadd} // pass in initial values
      validationSchema={addSchema} // pass in schemas (created from Yup above)
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
            <>
              <TextField // input
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="name"
                error={
                  Boolean(touched.firstName) && Boolean(errors.firstName) // has been touched AND error in this particular field
                }
                helperText={touched.firstName && errors.firstName} // show the error if not will show if it as been touched or not
                sx={{ gridColumn: "span 2" }} // span of 2, max is 4, so 2 text fields per row
              />
              <TextField
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="price"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
                type="number"
                InputProps={{
                  inputProps: {
                    step: "0.01",
                  },
                }}
              />
              <TextField
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="description"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="category"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Rating"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.split}
                name="rating"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
                type="number"
                InputProps={{
                  inputProps: {
                    max: 5,
                    min: 0,
                    step: 0.1,
                  },
                }}
              />
              <TextField
                label="Supply Left"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.goal}
                name="supply"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
                type="number"
              />
            </>
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
              Add Product
            </Button>
            <Typography
              onClick={() => {
                navigate("/products");
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              Cancel
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
