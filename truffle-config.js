module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      from: "0x795588Ec361F2b766Ea61Cd4B65c42e0Dd4a876B" 
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}