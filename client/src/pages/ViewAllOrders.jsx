import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
const ViewAllOrders = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const allTasks = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/ethereum/view-all-order",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.status === 200) {
          console.log(data.orderList);
          setTaskList(data.orderList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    allTasks();
  }, []);
  return (
    <>
      <Navigation />
      <table className="view_all_orders">
        <thead>
          <tr className="view_all_orders_card header">
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <tr
              className="view_all_orders_card"
              key={task.id}
              style={
                task.id !== "" && task.name !== "" && task.date !== ""
                  ? {}
                  : { display: "none" }
              }
            >
              <td>{task.orderId}</td>
              <td>{task.orderDate}</td>
              <td>{task.status}</td>
              <td>{task.customerName}</td>
              <td>{task.customerAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ViewAllOrders;
