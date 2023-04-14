// const ethers = require("ethers");
import axios from "axios";
import { ethers } from "ethers";
console.log('hey');

// const axios = require("axios");
// const axios = require('axios/dist/browser/axios.cjs')
//add a button that when clicked, it connects the users MetaMask wallet, and displays the eth balance and wallet address

const walletButton = document.getElementById('myButton');
const ethBalanceDiv = document.getElementById('ethBalance');
const ethAddressDiv = document.getElementById('ethAddress');
const ethBlockDiv = document.getElementById('ethBlock');
const ethGasDiv = document.getElementById('ethGas');
const ethChainDiv = document.getElementById('ethChain');
const ethNetworkDiv = document.getElementById('ethNetwork');

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
        ethAddressDiv.value = address.toString();


        window.ethereum.request({
            method: "eth_getBalance",
            params: [address, "latest"]
        }).then(balance => {
            ethBalanceDiv.value = parseInt(balance);
        })

        window.ethereum.request({
            method: "eth_gasPrice",
            params: []
        }).then(gasPrice => {
            ethGasDiv.value= ethers.utils.formatEther(gasPrice);
        })

        window.ethereum.request({
            method: "eth_blockNumber",
            params: []
        }).then(blockNumber => {
            ethBlockDiv.value = parseInt(blockNumber);
        });

        //use API to gather NFTs from the address
        //first use axios to make an http request to the alchemy API
        const apiKey = "hpJuc6-oDz05yb8ORLdDoerArgsEFOtt";
        const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
        const testWallet = '0xe257b12d6746705ce3caeb24f9079bded18fb54f';
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
                document.getElementById('nftImages').appendChild(img);
            };
        });
        
        //     .then(response => console.log(JSON.stringify(response.data,null,2)))
        //     .catch(error => console.log(error));



        // myAxios.get(url).then(function(response){ //response is the whole object.. we can use.data to just get what we need
        //     console.log(response.data)
        // });
    });
});
