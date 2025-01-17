//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";

interface IERC20Mintable is IERC20 {
    function mint(address _to, uint256 _value) external;
}
import "hardhat/console.sol";

contract ClaimCODE is Ownable {
    using BitMaps for BitMaps.BitMap;
    BitMaps.BitMap private claimed;

    bytes32 public merkleRoot;
    uint256 public claimPeriodEnds;

    bool public mintingEnabled = true;
    bool public mintGovernance = true;

    IERC20Mintable public immutable codeToken;

    event MerkleRootChanged(bytes32 _merkleRoot);
    event Claim(address indexed _claimant, uint256 _amount);
    event MintedByGovernance(address indexed _target, uint256 _amount);
    event MintingDisabled();

    error Address0Error();
    error InvalidProof();
    error AlreadyClaimed();
    error ClaimEnded();
    error ClaimNotEnabled();
    error MintGovernanceDisable();
    error InitError();

    constructor(
        uint256 _claimPeriodEnds,
        address _codeToken,
        uint256 _airdropSupply
    ) {
        if (_codeToken == address(0)) revert Address0Error();
        claimPeriodEnds = _claimPeriodEnds;
        codeToken = IERC20Mintable(_codeToken);
        codeToken.mint(address(this), _airdropSupply * 1e18);
    }

    function claimTokens(uint256 _amount, bytes32[] calldata _merkleProof) external {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _amount));
        (bool valid, uint256 index) = MerkleProof.verify(_merkleProof, merkleRoot, leaf);
        if (!mintingEnabled) revert ClaimNotEnabled();
        if (!valid) revert InvalidProof();
        if (isClaimed(index)) revert AlreadyClaimed();
        if (block.timestamp > claimPeriodEnds) revert ClaimEnded();

        claimed.set(index);
        emit Claim(msg.sender, _amount);

        codeToken.transfer(msg.sender, _amount);
    }

    function isClaimed(uint256 index) public view returns (bool) {
        return claimed.get(index);
    }

    function mintByGovernance(address _target, uint256 _amount) external onlyOwner {
        if (!mintGovernance) revert MintGovernanceDisable();
        if (_target == address(0)) revert Address0Error();

        emit MintedByGovernance(_target, _amount);
        codeToken.mint(_target, _amount);
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        if (merkleRoot != bytes32(0)) revert InitError();
        merkleRoot = _merkleRoot;
        emit MerkleRootChanged(_merkleRoot);
    }

    function disableMinting() external onlyOwner {
        mintingEnabled = false;
        emit MintingDisabled();
    }

    function disableMintingByGovernance() external onlyOwner {
        mintGovernance = false;
        emit MintingDisabled();
    }
}
