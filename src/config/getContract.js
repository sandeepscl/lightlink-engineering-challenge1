const axios = require('axios');

const { EthMainnet, PolygonMainnet, BscMainnet, ArbitrumMainnet, Avalanche, Fantom, Harmony, Heco, Klay, Matic, Moonbeam, Hashed, Optimism, Palm, Ronin, xDai } = require('./constant');
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
    axios.get(GET_ETHMAINNET_URL)
        .then(res=>res.data)
        .catch(err=>{try {
            console.log(err.response.data);
        } catch (error) {
            
        }});
}

const callPolygonContract = () => {
    axios.get(GET_POLYGONMAINNET_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callBscContract = () => {
    axios.get(GET_BSCMAINNET_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callArbitrumContract = () => {
    axios.get(GET_ARBITRUMMAINNET_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callAvalancheContract = () => {
    axios.get(GET_AVALANCHE_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callFantomContract = () => {
    axios.get(GET_FANTOM_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callHarmonyContract = () => {
    axios.get(GET_HARMONY_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callHecoContract = () => {
    axios.get(GET_HECO_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callKlayContract = () => {
    axios.get(GET_KLAY_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callMaticContract = () => {
    axios.get(GET_MATIC_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callMoonbeamContract = () => {
    axios.get(GET_MOONBEAM_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callOptimismContract = () => {
    axios.get(GET_OPTIMISM_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callPalmContract = () => {
    axios.get(GET_PALM_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callRoninContract = () => {
    axios.get(GET_RONIN_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}

const callXDaiContract = () => {
    axios.get(GET_XDAI_URL)
    .then(res=>res.data)
    .catch(err=>{try {
        console.log(err.response.data);
    } catch (error) {
        
    }});
}
const callChainlinkApiTest = async () => {
  const CHAINLINK_ETH_USD = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';

  const response = await axios.post(GET_ETHMAINNET_URL, {
    jsonrpc: '2.0',
    method:  'eth_call',
    params: [
      {
        to:   CHAINLINK_ETH_USD,
        data: '0xfeaf968c',
      },
      'latest',
    ],
    id: 1,
  });

  const hex = response.data.result;

  const slot1 = hex.slice(2 + 64, 2 + 128);
  const rawPrice = BigInt('0x' + slot1);
  const price = Number(rawPrice) / 1e8;

  console.log(`[${new Date().toISOString()}] [chainlinkApiTest] [200 SUCCESS]`);
  console.log(JSON.stringify({
    description:    'ETH / USD',
    formattedPrice: `$${price.toFixed(2)}`,
    network:        'Ethereum Mainnet',
  }, null, 2));

  return price;
};

module.exports = { callEthContract, callPolygonContract, callBscContract, callArbitrumContract, callAvalancheContract, callFantomContract, callHarmonyContract, callHecoContract, callKlayContract, callMaticContract, callMoonbeamContract, callOptimismContract, callPalmContract, callRoninContract, callXDaiContract,   callChainlinkApiTest };
