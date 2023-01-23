// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        // ABI (Application Binary Interface) & Address of contract for external data are needed
        // ABI (although there technically is another way to interact with contract w/o ABI)

        (, int256 price, , , ) = priceFeed.latestRoundData();
        // ETH in terms of USD = $1260
        // uint80 roundId / int price / uint startedAt / uint timeStamp / uint80 answeredInRound
        return uint256(price * 1e10);
    }

    // function getVersion() internal view returns (uint256) {
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface(
    //         0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
    //     );
    //     return priceFeed.version();
    // }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountinUSD = (ethPrice * ethAmount) / 1e18;
        return ethAmountinUSD;
    }
}
