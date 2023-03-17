import { BigNumber, ethers, Signature, Wallet } from "ethers";
import { NFTDutchAuction_ERC20Bids__factory, VToken } from "../typechain-types";

async function getPermitSignature(signer:any, token:VToken, spender:string, value:BigNumber, deadline:BigNumber) {

    const [nonce, name, version, chainId] = await Promise.all([
        token.nonces(signer.address),
        token.name(),
        "1",
        signer.getChainId(),
    ])
    return ethers.utils.splitSignature(
        await signer._signTypedData(
            {
                name,
                version,
                chainId,
                verifyingContract: token.address,
            },
            {
                Permit: [
                    {
                        name: "owner",
                        type: "address",
                    },
                    {
                        name: "spender",
                        type: "address",
                    },
                    {
                        name: "value",
                        type: "uint256",
                    },
                    {
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        name: "deadline",
                        type: "uint256",
                    },
                ],
            },
            {
                owner: signer.address,
                spender,
                value,
                nonce,
                deadline,
            }
        )
    )
}

it("Checking token allowance", async function () {
            const {ercTokenFactory, nftDutchAuction, otherAddress} = await loadFixture(NFTDutchAuction_ERC20Bids__factory);

            const deadline = ethers.constants.MaxUint256

            const { v, r, s } = await getPermitSignature(
                otherAddress,
                ercTokenFactory,
                nftDutchAuction.address,
                await ercTokenFactory.balanceOf(otherAddress.address),
                deadline
            )
            await ercTokenFactory.permit(
                otherAddress.address,
                nftDutchAuction.address,
                ercTokenFactory.balanceOf(otherAddress.address),
                deadline,
                v,r,s
            )
            /*expect*/(await ercTokenFactory.allowance(otherAddress.address,nftDutchAuction.address)).to.equal(await ercTokenFactory.balanceOf(otherAddress.address));
        });
