const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard/index", { title: "Dashboard", currentPage: "home" });
});

router.get("/dashboard/manage-products", (req, res, next) => {
  res.render("dashboard/manage_products", {
    title: "Dashboard",
    currentPage: "product",
  });
});

router.get("/dashboard/customers", (req, res, next) => {
    res.render("dashboard/customers", {
      title: "Dashboard",
      currentPage: "customers",
    });
  });

router.get("/dashboard/sales-report", (req, res, next) => {
  res.render("dashboard/sales_report", {
    title: "Dashboard",
    currentPage: "sales",
  });
});

module.exports = router;
