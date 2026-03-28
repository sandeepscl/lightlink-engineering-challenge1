const express = require('express');
const router = express.Router();
const { callChainlinkApiTest } = require('../config/getContract');
const CHAINLINK_ETH_USD = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
router.get('/', async (req, res, next) => {
  try {
    const price = await callChainlinkApiTest();

    res.status(200).json({
      status:    'success',
      endpoint:  'chainlinkApiTest',
      timestamp: new Date().toISOString(),
      data: {
        contract:       'Chainlink AggregatorV3 — ETH/USD',
        address:        CHAINLINK_ETH_USD,
        description:    'ETH / USD',
        formattedPrice: `$${price.toFixed(2)}`,
        network:        'Ethereum Mainnet',
      },
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [chainlinkApiTest] [500 ERROR] ${err.message}`);
    next(err);
  }
});

module.exports = router;