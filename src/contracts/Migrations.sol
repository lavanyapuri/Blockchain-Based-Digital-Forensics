// SPDX-License-Identifier: MIT
pragma solidity <=0.8.19;

contract Migrations{
    //declaring state variables
    address public owner;
    uint public last_completed_migration;

    constructor() public {
        //owner is the address of the contract owner, i.e., who deployed the contract
        owner = msg.sender;
    }

    //Modifiers can be applied to functions using the modifier keyword, and they are 
    //executed before the function code. If a modifier contains the _ symbol, it 
    //represents the location where the function code will be executed. If the function
    //code is valid, the _ is replaced with the function code during compilation. If 
    //the function code is invalid, the entire function call fails.
    modifier restricted(){
        //restrict access to certain functions to only the contract owner
        if(msg.sender == owner) _;
    }

    function setCompleted(uint completed) public restricted{
        //update the last_completed_migration variable to a specified value
        last_completed_migration = completed;
    }
    
    //upgrade the contract to a new address
    function upgrade(address new_address) public restricted{
        //create new instance of Migration contract
        Migrations upgraded = Migrations(new_address);
        //pass the last_completed_migration value to setCompleted
        upgraded.setCompleted(last_completed_migration);
    }
}