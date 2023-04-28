"use strict";
const author = require("../models/restaurant.model");

exports.getIDBySearchText = async (searchText) => {
  let arr = [];
  try {
    arr = await author.find({ name: new RegExp(searchText, "i") }, { name: 0 });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  return arr.map((i) => i.id);
};

exports.getAll = async (req, res) => {
  if (typeof req.params.page === "undefined") {
    res.status(402).json({ msg: "Data invalid" });
    return;
  }
  let count = null;
  try {
    count = await author.count({});
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  let totalPage = parseInt((count - 1) / 9 + 1);
  let { page } = req.params;
  if (parseInt(page) < 1 || parseInt(page) > totalPage) {
    res.status(200).json({ data: [], msg: "Invalid page", totalPage });
    return;
  }
  author
    .find({})
    .skip(9 * (parseInt(page) - 1))
    .limit(9)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
      }
      res.status(200).json({ data: docs, totalPage });
    });
};

exports.getRestaurant = (req, res) => {
  console.l;
  author.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ data: docs });
  });
};
