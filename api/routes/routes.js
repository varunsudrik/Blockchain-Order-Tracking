const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  viewOrder,
  allOrders,
} = require("../controllers/controllers");

router.route("/create-order").post(createOrder);
router.route("/update-order").post(updateOrder);
router.route("/delete-task").delete(deleteOrder);
router.route("/view-order/:orderID").get(viewOrder);
router.route("/view-all-order").get(allOrders);

module.exports = router;
