const express  = require('express');
const morgan   = require('morgan');
const cors     = require('cors');
const path     = require('path');
const killPort = require('kill-port');

require('dotenv').config();

const app  = express();
const PORT = parseInt(process.env.PORT, 10) || 3001;

const checkPort = async (port, maxPort = 65535) => {
  if (port > maxPort) {
    throw new Error('No available ports found');
  }
  try {
    await killPort(port, 'tcp');
    await killPort(port, 'udp');
    return port;
  } catch (err) {
    return checkPort(port + 1, maxPort);
  }
};

(async () => {
  const safePort   = await checkPort(PORT);
  const getPort    = (await import('get-port')).default;
  const final_port = await getPort({ port: safePort });

  console.log(`Port ${final_port} is free. Ready to start server.`);

  app.use(cors({ origin: `http://localhost:${final_port}` }));
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/api/items', require('./routes/items'));
  app.use('/api/stats', require('./routes/stats'));

    /**
   * Smart Contract API Endpoints — Ethereum Mainnet
   *
   * All endpoints below interact with public smart contracts on Ethereum Mainnet
   * using raw JSON-RPC eth_call requests via axios. No wallet, private key or
   * gas is required — all calls are read-only view functions.
   *
   * @author   Sandeep Karnati
   * @access   public
   * @param    {Request}  req - No body, query or params required for any endpoint.
   * @param    {Response} res - JSON response object.
   * @throws   500 on contract call failure or malformed RPC response
   *
   * RPC Provider : Infura Ethereum Mainnet (configured in constant.js)
   * Auth         : None — all endpoints are public
   * Error format : { status: "error", endpoint, error: { message } }
   *
   * ─────────────────────────────────────────────────────────────────────────
   *
   * @route    GET /api/chainlinkApiTest
   * @desc     Reads latestRoundData() from the Chainlink AggregatorV3 ETH/USD
   *           price feed. Decodes ABI-encoded response, extracts answer from
   *           slot 1, divides by 1e8 and returns the formatted USD price.
   * @contract 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
   * @returns  {JSON}
   * {
   *   "status": "success",
   *   "endpoint": "chainlinkApiTest",
   *   "timestamp": "{ISO8601}",
   *   "data": {
   *     "contract": "{string}",
   *     "address": "{address}",
   *     "description": "{string}",
   *     "formattedPrice": "{string}",
   *     "network": "{string}"
   *   }
   * }
   * @example  curl http://localhost:3001/api/chainlinkApiTest
   *
   * ─────────────────────────────────────────────────────────────────────────
   *
   * @route    GET /api/uniswapApiTest
   * @desc     Reads owner() from the Uniswap V3 Factory contract. Decodes the
   *           ABI-encoded address and returns the factory owner wallet address.
   * @contract 0x1F98431c8aD98523631AE4a59f267346ea31F984
   * @returns  {JSON}
   * {
   *   "status": "success",
   *   "endpoint": "uniswapApiTest",
   *   "timestamp": "{ISO8601}",
   *   "data": {
   *     "contract": "{string}",
   *     "address": "{address}",
   *     "owner": "{address}",
   *     "network": "{string}"
   *   }
   * }
   * @example  curl http://localhost:3001/api/uniswapApiTest
   *
   * ─────────────────────────────────────────────────────────────────────────
   *
   * @route    GET /api/usdcApiTest
   * @desc     Reads totalSupply() and paused() from the USDC FiatTokenV2.2
   *           contract in parallel. Returns supply in billions and pause state.
   * @contract 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   * @returns  {JSON}
   * {
   *   "status": "success",
   *   "endpoint": "usdcApiTest",
   *   "timestamp": "{ISO8601}",
   *   "data": {
   *     "contract": "{string}",
   *     "address": "{address}",
   *     "supply": {
   *       "formatted": "{string}",
   *       "formattedCompact": "{string}"
   *     },
   *     "contractState": { "isPaused": "{boolean}" },
   *     "network": "{string}"
   *   }
   * }
   * @example  curl http://localhost:3001/api/usdcApiTest
   *
   * ─────────────────────────────────────────────────────────────────────────
   *
   * @route    GET /api/cryptopunksApiTest
   * @desc     Reads totalSupply() from the original CryptoPunks contract.
   *           Returns total punk count and whether all punks have been assigned.
   * @contract 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB
   * @returns  {JSON}
   * {
   *   "status": "success",
   *   "endpoint": "cryptopunksApiTest",
   *   "timestamp": "{ISO8601}",
   *   "data": {
   *     "contract": "{string}",
   *     "address": "{address}",
   *     "supply": {
   *       "total": "{number}",
   *       "allAssigned": "{boolean}"
   *     },
   *     "network": "{string}"
   *   }
   * }
   * @example  curl http://localhost:3001/api/cryptopunksApiTest
   *
   * ─────────────────────────────────────────────────────────────────────────
   *
   * @route    GET /api/ensApiTest
   * @desc     Reads resolver(bytes32 node) from the ENS Registry using the
   *           namehash of vitalik.eth. Returns the resolver contract address
   *           assigned to that name on-chain.
   * @contract 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
   * @returns  {JSON}
   * {
   *   "status": "success",
   *   "endpoint": "ensApiTest",
   *   "timestamp": "{ISO8601}",
   *   "data": {
   *     "contract": "{string}",
   *     "address": "{address}",
   *     "queriedName": "{string}",
   *     "resolverAddress": "{address}",
   *     "network": "{string}"
   *   }
   * }
   * @example  curl http://localhost:3001/api/ensApiTest
   *
   * ─────────────────────────────────────────────────────────────────────────
   */
  app.use('/api', require('./routes/apiTest'));

  require('./config/dbHandler.js').connect();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  app.listen(final_port, () => {
    console.log(`Backend running on http://localhost:${final_port}`);
  });
})();