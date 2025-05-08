# UnGoogled Chromium browser with extensions
`Updated: May 8, 2025 / April 23, 2024`

This article outlines the steps on a Mac.

**Step 1:** Download `UnGoogled Chromium` and install it.  
https://techspot.com/downloads/7181-ungoogled-chromium.html  
A lightweight approach to removing Google web service dependency.

It claims to be `Certified 100% clean`, and I've used it for a long time with no issues. But it's a pre-compiled binary, so use at your own risk.

Alternatively, you can compile it from [the source code](https://github.com/ungoogled-software/ungoogled-chromium).

As you manually install the downloaded `UnGoogled Chromium` App, click this button to allow it to run:  
(macOS) System Settings → Privacy & Security → Security → Open Anyway

## Extension - Chromium Web Store
**Step 2:** Manually install the `Chromium Web Store` extension.

### Manually install an extension
- **Use Safari Browser** to download the .crx file.
	- [Chromium Web Store extension](https://github.com/NeverDecaf/chromium-web-store/releases/latest)
	- If you use Chromium Browser to download the .crx file, it will disappear! 
- Change the extension name from .crx to **.cab**
- Use the Keka App to unpack it into a folder.
	- https://keka.io/en/ Download the Keka App **directly from the website** (there's a small link, something like:  Download v1.4.8), instead of downloading it from the Mac App Store - unless you want to pay $4.99 as a kind of donation.
- Open `chrome://extensions/` in Chromium, then turn on "Developer mode".
- For these manually installed extensions, give them specific folders:
	- Such as, ~/Downloads/Chromium Extensions/Chromium.Web.Store 1.5.4.3/
- Load unpacked, then choose the folder from the previous steps.

## Change this Chromium flag
**Step 3:** Change this Chromium flag and restart the Chromium App so that in the following steps, you can install extensions from the real Chromium Web Store, and there's no need to manually install them.

https://github.com/NeverDecaf/chromium-web-store
- `In the Read this first section` If you are using `ungoogled-chromium`:
	- You must **change the flag** `chrome://flags/#extension-mime-request-handling` to `Always prompt for install`.
- The "Add to Chrome" button will sometimes be disabled when navigating around the web store.
	- If this happens you can refresh the page to fix it.
- Usage: Pin the Chromium Web Store badge in your browser's toolbar. (Badges are hidden by default)

## Extensions
<span style="border-bottom:1.5px solid; border-bottom-color:#f55066;">If you rarely use an extension, disable it at `chrome://extensions/` and re-enable it when needed.</span> For example, I only enable the `Awesome Screen Recorder & Screenshot` extension when I want to capture a full-page screenshot of a webpage.

- [uBlock Origin](https://chromewebstore.google.com/detail/cjpalhdlnbpafiamejdnhcphjbkeiagm)
  - uBlock Origin - An efficient blocker for Chromium and Firefox. Fast and lean.
- [Session Buddy](https://chromewebstore.google.com/detail/edacconmaakjimmfgnblocblbcdcpbko)
  - Session Buddy is a tab manager that can save all the tabs in your browser with a single click.
- [SingleFile](https://chromewebstore.google.com/detail/mpiodijhokgodhhofbcjdecpffjipkle)
  - Save a complete page into a single HTML file.
  - This is one example of how it can be used: [Best way to save your chat history with ChatGPT](s.htm?p=export_chatgpt)
- [Awesome Screen Recorder & Screenshot](https://chromewebstore.google.com/detail/nlipoenfbbikpbjkfpfillcgkoblgpmj)
  - I use this screenshot tool to capture full webpages.

### These extensions help enhance privacy, cybersecurity, and online protection:
- [WebRTC Control](https://chromewebstore.google.com/detail/fjkmabmdepjfammlpliljpnbhleegehm)
  - Turn it on.
  - Test WebRTC Leak: Your browser is NOT leaking webrtc ip-address.
  - Have control over WebRTC (disable | enable) and protect your IP address.
- [Privacy Badger](https://chromewebstore.google.com/detail/pkehgijcmpdhfbdbbnkijodmdjhbjlgp)
  - Privacy Badger automatically learns to block invisible trackers.
- [Don't track me Google](https://chromewebstore.google.com/detail/gdbofhhdmcladcmmfjolgndfkpobecpg)
  - Removes the annoying link-conversion at Google Search/maps/...
- [Google Analytics Opt-out Add-on (by Google)](https://chromewebstore.google.com/detail/fllaojicojecljbmefodhfapmkghcbnh)
  - Tells the Google Analytics JavaScript not to send information to Google Analytics.

## References
- [UnGoogled Chromium browser with extensions - archived](s.htm?p=ungoogled_archived)
