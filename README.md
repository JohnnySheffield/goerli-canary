# Goerli Canary

## Intro

Goerli testnet is a cross-client(!) proof-of-authority ethereum testnet and initiative. As the time of writing, Goerli network is validated by two parity nodes hosted @Parity office running aura consensus engine. Currently, it is "broken" as it consists of only parity nodes, missing any other clients (geth, etc) validating blocks on the network.  

This repo contains a report on having fun with current goerli network and "breaking" it while sending transactions with the canary, a proposal to break it even more and some code snippets and csv files to assist along the way.

Thankfully, there are devs out there working on goerli that are doing actual work of implementing proper consensus engines. If you are a go or rust developer, consider contributing to [go-ethereum-aura](https://github.com/goerli/go-ethereum-aura) and [parity-goerli](https://github.com/goerli/parity-goerli) to help getting cross client proof-of-authority ethereum network to life. Rember - anything what you have done, seen or tried can be a contribution.
 

## Goerli Canary

Goerli canary is a small snippet of code that sends one transaction on each new block . See canary.js for an example of sending some eth to 0x0082a7bf6aaadab094061747872243059c3c6a07 (Goerli Validator 2 as per goerli.dapowerplay.com) on every new block imported by the parity node. 

## "Breaking" Goerli

After running the canary for some few hundred blocks, Goerli testnet has started to behave a bit "wierd" - usually the validators are alternating (1,2,1,2) but some irregularities started to show having one validator mining few blocks in a sequence (eg. 1,1,2,1). This effect seemed to grow in occurence with time while the canary was running. As we have only two validators on goerli testnet, we considered every block having the same validator as the previous block a suspect.

The canary started to send out transactions with block [11828](https://goerli.dapowerplay.com/block/11828). After starting the canary, first suspect block appeared at block [11833](https://goerli.dapowerplay.com/block/11833). Last transaction by the canary was sent out at block [18435]( https://goerli.dapowerplay.com/block/18435)

By analysing the goerli blockchain, we compared number of suspect blocks when canary was not running (blocks 0 - 11828) with period of canary running (blocks 11828 - 18500). In the first 11000 blocks around 2% of the blocks were suspects (first one occured was block 22). While the canary was running around 33% of the blocks were suspects. Check out the gerli-block-suspects.csv


![Pie-1](/pics/pie-1.png)
![Pie-2](/pics/pie-2.png)

## Why this happened?

Suspect blocks can occur to a number of reasons - hardware failures, networking issues, unsynced clocks, network split etc. With Goerli, first thing that comes to mind is having only two validators as the prime reason. 

A peek into Goerli validator logs could provide more info.


## Breaking it even further

I you have some Goerli Testnet ether you can try to run Goerli Canary and experiment a bit with provided code snippets or analyise the provided csv. We suspect that having a large number of suspect blocks can lead to network splits in networks with 2 validators.

We also propose adding more validators to the Goerli network, but breaking the testnet a bit more by having only 50% of the validators online and sealing blocks. Other 50% validator slots would be reserved for geth nodes with validator private keys generated for the Goerli geth devs. 

Having validators set up like this would achieve: 

1) A real-world experiment in running a aura network with only 50% of the validators online
2) A clear signal when a geth-aura node comes to life by seeing a mined block on the network
3) More fun in breaking things

## Running the code

You will need nodejs, npm and ethers installed on your machine.

```
npm install ethers

# produce a csv with suspect blocks:
node extract-block-validators.js

# run the canary:
node canary.js
```

Cheers!












