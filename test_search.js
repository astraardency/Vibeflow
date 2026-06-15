const fetch = require('node-fetch');

async function testSearch() {
  const q = "Verappa Sai Abhyankkar, Arivu, Arun Srinivasan";
  const url = `https://saavn.sumit.co/api/search/songs?query=${encodeURIComponent(q)}&limit=5`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data.data.results.map(r => ({title: r.title, artist: r.artist})), null, 2));
}

testSearch();
