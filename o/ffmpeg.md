# Some useful ffmpeg commands
`Jun 22, 2024`

Just take some notes on ffmpeg commands that I used recently.

Problem 1 to be solved:

720×480 pixels is the standard resolution for NTSC DVDs and 720×576 pixels for PAL DVDs.

```
ffmpeg -i v.mp4 -vf "scale=1280:720:flags=lanczos" -c:a copy upscaled.mp4
```

```
ffmpeg -i v.mp4 -vf subtitles=s.srt -c:v libx264 -c:a copy output.mp4
```

```
ffmpeg -i v.mp4 -vf subtitles=s.vtt -c:v libx264 -c:a copy output.mp4
```

Problem 2 to be solved:

```
ffmpeg -i video.mp4 -af "pan=stereo|c0=c0|c1=c0" -c:v copy output.mp4
```

## References - get ffmpeg for Apple Silicon and make it system-wide available
https://osxexperts.net/
- Download ffmpeg 7.1.1 (Apple Silicon)
