require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("@nomicfoundation/hardhat-chai-matchers")
require("@nomiclabs/hardhat-solhint")

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL
const PRIVATE_KEY =
    process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY =
    process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
    },

    solidity: {
        compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },

    gasReporter: {
        enabled: true, //make it false when gas report is not needed
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },

    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
}
