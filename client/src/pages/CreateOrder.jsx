import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const CreateOrder = ({ state }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [taskName, setTaskName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    setOrderDate(formattedDate);
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
  };

  const newOrder = async (event) => {
    event.preventDefault();
    const { contract, account } = state;

    try {
      const res = await fetch(
        "http://localhost:3000/api/ethereum/create-order",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            taskName: taskName,
            orderDate: orderDate,
            status: status,
            customerName: customerName,
            customerAddress: customerAddress,
          }),
        }
      );

      const data = await res.json();
      if (account) {
        if (contract && contract.methods) {
          await contract.methods
            .CreateOrder(
              taskName,
              orderDate,
              status,
              customerName,
              customerAddress
            )
            .send({ from: account });
          setModalContent("Order Added");
        }
      } else {
        alert("Order Cant");
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Navigation />
      <div className="create_order todo_btn">
        <form onSubmit={newOrder}>
          <label>
            Todays Date:
            <input
              id="orderDate"
              type="text"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </label>
          <label>
            Order Date:
            <input
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
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
          <button type="submit">Create Order</button>
        </form>

        {modalOpen && (
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

export default CreateOrder;
