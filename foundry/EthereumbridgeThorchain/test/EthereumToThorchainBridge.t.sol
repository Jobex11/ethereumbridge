// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthereumToThorchainBridge {
    address public admin;
    uint256 public constant TAX_PERCENTAGE = 25; // 2.5% tax (25 basis points)
    mapping(address => bool) public isWhitelisted;

    event LockedETHForRUNE(
        address indexed user,
        uint256 amount,
        string thorchainAddress,
        uint256 tax
    );
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin);
    event Whitelisted(address indexed account, bool isWhitelisted);

    constructor() {
        admin = msg.sender;
        isWhitelisted[admin] = true; // Whitelist the admin by default
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function lockETH(
        string memory thorchainAddress,
        uint256 amountToLock
    ) external payable {
        require(amountToLock > 0, "Amount to lock must be greater than zero");
        require(msg.value >= amountToLock, "Insufficient ETH sent");

        uint256 tax = 0;

        if (!isWhitelisted[msg.sender]) {
            tax = (amountToLock * TAX_PERCENTAGE) / 1000; // Calculate 2.5% tax
        }

        uint256 amountAfterTax = amountToLock - tax;

        // Refund excess ETH sent
        if (msg.value > amountToLock) {
            payable(msg.sender).transfer(msg.value - amountToLock);
        }

        emit LockedETHForRUNE(
            msg.sender,
            amountAfterTax,
            thorchainAddress,
            tax
        );
    }

    function withdrawETH() external onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "New admin cannot be the zero address");
        emit AdminTransferred(admin, newAdmin);
        admin = newAdmin;
        isWhitelisted[admin] = true; // Automatically whitelist the new admin
    }

    function setWhitelisted(
        address account,
        bool _isWhitelisted
    ) external onlyAdmin {
        isWhitelisted[account] = _isWhitelisted;
        emit Whitelisted(account, _isWhitelisted);
    }
}
