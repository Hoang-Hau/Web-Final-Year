"use strict";
const bill = require("../models/bill.model");
const cart = require("../models/cart.model");
const food = require("../models/food.model");
const randomstring = require("randomstring");
const nodemailer = require("../utils/nodemailer");
exports.addBill = async (req, res) => {
  if (
    typeof req.body.id_user === "undefined" ||
    typeof req.body.address === "undefined" ||
    typeof req.body.phone === "undefined" ||
    typeof req.body.name === "undefined" ||
    typeof req.body.total === "undefined" ||
    typeof req.body.email === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  const { id_user, address, total, phone, name, email } = req.body;
  var cartFind = null;
  try {
    cartFind = await cart.findOne({ id_user: id_user });
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "user not found" });
    return;
  }
  const token = randomstring.generate();
  // let sendEmail = await nodemailer.sendMailConfirmPayment(email, token);
  // if (!sendEmail) {
  //   res.status(500).json({ msg: "Send email fail" });
  //   return;
  // }
  const new_bill = new bill({
    id_user: id_user,
    products: cartFind.products,
    address: address,
    phone: phone,
    name: name,
    total,
    token,
  });
  try {
    console.log("product", cartFind.products);
    for (var i = 0; i < cartFind.products.length; i++) {
      var currentAmount = await food.findOne(
        { _id: cartFind.products[i]._id },
        "amount"
      );
      console.log("amount", currentAmount);
      await food.updateOne(
        { _id: cartFind.products[i]._id },
        { amount: currentAmount.amount - cartFind.products[i].count }
      );
    }
    await cartFind.remove();
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log("cart remove fail");
    return;
  }
  try {
    new_bill.save();
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log("save bill fail");
    return;
  }
  res.status(201).json({ msg: "success" });
};

exports.verifyPayment = async (req, res) => {
  if (typeof req.params.token === "undefined") {
    res.status(402).json({ msg: "!invalid" });
    return;
  }
  let token = req.params.token;
  let tokenFind = null;
  try {
    tokenFind = await bill.findOne({ token: token });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (tokenFind == null) {
    res.status(404).json({ msg: "not found!!!" });
    return;
  }
  try {
    await bill.findByIdAndUpdate(
      tokenFind._id,
      { $set: { issend: "99" } },
      { new: "99" }
    );
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  res.status(200).json({ msg: "success!" });
};

exports.getBillByIDUser = async (req, res) => {
  if (typeof req.params.id_user === "undefined") {
    res.status(402).json({ msg: "data invalid" });
    return;
  }
  let billFind = null;
  try {
    billFind = await bill
      .find({ id_user: req.params.id_user })
      .sort({ date: -1 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
    return;
  }

  res.status(200).json({ data: billFind });
};

exports.statisticaRevenueDay = async (req, res) => {
  if (
    typeof req.body.day === "undefined" ||
    typeof req.body.month === "undefined" ||
    typeof req.body.year === "undefined"
  ) {
    res.status(402).json({ msg: "data invalid" });
    return;
  }
  let { day, month, year } = req.body;
  let billFind = null;
  try {
    billFind = await bill.find({
      date: {
        $gte: new Date(year, month - 1, day),
        $lt: new Date(year, month - 1, parseInt(day) + 1),
      },
      issend: "1",
    });
  } catch (err) {
    console.log(err);
    res.status(500).msg({ msg: err });
    return;
  }
  res.status(200).json({ data: billFind });
};
exports.statisticaRevenueMonth = async (req, res) => {
  if (
    typeof req.body.year === "undefined" ||
    typeof req.body.month === "undefined"
  ) {
    res.status(402).json({ msg: "data invalid" });
    return;
  }
  let { month, year } = req.body;
  let billFind = null;
  try {
    billFind = await bill.find({
      date: {
        $gte: new Date(year, parseInt(month) - 1, 1),
        $lt: new Date(year, month, 1),
      },
      issend: "1",
    });
  } catch (err) {
    console.log(err);
    res.status(500).msg({ msg: err });
    return;
  }
  res.status(200).json({ data: billFind });
};
exports.statisticaRevenueYear = async (req, res) => {
  if (typeof req.body.year === "undefined") {
    res.status(402).json({ msg: "data invalid" });
    return;
  }
  let { year } = req.body;
  let billFind = null;
  try {
    billFind = await bill.find({
      date: {
        $gte: new Date(year, 0, 1),
        $lt: new Date(parseInt(year) + 1, 0, 1),
      },
      issend: "1",
    });
  } catch (err) {
    console.log(err);
    res.status(500).msg({ msg: err });
    return;
  }
  res.status(200).json({ data: billFind });
};
exports.statisticaRevenueQuauter = async (req, res) => {
  if (
    typeof req.body.year === "undefined" ||
    typeof req.body.quauter === "undefined"
  ) {
    res.status(402).json({ msg: "data invalid" });
    return;
  }
  let { year, quauter } = req.body;
  if (quauter < 1 || quauter > 4) {
    res.status(402).json({ msg: "data invalid" });
    return;
  }
  let start = 1,
    end = 4;
  if (parseInt(quauter) === 2) {
    start = 4;
    end = 7;
  }
  if (parseInt(quauter) === 3) {
    start = 7;
    end = 10;
  }
  if (parseInt(quauter) === 3) {
    start = 10;
    end = 13;
  }
  let billFind = null;
  try {
    billFind = await bill.find({
      date: {
        $gte: new Date(year, start - 1, 1),
        $lt: new Date(year, end - 1, 1),
      },
      issend: "1",
    });
  } catch (err) {
    console.log(err);
    res.status(500).msg({ msg: err });
    return;
  }
  res.status(200).json({ data: billFind });
};
exports.getBillNoVerify = async (req, res) => {
  let count = null;
  try {
    count = await bill.count({ issend: "99" });
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
  bill
    .find({ issend: "99" })
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
exports.getBillVerify = async (req, res) => {
  let count = null;
  try {
    count = await bill.count({ issend: "1" });
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
  bill
    .find({ issend: "1" })
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
exports.getProcessing = async (req, res) => {
  let count = null;
  try {
    count = await bill.count({ issend: "0" });
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
  bill
    .find({ issend: "0" })
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

exports.updateIssend = async (req, res) => {
  if (
    typeof req.body.name === "undefined" ||
    typeof req.body.id === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let id = req.body.id;
  let issend = req.body.name;
  let billFind;
  try {
    billFind = await bill.findById(id);
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (billFind === null) {
    res.status(422).json({ msg: "not found" });
    return;
  }

  billFind.issend = issend;
  try {
    await billFind.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success", bill: { issend: issend } });
};
