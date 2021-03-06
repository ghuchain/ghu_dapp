import web3 from '../web3';
import { CHAIN_ID } from '../config';

const mainnetAddr = '0x905b2E89EBC84244c8Fe2047c89955feDe63BBA1';
const testnetAddr = '0x28d7fEecd1aB9Dae7d83cbB986f2A2Ecb127183d';
const abi = [{"constant": true,"inputs": [],"name": "name","outputs": [{"name": "tokenName","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "spender","type": "address"},{"name": "amount","type": "uint256"}],"name": "approve","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"name": "supply","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "from","type": "address"},{"name": "to","type": "address"},{"name": "amount","type": "uint256"}],"name": "transferFrom","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"name": "tokenDecimals","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "owner","type": "address"}],"name": "balanceOf","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "renounceOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "isOwner","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"name": "tokenSymbol","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "to","type": "address"},{"name": "amount","type": "uint256"}],"name": "transfer","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "to","type": "address"},{"name": "amount","type": "uint256"},{"name": "data","type": "bytes"}],"name": "transfer","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "owner","type": "address"},{"name": "spender","type": "address"}],"name": "allowance","outputs": [{"name": "remaining","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"name": "name","type": "string"},{"name": "symbol","type": "string"},{"name": "decimals","type": "uint8"},{"name": "totalSupply","type": "uint256"},{"name": "owner","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "amount","type": "uint256"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "amount","type": "uint256"},{"indexed": false,"name": "data","type": "bytes"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "spender","type": "address"},{"indexed": false,"name": "amount","type": "uint256"}],"name": "Approval","type": "event"},{"constant": false,"inputs": [{"name": "account","type": "address"},{"name": "value","type": "uint256"}],"name": "mint","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "account","type": "address"},{"name": "value","type": "uint256"}],"name": "burn","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"}]; // eslint-disable-line

let mainnet;
let testnet;

export default (network) => {
  switch (network) {
    case CHAIN_ID.MAINNET: {
      if (!mainnet) {
        mainnet = new web3.eth.Contract(abi, mainnetAddr);
      }
      return mainnet;
    }
    case CHAIN_ID.TESTNET: {
      if (!testnet) {
        testnet = new web3.eth.Contract(abi, testnetAddr);
      }
      return testnet;
    }
    default: {
      return undefined;
    }
  }
};
