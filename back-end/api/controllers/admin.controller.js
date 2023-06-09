"use strict";
var cloudinary = require("cloudinary").v2;
var uploads = {};
cloudinary.config({
  cloud_name: "db18w7hbk",
  api_key: "564837747951159",
  api_secret: "LgGKU5Qeze-EE37UkvovD1bM_WY",
});

const food = require("../models/food.model");
const user = require("../models/user.model");
const category = require("../models/category.model");
const author = require("../models/author.model");
const restaurant = require("../models/restaurant.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const uploadImg = async (path) => {
  let res;
  try {
    res = await cloudinary.uploader.upload(path);
  } catch (err) {
    console.log(err);
    return false;
  }
  return res.secure_url;
};
exports.addfood = async (req, res) => {
  if (
    typeof req.file === "undefined" ||
    typeof req.body.name === "undefined" ||
    typeof req.body.category === "undefined" ||
    typeof req.body.restaurant === "undefined" ||
    typeof req.body.price === "undefined" ||
    typeof req.body.release_date === "undefined" ||
    typeof req.body.describe === "undefined" ||
    typeof req.body.chef === "undefined" ||
    typeof req.body.amount === 0
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  const {
    category,
    id_category,
    restaurant,
    id_restaurant,
    name,
    price,
    release_date,
    describe,
    chef,
    amount,
  } = req.body;
  console.log("be-addFood", amount);
  let urlImg = await uploadImg(req.file.path);
  if (urlImg === false) {
    res.status(500).json({ msg: "server error" });
    return;
  }
  const newfood = new food({
    category: category,
    id_category: id_category,
    id_restaurant: id_restaurant,
    restaurant: restaurant,
    name: name,
    price: price,
    release_date: release_date,
    img: urlImg,
    describe: describe,
    chef: chef,
    amount: amount,
  });
  try {
    console.log(newfood);
    newfood.save();
  } catch (err) {
    res.status(500).json({ msg: "server error" });
    return;
  }
  fs.unlink(req.file.path, (err) => {
    if (err) throw err;
  });
  res.status(201).json({ msg: "success" });
};
exports.updatefood = async (req, res) => {
  if (
    typeof req.body.name === "undefined" ||
    typeof req.body.id === "undefined" ||
    typeof req.body.category === "undefined" ||
    typeof req.body.restaurant === "undefined" ||
    typeof req.body.price === "undefined" ||
    typeof req.body.release_date === "undefined" ||
    typeof req.body.describe === "undefined" ||
    typeof req.body.chef === "undefined" ||
    typeof req.body.amount === 0
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let {
    name,
    id,
    category,
    id_category,
    restaurant,
    id_restaurant,
    price,
    release_date,
    describe,
    chef,
    amount,
  } = req.body;
  console.log("chef", chef);
  let foodFind;
  try {
    foodFind = await food.findById(id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  if (foodFind === null) {
    res.status(404).json({ msg: "Not found" });
    return;
  }
  let urlImg = null;
  if (typeof req.file !== "undefined") {
    urlImg = await uploadImg(req.file.path);
  }
  if (urlImg !== null) {
    if (urlImg === false) {
      res.status(500).json({ msg: "server error" });
      return;
    }
  }
  if (urlImg === null) urlImg = foodFind.img;

  foodFind.category = category;
  foodFind.id_category = id_category;
  foodFind.id_restaurant = id_restaurant;
  foodFind.name = name;
  foodFind.price = parseFloat(price);
  foodFind.release_date = release_date;
  foodFind.describe = describe;
  foodFind.chef = chef;
  foodFind.category = category;
  foodFind.restaurant = restaurant;
  foodFind.img = urlImg;
  foodFind.amount = amount;
  foodFind.save((err, docs) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(200).json({ msg: "success", data: foodFind });
};

exports.deletefood = async (req, res) => {
  if (typeof req.params.id === "undefined") {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let foodFind;
  try {
    foodFind = await food.findById(req.params.id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  foodFind.remove();
  res.status(200).json({ msg: "success" });
};
exports.deletecategory = async (req, res) => {
  if (typeof req.params.id === "undefined") {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let categoryFind;
  try {
    categoryFind = await category.findById(req.params.id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  categoryFind.remove();
  res.status(200).json({ msg: "success" });
};

exports.deleterestaurant = async (req, res) => {
  if (typeof req.params.id === "undefined") {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let restaurantFind;
  try {
    restaurantFind = await restaurant.findById(req.params.id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  restaurantFind.remove();
  res.status(200).json({ msg: "success" });
};

exports.updateUser = async (req, res) => {
  if (
    typeof req.body.email === "undefined" ||
    typeof req.body.firstName === "undefined" ||
    typeof req.body.lastName === "undefined" ||
    typeof req.body.address === "undefined" ||
    typeof req.body.phone_number === "undefined" ||
    typeof req.body.is_admin === "undefined" ||
    typeof req.body.is_manage === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let {
    email,
    firstName,
    lastName,
    address,
    phone_number,
    is_admin,
    is_manage,
  } = req.body;
  let userFind;
  try {
    userFind = await user.findOne({ email: email });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (userFind === null) {
    res.status(422).json({ msg: "not found" });
    return;
  }
  userFind.firstName = firstName;
  userFind.lastName = lastName;
  userFind.address = address;
  userFind.phone_number = phone_number;
  userFind.is_admin = is_admin;
  userFind.is_manage = is_manage;
  try {
    await userFind.save();
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  res.status(200).json({
    msg: "success",
    user: {
      email: userFind.email,
      firstName: userFind.firstName,
      lastName: userFind.lastName,
      address: userFind.address,
      phone_number: userFind.phone_number,
      is_admin: userFind.is_admin,
      is_manage: userFind.is_manage,
    },
  });
};

exports.deleteUser = async (req, res) => {
  if (typeof req.body.email === "undefined") {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let userFind;
  try {
    userFind = await user.findOne({ email: req.body.email });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  userFind.remove();
  res.status(200).json({ msg: "success" });
};

exports.addCategory = async (req, res) => {
  console.log(req.body);
  if (typeof req.body.name === "undefined") {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { name } = req.body;
  let categoryFind;
  try {
    categoryFind = await category.find({ name: name });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (categoryFind.length > 0) {
    res.status(409).json({ msg: "Category already exist" });
    return;
  }
  const newCategory = new category({ name: name });
  try {
    await newCategory.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success" });
};

exports.updateCategory = async (req, res) => {
  if (
    typeof req.body.id === "undefined" ||
    typeof req.body.name === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { id, name } = req.body;
  let categoryFind;
  try {
    categoryFind = await category.findById(id);
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (categoryFind === null) {
    res.status(422).json({ msg: "not found" });
    return;
  }
  categoryFind.name = name;
  try {
    await categoryFind.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success", category: { name: name } });
};

exports.addAuthor = async (req, res) => {
  if (typeof req.body.name === "undefined") {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { name } = req.body;
  let authorFind;
  try {
    authorFind = await author.find({ name: name });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (authorFind.length > 0) {
    res.status(409).json({ msg: "Author already exist" });
    return;
  }
  const newAuthor = new author({ name: name });
  try {
    await newAuthor.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success" });
};

exports.updateAuthor = async (req, res) => {
  if (
    typeof req.body.id === "undefined" ||
    typeof req.body.name === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { id, name } = req.body;
  let authorFind;
  try {
    authorFind = await author.findById(id);
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (authorFind === null) {
    res.status(422).json({ msg: "not found" });
    return;
  }
  authorFind.name = name;
  try {
    await authorFind.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success", author: { name: name } });
};

exports.addRestaurant = async (req, res) => {
  if (typeof req.body.name === "undefined") {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { name } = req.body;
  let restaurantFind;
  try {
    restaurantFind = await restaurant.find({ name: name });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (restaurantFind.length > 0) {
    res.status(409).json({ msg: "Author already exist" });
    return;
  }
  const newRestaurant = new restaurant({ name: name });
  try {
    await newRestaurant.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success" });
};

exports.updateRestaurant = async (req, res) => {
  if (
    typeof req.body.id === "undefined" ||
    typeof req.body.name === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { id, name } = req.body;
  let restaurantFind;
  try {
    restaurantFind = await restaurant.findById(id);
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (restaurantFind === null) {
    res.status(422).json({ msg: "not found" });
    return;
  }
  restaurantFind.name = name;
  try {
    await restaurantFind.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success", restaurant: { name: name } });
};
exports.addUser = async (req, res) => {
  if (
    typeof req.body.email === "undefined" ||
    typeof req.body.password === "undefined" ||
    typeof req.body.firstName === "undefined" ||
    typeof req.body.lastName === "undefined" ||
    typeof req.body.address === "undefined" ||
    typeof req.body.phone_number === "undefined" ||
    typeof req.body.is_admin === "undefined" ||
    typeof req.body.is_manage === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let {
    email,
    password,
    firstName,
    lastName,
    address,
    phone_number,
    is_admin,
    is_manage,
  } = req.body;
  let userFind = null;
  try {
    userFind = await user.find({ email: email });
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log(1);
    return;
  }
  if (userFind.length > 0) {
    res.status(409).json({ msg: "Email already exist" });
    return;
  }
  password = bcrypt.hashSync(password, 10);
  const newUser = new user({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    address: address,
    phone_number: phone_number,
    is_verify: true,
    is_admin: is_admin,
    is_manage: is_manage,
  });
  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success" });
};
exports.getAllUser = async (req, res) => {
  if (typeof req.params.page === "undefined") {
    res.status(402).json({ msg: "Data invalid" });
    return;
  }
  let count = null;
  try {
    count = await user.count({});
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
  user
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
exports.login = async (req, res) => {
  console.log(req.body);
  if (
    typeof req.body.email === "undefined" ||
    typeof req.body.password == "undefined"
  ) {
    res.status(402).json({ msg: "Invalid data" });
    return;
  }
  let { email, password } = req.body;
  let userFind = null;
  try {
    userFind = await user.findOne({ email: email, is_admin: true });
    if (userFind == null) {
      userFind = await user.findOne({ email: email, is_manage: true });
    }
  } catch (err) {
    res.json({ msg: err });
    return;
  }
  if (userFind == null) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }

  if (!userFind.is_verify) {
    res.status(401).json({ msg: "no_registration_confirmation" });
    return;
  }

  if (!bcrypt.compareSync(password, userFind.password)) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let token = jwt.sign(
    { email: email, iat: Math.floor(Date.now() / 1000) - 60 * 30 },
    "shhhhh"
  );
  res.status(200).json({
    msg: "success",
    token: token,
    user: {
      email: userFind.email,
      is_admin: userFind.is_admin,
      is_manage: userFind.is_manage,
      firstName: userFind.firstName,
      lastName: userFind.lastName,
      address: userFind.address,
      phone_number: userFind.phone_number,
      id: userFind._id,
    },
  });
};
