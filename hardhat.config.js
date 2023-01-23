require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("@nomicfoundation/hardhat-chai-matchers")
require("@nomiclabs/hardhat-solhint")

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-goerli.g.alchemy.com/v2/JpSQU4uGjmOQfb5MsZhBP9UlaiR9nKX_"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x37ab4270ce5f62e0d1ccd08301a2d7540454793ff54b4fa6f5ab983a427476cf"
const COINMARKETCAP_API_KEY =
    process.env.COINMARKETCAP_API_KEY || "046aa986-72ef-45c7-8a95-7daa3ca08b92"
const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY || "758WF36CKJRCJBE9YYXSR6M4WXP1J8JZ1K"

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
