const { body, validationResult } = require("express-validator");
const createError = require("http-errors");
const Category = require("../models/category");

exports.addCategory = async (req, res, next) => {
  console.log(req.body);
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

exports.getChildsOnly = async (req, res, next) => {
  try {
    const childs = [];
    const parentCategories = await Category.find({ parent: null }).populate(
      "child"
    );

    for (let i = 0; i < parentCategories.length; i++) {
      for (let j = 0; j < parentCategories[i]?.child.length; j++) {
        childs.push(parentCategories[i]?.child[j]);
      }
    }

    return res.status(200).json(childs);
  } catch (err) {
    return next(err);
  }
};
// get the parent category with its ancestors
exports.getCategory = async (req, res, next) => {
  try {
    const result = await Category.find({
      _id: req.params.id,
    })
      .populate(["child"])
      
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
    const data = await Category.findOneAndDelete({
      _id: req.params.id,
    });

    await Category.findByIdAndUpdate(
      {
        _id: data?.parent,
      },
      {
        $pull: {
          child: req.params.id,
        },
      }
    );

    return res.status(200).json("category deleted");
  } catch (error) {
    return next(error);
  }
};

exports.getAllParents = async (req, res, next) => {
  try {
    const parents = await Category.find({
      parent: null,
    });

    return res.status(200).json(parents);
  } catch (error) {
    return next(error);
  }
};


// for validation
exports.validateCategory = [body("name").isString()];
