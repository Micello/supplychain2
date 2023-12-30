module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      from: "0x2B2Cfe1b7a6e27DC92673c09f76aFe1326918Bbf" 
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}