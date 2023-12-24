const { Web3 } = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const contractABI = require('./build/contracts/SupplyChain.json').abi;
const contractAddress = '0x6963A2B4DaA7Efe8ae03e2E9585D4D1bA417F38d';

function parseJsonToLot(jsonData) {
    const parsedData = JSON.parse(jsonData);
    const { barcodeId, newstockdate } = parsedData;
    return { barcodeId, newstockdate };
}

async function interactWithContract(jsonData) {
    const updateInstance = parseJsonToLot(jsonData);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];

        contract.methods.updateStockdate(updateInstance.barcodeId,updateInstance.newstockdate);

       
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const jsonData = '{"barcodeId": "2", "newstockdate": 40}';
interactWithContract(jsonData);
