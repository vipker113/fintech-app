export async function GET(request: Request) {
  const limit = request.url.split("limit=")[1] || 10;
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=USD`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY || "",
      },
    }
  );

  const res = await response.json();
  return Response.json(res.data);
}
