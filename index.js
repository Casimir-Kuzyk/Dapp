const ethers = require("ethers");

//add a button that when clicked, it connects the users MetaMask wallet, and displays the eth balance and wallet address

const walletButton = document.getElementById('myButton');
const ethBalanceDiv = document.getElementById('ethereum-balance');
const ethAddressDiv = document.getElementById('ethereum-address');

walletButton.addEventListener("click",function(){
    //provider is an ethereum provider, and we can create it with window.ethereum, which is how we access metamask in code.
    //window.ethereum object is available if a user has a metamask installed.
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //call the .send method on the provider, and tell it to request accounts.
    // this is how we get metamasks approval for a certain website
    provider.send("eth_requestAccounts",[])
    .then(addresses => {
        console.log(addresses);
        const address = addresses[0];
        console.log(address);
        ethAddressDiv.innerText = address.toString();

        provider.getBalance(address).then(balance => {
            console.log(balance.toString());
            ethBalanceDiv.innerText = balance.toString();
        })

        
    });
});

//a) Create a div element in your html page. Give it an id, like ethereum-address.
//b) In your javascript index.js, in the function callback we already have on the button's addEventListener, get that div element by ID. Then, set it's .innervalue property to the user's ethereum address.

//c) Repeat steps a and b for the ethereum balance. You should be able to click a button, then see your balance and address on the page.

//Work on a dapp! Our dapp provides information about the current Ethereum network. a) Using HTML and CSS, style the page so it looks nice. 
//Display the user's ethereum address and balance in the navbar. 
//Give it a nice header, "Ethereum Dapp", styled. Practice your HTML and CSS, and get comfortable creating elements, 
//giving them ids, and then styling them, then adding functionality to them. The app should look GOOD! 
//Things should be aligned properly. Google will be your friend here, "how to center a div in CSS", "how to change background color in CSS", etc.

//b) Create several new buttons that can do functions like:

//Get the current ethereum block number and display it to the page
//Get the current gas price and display it to the page
//Get the current chain ID and network name, and display it to the page