
import axios from "axios";
import updateModal from "./update-modal.js"

//make sure all ipfs files are displayed properly on webpage
function parseImageUrl(gateway){
    var imgUrl = gateway;
    if (imgUrl.startsWith("ipfs://")){
        return "https://ipfs.io/ipfs/" + imgUrl.slice(8);
    } else {
        return imgUrl;
    };
}

//use axios to make an http request to the alchemy API

function displayNfts(address){
    console.log(address);
    const apiKey = "hpJuc6-oDz05yb8ORLdDoerArgsEFOtt";
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
    const testWallet = address;
    const urlStruct = `${baseURL}?owner=${testWallet}`;

    var config = {
        method: 'get',
        url: urlStruct
    };

    //get all of the NFTs URLs and display them to the webpage

    axios(config).then(function(response) {
        var nftContainer = document.getElementById('nftContainer');
        nftContainer.innerHTML = "";
        for (var i = 0; i < response.data.ownedNfts.length; i++) {
            (function() {
            // get the image URL for displaying
            var nft = response.data.ownedNfts[i];
            console.log(nft);
            var imgUrl = parseImageUrl(nft.media[0].gateway);
            // create an image element
            var img = document.createElement('img');
            img.src = imgUrl;
            img.classList.add('nftImage');
        
            // add a click event listener to the image
            img.addEventListener('click', function(event) {
                updateModal(event, nft);
            });
      
            // add the image element to the container
            nftContainer.appendChild(img);
            })();
        }
    });
}

module.exports = displayNfts;