const ethers = require('ethers');
const providers = ethers.providers;
const provider = new providers.JsonRpcProvider('https://goerli-rpc.dapowerplay.com/', { name: 'goerli', chainId: 0x188B });
const fs = require('fs');


const validators = {
	'0x00fAA37564140c1A5E96095f05466B9F73441e44' : '1',
	'0x0082A7Bf6aAAdaB094061747872243059C3c6A07' : '2'
}

var last_block_validator;

fs.appendFileSync('output.csv','Validator;Block No;Suspect')

function doNextBLock(n){
	provider.getBlock(n).then(function(block) {
		let suspect = "";
		if(last_block_validator == block.miner) { suspect = 'suspect'; }
		fs.appendFileSync('output.csv',validators[block.miner] + ';' + n + ';' + suspect + '\n');
    	last_block_validator = block.miner
    	if(n < 18501) doNextBLock(n+1)
	});
}

doNextBLock(0)
