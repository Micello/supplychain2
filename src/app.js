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

    // Render Tasks
    await App.getLots()

    // Update loading state
    App.setLoading(false)
  },

  getLots: async () => {
    // Load the total task count from the blockchain
    const lots = await App.supplyChain.getAllLots();
    const lotsListElement = $('#lotsList');

    // Iterate over the lots array
    lots.forEach((lot) => {
        // Create a new HTML element for each lot
        const lotElement = $('<div>').addClass('lot');

        // Populate the HTML element with lot information
        lotElement.append(`<strong>ID:</strong> ${lot.id_lot}`);
        lotElement.append(`<br><strong>Barcode ID:</strong> ${lot.barcodeId}`);
        lotElement.append(`<br><strong>User Address:</strong> ${lot.lot_user_addr}`);
        lotElement.append(`<br><strong>Source:</strong> ${lot.source}`);
        lotElement.append(`<br><strong>Variety:</strong> ${lot.variety}`);
        lotElement.append(`<br><strong>Quality:</strong> ${lot.quality}`);
        lotElement.append(`<br><strong>Temperature:</strong> ${lot.temprature}`);
        lotElement.append(`<br><strong>Humidity:</strong> ${lot.humidity}`);
        lotElement.append(`<br><strong>Date:</strong> ${lot.date}`);
        lotElement.append(`<br><strong>Stock Date:</strong> ${lot.stockdate}`);

        // Append the lot element to the 'lotsList' element in your HTML
        lotsListElement.append(lotElement);
    })
  },
    
  

  createTask: async () => {
    App.setLoading(true)
    const content = $('#newTask').val()
    await App.supplyChain.createTask(content)
    window.location.reload()
  },

  toggleCompleted: async (e) => {
    App.setLoading(true)
    const taskId = e.target.name
    await App.supplyChain.toggleCompleted(taskId)
    window.location.reload()
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
    App.load()
  })
})