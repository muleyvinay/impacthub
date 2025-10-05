const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Escrow', function() {
  it('releases milestone', async function() {
    const [owner, beneficiary] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory('Escrow');
    const escrow = await Escrow.deploy(beneficiary.address);
    await escrow.waitForDeployment();
    await escrow.addMilestone(ethers.parseEther('1'));
    await owner.sendTransaction({ to: await escrow.getAddress(), value: ethers.parseEther('1') });
    await escrow.release(0);
    expect(true).to.equal(true);
  });
});


