//This is a temporary utility function that checks if images are broken and returns a fallback
//TODO: REPLACE LATER WITH OPTION MENU TO CHOOSE FOR ART WORK & DESIGN BETTER FALLBACK SOLUTION

export default function checkBrokenImage(id: number | undefined) {
  const BROKEN_HOME_IDS = [10080, 10081, 10082, 10083, 10084, 10085, 10158];
  const isBroken = id ? BROKEN_HOME_IDS.includes(Number(id)) : false;
  const imageFolder: string = isBroken ? "official-artwork" : "home";

  return { imageFolder };
}
