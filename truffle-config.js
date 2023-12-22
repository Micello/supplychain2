module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      from: "0xf0FE51d2F0A1B450bA6F4c03603b78a932FE771f" 
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}