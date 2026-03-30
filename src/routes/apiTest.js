const express = require('express');
const router  = express.Router();
const {
  callChainlinkApiTest,
  callUniswapApiTest,
  callUsdcApiTest,
  callCryptopunksApiTest,
  callEnsApiTest,
} = require('../config/getContract');

const CHAINLINK_ETH_USD  = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
const UNISWAP_V3_FACTORY = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
const USDC               = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const CRYPTOPUNKS        = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB';
const ENS_REGISTRY       = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';

router.get('/chainlinkApiTest', async (req, res, next) => {
  try {
    const price = await callChainlinkApiTest();
    res.status(200).json({
      status: 'success', endpoint: 'chainlinkApiTest', timestamp: new Date().toISOString(),
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

router.get('/uniswapApiTest', async (req, res, next) => {
  try {
    const owner = await callUniswapApiTest();
    res.status(200).json({
      status: 'success', endpoint: 'uniswapApiTest', timestamp: new Date().toISOString(),
      data: {
        contract: 'Uniswap V3 Factory',
        address:  UNISWAP_V3_FACTORY,
        owner,
        network:  'Ethereum Mainnet',
      },
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [uniswapApiTest] [500 ERROR] ${err.message}`);
    next(err);
  }
});

router.get('/usdcApiTest', async (req, res, next) => {
  try {
    const { supplyFormatted, supplyCompact, isPaused } = await callUsdcApiTest();
    res.status(200).json({
      status: 'success', endpoint: 'usdcApiTest', timestamp: new Date().toISOString(),
      data: {
        contract: 'USDC FiatTokenV2.2',
        address:  USDC,
        supply: { formatted: `$${supplyFormatted}`, formattedCompact: supplyCompact },
        contractState: { isPaused },
        network: 'Ethereum Mainnet',
      },
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [usdcApiTest] [500 ERROR] ${err.message}`);
    next(err);
  }
});

router.get('/cryptopunksApiTest', async (req, res, next) => {
  try {
    const totalSupply = await callCryptopunksApiTest();
    res.status(200).json({
      status: 'success', endpoint: 'cryptopunksApiTest', timestamp: new Date().toISOString(),
      data: {
        contract: 'CryptoPunks',
        address:  CRYPTOPUNKS,
        supply:   { total: totalSupply, allAssigned: totalSupply === 10000 },
        network:  'Ethereum Mainnet',
      },
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [cryptopunksApiTest] [500 ERROR] ${err.message}`);
    next(err);
  }
});

router.get('/ensApiTest', async (req, res, next) => {
  try {
    const resolver = await callEnsApiTest();
    res.status(200).json({
      status: 'success', endpoint: 'ensApiTest', timestamp: new Date().toISOString(),
      data: {
        contract:        'ENS Registry',
        address:         ENS_REGISTRY,
        queriedName:     'vitalik.eth',
        resolverAddress: resolver,
        network:         'Ethereum Mainnet',
      },
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [ensApiTest] [500 ERROR] ${err.message}`);
    next(err);
  }
});

module.exports = router;