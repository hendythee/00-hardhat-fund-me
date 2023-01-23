const networkConfig = {
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
        ETHUSDPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },

    // 137: {
    //     name: "polygon",
    //     ETHUSDPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    // },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
}
