// to mannually test the solidity code you can run the command "truffle console" and these commands:
supplychain = await SupplyChain.deployed()
supplychain.addLot([1, "2", "0xD9356F2C4a5278A686560D55a6700E8049fDe2e0", "FarmA", "Vegetable", "GradeA", 25, 60, 1030,0],20)
supplychain.addTransaction(["0x404BEc9172f4c55790e9f2D9dBbdBc5feb4d215C", "0xf0FE51d2F0A1B450bA6F4c03603b78a932FE771f","324324","200","0"], "094",987);