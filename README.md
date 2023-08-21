# BEAST Inventory Management App

A MERN inventory management application for managing an inventory of products or goods. Main purposes include inventory tracking, sales order management, and real-time sales monitoring and analytics. Technologies used: React.js, Redux.js, and MUI on the front end and Node.js, Express.js and MongoDB (with Mongoose) on the back end. Also, NIVO was used to create informative charts.

![Screen Shot 2023-08-21 at 3 33 13 PM](https://github.com/andynapoleon/BEAST-Inventory-Manager/assets/85133277/937cb751-7f9d-4dd2-9593-f2896db7ba81)

# Instructions

1. **Login 🔑:** Start by logging in with one of the two sample accounts.
   <br>
   <br>
   IMPORTANT: The server might need some time to load up. Therefore, it might take around 30 seconds to direct you to the app after clicking the Login button.

![Screen Shot 2023-08-21 at 3 32 32 PM](https://github.com/andynapoleon/BEAST-Inventory-Manager/assets/85133277/693dc8c9-26ff-4100-866d-c664c99bb9dd)

2. **All Features Available 💡:**

- Dark Mode.
- Login and Logout.
- Dashboard Page displaying Overall Statistics.

  **Client Facing Section**:
  - Products Page for managing products (data fetched using **MongoDB Aggregation Pipeline**) - The "Add Products" feature is available!
  - Customers Page displaying a table of all customers.
  - Transactions Page displaying a table of all transactions - this table is created using **SERVER-SIDE PAGINATION**.
  - Geography Page showing a map of where the customers are from.
  
  **Sales Section**:
  - Overview Page for showing a line chart of general revenue and unit.
  - Daily Sales Page: a line chart of daily sales.
  - Monthly Sales Page: a line chart of monthly sales.
  - Breakdown Page: a pie chart showing the breakdown of sales by category.
 
  **Management Section**:
  - Admins Page displaying a table of all admins.
  - Performance Page to track the performance of the currently logged-in admin's affiliate sales.
