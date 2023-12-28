import { useState } from "react";
import Navigation from "../components/Navigation";
const ViewOrder = () => {
  const [task, setTask] = useState({ numId: null, name: null, date: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const viewOrder = async (event) => {
    try {
      event.preventDefault();
      const orderID = document.querySelector("#orderID").value;
      const res = await fetch(
        `http://localhost:3000/api/ethereum/view-order/${orderID}`,
        {
          method: "GET",
          headers: {
            "contetnt-type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        console.log(data.orderObj);
        setTask(data.orderObj);
      } else {
        throw new Error();
      }
    } catch (error) {
      setModalVisible(true);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };
  return (
    <>
      <Navigation />
      <div className="view_order todo_btn">
        {task.numId !== null && task.name !== null && task.date !== null ? (
          <div className="view_order_by_id  view_all_orders_card">
            <p>Task ID: {task.numId}</p>
            <p>Task Name: {task.name}</p>
            <p>Task Date: {task.date}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
        <form onSubmit={viewOrder}>
          <label>
            ID:
            <input id="orderID" />
          </label>
          <button type="submit">View Order</button>
        </form>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ViewOrder;
