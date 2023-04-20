import displayNfts from "./display-nft.js"
import getEthInfo from "./eth-info.js"

//define all of the html elements

const addressButton = document.getElementById('address-button');
const addressInput = document.getElementById('address-input');
const walletButton = document.getElementById('myButton');
const ethBalanceDiv = document.getElementById('ethBalance');
const ethAddressDiv = document.getElementById('ethAddress');
const ethBlockDiv = document.getElementById('ethBlock');
const ethGasDiv = document.getElementById('ethGas');
// const ethChainDiv = document.getElementById('ethChain');
// const ethNetworkDiv = document.getElementById('ethNetwork');


//button to connect to input address account

addressButton.addEventListener("click", () => {
    var address = addressInput.value;

    //get blockchain info like wallet balance, estimated gas fee, ethereum block
    getEthInfo(address,ethBalanceDiv,ethGasDiv,ethBlockDiv);

    //function to display all of the NFTs in the users wallet
    displayNfts(address);

});

//button to connect to users metamask account

walletButton.addEventListener("click", () => {
    //provider is an ethereum provider, and we can create it with window.ethereum, which is how we access metamask in code.
    //window.ethereum object is available if a user has a metamask installed.
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.request({
        method: "eth_requestAccounts",
    }).then(addresses=> {

        //get the wallet address
        const address = addresses[0];
        console.log(address);
        ethAddressDiv.innerText = address.toString();

        //get blockchain info like wallet balance, estimated gas fee, ethereum block
        getEthInfo(address,ethBalanceDiv,ethGasDiv,ethBlockDiv);

        //function to display all of the NFTs in the users wallet
        displayNfts(address);
    });
});