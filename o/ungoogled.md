# Ungoogled Chromium browser with extensions
`Updated: Jan 5, 2026 / Apr 23, 2024`

This article outlines the steps on a Mac.

`Ungoogled Chromium` browser. A lightweight approach to removing Google web service dependency.

**Step 1:** Install `Ungoogled Chromium`.  
Install Homebrew package manager  
https://brew.sh/ → Install Homebrew

```
// Install Ungoogled Chromium browser
brew install --cask ungoogled-chromium

// Upgrade all Homebrew packages, including Ungoogled Chromium
brew update && brew upgrade && brew cleanup --prune=all
```

Or manually download and install `Ungoogled Chromium` (no auto-update). See the information in the references section.

## Change this Chromium flag
**Step 2:** Change this Chromium flag and relaunch the app.

Run the `Ungoogled Chromium` app you downloaded, and it will display the page: `chrome://ungoogled-first-run/`, which includes the instructions:
- Set `chrome://flags/#extension-mime-request-handling` to `Always prompt for install` and relaunch.
- Then click on the latest `Chromium.Web.Store.crx` link on [the extension's Releases page](https://github.com/NeverDecaf/chromium-web-store/releases/latest) (as shown in Step 3 below).

## Extension - Chromium Web Store
**Step 3:** Install the `Chromium Web Store` extension.

[Chromium Web Store extension](https://github.com/NeverDecaf/chromium-web-store/releases/latest)  
Click on `Chromium.Web.Store.crx`. A prompt will appear: Add "Chromium Web Store"?  
Click "Add extension", done.  
It has been successfully installed, and you can skip the manual installation steps outlined below.  
Pin the `Chromium Web Store` badge in your browser's toolbar. (Badges are hidden by default)

For some older versions of `Ungoogled Chromium`, you may need to install this extension manually. See the information in the references section.

## Extensions
<span style="border-bottom:1.5px solid; border-bottom-color:#f55066;">If you rarely use an extension, disable it at `chrome://extensions/` and re-enable it when needed.</span> For example, I only enable the `Awesome Screen Recorder & Screenshot` extension when I want to capture a full-page screenshot of a webpage.

- [uBlock Origin](https://chromewebstore.google.com/detail/cjpalhdlnbpafiamejdnhcphjbkeiagm)
  - uBlock Origin - An efficient blocker for Chromium and Firefox. Fast and lean.
- [Session Buddy](https://chromewebstore.google.com/detail/edacconmaakjimmfgnblocblbcdcpbko)
  - Session Buddy is a tab manager that can save all the tabs in your browser with a single click.
  - Settings → Other → Enable single-click close and delete
- [SingleFile](https://chromewebstore.google.com/detail/mpiodijhokgodhhofbcjdecpffjipkle)
  - Save a complete page into a single HTML file.
  - Options → File format → self-extracting ZIP (universal)
  - This is one example of how it can be used: [Best way to save your chat history with ChatGPT](s.htm?p=export_chatgpt)
- [Awesome Screen Recorder & Screenshot](https://chromewebstore.google.com/detail/nlipoenfbbikpbjkfpfillcgkoblgpmj)
  - I use this screenshot tool to capture full webpages.

### These extensions help enhance privacy, cybersecurity, and online protection
- [WebRTC Control](https://chromewebstore.google.com/detail/fjkmabmdepjfammlpliljpnbhleegehm)
  - Turn it on.
  - Test WebRTC Leak: Your browser is NOT leaking webrtc ip-address.
  - Have control over WebRTC (`disable | enable`) and protect your IP address.
- [Privacy Badger](https://chromewebstore.google.com/detail/pkehgijcmpdhfbdbbnkijodmdjhbjlgp)
  - Privacy Badger automatically learns to block invisible trackers.
- [Don't track me Google](https://chromewebstore.google.com/detail/gdbofhhdmcladcmmfjolgndfkpobecpg)
  - Removes the annoying link-conversion at Google Search/maps/...

---

## References
- [Note to Those Perhaps Hesitant to Install Ungoogled Chromium - Reddit](https://www.reddit.com/r/browsers/comments/16ceot2/note_to_those_perhaps_hesitant_to_install/?rdt=48071)
  - "Why would I use chromium and contribute to the blink monopoly."
    - "Because the blink monopoly is already established and some websites I use on a daily basis don't fully work over firefox."
- [Ungoogled Chromium browser with extensions - archived](s.htm?p=ungoogled_archived)

### Manually download and install `Ungoogled Chromium`
https://techspot.com/downloads/7181-ungoogled-chromium.html

I've used it for a long time with no issues. However, since it's a precompiled binary, use it at your own risk.  
Alternatively, you can compile it from [the source code](https://github.com/ungoogled-software/ungoogled-chromium).

As you manually install the downloaded `Ungoogled Chromium` App, click this button to allow it to run:  
(macOS) System Settings → Privacy & Security → Security → Open Anyway
   
### Manually install an extension
- **Use Safari Browser** to download the .crx file.
	- [Chromium Web Store extension](https://github.com/NeverDecaf/chromium-web-store/releases/latest)
- Change the extension name from .crx to **.cab**
- Use the Keka App to unpack it into a folder.
	- https://keka.io/en/ Download the Keka App **directly from the website** (there's a small link, something like: Download v1.6.0), instead of downloading it from the Mac App Store - unless you want to pay $4.99 as a kind of donation.
- For these manually installed extensions, give them specific folders:
	- Such as, ~/Downloads/Chromium Extensions/Chromium.Web.Store 1.5.4.3/
- Open `chrome://extensions/` in Chromium, then turn on "Developer mode".
- Click "Load unpacked", then choose the folder from the previous step.
