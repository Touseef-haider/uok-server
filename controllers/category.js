const { body, validationResult } = require("express-validator");
const createError = require("http-errors");
const Category = require("../models/category");

exports.addCategory = async (req, res, next) => {
  const result = validationResult(req);
  try {
    if (!result.isEmpty()) {
      const errors = result.array({
        onlyFirstError: true,
      });
      next(createError(422, errors));
    }

    const parent = req.body.parent ? req.body.parent : null;

    const category = new Category({
      ...req.body,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      parent,
    });
    if (parent !== null) {
      const pc = await Category.findById({
        _id: parent,
      });
      pc.child.push(category._id);
      await pc.save();
    }
    const newCategory = await category.save();

    const parent_category = await Category.findOne({
      _id: parent,
    });

    if (parent_category) {
      const { _id } = parent_category;
      const ancest = [...parent_category.ancestors];
      ancest.unshift({
        _id,
      });

      await Category.findByIdAndUpdate(newCategory._id, {
        $set: {
          ancestors: ancest,
        },
      });
    }
    return res.status(200).json("category added");
  } catch (error) {
    return next(error);
  }
};
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate(["child"]);

    return res.json({
      categories,
    });
  } catch (error) {
    return next(error);
  }
};
// get parent categories
exports.getParentCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate(["ancestors._id"]);
    return res.json({
      categories: categories.filter((i) => i.parent == null),
    });
  } catch (error) {
    return next(error);
  }
};
// get the parent category with its ancestors
exports.getCategory = async (req, res, next) => {
  try {
    const result = await Category.find({
      _id: req.params.id,
    })
      .populate(["child"])
      .select({
        _id: true,
        name: true,
        ancestors: true,
        child: true,
      })
      .exec();
    return res.status(201).send({
      status: "success",
      result,
    });
  } catch (error) {
    return next(error);
  }
};
// get the parent category with their childs
exports.getParentCategoriesWithTheirChilds = async (req, res, next) => {
  try {
    const result = await Category.find({
      parent: null,
    }).populate([
      {
        path: "child",
        populate: {
          path: "child",
        },
      },
    ]);
    return res.status(201).send({
      result,
    });
  } catch (error) {
    return next(error);
  }
};
// for updating category
exports.updateCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );

    return res.status(200).json({
      message: "category updated",
    });
  } catch (error) {
    return next(error);
  }
};
// for deleting category
exports.deleteCategory = async (req, res, next) => {
  try {
    const err = await Category.findOneAndDelete({
      _id: req.params.id,
    });
    if (!err) {
      await Category.deleteMany({
        "ancestors._id": req.params.id,
      });
    }
    return res.status(200).json("category deleted");
  } catch (error) {
    return next(error);
  }
};

exports.getAllParents = async (req, res, next) => {
  try {
    const parents = await Category.find({
      parent: null,
    }).select("-child -ancestors");

    return res.status(200).json(parents);
  } catch (error) {
    return next(error);
  }
};

// for validation
exports.validateCategory = [body("name").isString()];
