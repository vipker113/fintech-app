export async function GET(request: Request) {
  //   const response = await fetch(
  //     `https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2025-03-01&interval=1d`
  //   );
  //   const res = await response.json();
  //   return Response.json(res.data);
  return Response.json(data);
}

const data = [
  {
    timestamp: "2025-03-01T00:00:00Z",
    price: 85149.83,
    volume_24h: 51904636154,
    market_cap: 1688587249218,
  },
  {
    timestamp: "2025-03-02T00:00:00Z",
    price: 88408.49,
    volume_24h: 33736219581,
    market_cap: 1753250168848,
  },
  {
    timestamp: "2025-03-03T00:00:00Z",
    price: 90880.14,
    volume_24h: 68654092707,
    market_cap: 1802302995398,
  },
  {
    timestamp: "2025-03-04T00:00:00Z",
    price: 84745.32,
    volume_24h: 68682561524,
    market_cap: 1680677652333,
  },
  {
    timestamp: "2025-03-05T00:00:00Z",
    price: 88741.92,
    volume_24h: 56099167524,
    market_cap: 1759977486101,
  },
  {
    timestamp: "2025-03-06T00:00:00Z",
    price: 90573.59,
    volume_24h: 46315636680,
    market_cap: 1796346485034,
  },
  {
    timestamp: "2025-03-07T00:00:00Z",
    price: 88090.11,
    volume_24h: 56125742567,
    market_cap: 1747134359356,
  },
  {
    timestamp: "2025-03-08T00:00:00Z",
    price: 86268.64,
    volume_24h: 42249947822,
    market_cap: 1711045699199,
  },
  {
    timestamp: "2025-03-09T00:00:00Z",
    price: 84497.38,
    volume_24h: 19818259944,
    market_cap: 1675956129263,
  },
  {
    timestamp: "2025-03-10T00:00:00Z",
    price: 81044.37,
    volume_24h: 42216837463,
    market_cap: 1607505095746,
  },
  {
    timestamp: "2025-03-11T00:00:00Z",
    price: 81093.79,
    volume_24h: 55172098181,
    market_cap: 1608523847716,
  },
  {
    timestamp: "2025-03-12T00:00:00Z",
    price: 82625.91,
    volume_24h: 44487051567,
    market_cap: 1638952366642,
  },
  {
    timestamp: "2025-03-13T00:00:00Z",
    price: 82374.04,
    volume_24h: 35039484209,
    market_cap: 1633995985545,
  },
  {
    timestamp: "2025-03-14T00:00:00Z",
    price: 83201.64,
    volume_24h: 30613495221,
    market_cap: 1650451566304,
  },
  {
    timestamp: "2025-03-15T00:00:00Z",
    price: 84333.46,
    volume_24h: 24436327788,
    market_cap: 1672938774050,
  },
  {
    timestamp: "2025-03-16T00:00:00Z",
    price: 83690.7,
    volume_24h: 16096857476,
    market_cap: 1660225660478,
  },
  {
    timestamp: "2025-03-17T00:00:00Z",
    price: 83628.5,
    volume_24h: 24775539661,
    market_cap: 1659027423648,
  },
  {
    timestamp: "2025-03-18T00:00:00Z",
    price: 82627.37,
    volume_24h: 24259151685,
    market_cap: 1639203573593,
  },
  {
    timestamp: "2025-03-19T00:00:00Z",
    price: 84093.03,
    volume_24h: 26422779991,
    market_cap: 1668319897501,
  },
  {
    timestamp: "2025-03-20T00:00:00Z",
    price: 85302.56,
    volume_24h: 34859046774,
    market_cap: 1692354693598,
  },
  {
    timestamp: "2025-03-21T00:00:00Z",
    price: 84180.95,
    volume_24h: 23451590259,
    market_cap: 1670138277994,
  },
  {
    timestamp: "2025-03-22T00:00:00Z",
    price: 84264.61,
    volume_24h: 15745131776,
    market_cap: 1671837406602,
  },
  {
    timestamp: "2025-03-23T00:00:00Z",
    price: 84791.68,
    volume_24h: 11879296914,
    market_cap: 1682334871453,
  },
  {
    timestamp: "2025-03-24T00:00:00Z",
    price: 87403.34,
    volume_24h: 24513795716,
    market_cap: 1734196995176,
  },
  {
    timestamp: "2025-03-25T00:00:00Z",
    price: 87371.4,
    volume_24h: 31832194878,
    market_cap: 1733602246548,
  },
  {
    timestamp: "2025-03-26T00:00:00Z",
    price: 87381.58,
    volume_24h: 27555863392,
    market_cap: 1733846474985,
  },
  {
    timestamp: "2025-04-02T00:00:00Z",
    price: 85123.21,
    volume_24h: 30059436687,
    market_cap: 1689308529818,
  },
  {
    timestamp: "2025-04-03T00:00:00Z",
    price: 82835.69,
    volume_24h: 45287481490,
    market_cap: 1643951761394,
  },
];
