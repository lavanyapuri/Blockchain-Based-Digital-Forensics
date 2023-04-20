//This file puts ForensicReport contract on the blockchain
const ForensicReport = artifacts.require("ForensicReport");

module.exports = function(deployer) {
  //deploy
  deployer.deploy(ForensicReport);
};