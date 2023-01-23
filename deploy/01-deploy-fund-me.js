// import
// main function
// calling of main function

// function deployFunc(hre) {
//     console.log("Hi!")
// }

// module.exports.default = deployFunc

// hre = hardhat runtime environment

// module.exports = async (hre) => {
//     const { getNamedAccounts, depolyments } = hre
// hre.getNamedAccounts
// hre.deployments

const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

// const helperConfig = require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // well what happens when we want to change chains
    // when going for localhost or hardhat network we want to use a mock

    // const ETHUSDPriceFeedAddress = networkConfig[chainId]["ETHUSDPriceFeed"]

    let ETHUSDPriceFeedAddress
    if (chainId == 31337) {
        const ETHUSDAggregator = await deployments.get("MockV3Aggregator")
        ETHUSDPriceFeedAddress = ETHUSDAggregator.address
    } else {
        ETHUSDPriceFeedAddress = networkConfig[chainId]["ETHUSDPriceFeed"]
    }

    log("Deploying FundMe and waiting for confirmations...")

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ETHUSDPriceFeedAddress],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ETHUSDPriceFeedAddress])
    }

    log("--------------------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
