const { PrismaClient, Prisma } = require("@prisma/client");
const express = require("express");
const upload = require("../utils/fileUpload");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard/index", { title: "Dashboard", currentPage: "home" });
});

router.get("/dashboard/manage-products", async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    const spices = await prisma.spices.findMany();
    res.render("dashboard/manage_products", {
      title: "Dashboard",
      currentPage: "product",
      query: req.query,
      categories,
      spices
    });
  } catch (error) {}
});

router.post("/dashboard/create-category", async (req, res, next) => {
  try {
    await prisma.category.create({
      data: { name: req.body.name },
    });
    res.redirect(
      "/admin/dashboard/manage-products?success=Category created successfully"
    );
  } catch (error) {
    res.redirect(
      `/admin/dashboard/manage-products?error=Error creating category`
    );
  }
});

router.post(
  "/dashboard/create-product",
  upload.single("image"),
  async (req, res, next) => {
    try {
      await prisma.spices.create({
        data: {
          name: req.body.name,
          category: {
            connect: { id: req.body.category },
          },
          origin: req.body.origin,
          description: req.body.description,
          aroma: req.body.aroma,
          heatLevel: req.body.heatLevel,
          image: req.file.filename,
        },
      });
      res.redirect(
        "/admin/dashboard/manage-products?success=Product created successfully"
      );
    } catch (error) {
      console.log(error);
      res.redirect(
        `/admin/dashboard/manage-products?error=Error creating product`
      );
    }
  }
);

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
