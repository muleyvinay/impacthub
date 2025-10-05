// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Escrow {
    address public owner;
    struct Milestone { uint256 amount; bool released; string evidenceCid; }
    mapping(uint256=>Milestone) public milestones;
    uint256 public milestoneCount;
    address public beneficiary;

    constructor(address _beneficiary) {
        owner = msg.sender;
        beneficiary = _beneficiary;
    }

    receive() external payable {}

    function addMilestone(uint256 amount) external {
        require(msg.sender==owner, 'only owner');
        milestones[milestoneCount++] = Milestone({ amount: amount, released: false, evidenceCid: '' });
    }

    function setEvidence(uint256 id, string calldata cid) external {
        require(msg.sender==owner, 'only owner');
        milestones[id].evidenceCid = cid;
    }

    function release(uint256 id) external {
        require(msg.sender==owner, 'only owner');
        Milestone storage m = milestones[id];
        require(!m.released, 'released');
        require(address(this).balance >= m.amount, 'insufficient');
        m.released = true;
        payable(beneficiary).transfer(m.amount);
    }
}


