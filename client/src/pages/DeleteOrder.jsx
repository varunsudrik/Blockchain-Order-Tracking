import { useState } from "react";
import Navigation from "../components/Navigation";

const DeleteOrder = ({ state }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  const { contract, account } = state;

  const deleteOrder = async (event) => {
    event.preventDefault();
    const orderID = document.querySelector("#orderID").value;

    try {
      const res = await fetch(
        "http://localhost:3000/api/ethereum/delete-task",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderID: orderID }),
        }
      );

      const data = await res.json();
      console.log(data, "dataaaa");
      if (data.status === 200) {
        await contract.methods.DeleteOrder(orderID).send({ from: account });
        setModalContent(`Order: ${orderID} deleted successfully`);
        setModalVisible(true);
      } else {
        throw new Error(`Order: ${orderID} Cant be deleted`);
      }
    } catch (error) {
      console.log(error);
      setModalVisible(true);
    }
  };

  return (
    <>
      <Navigation />
      <div className="delete_order todo_btn">
        <form onSubmit={deleteOrder}>
          <label>
            ID:
            <input id="orderID" />
          </label>
          <button type="submit">Delete Order</button>
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

export default DeleteOrder;
