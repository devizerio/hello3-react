const PREFIX = "did:ethr:";

export const fromAddress = (address: string) => {
  if (address.startsWith(PREFIX)) {
    return address;
  }
  return `${PREFIX}${address}`;
};

export const toAddress = (did: string) => {
  if (!did.startsWith(PREFIX)) {
    return did;
  }
  return did.slice(PREFIX.length);
};

export const DID = { fromAddress, toAddress };
