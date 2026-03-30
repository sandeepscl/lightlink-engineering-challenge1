const axios = require("axios");

const {
  EthMainnet,
  PolygonMainnet,
  BscMainnet,
  ArbitrumMainnet,
  Avalanche,
  Fantom,
  Harmony,
  Heco,
  Klay,
  Matic,
  Moonbeam,
  Hashed,
  Optimism,
  Palm,
  Ronin,
  xDai,
} = require("./constant");
const GET_ETHMAINNET_URL = EthMainnet;
const GET_POLYGONMAINNET_URL = PolygonMainnet;
const GET_BSCMAINNET_URL = BscMainnet;
const GET_ARBITRUMMAINNET_URL = ArbitrumMainnet;
const GET_AVALANCHE_URL = Avalanche;
const GET_FANTOM_URL = Fantom;
const GET_HARMONY_URL = Harmony;
const GET_HECO_URL = Heco;
const GET_KLAY_URL = Klay;
const GET_MATIC_URL = Matic;
const GET_MOONBEAM_URL = Moonbeam;
const GET_HASHED_URL = Hashed;
const GET_OPTIMISM_URL = Optimism;
const GET_PALM_URL = Palm;
const GET_RONIN_URL = Ronin;
const GET_XDAI_URL = xDai;

const callEthContract = () => {
  axios
    .get(GET_ETHMAINNET_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callPolygonContract = () => {
  axios
    .get(GET_POLYGONMAINNET_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callBscContract = () => {
  axios
    .get(GET_BSCMAINNET_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callArbitrumContract = () => {
  axios
    .get(GET_ARBITRUMMAINNET_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callAvalancheContract = () => {
  axios
    .get(GET_AVALANCHE_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callFantomContract = () => {
  axios
    .get(GET_FANTOM_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callHarmonyContract = () => {
  axios
    .get(GET_HARMONY_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callHecoContract = () => {
  axios
    .get(GET_HECO_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callKlayContract = () => {
  axios
    .get(GET_KLAY_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callMaticContract = () => {
  axios
    .get(GET_MATIC_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callMoonbeamContract = () => {
  axios
    .get(GET_MOONBEAM_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callOptimismContract = () => {
  axios
    .get(GET_OPTIMISM_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callPalmContract = () => {
  axios
    .get(GET_PALM_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callRoninContract = () => {
  axios
    .get(GET_RONIN_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callXDaiContract = () => {
  axios
    .get(GET_XDAI_URL)
    .then((res) => res.data)
    .catch((err) => {
      try {
        console.log(err.response.data);
      } catch (error) {}
    });
};

const callChainlinkApiTest = async () => {
  const CHAINLINK_ETH_USD = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

  const response = await axios.post(GET_ETHMAINNET_URL, {
    jsonrpc: "2.0",
    method: "eth_call",
    params: [{ to: CHAINLINK_ETH_USD, data: "0xfeaf968c" }, "latest"],
    id: 1,
  });

  const hex = response.data.result;
  const slot1 = hex.slice(2 + 64, 2 + 128);
  const rawPrice = BigInt("0x" + slot1);
  const price = Number(rawPrice) / 1e8;

  console.log(`[${new Date().toISOString()}] [chainlinkApiTest] [200 SUCCESS]`);
  console.log(
    JSON.stringify(
      {
        description: "ETH / USD",
        formattedPrice: `$${price.toFixed(2)}`,
        network: "Ethereum Mainnet",
      },
      null,
      2,
    ),
  );

  return price;
};

const callUniswapApiTest = async () => {
  const UNISWAP_V3_FACTORY = '0x1F98431c8aD98523631AE4a59f267346ea31F984';

  const response = await axios.post(GET_ETHMAINNET_URL, {
    jsonrpc: '2.0',
    method:  'eth_call',
    params:  [{ to: UNISWAP_V3_FACTORY, data: '0x8da5cb5b' }, 'latest'],
    id: 2,
  });

  if (!response.data.result || response.data.error) {
    throw new Error(response.data.error?.message ?? 'RPC call returned no result');
  }

  const hex   = response.data.result;
  const owner = '0x' + hex.slice(26);

  console.log(`[${new Date().toISOString()}] [uniswapApiTest] [200 SUCCESS]`);
  console.log(JSON.stringify({ contract: 'Uniswap V3 Factory', owner, network: 'Ethereum Mainnet' }, null, 2));

  return owner;
};
const callUsdcApiTest = async () => {
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  const [supplyRes, pausedRes] = await Promise.all([
    axios.post(GET_ETHMAINNET_URL, {
      jsonrpc: "2.0",
      method: "eth_call",
      params: [{ to: USDC, data: "0x18160ddd" }, "latest"],
      id: 3,
    }),
    axios.post(GET_ETHMAINNET_URL, {
      jsonrpc: "2.0",
      method: "eth_call",
      params: [{ to: USDC, data: "0x5c975abb" }, "latest"],
      id: 4,
    }),
  ]);

  const totalSupply = BigInt(supplyRes.data.result);
  const supplyFormatted = (Number(totalSupply) / 1e6).toFixed(2);
  const supplyCompact = `$${(Number(totalSupply) / 1e9).toFixed(2)}B`;
  const isPaused = BigInt(pausedRes.data.result) === BigInt(1);

  console.log(`[${new Date().toISOString()}] [usdcApiTest] [200 SUCCESS]`);
  console.log(
    JSON.stringify(
      {
        contract: "USDC FiatTokenV2.2",
        supplyCompact,
        isPaused,
        network: "Ethereum Mainnet",
      },
      null,
      2,
    ),
  );

  return { supplyFormatted, supplyCompact, isPaused };
};

const callCryptopunksApiTest = async () => {
  const CRYPTOPUNKS = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";

  const response = await axios.post(GET_ETHMAINNET_URL, {
    jsonrpc: "2.0",
    method: "eth_call",
    params: [{ to: CRYPTOPUNKS, data: "0x18160ddd" }, "latest"],
    id: 5,
  });

  const totalSupply = Number(BigInt(response.data.result));

  console.log(
    `[${new Date().toISOString()}] [cryptopunksApiTest] [200 SUCCESS]`,
  );
  console.log(
    JSON.stringify(
      { contract: "CryptoPunks", totalSupply, network: "Ethereum Mainnet" },
      null,
      2,
    ),
  );

  return totalSupply;
};

const callEnsApiTest = async () => {
  const ENS_REGISTRY = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
  const VITALIK_ETH = "0xee6c4522aab0003e8d14cd40a6af439055fd2577";

  const response = await axios.post(GET_ETHMAINNET_URL, {
    jsonrpc: "2.0",
    method: "eth_call",
    params: [
      {
        to: ENS_REGISTRY,
        data: "0x0178b8bf" + VITALIK_ETH.slice(2).padStart(64, "0"),
      },
      "latest",
    ],
    id: 6,
  });

  const hex = response.data.result;
  const resolver = "0x" + hex.slice(26);

  console.log(`[${new Date().toISOString()}] [ensApiTest] [200 SUCCESS]`);
  console.log(
    JSON.stringify(
      {
        contract: "ENS Registry",
        name: "vitalik.eth",
        resolver,
        network: "Ethereum Mainnet",
      },
      null,
      2,
    ),
  );

  return resolver;
};

module.exports = {
  callEthContract,
  callPolygonContract,
  callBscContract,
  callArbitrumContract,
  callAvalancheContract,
  callFantomContract,
  callHarmonyContract,
  callHecoContract,
  callKlayContract,
  callMaticContract,
  callMoonbeamContract,
  callOptimismContract,
  callPalmContract,
  callRoninContract,
  callXDaiContract,
  callChainlinkApiTest,
  callUniswapApiTest,
  callUsdcApiTest,
  callCryptopunksApiTest,
  callEnsApiTest,
};
