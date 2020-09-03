const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
  const query = {
    user: req.user.id,
    offset: 0,
  };
  if (req.query.start) {
    query.date = {
      //   $gte -mongoose - больше или равно
      $gte: req.query.start,
    };
    if (req.query.end) {
      if (!query.date) {
        query.date = {};
      }
      query.date["$lte"] = req.query.end;
    }
    if (req.query.order) {
      query.order = +req.query.order;
    }
    try {
      const orders = await Order.find(query)
        .sort({ date: -1 })
        .skip(+req.query.offset) // бесконечный скролл
        .limit(+req.query.limit);
      res.statue(200).json(orders);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
module.exports.create = async function (req, res) {
  try {
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({
      date: -1,
    });
    const maxOrder = lastOrder ? lastOrder.order : 0;
    const order = await new Order({
      list: req.body.list,
      user: req.body.id,
      order: maxOrder + 1,
    }).save();
    res.status(201).json(order);
  } catch (e) {
    errorHandler(res, e);
  }
};
