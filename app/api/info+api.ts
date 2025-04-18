export async function GET(request: Request) {
  const ids = request.url.split("id=")[1] || "1";

  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY!,
      },
    }
  );

  const res = await response.json();
  return Response.json(res.data);
}
