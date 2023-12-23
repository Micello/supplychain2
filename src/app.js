const json1 = '{"id_lot": 1, "barcodeId": "ABC123", "lot_user_addr": "0x404BEc9172f4c5579L0e9f2D9dBbdBc5feb4d215C", "source": "Supplier", "variety": "TypeA", "quality": "High", "temprature": 25, "humidity": 50,"date": 10, "stockdate": 0}';
const jsonData1 = JSON.parse(json1);
const json2 = '{"id_lot": 2, "barcodeId": "ABC124", "lot_user_addr": "0x404BEc9172f4c5579L0e9f2D9dBbdBc5feb4d215C", "source": "Supplier", "variety": "TypeA", "quality": "High", "temprature": 25, "humidity": 50,"date": 10, "stockdate": 0}';
const jsonData2 = JSON.parse(json2);
const json3 = '{"id_lot": 3, "barcodeId": "ABC125", "lot_user_addr": "0x404BEc9172f4c5579L0e9f2D9dBbdBc5feb4d215C", "source": "Supplier", "variety": "TypeA", "quality": "High", "temprature": 25, "humidity": 50,"date": 10, "stockdate": 0}';
const jsonData3 = JSON.parse(json3);


const listItems1 = Object.entries(jsonData1).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`);
const contentToRender1 = `<ul>${listItems1.join('')}</ul>`;
const listItems2 = Object.entries(jsonData2).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`);
const contentToRender2 = `<ul>${listItems2.join('')}</ul>`;
const listItems3 = Object.entries(jsonData3).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`);
const contentToRender3 = `<ul>${listItems3.join('')}</ul>`;


App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()

  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    web3.eth.defaultAccount = web3.eth.accounts[0];
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const supplyChain = await $.getJSON('SupplyChain.json')
    App.contracts.SupplyChain = TruffleContract(supplyChain)
    App.contracts.SupplyChain.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.supplyChain = await App.contracts.SupplyChain.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

 

    // Update loading state
    App.setLoading(false)
  },

  renderLots: async () => {
 

    const renderedContentElement = $('#renderedContent');
  contentsToRender = [contentToRender1,contentToRender2,contentToRender3];
  contentsToRender.forEach((content, index) => {
  const newDiv = $('<div>').html(content);
  renderedContentElement.append(newDiv);
  

});
  },


  renderSingleLot: async (barcodeId) => {
    const renderedContentElement = $('#renderedLot');
    try {
      let contentsToRender;
  
      if (barcodeId == 1) {
        contentsToRender = contentToRender1;
      } else if (barcodeId == 2) {
        contentsToRender = contentToRender2;
      } else if (barcodeId == 3) {
        contentsToRender = contentToRender3;
      } else {
        renderedContentElement.html(`No content found for Barcode ID ${barcodeId}.`);
        return;
      }
  
    renderedContentElement.html(contentsToRender);
    } catch (error) {
      console.error(error.message);
      renderedContentElement.html("Error rendering content.");
    }
  },
  
    

  
 
  





  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load();
    $('#renderLotsButton').click(() => {
      App.renderLots(); // Call the function when the button is clicked
      
    });
  })
})

