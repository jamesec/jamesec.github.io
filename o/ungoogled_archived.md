# UnGoogled Chromium browser with extensions - archived  
Updated: [UnGoogled Chromium browser with extensions](s.htm?p=ungoogled)

`Apr 23, 2024`

This article outlines the steps on a Mac.

**Step 1:** Download `UnGoogled Chromium` and install it.

https://techspot.com/downloads/7181-ungoogled-chromium.html

A lightweight approach to removing Google web service dependency.

It claims to be `Certified 100% clean`, and I've used it for a long time with no issues. But it's a pre-compiled binary, so use at your own risk.

Another link to download it:  
https://ungoogled-software.github.io/ungoogled-chromium-binaries/

Alternatively, you can compile it from the source code:

https://github.com/ungoogled-software/ungoogled-chromium

As you manually install the downloaded `UnGoogled Chromium` App, click this button to allow it to run:

(macOS) System Settings → Privacy & Security → Security → Open Anyway

## Extension - Chromium Web Store
**Step 2:** Manually install the `Chromium Web Store` extension.

### Manually install an extension
- **Use Safari Browser** to download the .crx file.
	- [Chromium Web Store extension](https://github.com/NeverDecaf/chromium-web-store/releases/latest)
		- Latest version as of Apr 23, 2024: 1.5.4.2
	- If you use Chromium Browser to download the .crx file, it will disappear! 
- Change the extension name from .crx to **.cab**
- Use the Keka App to unpack it into a folder.
	- https://keka.io/en/ Download the Keka App **directly from the website** (there's a small link, something like:  Download v1.3.8), instead of downloading it from the Mac App Store - unless you want to pay $4.99 as a kind of donation.
- Open `chrome://extensions/` in Chromium, then turn on "Developer mode".
- For these manually installed extensions, give them specific folders:
	- Such as, ~/Downloads/Chromium Extensions/Chromium.Web.Store 1.5.4.2/
- Load unpacked, then choose the folder from the previous steps.

## Change this Chromium flag
**Step 3:** Change this Chromium flag and restart the Chromium App so that in the following steps, you can install extensions from the real Chromium Web Store, and there's no need to manually install them.

https://github.com/NeverDecaf/chromium-web-store
- `In the Read this first section` If you are using `ungoogled-chromium`:
	- You must **change the flag** `chrome://flags/#extension-mime-request-handling` to `Always prompt for install`.
- The "Add to Chrome" button will sometimes be disabled when navigating around the web store.
	- If this happens you can refresh the page to fix it.
- Usage: Pin the Chromium Web Store badge in your browser's toolbar. (Badges are hidden by default)

## Extensions, sorted by how strongly I recommend it
### uBlock Origin
[uBlock Origin](https://chromewebstore.google.com/detail/cjpalhdlnbpafiamejdnhcphjbkeiagm)

Latest version as of Apr 23, 2024, **on Chrome Web Store: 1.57.0**

uBlock Origin - An efficient blocker for Chromium and Firefox. Fast and lean.

[uBlock Origin - GitHub](https://github.com/gorhill/uBlock/releases/latest)

Latest version as of Apr 23, 2024, **on GitHub: 1.57.2**

Initially, we've manually installed the `Chromium Web Store` extension. To use the latest version of uBlock Origin, **manually install it too**.

So, **Step 4:** Manually install the uBlock Origin extension.
- Download uBlock0_1.57.2.chromium.zip from [here](https://github.com/gorhill/uBlock/releases/tag/1.57.2).
- Unpack it into a folder.
- In Chromium, Load unpacked, choose the folder in the above step.
- For these manually installed extensions, give them specific folders:
	- Such as, ~/Downloads/Chromium Extensions/uBlock 1.57.2/

**Step 5:** Install the following recommended extensions as you want, and configure them accordingly.

Simply click on the link of an extension, then click the blue button `Add to Chrome`.

### WebRTC Control
[WebRTC Control](https://chromewebstore.google.com/detail/fjkmabmdepjfammlpliljpnbhleegehm)

Latest version as of Apr 23, 2024: 0.3.2
- Turn it on.
- Test WebRTC Leak: Your browser is NOT leaking webrtc ip-address.

### Don't track me Google
[Don't track me Google](https://chromewebstore.google.com/detail/gdbofhhdmcladcmmfjolgndfkpobecpg)

Latest version as of Apr 23, 2024: 4.28

### Sessionic
[Sessionic](https://chromewebstore.google.com/detail/mdakbhkahkmdafnfhdikbddkngcbhenc)

A web extension to save, manage and restore sessions, windows and tabs.

Latest version as of Apr 23, 2024: 1.7.1

### Privacy Badger
[Privacy Badger](https://chromewebstore.google.com/detail/pkehgijcmpdhfbdbbnkijodmdjhbjlgp)

Latest version as of Apr 23, 2024: 2024.2.6

### Take Webpage Screenshots Entirely - FireShot
[Take Webpage Screenshots Entirely - FireShot](https://chromewebstore.google.com/detail/mcbpblocgmgfnpjjppndjkmgjaogfceg)

Latest version as of Apr 23, 2024: 1.12.18

**Probably better:** [Awesome Screen Recorder & Screenshot](https://chromewebstore.google.com/detail/nlipoenfbbikpbjkfpfillcgkoblgpmj)
