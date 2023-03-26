const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./api/routers/user.router");
const categoryRouter = require("./api/routers/categoy.router");
const foodRouter = require("./api/routers/food.router");
const authorRouter = require("./api/routers/author.router");
const restaurantRouter = require("./api/routers/restaurant.router");
const URL = `mongodb+srv://quanlycang:i9Ckja1C9SWUvepw@cluster0.xkqgiii.mongodb.net/?retryWrites=true&w=majority`;
const test = () => {
  Object.keys(data).forEach(function (k) {
    var _dic = [];
    var _ward = [];
    Object.keys(data[k].district).forEach(function (j) {
      Object.keys(data[k].district[j].ward).forEach(function (l) {
        _ward.push({
          name: data[k].district[j].ward[l].name,
          code: data[k].district[j].ward[l].code,
        });
      });
      _dic.push({
        name: data[k].district[j].name,
        code: data[k].district[j].code,
        ward: _ward,
      });
    });
    const new_address = new address({
      city: data[k].name,
      district: _dic,
      code: data[k].code,
    });
    try {
      new_address.save();
    } catch (Err) {
      console.log(Err);
    }
  });
};
// test();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

userRouter(app);
categoryRouter(app);
foodRouter(app);
authorRouter(app);
restaurantRouter(app);

app.get("/", (req, res) => {
  res.send("welcome to fashtion_food");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to DB");
    app.listen(port, () => console.log("server running on port " + port));
  });
