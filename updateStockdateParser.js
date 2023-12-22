const { Web3 } = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const contractABI = require('./build/contracts/SupplyChain.json').abi;
const contractAddress = '0xf26C8EF7578353431528a8FeA07E03523AB22610';


function parseJsonToLot(jsonData) {

    const parsedData = JSON.parse(jsonData);
    const { barcodeId, newstockdate} = parsedData;

    return new Transaction( barcodeId, newstockdate);
}

async function interactWithContract(jsonData) {

    const updateIstance = parseJsonToLot(jsonData);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];
        
        const result = await contract.methods
            .updateStockdate(
                barcodeId,newstockdate
            )
            .send({ from: senderAddress, gas: '5000000' });

        console.log('Transaction Hash:', result.transactionHash);
        console.log('Transaction Receipt:', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const jsonData = '{"barcodeId": "093", "newstockdate": 30}';

interactWithContract(jsonData);
