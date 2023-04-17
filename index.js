// const ethers = require("ethers");
import axios from "axios";
import { ethers } from "ethers";
console.log('hey');

// const axios = require("axios");
// const axios = require('axios/dist/browser/axios.cjs')
//add a button that when clicked, it connects the users MetaMask wallet, and displays the eth balance and wallet address

const addressButton = document.getElementById('address-button');
const addressInput = document.getElementById('address-input');
const walletButton = document.getElementById('myButton');
const ethBalanceDiv = document.getElementById('ethBalance');
const ethAddressDiv = document.getElementById('ethAddress');
const ethBlockDiv = document.getElementById('ethBlock');
const ethGasDiv = document.getElementById('ethGas');
const ethChainDiv = document.getElementById('ethChain');
const ethNetworkDiv = document.getElementById('ethNetwork');

//button to connect to input address account

addressButton.addEventListener("click",function(){
    var address = addressInput.value;

    window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"]
    }).then(balance => {
        ethBalanceDiv.innerText = parseInt(balance);
    })

    window.ethereum.request({
        method: "eth_gasPrice",
        params: []
    }).then(gasPrice => {
        ethGasDiv.innerText= ethers.utils.formatEther(gasPrice);
    })

    window.ethereum.request({
        method: "eth_blockNumber",
        params: []
    }).then(blockNumber => {
        ethBlockDiv.innerText = parseInt(blockNumber);
    });

    //use API to gather NFTs from the address
    //first use axios to make an http request to the alchemy API
    const apiKey = "hpJuc6-oDz05yb8ORLdDoerArgsEFOtt";
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
    const testWallet = address;
    const urlStruct = `${baseURL}?owner=${testWallet}`;
    
    var config = {
        method: 'get',
        url: urlStruct
    };
    
    axios(config).then(function(response){
        for (var i=0; i < response.data.ownedNfts.length; i++){
            var nft = response.data.ownedNfts[i];
            var img = document.createElement('img');
            img.src = nft.metadata.image;
            img.classList.add('nftImage');
            document.getElementById('nftContainer').appendChild(img);
        };
    });
});

//button to connect to users metamask account

walletButton.addEventListener("click",function(){
    //provider is an ethereum provider, and we can create it with window.ethereum, which is how we access metamask in code.
    //window.ethereum object is available if a user has a metamask installed.
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.request({
        method: "eth_requestAccounts",
    }).then(addresses=> {

        // console.log(addresses);
        const address = addresses[0];
        console.log(address);
        ethAddressDiv.innerText = address.toString();


        window.ethereum.request({
            method: "eth_getBalance",
            params: [address, "latest"]
        }).then(balance => {
            ethBalanceDiv.innerText = parseInt(balance);
        })

        window.ethereum.request({
            method: "eth_gasPrice",
            params: []
        }).then(gasPrice => {
            ethGasDiv.innerText= ethers.utils.formatEther(gasPrice);
        })

        window.ethereum.request({
            method: "eth_blockNumber",
            params: []
        }).then(blockNumber => {
            ethBlockDiv.innerText = parseInt(blockNumber);
        });

        //use API to gather NFTs from the address
        //first use axios to make an http request to the alchemy API
        const apiKey = "hpJuc6-oDz05yb8ORLdDoerArgsEFOtt";
        const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
        const testWallet = address;
        const urlStruct = `${baseURL}?owner=${testWallet}`;
        
        var config = {
            method: 'get',
            url: urlStruct
        };
        
        axios(config).then(function(response){
            document.getElementById('nftContainer').innerHTML = "";
            for (var i=0; i < response.data.ownedNfts.length; i++){
                var nft = response.data.ownedNfts[i];
                var img = document.createElement('img');
                img.src = nft.metadata.image;
                img.classList.add('nftImage');
                document.getElementById('nftContainer').appendChild(img);
            };
        });
    });
});

