import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const UpdateOrder = ({ state }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [orderID, setOrderID] = useState("");
  const [todaysDate, setTodaysDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  useEffect(() => {}, [orderID]);

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  const { contract, account } = state;

  const updateOrder = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/api/ethereum/update-order",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            orderDate: orderDate,
          }),
        }
      );

      const data = await res.json();
      if (data.status === 200) {
        await contract.methods
          .UpdateOrder(
            orderID,
            todaysDate,
            orderDate,
            status,
            customerName,
            customerAddress
          )
          .send({ from: account });

        setModalContent(`Order ID ${orderID} updated `);
        setModalVisible(true);
      } else {
        throw new Error("Order cannot be updated");
      }
    } catch (error) {
      setModalVisible(true);
    }
  };

  return (
    <>
      <Navigation />
      <div className="update_order todo_btn">
        <form onSubmit={updateOrder}>
          <label>
            ID:
            <input
              id="orderID"
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            />
          </label>
          <label>
            Todays Date:
            <input
              id="taskName"
              value={todaysDate}
              onChange={(e) => setTodaysDate(e.target.value)}
            />
          </label>
          <label>
            Order Date:
            <input
              id="orderDate"
              type="text"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </label>
          <label>
            Status:
            <select
              id="status"
              style={{ height: "40px" }}
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
              {/* Add more status options as needed */}
            </select>
          </label>
          <label>
            Customer Name:
            <input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>
          <label>
            Customer Address:
            <input
              id="customerAddress"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </label>
          <button type="submit">Update Order</button>
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

export default UpdateOrder;
