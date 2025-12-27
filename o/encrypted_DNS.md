# LibreDNS, Quad9, and other encrypted DNS services
`Dec 27, 2025`

Encrypted DNS helps keep your website lookups private, safer, and less tampered with — especially on public or untrusted networks.

## LibreDNS
- DNS over HTTPS, plus blocking Ads and Trackers
	- `Endpoint`: `https://doh.libredns.gr/noads`
- Privacy
	- One of the motives for creating this service was to build a DNS server that will keep a minimum amount of (meta)data and only the bare minimum that is required for its core functionality, in respect to users privacy.
	- We keep no logs. Logs are disabled for our DNS daemon.

### Chromium / Brave browser
- Settings…
- Search "DNS"
	- `chrome://settings/security?search=DNS`
- Enable the `Use secure DNS` switch
- Select `Add custom DNS service provider` and fill in `https://doh.libredns.gr/noads`

### LibreWolf browser
- Preferences / Settings
- Search "DNS"
- `Enable DNS over HTTPS using:`
	- → Max Protection → LibreDNS (Adblocking)

### Verify settings
- https://libredns.gr/
	-  You are using LibreDNS. Your DNS requests are encrypted!

## If using Quad9 instead
- `Endpoint`: `https://dns.quad9.net/dns-query`
- More information: [Service Addresses & Features - Quad9](https://quad9.net/service/service-addresses-and-features/)

### Verify settings
- https://on.quad9.net/
	- Yes, you ARE using quad9.


## Other encrypted DNS services
- Mullvad DNS
	- `Endpoint`: `https://adblock.dns.mullvad.net/dns-query`
	- Verify: https://mullvad.net/en/check
	- More information: [DNS over HTTPS and DNS over TLS - Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls)
		- You can use this privacy-enhancing service even if you are not a Mullvad customer.
- DNS4all
	- `Endpoint`: `https://doh.dns4all.eu/dns-query`
	- Verify: https://dns4all.eu/test.html
	- More information: https://dns4all.eu/
- Wikimedia DNS
	- `Endpoint`: `https://wikimedia-dns.org/dns-query`
	- Verify: https://check.wikimedia-dns.org/
	- More information: [Wikimedia DNS Instructions](https://meta.wikimedia.org/wiki/Wikimedia_DNS/Instructions)

## Final notes
Using DoH (DNS over HTTPS) from a browser means that your DNS lookups are secure only within that browser, and not from other browsers or applications.

If you want to use these encrypted DNS services on your iPhone, you need to download and install a mobile configuration profile for DoH. You can find more details on each provider’s information page.

## References
- [UnGoogled Chromium browser with extensions]((/o/s.htm?p=ungoogled))
