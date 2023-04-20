//This file deploys Migrations contract
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  //deploy
  deployer.deploy(Migrations);
};
