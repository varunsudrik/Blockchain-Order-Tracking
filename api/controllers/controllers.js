const { dateclashCheck, orderCheck } = require("../model/tasks");
const { contract } = require("../contract/contract");
const createOrder = async (req, res) => {
  try {
    res.status(200).json({ status: 200, message: "Order Created" });
  } catch (error) {
    console.error(error);
  }
};
const updateOrder = async (req, res) => {
  const { taskDate } = req.body;
  const order = await dateclashCheck(taskDate);
  try {
    if (order !== "No Order Found") {
      res.status(409).json({ status: 409, message: "Order Cannot be updated" });
    } else {
      res.status(200).json({ status: 200, message: "Order can be updated" });
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { orderID } = req.body;
    console.log(orderID, "orderID");
    const OrderExist = await orderCheck(orderID);
    console.log(OrderExist, "isTrue");
    if (OrderExist) {
      res.status(200).json({ status: 200, message: "order can be deleted" });
    } else {
      res.status(403).json({ status: 403, message: "order cannot be deleted" });
    }
  } catch (error) {
    console.error(error);
  }
};
const viewOrder = async (req, res) => {
  try {
    const { orderID } = req.params;
    console.log(orderID);
    const order = await contract.methods.ViewOrder(orderID).call();
    const { id, name, date } = order;
    const numId = Number(id);
    const orderObj = {
      numId,
      name,
      date,
    };
    res.status(200).json({ status: 200, orderObj, message: "Order Exist" });
  } catch (error) {
    res.status(404).json({ status: 500, message: "Order does not exist" });
    console.error(error);
  }
};
const allOrders = async (req, res) => {
  try {
    const orders = await contract.methods.AllOrders().call();
    if (orders.length < 0) {
      res
        .status(404)
        .json({ status: 404, message: "Order list does not exist" });
    } else {
      const orderList = orders.map(
        ({
          id,
          orderDate,
          currentDate,
          status,
          customerName,
          customerAddress,
        }) => {
          const orderId = Number(id);
          return {
            orderId,
            orderDate,
            currentDate,
            status,
            customerName,
            customerAddress,
          };
        }
      );
      res.status(200).json({ status: 200, orderList, message: "Order Exist" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  viewOrder,
  allOrders,
};
