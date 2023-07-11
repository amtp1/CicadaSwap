const cons = require("consolidate");

var currentAccount = localStorage.getItem("wallet_address");

let tokens = {
    "0x4b0f1812e5df2a09796481ff14017e6005508003": {
        "symbol": "TWT",
        "decimal": 18,
        "image": "https://s2.coinmarketcap.com/static/img/coins/64x64/5964.png"
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        // Do any other work!
    }
};

async function connect() {
    if(!currentAccount){
        await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }]
        });

        const walletAddress = await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [{ eth_accounts: {} }]
            });
        localStorage.setItem("wallet_address", walletAddress)
        window.location.replace("profile");
    }
}

async function disconnect(){
    localStorage.removeItem("wallet_address");
    window.location.replace("/");
}

async function changeChain(hex_id){
    await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hex_id }],
    });
    window.location.reload();
}

async function addToken(contract_address){
    var tokenAddress = contract_address;
    var token = tokens[tokenAddress];
    var tokenSymbol = token['symbol'];
    var tokenDecimals = token['decimal'];
    var tokenImage = token['image'];

    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });
      
        if (wasAdded) {
          console.log('Thanks for your interest!');
        } else {
          console.log('Your loss!');
        }
      } catch (error) {
        console.log(error);
      }
}

/*function make_transaction(){
    // var data = new FormData(); // Init new FormData object.
    // data.append("name", "Top Programmer");
    data = {"name": "Genius"}
    fetch("make_transaction", {
        method: "POST",
        body: JSON.stringify( data ),
        contentType: 'application/json',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        }
    })
        .then((response) => {
            
            // Do something with response
        })
        .catch(function (err) {
            console.log("Unable to fetch -", err);
        });
}*/

async function make_transaction(){
    const baseUrl ='https://api.1inch.exchange/v4.0';
    const chainId = 56;
    const fromTokenAddress = "0x1fa4a73a3f0133f0025378af00236f3abdee5d63";
    const toTokenAddress = "0x55d398326f99059ff775485246999027b3197955";
    const fromAddress = "0x717FC34Ef5B719E71aA46C047FC51b7F97Ef58c0";
    const amount = 1;
    const slippage = 1;
    const url = `${baseUrl}/${chainId}/swap?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}&fromAddress=${fromAddress}&slippage=${slippage}`;
    const result = await this.getJson(url);
    console.log(result);
}

async function getJson (url) {
    const res = await fetch(url)
    const json = await res.json()
    if (!json) {
      throw new Error('no response')
    }
    if (json.error) {
      console.log(json)
      throw new Error(json.description || json.error)
    }

    return json
  }
