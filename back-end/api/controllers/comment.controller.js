"use strict";
const _comment = require("../models/comment.model");
const product = require("../models/food.model");

exports.getCommentByIDProduct = async (req, res) => {
  if (
    typeof req.body.id_product === "undefined" ||
    typeof req.body.page === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { id_product, page } = req.body;
  let count = await _comment.count({ id_product: id_product });
  let totalPage = parseInt((count - 1) / 9 + 1);
  if (parseInt(page) < 1 || parseInt(page) > totalPage) {
    res.status(200).json({ data: [], msg: "Invalid page", totalPage });
    return;
  }
  _comment
    .find({ id_product: id_product })
    .skip(9 * (parseInt(page) - 1))
    .limit(9)
    .sort({ date: 1 })
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
      }
      res.status(200).json({ data: docs, totalPage });
    });
};
