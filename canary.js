var ethers = require('ethers');
var providers = ethers.providers;
var provider = new providers.JsonRpcProvider('https://goerli-rpc.dapowerplay.com/', { name: 'goerli', chainId: 0x188B });
var wallet = new ethers.Wallet(private_key, provider);

provider.on('block', function(blockNumber) {
    console.log('New Block: ' + blockNumber);
    wallet.send('0x0082a7bf6aaadab094061747872243059c3c6a07', ethers.utils.parseEther("0.00000000000001"), {gasLimit: ethers.utils.bigNumberify("4700000"),gasPrice: ethers.utils.bigNumberify("410000")}).then(function(transaction) {
        console.log(transaction);
    });
});


