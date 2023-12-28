const { contract } = require("../contract/contract");
const dateclashCheck = async (taskDate) => {
  const tasks = await contract.methods.allTask().call();
  const foundTask = tasks.find((task) => task.date === taskDate);

  if (foundTask) {
    return foundTask.name;
  }
  return "No Order Found";
};

const orderCheck = async (id) => {
  const tasks = await contract.methods.ViewOrder(id).call();
  const result = tasks[id];
  return result;
};
module.exports = { dateclashCheck, orderCheck };
