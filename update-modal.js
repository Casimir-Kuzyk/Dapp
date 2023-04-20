function updateModal(event,nft) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalDesc = document.getElementById('modalDesc');
  
    // set the modal image, name, and description based on the clicked image
    modalImg.src = event.target.src;
    modalName.textContent = nft.metadata.name;
    modalDesc.textContent = nft.description;
    modal.style.display = "flex";
  
    //program the close button
    const closeButton = document.getElementById('closeButton');
    closeButton.style.display = "flex";
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('close');
    closeButton.onclick = function() {
      modal.style.display = 'none';
    };
  
    modal.appendChild(closeButton);
  }

module.exports = updateModal;

