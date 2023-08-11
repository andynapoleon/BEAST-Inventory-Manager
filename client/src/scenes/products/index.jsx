import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom"; // navigate when they finish register (to login)

const Product = ({
  // this is EACH PRODUCT's card to be displayed
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false); // control the state of expanding (see more button)

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt, // we use theme because we have dark mode (to flip colors)
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2) /* 2 decimals only */}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse // every component inside this collaspe only shown when expanded
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const token = useSelector((state) => state.global.token);
  const { data, isLoading } = useGetProductsQuery(token); // this is from RTQ
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="PRODUCTS" subtitle="See your list of products." />
        <Box>
          <Button
            onClick={() => navigate("/addProducts")}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddOutlined sx={{ mr: "10px" }} />
            Add Products
          </Button>
        </Box>
      </FlexBetween>

      {data || !isLoading ? ( // make sure that isLoading is false (done loading) and data has already existed
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))" // 4 items per row until a certain point (too small), then 1 iten per row only
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, // for each div in Box, every child will have a span of 4 on non-mobile screens, 1 for mobile screen only
          }}
        >
          {data.map(
            ({ _id, name, description, price, rating, category, supply }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</> // if isLoading is still true
      )}
    </Box>
  );
};

export default Products;
