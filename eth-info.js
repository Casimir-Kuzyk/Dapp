import { ethers } from "ethers";

function getEthInfo(address,ethBalanceDiv,ethGasDiv,ethBlockDiv){
    //get wallet balance
    window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"]
    }).then(balance => {
        ethBalanceDiv.innerText = parseInt(balance);
    })

    //get estimated ethereum gas price
    window.ethereum.request({
        method: "eth_gasPrice",
        params: []
    }).then(gasPrice => {
        ethGasDiv.innerText= ethers.utils.formatEther(gasPrice);
    })


    //get the current ethereum block
    window.ethereum.request({
        method: "eth_blockNumber",
        params: []
    }).then(blockNumber => {
        ethBlockDiv.innerText = parseInt(blockNumber);
    });
}

module.exports = getEthInfo;