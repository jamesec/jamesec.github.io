class t extends HTMLElement {
    get src() {
        return this.getAttribute("src");
    }
    set src(t) {
        this.reflect("src", t);
    }
    get manualRender() {
        return this.hasAttribute("manual-render");
    }
    set manualRender(t) {
        this.reflect("manual-render", t);
    }
    reflect(t, e) {
        !1 === e ? this.removeAttribute(t) : this.setAttribute(t, !0 === e ? "" : e);
    }
    static get observedAttributes() {
        return ["src"];
    }
    attributeChangedCallback(t, e, s) {
        "src" === t && this.connected && !this.manualRender && s !== e && this.render();
    }
    constructor(t) {
        super(),
            (this.version = "2.5.4"),
            (this.config = {
                markedUrl: "/assets/scripts/marked_4.3.0.js",
                prismUrl: [["/assets/scripts/prism_1.29.0.js", "data-manual"], "/assets/scripts/prism_autoloader.min.js"],
                cssUrls: ["/assets/styles/styles_evenc.css", "/assets/styles/prism_okaidia.css"],
                hostCss: ":host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}",
                ...t,
                ...window.ZeroMdConfig,
            }),
            (this.root = this.hasAttribute("no-shadow") ? this : this.attachShadow({ mode: "open" })),
            this.root.prepend(...this.makeNodes('<div class="markdown-styles"></div><div class="markdown-body"></div>')),
            this.constructor.ready || (this.constructor.ready = Promise.all([!!window.marked || this.loadScript(this.config.markedUrl), !!window.Prism || this.loadScript(this.config.prismUrl)])),
            (this.clicked = this.clicked.bind(this)),
            this.manualRender || this.render().then(() => setTimeout(() => this.goto(location.hash), 250)),
            (this.observer = new MutationObserver(() => {
                this.observeChanges(), this.manualRender || this.render();
            })),
            this.observer.observe(this, { childList: !0 }),
            this.observeChanges();
    }
    observeChanges() {
        this.querySelectorAll('template,script[type="text/markdown"]').forEach((t) => {
            this.observer.observe(t.content || t, { childList: !0, subtree: !0, attributes: !0, characterData: !0 });
        });
    }
    connectedCallback() {
        (this.connected = !0),
            this.fire("zero-md-connected", {}, { bubbles: !1, composed: !1 }),
            this.waitForReady().then(() => {
                this.fire("zero-md-ready");
            }),
            this.shadowRoot && this.shadowRoot.addEventListener("click", this.clicked);
    }
    disconnectedCallback() {
        (this.connected = !1), this.shadowRoot && this.shadowRoot.removeEventListener("click", this.clicked);
    }
    waitForReady() {
        const t =
            this.connected ||
            new Promise((t) => {
                this.addEventListener("zero-md-connected", function e() {
                    this.removeEventListener("zero-md-connected", e), t();
                });
            });
        return Promise.all([this.constructor.ready, t]);
    }
    fire(t, e = {}, s = { bubbles: !0, composed: !0 }) {
        e.msg && console.warn(e.msg), this.dispatchEvent(new CustomEvent(t, { detail: { node: this, ...e }, ...s }));
    }
    tick() {
        return new Promise((t) => requestAnimationFrame(t));
    }
    arrify(t) {
        return t ? (Array.isArray(t) ? t : [t]) : [];
    }
    onload(t) {
        return new Promise((e, s) => {
            (t.onload = e), (t.onerror = (t) => s(t.path ? t.path[0] : t.composedPath()[0]));
        });
    }
    loadScript(t) {
        return Promise.all(
            this.arrify(t).map((t) => {
                const [e, ...s] = this.arrify(t),
                    r = document.createElement("script");
                return (r.src = e), (r.async = !1), s.forEach((t) => r.setAttribute(t, "")), this.onload(document.head.appendChild(r));
            })
        );
    }
    goto(t) {
        let e;
        try {
            e = this.root.querySelector(t);
        } catch {}
        e && e.scrollIntoView();
    }
    clicked(t) {
        if (t.metaKey || t.ctrlKey || t.altKey || t.shiftKey || t.defaultPrevented) return;
        const e = t.target.closest("a");
        e && e.hash && e.host === location.host && e.pathname === location.pathname && this.goto(e.hash);
    }
    dedent(t) {
        const e = (t = t.replace(/^\n/, "")).match(/^\s+/);
        return e ? t.replace(new RegExp(`^${e[0]}`, "gm"), "") : t;
    }
    getBaseUrl(t) {
        const e = document.createElement("a");
        return (e.href = t), e.href.substring(0, e.href.lastIndexOf("/") + 1);
    }
    highlight(t) {
        return new Promise((e) => {
            t.querySelectorAll('pre>code:not([class*="language-"])').forEach((t) => {
                const e = t.innerText.match(/^\s*</) ? "markup" : t.innerText.match(/^\s*(\$|#)/) ? "bash" : "js";
                t.classList.add(`language-${e}`);
            });
            try {
                window.Prism.highlightAllUnder(t, !0, e());
            } catch {
                window.Prism.highlightAllUnder(t), e();
            }
        });
    }
    makeNodes(t) {
        const e = document.createElement("template");
        return (e.innerHTML = t), e.content.children;
    }
    buildStyles() {
        const t = (t) => {
                const e = this.querySelector(t);
                return e ? e.innerHTML || " " : "";
            },
            e = this.arrify(this.config.cssUrls);
        return `<style>${this.config.hostCss}</style>${t('template[data-merge="prepend"]')}${t("template:not([data-merge])") || e.reduce((t, e) => `${t}<link rel="stylesheet" href="${e}">`, "")}${t('template[data-merge="append"]')}`;
    }
    async buildMd(t = {}) {
        return (
            (await (async () => {
                if (!this.src) return "";
                const e = await fetch(this.src);
                if (e.ok) {
                    const s = await e.text();
                    return window.marked.parse(s, { baseUrl: this.getBaseUrl(this.src), ...t });
                }
                return this.fire("zero-md-error", { msg: `[zero-md] HTTP error ${e.status} while fetching src`, status: e.status, src: this.src }), "";
            })()) ||
            (() => {
                const e = this.querySelector('script[type="text/markdown"]');
                if (!e) return "";
                const s = e.hasAttribute("data-dedent") ? this.dedent(e.text) : e.text;
                return window.marked.parse(s, t);
            })()
        );
    }
    getHash(t) {
        let e = 5381;
        for (let s = 0; s < t.length; s++) e = ((e << 5) + e) ^ t.charCodeAt(s);
        return (e >>> 0).toString(36);
    }
    async stampStyles(t) {
        const e = this.getHash(t),
            s = this.root.querySelector(".markdown-styles");
        if (s.getAttribute("data-hash") !== e) {
            s.setAttribute("data-hash", e);
            const r = this.makeNodes(t),
                i = [...r].filter((t) => "LINK" === t.tagName && "stylesheet" === t.getAttribute("rel"));
            return (
                (s.innerHTML = ""),
                s.append(...r),
                await Promise.all(i.map((t) => this.onload(t))).catch((t) => {
                    this.fire("zero-md-error", { msg: "[zero-md] An external stylesheet failed to load", status: void 0, src: t.href });
                }),
                !0
            );
        }
    }
    async stampBody(t, e) {
        const s = this.arrify(e),
            r = this.getHash(t + JSON.stringify(s)),
            i = this.root.querySelector(".markdown-body");
        if (i.getAttribute("data-hash") !== r) {
            i.setAttribute("data-hash", r), s.unshift("markdown-body"), i.setAttribute("class", s.join(" "));
            const e = this.makeNodes(t);
            return (i.innerHTML = ""), i.append(...e), await this.highlight(i), !0;
        }
    }
    async render(t = {}) {
        await this.waitForReady();
        const e = this.buildMd(t),
            s = await this.stampStyles(this.buildStyles());
        await this.tick();
        const r = await this.stampBody(await e, t.classes);
        this.fire("zero-md-rendered", { node: this, stamped: { styles: s, body: r } });
    }
}
customElements.define("zero-md", t);
export { t as ZeroMd };
