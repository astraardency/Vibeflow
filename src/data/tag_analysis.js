const fs = require('fs');

const file1 = 'e:/web/src/data/galex_90s_10000_songs.json';
const file2 = 'e:/web/src/data/galex_10000_songs.json';

let songs1 = [];
let songs2 = [];

try {
  songs1 = JSON.parse(fs.readFileSync(file1, 'utf8'));
} catch (e) {
  console.log("Error reading file1", e);
}

try {
  songs2 = JSON.parse(fs.readFileSync(file2, 'utf8'));
} catch (e) {
  console.log("Error reading file2", e);
}

const allSongs = [...songs1, ...songs2];
const tagCounts = {};

allSongs.forEach(song => {
  if (song.tags && Array.isArray(song.tags)) {
    song.tags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      tagCounts[lowerTag] = (tagCounts[lowerTag] || 0) + 1;
    });
  }
});

console.log(`Total songs: ${allSongs.length}`);
console.log(`Unique tags: ${Object.keys(tagCounts).length}`);
const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
console.log("Top 20 tags:");
console.log(sortedTags.slice(0, 20));
