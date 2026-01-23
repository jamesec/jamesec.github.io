# Transcribe voices with Whisper
`Nov 22, 2025`

Works on macOS with Apple silicon.

It runs completely on your local device, giving you the highest level of privacy and security. I even tried disconnecting the internet and confirmed that the transcription still works.

## Install Homebrew package manager
https://brew.sh/ → Install Homebrew

## Install Whisper (whisper-ctranslate2)
whisper-ctranslate2 works with Python 3.13 and earlier, but not with 3.14, so we’ll use 3.13.

```
# Step 1: Install Homebrew Python 3.13
brew install python@3.13

# Optional
brew pin python@3.13

# Step 2: Link Python 3.13 into your PATH
brew link python@3.13 --force

# Step 3: Install whisper-ctranslate2 in the user directory, avoiding system-wide changes
python3.13 -m pip install --break-system-packages --user whisper-ctranslate2

# Step 4: Verify the installation
whisper-ctranslate2 --version
```

## Transcribe files
```
whisper-ctranslate2 *.mp4 \
  --model small \
  --language en \
  --task transcribe \
  --compute_type int8 \
  --output_format vtt \
  --vad_filter true \
  --verbose true
```

### languages
- `--language en`
	- Or: `--language English`
- `--language zh`
	- Or: `--language Chinese`
- `--language es`
	- Or: `--language Spanish`

### AI models
- `--model small`
- `--model medium`
- `--model large-v3`
- `--model large-v3-turbo`

### Transcribe something in mixed languages
If we want to transcribe something in mixed languages, and we’re going to use almost all of this Mac’s power to do it, also to get the best accuracy, use this command:

```
whisper-ctranslate2 *.mp4 \
  --model large-v3-turbo \
  --task transcribe \
  --threads $(sysctl -n hw.logicalcpu) \
  --compute_type int8 \
  --output_format vtt \
  --vad_filter true \
  --verbose true
```

## References - What is Whisper?
- [Introducing Whisper - Open AI](https://openai.com/index/whisper/)
	- September 21, 2022
	- Whisper is an automatic speech recognition (ASR) system trained on 680,000 hours of multilingual and multitask supervised data collected from the web.
