const router = require("express").Router();
const {
  addCategory,
  getCategories,
  validateCategory,
  getCategory,
  deleteCategory,
  getParentCategoriesWithTheirChilds,
  getParentCategories,
  updateCategory,
} = require("../controllers/category");
const { ROLES } = require("../utils/constant");
const requireAuth = require("../middlewares/auth");
const roleAuth = require("../middlewares/role");

router.post(
  "/",
  [requireAuth, roleAuth(ROLES.ADMIN)],
  validateCategory,
  addCategory
);

router.get("/", [requireAuth], getCategories);

router.get("/parent", [requireAuth], getParentCategories);

router.get("/parents", getParentCategoriesWithTheirChilds);

router.get("/:id", getCategory);

router.put(
  "/:id",
  [requireAuth, roleAuth(ROLES.ADMIN)],
  validateCategory,
  updateCategory
);

router.delete("/:id", [requireAuth, roleAuth(ROLES.ADMIN)], deleteCategory);

module.exports = router;
