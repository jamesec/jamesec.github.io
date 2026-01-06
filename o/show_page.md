# Show me the page
`Apr 29, 2024`

Today I made some changes to this website. 

Originally I use a pair of `.htm` and `.md` files to parse the markdown file and show the page.

For example, `this_page.htm` and `this_page.md`.

But now, I only use a single HTML file to parse all the markdown files.

A page link will be like: `s.htm?p=this_page`

It means, **s**how me the/this **p**age :-D
- `s.htm` means <u>s(how)</u>.htm
- `p=this_page` means the <u>p(age)</u> is `this_page`

Also, I added a function that set the page title to be the H1 plus my name, when parsing the markdown file.

You can use `View Page Source` to check the codes, or as below.

Actually I know little about JavaScript till now, so I asked ChatGPT AI and learned how to do these!

```javascript
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const searchParams = new URLSearchParams(window.location.search);
        var md_file = searchParams.get('p') + ".md";
          
        // Select the <zero-md> element
        var zeroMdElement = document.querySelector('zero-md');
        
        // Set the src attribute with the value of md_file variable
        zeroMdElement.setAttribute('src', md_file);
        
        // Wait for zero-md to finish loading and rendering
        zeroMdElement.addEventListener('zero-md-rendered', function() {
            // Extract h1 tag from the rendered Markdown content
            const h1Element = zeroMdElement.shadowRoot.querySelector('h1');
            const title = h1Element ? h1Element.textContent : 'Untitled';
            
            // Set title of the page
            document.title = title + " - James Even Chen";
        });
    });
</script>
```
