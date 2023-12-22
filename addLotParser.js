const { Web3 } = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const contractABI = require('./build/contracts/SupplyChain.json').abi;
const contractAddress = '0x5577574b51B33818e3Bf8248Af10d7F74f862C00';

class Lot {
    constructor(id_lot, barcodeId, lot_user_addr, source, variety, quality, temprature, humidity, date, stockdate) {
        this.id_lot = id_lot;
        this.barcodeId = barcodeId;
        this.lot_user_addr = lot_user_addr;
        this.source = source;
        this.variety = variety;
        this.quality = quality;
        this.temprature = temprature;
        this.humidity = humidity;
        this.date = date;
        this.stockdate = stockdate;
    }
}

function parseJsonToLot(jsonData) {

    const parsedData = JSON.parse(jsonData);
    const { id_lot, barcodeId, lot_user_addr, source, variety, quality, temprature, humidity, date, stockdate} = parsedData;

    return new Lot(id_lot, barcodeId, lot_user_addr, source, variety, quality, temprature, humidity, date, stockdate);
}

async function interactWithContract(jsonData) {

    const lotInstance = parseJsonToLot(jsonData);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];
        
        const result = await contract.methods
            .addLot(
                lotInstance,Math.floor(Date.now()/1000)
            )
            .send({ from: senderAddress, gas: '5000000' });

        console.log('Transaction Hash:', result.transactionHash);
        console.log('Transaction Receipt:', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const jsonData = '{"id_lot": 1, "barcodeId": "0094", "lot_user_addr": "0x404BEc9172f4c55790e9f2D9dBbdBc5feb4d215C", "source": "Supplier", "variety": "TypeA", "quality": "High", "temprature": 25, "humidity": 50,"date": 10, "stockdate": 0}';

interactWithContract(jsonData);
