$steps = @(
    @{ name = "Anirudh Ravichander"; step = 86 },
    @{ name = "A. R. Rahman"; step = 106 },
    @{ name = "Harris Jayaraj"; step = 108 },
    @{ name = "Yuvan Shankar Raja"; step = 110 },
    @{ name = "Ilaiyaraaja"; step = 112 },
    @{ name = "Deva"; step = 114 },
    @{ name = "Dhina"; step = 116 },
    @{ name = "Vidyasagar"; step = 118 },
    @{ name = "D. Imman"; step = 120 },
    @{ name = "G. V. Prakash Kumar"; step = 122 },
    @{ name = "Hiphop Tamizha"; step = 124 },
    @{ name = "Santhosh Narayanan"; step = 126 }
)

$output = "# Tamil Songs of Artists You Love (JioSaavn)`r`n`r`n"

foreach ($s in $steps) {
    $name = $s.name
    $stepNum = $s.step
    $path = "C:\Users\prath\.gemini\antigravity-ide\brain\120cb348-2631-4acc-8454-e40a4abc0902\.system_generated\steps\$stepNum\content.md"
    
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        # Find index where JSON starts
        $jsonIdx = $content.IndexOf('{"success":true')
        if ($jsonIdx -ne -1) {
            $jsonStr = $content.Substring($jsonIdx)
            $json = ConvertFrom-Json $jsonStr
            
            $output += "## $name`r`n`r`n"
            $output += "| # | Song Name | Album / Movie | Duration |`r`n"
            $output += "|---|-----------|---------------|----------|`r`n"
            
            $idx = 1
            foreach ($song in $json.data.results) {
                $songName = $song.name
                $albumName = "Single"
                if ($song.album -and $song.album.name) {
                    $albumName = $song.album.name
                }
                
                $durationSec = $song.duration
                $min = [math]::Floor($durationSec / 60)
                $sec = ($durationSec % 60).ToString().PadLeft(2, '0')
                $duration = "$min:$sec"
                
                $output += "| $idx | $songName | $albumName | $duration |`r`n"
                $idx++
            }
            $output += "`r`n"
        }
    } else {
        $output += "## $name`r`n*(No songs data found)*`r`n`r`n"
    }
}

Set-Content -Path "e:\web\songs_list.md" -Value $output
Write-Output "Successfully compiled songs_list.md"
