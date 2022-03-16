pragma solidity ^0.5.0;

contract EthSwap {
    string public name;
    
    //CREATES CART BUNDLE FOR ETHEREUM PAYMENT

    struct Product{
        string name;//Bundle if many games
        uint price;//Total Price
        address owner;//UNIQUE ACCOUNT
    }


    event ProductPurchased(
        address payable owner

    );

    constructor() public{
        name ="Gameschain";
    }

    function createTransaction() public payable {
        address payable  myAddress = 0xf13a144ccAf9762378bee509257060C9C6Aa7aa7;
        require(msg.value>1);
        require(myAddress != msg.sender);
        address(myAddress).transfer(msg.value);
        emit ProductPurchased( myAddress);
    }


}