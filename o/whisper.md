# Transcribe voices with Whisper
`Updated: Sep 29, 2026 / Nov 22, 2025`

Works on macOS with Apple silicon.

It runs on your local device, giving you privacy and security. I even tried disconnecting the internet and confirmed that the transcription still works.

## Install Whisper (whisper-ctranslate2)
`pip3 install whisper-ctranslate2 --break-system-packages`

## Transcribe files
```
whisper-ctranslate2 *.mp4 \
  --model large-v3-turbo \
  --language en \
  --task transcribe \
  --threads "$(sysctl -n hw.logicalcpu)" \
  --compute_type int8 \
  --output_format all \
  --vad_filter True \
  --beam_size 1 \
  --verbose True
```

## References
- [whisper-ctranslate2 - GitHub](https://github.com/Softcatala/whisper-ctranslate2)
- [Generate Subtitles Locally with Whisper (2026): Free & Private - Local AI Master](https://localaimaster.com/blog/local-ai-subtitles-whisper)
- [Introducing Whisper - Open AI](https://openai.com/index/whisper/)
	- September 21, 2022
	- Whisper is an automatic speech recognition (ASR) system trained on 680,000 hours of multilingual and multitask supervised data collected from the web.
