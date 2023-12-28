const { Web3 } = require("web3");
const ABI = require("../ABI.json");
const web3 = new Web3(
  "https://yolo-rough-panorama.ethereum-sepolia.quiknode.pro/d28cbfe21a87a15716a007fe26f64c012930c59c/"
);
const contractAddress = "0xd8254Db5A7D734b629A65D869Bac95A15dc9f3CC";
const contract = new web3.eth.Contract(ABI, contractAddress);
//console.log(contract, "Contract");

module.exports = { contract };
