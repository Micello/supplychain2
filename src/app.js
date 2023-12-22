import Web3, { providers } from 'vendor/web3';
import { networks } from 'vendor/@truffle/contract';

const web3 = new Web3(new providers.HttpProvider(networks.development.host + ':' + networks.development.port));
const SupplyChain = artifacts.require('SupplyChain');



async function interactWithContract() {
    const lots = await web3.eth.getAllLots();
    const simpleContractInstance = await SupplyChain.deployed();

    // Example: Set data in the smart contract
    
}

interactWithContract();