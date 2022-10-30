import { BigNumber} from "ethers";

export function weiToEther(cost: BigNumber): number {
  try {
    const costEther = Number(cost)/ 1e18;
    return costEther;
  } catch (e) {
    throw new TypeError("Invalid input, cost can't be parsed");
  }
}
