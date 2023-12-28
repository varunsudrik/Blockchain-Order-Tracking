import PropTypes from "prop-types";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import ABI from "./ABI.json";
const Wallet = ({ saveState }) => {
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAddress = "0xd8254Db5A7D734b629A65D869Bac95A15dc9f3CC";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        saveState({ web3: web3, contract: contract, account: accounts[0] });
        navigateTo("/view-all-orders");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="wallet_header ">
        <span>WELCOME TO</span> <p>Supply Chain Management</p>
      </div>
      <div className="connect_wallet_section todo_btn">
        <p> Please connect metamask wallet to access the app </p>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </>
  );
};
Wallet.propTypes = {
  saveState: PropTypes.func.isRequired,
};

export default Wallet;
