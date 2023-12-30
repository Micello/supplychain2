To deploy the blockchain:
1. Install npm packages (npm install)
2. start locally ganache
3. add the first user of ganache to truffle-config.js and Users.sol (you can replace the current user's address) 
4. Deploy the code (truffle migrate --reset)

To interact with the blockchain:
1. launch "truffle console"
2. Initialize variable with "supplychain = await SupplyChain.deployed()"
3. Use functions of SupplyChain.sol like this 
supplychain.addLot([1, "2", "0x2B2Cfe1b7a6e27DC92673c09f76aFe1326918Bbf", "FarmA", "Vegetable", "GradeA", 25, 60, 1030,0],20)

To use the javascript parsing APIs:
1. Copy the contract address just generated in the contractAddress variable of the three parsers.
2. In case of addLotParser.js you need also to match the lot's address in the jsonData variable
3. In case of updateStockdateParser.js you need to match the new barcodeId lot
4. In case of addTransaction change accordingly barcodeId and the users addresses.

To launch the front-end:
1. Change the web3 version: npm uninstall web3, npm install web3@^0.20.6
2. launch browser istance: npm run dev
3. From metamask extension, connect to the ganache network and import address from ganache with the use of the private key of the first ganache user.
4. Connect the user from metamask extension and update the page. If the address of the page change you are succesfully connected! 