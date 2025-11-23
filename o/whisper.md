# Transcribe voices with Whisper
`Nov 22, 2025`

## Install Homebrew package manager
- https://brew.sh/
	- Install Homebrew

## Install Whisper (whisper-ctranslate2)
```
# Step 1: Install Homebrew Python 3.13
brew install python@3.13

# Step 2: Link Python 3.13 into your PATH
brew link python@3.13 --force

# Step 3: Install whisper-ctranslate2 safely for your user
python3.13 -m pip install --break-system-packages --user whisper-ctranslate2

# Step 4: Verify the installation
whisper-ctranslate2 --version
```

## Transcribe audio file
```
whisper-ctranslate2 audio1.m4a \
  --model small \
  --language en \
  --compute_type float32 \
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

## References - What is Whisper?
- [Introducing Whisper - Open AI](https://openai.com/index/whisper/)
	- September 21, 2022
	- Whisper is an automatic speech recognition (ASR) system trained on 680,000 hours of multilingual and multitask supervised data collected from the web. 
