export const getListings = async (limit = 10) => {
  const response = await fetch(`/api/listings?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }
  return response.json();
};

export const getCryptoInfo = async (ids: number) => {
  if (!ids) return null;

  const response = await fetch(`/api/info?id=${ids}`);
  if (!response.ok) {
    throw new Error("Failed to fetch crypto info");
  }
  return response.json();
};

export const getCryptoTicker = async () => {
  const response = await fetch(`/api/tickers`);

  if (!response.ok) {
    throw new Error("Failed to fetch crypto ticker");
  }
  return response.json();
};
