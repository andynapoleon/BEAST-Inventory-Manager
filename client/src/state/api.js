import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// we're setting up API for connection to the back-end now, we used fetch() before in the social media app
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env
        .REACT_APP_BASE_URL /* env var because  the baseURL will be different when we deploy the application. */,
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`, // this is called endpoints,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: (token) => ({
        // we need params to send back to the back-end (same as req.body)
        url: "client/products",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: (token) => ({
        // we need params to send back to the back-end (same as req.body)
        url: "client/customers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ paginationModel, sort, search, token }) => ({
        // we need params to send back to the back-end (same as req.body)
        url: "client/transactions",
        method: "POST",
        params: { search },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paginationModel: paginationModel,
          sortModel: sort,
        }),
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: (token) => ({
        // we need params to send back to the back-end (same as req.body)
        url: "client/geography",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: (token) => ({
        // we need params to send back to the back-end (same as req.body)
        url: "sales/sales",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: (token) => ({
        // we need params to send back to the back-end (same as req.body)
        url: "management/admins",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: (token) => ({
        // we need params to send back to the back-end (same as req.body)
        url: "general/dashboard",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
