// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

import "./Types.sol";


contract Users {
    mapping(address => Types.UserDetails) internal users;

        
    constructor() public {
        Types.UserDetails memory producer = Types.UserDetails({
            role: Types.UserRole.device,
            id_: 0x795588Ec361F2b766Ea61Cd4B65c42e0Dd4a876B,
            name: "IoT",
            email: "IoT@example.com",
            isValue: true
        });
        Types.UserDetails memory database = Types.UserDetails({
            role: Types.UserRole.database,
            id_: 0xf0FE51d2F0A1B450bA6F4c03603b78a932FE771f,
            name: "DB",
            email: "DB@example.com",
            isValue: true
        });


        users[producer.id_] = producer;
        users[database.id_] = database;
    }

    event NewUser(string name, string email, Types.UserRole role);
    event LostUser(string name, string email, Types.UserRole role);
   
   
    function addUser(Types.UserDetails memory user) public {
     require(!has(user.role, user.id_), "Stesso utente con stesso ruolo gia esistente");
        users[user.id_] = user;
        emit NewUser(user.name, user.email, user.role);
    }

    function get(address account)
        internal
        view
        returns (Types.UserDetails memory)
    {
        require(account != address(0));
        return users[account];
    }

    function has(Types.UserRole role, address account) //usato in addUser
        internal
        view
        returns (bool)
    {
        require(account != address(0));
        return (users[account].id_ != address(0) &&
            users[account].role == role); 
    }

modifier hasRole(Types.UserRole role) {
    require(msg.sender != address(0));
    require(users[msg.sender].id_ != address(0) && users[msg.sender].role == role, "Unauthorized, not a database user");
    _;
}
    
    //controlla che solo i device, producers e database possano scrivere sulla blockchain
    modifier onlyManufacturers() {
    require(
        users[msg.sender].role == Types.UserRole.device ||
        users[msg.sender].role == Types.UserRole.producer,
        "Sender is not authorized"
            );
            _;
    }

    //controlla che il sender ha un utente
    modifier userExists() {
    require(users[msg.sender].isValue, "User does not exist");
    _;
}

    //controlla che l'indirizzo ha un utente
    modifier otherUserExists(address id_) {
    require(users[id_].isValue, "User does not exist");
    _;
}
}
