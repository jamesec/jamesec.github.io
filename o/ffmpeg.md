# Upscaling DVD video clips with ffmpeg
`Jun 23, 2025`

Here are some ffmpeg commands I’ve recently used and found useful.

## Upscaling DVD video clips and adding hard subtitles

I want to add embedded (hard) subtitles to some DVD clips so they can be played in the Obsidian Slides or Keynote app. Since the resolution of the original footage is relatively low (720×480 pixels is the standard resolution for NTSC DVDs, and 720×576 pixels for PAL DVDs), I plan to upscale the video first, then embed the subtitles. Otherwise, the subtitles in the final video may appear blurry due to the low original resolution.

Upscaling DVD video clips:

```
ffmpeg -i v.mp4 -vf "scale=1280:720:flags=lanczos" -c:a copy upscaled.mp4
```

Adding hard subtitles:

```
ffmpeg -i v.mp4 -vf subtitles=s.vtt -c:v libx264 -c:a copy output.mp4
or
ffmpeg -i v.mp4 -vf subtitles=s.srt -c:v libx264 -c:a copy output.mp4
```

## References - getting ffmpeg for Apple Silicon and making it available system-side
- Download ffmpeg from [OSXExperts](https://osxexperts.net/)
  - Download ffmpeg 7.1.1 (Apple Silicon)

### Making it available system-side
Put ffmpeg in this folder: `~/Downloads/App/`

Use [nano](https://freecodecamp.org/news/how-to-save-and-exit-nano-in-terminal-nano-quit-command/) to edit your zsh configuration file:
```
nano ~/.zshrc
```

Add this line to the file: `export PATH=~/Downloads/App/:$PATH`
Save and exit (press `Ctrl + X`, then `Y`, then `Enter`).

Reload the config:
```
source ~/.zshrc
```

Make ffmpeg executable:
```
chmod +x ~/Downloads/App/ffmpeg
```

Check if ffmpeg works:
```
ffmpeg --version
```
