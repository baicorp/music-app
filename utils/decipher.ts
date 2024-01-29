// generate streamable url from given signatureCipher
export function getUrlStream(signatureCipher: string): string {
  const cipher = new URLSearchParams(signatureCipher);
  const s = cipher.get("s");
  const baseURL = cipher.get("url");
  if (!s) return "";
  // Convert string to array of characters
  let charArray = s.split("");

  // Swap index 0 with index 6
  [charArray[0], charArray[6]] = [charArray[6], charArray[0]];

  // Swap index 60 with index 80
  [charArray[60], charArray[80]] = [charArray[80], charArray[60]];

  // Swap index 80 with the last character number 3
  [charArray[80], charArray[charArray.length - 1]] = [
    charArray[charArray.length - 1],
    charArray[80],
  ];

  // Remove the last 3 characters
  charArray.splice(charArray.length - 3, 3);

  // Convert array back to string and return
  return `${baseURL}&sig=${charArray.join("")}`;
}
