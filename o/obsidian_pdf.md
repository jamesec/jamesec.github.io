# How to export PDFs with page numbers in Obsidian
`Apr 9, 2026`

Obsidian is a great app. I use it every day and can’t live without it. It’s not perfect. It’s an Electron app, so it uses a lot of resources; and it’s not open source, which I wish it were. Still, I haven’t found a suitable alternative.

<a href="https://obsidian.md/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/1/10/2023_Obsidian_logo.svg" height="100" /></a>

Since I started using it, I no longer use Microsoft Word or Apple Pages proactively, except when someone sends me documents in those formats and I need to open them.

I create content in Obsidian and export it to PDFs to share with others. However, one feature is missing when exporting PDFs from Obsidian: they don’t include page numbers, and there is currently no built-in way to add them.

There is a feature request on the Obsidian forum titled “Add page numbers to PDF export”:  
https://forum.obsidian.md/t/add-page-numbers-to-pdf-export/32525  
However, this has not been addressed for a long time (since February 2022).

So I tried several workarounds until I found an Obsidian plugin called [Better Export PDF](https://github.com/l1xnan/obsidian-better-export-pdf).
- Uploading the PDFs to an online tool to add page numbers
- Using Typora app to export my content as PDFs
- Using a Python script to add page numbers to PDFs exported from Obsidian

You can add page numbers in the footer by configuring `Better Export PDF` plugin like this:

`Settings…` → `Better Export PDF` → `Footer Template`

```css
<div style="
  width:100vw;
  text-align:center;
  font-family:'Helvetica Neue';
  font-size:9px;
  letter-spacing:0.8px;
  font-weight:300;
  color:rgba(0,0,0,0.55);">
  <span class="pageNumber"></span> / <span class="totalPages"></span>
</div>
```

Then export using “Better Export PDF”, and make sure to turn on “Display Footer”.

## References
- [Tech stack of this website](/o/s.htm?p=tech_stack)
  - I utilize [mvp.css](https://github.com/andybrewer/mvp) and [Tokyo Night theme for Obsidian](https://github.com/tcmmichaelb139/obsidian-tokyonight/) for the styles…
  - I use Obsidian App to write in Markdown.
  - I've tried other Markdown editors, but most of them are jokes. However, Obsidian App literally changed my life. I use it to build my knowledge base as my second brain and also as a writing tool. It's free for personal use and highly recommended.
