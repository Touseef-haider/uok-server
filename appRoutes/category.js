const router = require("express").Router();
const {
  addCategory,
  getCategories,
  validateCategory,
  getCategory,
  deleteCategory,
  getAllParents,
  getParentCategoriesWithTheirChilds,
  updateCategory,
} = require("../controllers/category");
const requireAuth = require("../middlewares/auth");

router.post(
  "/",
  // [requireAuth, roleAuth(ROLES.ADMIN)],
  validateCategory,
  addCategory
);

router.get("/", [requireAuth], getCategories);

router.get("/parents", [requireAuth], getAllParents);

router.get("/parents", getParentCategoriesWithTheirChilds);

router.get("/:id", getCategory);

router.put("/:id", [requireAuth], validateCategory, updateCategory);

router.delete("/:id", [requireAuth], deleteCategory);

module.exports = router;
