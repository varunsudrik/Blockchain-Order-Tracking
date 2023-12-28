// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OrderTracking {
    struct Order {
        uint id;
        string orderDate;
        string currentDate;
        string status; // Change to string
        string customerName;
        string customerAddress;
    }

    address public owner;
    mapping(uint => Order) public orders;
    uint public orderId = 1;

    event OrderCreate(uint orderId, string status, string customerName);
    event OrderUpdate(uint orderId, string status, string customerName);
    event OrderDelete(uint orderId);

    modifier CheckOrderId(uint _id) {
        require(_id != 0 && _id < orderId, "Invalid Order Id");
        _;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function CreateOrder(
        string calldata _orderDate,
        string calldata _currentDate,
        string calldata _status,
        string calldata _customerName,
        string calldata _customerAddress
    ) public {
        orders[orderId] = Order({
            id: orderId,
            orderDate: _orderDate,
            currentDate: _currentDate,
            status: _status,
            customerName: _customerName,
            customerAddress: _customerAddress
        });
        emit OrderCreate(orderId, _status, _customerName);
        orderId++;
    }

    function UpdateOrder(
        uint _orderId,
        string calldata _orderDate,
        string calldata _currentDate,
        string calldata _status, // Change to string
        string calldata _customerName,
        string calldata _customerAddress
    ) public CheckOrderId(_orderId) OnlyOwner {
        orders[_orderId] = Order({
            id: _orderId,
            orderDate: _orderDate,
            currentDate: _currentDate,
            status: _status,
            customerName: _customerName,
            customerAddress: _customerAddress
        });
        emit OrderUpdate(_orderId, _status, _customerName);
    }

    function AllOrders() public view returns (Order[] memory) {
        Order[] memory orderList = new Order[](orderId - 1);
        for (uint i = 0; i < orderId - 1; i++) {
            orderList[i] = orders[i + 1];
        }
        return orderList;
    }

    function ViewOrder(
        uint _orderId
    ) public view CheckOrderId(_orderId) returns (Order memory) {
        return orders[_orderId];
    }

    function DeleteOrder(
        uint _orderId
    ) public CheckOrderId(_orderId) OnlyOwner {
        delete orders[_orderId];
        emit OrderDelete(_orderId);
    }
}
