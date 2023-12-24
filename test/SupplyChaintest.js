const SupplyChain = artifacts.require('./SupplyChain.sol')

contract('SupplyChain', (accounts) => {
  before(async () => {
    this.supplyChain = await SupplyChain.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.supplyChain.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists lots', async () => {
    const lots = await this.supplyChain.getAllLots()
    assert.notEqual(lots, undefined)
  })

  it('lists transactions', async () => {
    const transactions = await this.supplyChain.getAllTransactions()
    assert.notEqual(transactions, undefined)
  })

  it('lists user info', async () => {
    const info = await this.supplyChain.getUserDetails("0x34Ed5c223A5f5041b2b8Ef52c842700c1ee1D6E9")
    assert.notEqual(info, undefined)
  })

  it('add lot', async () => {
    const result = await this.supplyChain.addLot([1, "11", "0x34Ed5c223A5f5041b2b8Ef52c842700c1ee1D6E9", "FarmA", "Vegetable", "GradeA", 25, 60, 1030,0],20)
    const testlot = await this.supplyChain.getSingleLot("11")
    assert.equal(testlot.barcodeId, "11")

  })

  it('lists lot history', async () => {
    const history = await this.supplyChain.getSingleLotHistory("11")
    assert.notEqual(history, undefined)
  })

  it('add transaction', async () => {
    
    const result = await this.supplyChain.addTransaction(["0x404BEc9172f4c55790e9f2D9dBbdBc5feb4d215C", "0xf0FE51d2F0A1B450bA6F4c03603b78a932FE771f","324324","200","0"], "11",987);
    assert.notEqual(result, undefined)
  })

  it('update stockdate', async () => {
    
    this.supplyChain.updateStockdate("11",437845);
    const testlot = await this.supplyChain.getSingleLot("11")
    assert.notEqual(testlot.stockdate, undefined)

  })



})