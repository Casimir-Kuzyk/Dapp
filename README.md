We are using to start building web apps!

We use a npm package called browserify to bundle up code to be served to the browser. This repository has it installed already, with npm install --save browserify. Then, in package.json, we have added a build script to run it. It will take index.js, and bundle it into bundle.js. You need to do npm run build whenever you change index.js or the changes will not be reflected!

When viewing an html page, you can view the console by right clicking the page, selecting Inspect, then clicking console in the tab that opens up.

You will need Metamask installed, or the Gamestop wallet set to default provider, which is injected as window.ethereum and available in your javascript code at that property.

Homework:

Install the Live Server VS Code Extension. This will let you be able to right-click the index.html, select Live Server, and then view it in the browser with auto-reload when you make changes to the HTML file.

Use event listeners! a) In your javascript file, add an event listener to the document with document.addEventListener(eventType, function() {}. b) Use alert to make a popup when you click the page. alert("hello");

Add a button that can get a user's ethereum balance! a) Create a button in your HTML file. All HTML tags should go within the tag and before the closing tag. b) Add an ID to your button, like "my-button". c) In your javascript index.js file, get that button element by id using document.getElementById. Place an eventListener on the button using addEventListener on the button, listening for the "click" event, and log something to the consoel to verify it works when you click the button. d) Now that we know it works, we can add our real code! Using the ethers library, we can access an injected Metamask via window.ethereum, and we can create a provider with new ethers.providers.Web3Provider(window.ethereum);. Using this provider, when the user clicks the button, log the user's balance to the console.

Display the user's ethereum balance and address on the page! a) In the button's event listener function, get the user's ethereum address via the ethers provider. You can do this with something like:

provider.send("eth_requestAccounts", []).then((addresses) => {
  // use the ethers library to get the users balance, and display it to the page.
  console.log(addresses);
  const address = addresses[0];
  console.log(address);

  provider.getBalance(address).then((balance) => {
    console.log(balance.toString());
  });
});
Ethereum provider's have a .send method that lets you make remote calls to them, and they return Promises, so we need to use .then to get the result. If I changed this to eth_getBlock, it would return me the latest ethereum block. There are many Ethereum provider methods, google a list of them and experiment!

Now we have both the address and the balance. a) Create a

div element in your html page. Give it an id, like ethereum-address.
b) In your javascript index.js, in the function callback we already have on the button's addEventListener, get that div element by ID. Then, set it's .innervalue property to the user's ethereum address.

c) Repeat steps a and b for the ethereum balance. You should be able to click a button, then see your balance and address on the page.

Work on a dapp! Our dapp provides information about the current Ethereum network. a) Using HTML and CSS, style the page so it looks nice. Display the user's ethereum address and balance in the navbar. Give it a nice header, "Ethereum Dapp", styled. Practice your HTML and CSS, and get comfortable creating elements, giving them ids, and then styling them, then adding functionality to them. The app should look GOOD! Things should be aligned properly. Google will be your friend here, "how to center a div in CSS", "how to change background color in CSS", etc.

b) Create several new buttons that can do functions like:

Get the current ethereum block number and display it to the page
Get the current gas price and display it to the page
Get the current chain ID and network name, and display it to the page