const fs = require('fs');
const path = require('path');

const steps = [
  { name: "Anirudh Ravichander", step: 86 },
  { name: "A. R. Rahman", step: 106 },
  { name: "Harris Jayaraj", step: 108 },
  { name: "Yuvan Shankar Raja", step: 110 },
  { name: "Ilaiyaraaja", step: 112 },
  { name: "Deva", step: 114 },
  { name: "Dhina", step: 116 },
  { name: "Vidyasagar", step: 118 },
  { name: "D. Imman", step: 120 },
  { name: "G. V. Prakash Kumar", step: 122 },
  { name: "Hiphop Tamizha", step: 124 },
  { name: "Santhosh Narayanan", step: 126 }
];

let output = "# Tamil Songs of Artists You Love (JioSaavn)\n\nThis document compiles the top Tamil songs fetched from the JioSaavn API for each of the 12 artists in the \"Artists You Love\" section.\n\n";

steps.forEach(({ name, step }) => {
  const filePath = `C:\\Users\\prath\\.gemini\\antigravity-ide\\brain\\120cb348-2631-4acc-8454-e40a4abc0902\\.system_generated\\steps\\${step}\\content.md`;
  
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonStartIdx = content.indexOf('{"success":true');
      if (jsonStartIdx !== -1) {
        const jsonStr = content.substring(jsonStartIdx);
        const response = JSON.parse(jsonStr);
        
        output += `## ${name}\n\n`;
        output += `| # | Song Name | Album / Movie | Duration |\n`;
        output += `|---|-----------|---------------|----------|\n`;
        
        if (response.data && response.data.results && response.data.results.length > 0) {
          response.data.results.forEach((song, idx) => {
            const songName = song.name || 'Unknown';
            const albumName = (song.album && song.album.name) ? song.album.name : 'Single';
            const durationSec = song.duration || 0;
            const min = Math.floor(durationSec / 60);
            const sec = String(durationSec % 60).padStart(2, '0');
            const duration = `${min}:${sec}`;
            
            output += `| ${idx + 1} | ${songName} | ${albumName} | ${duration} |\n`;
          });
        } else {
          output += `| - | No songs found | - | - |\n`;
        }
        output += `\n`;
      } else {
        output += `## ${name}\n\n*(Failed to locate JSON response in step content)*\n\n`;
      }
    } else {
      output += `## ${name}\n\n*(Step file does not exist: ${filePath})*\n\n`;
    }
  } catch (err) {
    output += `## ${name}\n\n*(Error reading/parsing step data: ${err.message})*\n\n`;
  }
});

fs.writeFileSync('e:\\web\\songs_list.md', output, 'utf8');
console.log('Successfully created e:\\web\\songs_list.md');
