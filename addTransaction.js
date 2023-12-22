const { Web3 } = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const contractABI = require('./build/contracts/SupplyChain.json').abi;
const contractAddress = '0xf26C8EF7578353431528a8FeA07E03523AB22610';

class Transaction {
    constructor(senderAddress, receiverAddress, date, price, type_) {
        this.senderAddress = senderAddress;
        this.receiverAddress = receiverAddress;
        this.date = date;
        this.price = price;
        this.type_ = type_;
    }
}

function parseJsonToLot(jsonData) {
    const parsedData = JSON.parse(jsonData);
    const { transactionInstance, barcodeId } = parsedData;

    return new Transaction(
        transactionInstance.sender_lot_user_addr,
        transactionInstance.receiver_lot_user_addr,
        transactionInstance.date,
        transactionInstance.price,
        transactionInstance.type_
    );
}

async function interactWithContract(jsonData) {
    const { transactionInstance, barcodeId } = parseJsonToLot(jsonData);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];

        const result = await contract.methods
            .addTransaction(
                transactionInstance,
                barcodeId,
                Math.floor(Date.now() / 1000)
            )
            .send({ from: senderAddress, gas: '5000000' });

        console.log('Transaction Hash:', result.transactionHash);
        console.log('Transaction Receipt:', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const jsonData = '{"transactionInstance": {"sender_lot_user_addr": "0x404BEc9172f4c55790e9f2D9dBbdBc5feb4d215C","receiver_lot_user_addr": "0xf0FE51d2F0A1B450bA6F4c03603b78a932FE771f", "date": "324324", "price": "200", "type_": "0"}, "barcodeId": 123}';

interactWithContract(jsonData);
