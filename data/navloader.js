let nav=
`<nav>
    <div class="top">
        <div class="sect">
            <a href="https://galaktisk.neocities.org/"><img src="https://galaktisk.neocities.org/galaktisk.png" alt=""></a>
        </div>
        <div class="sect search">
            <form action="/">
                <label for="q">Search Pages:</label>
                <input type="text" name="q" autocomplete="off">
                <button type="submit">Search</button>
            </form>
        </div>
    </div>
    <ul>
        <li><a href="https://galaktisk.neocities.org/">Browse</a></li>
        <li><a href="https://galaktisk.neocities.org/join/">Join</a></li>
        <li><a href="https://galaktisk.neocities.org/discord.html">Discord</a></li>
        <li><a href="https://galaktisk.neocities.org/pagebuilder/">Page Builder</a></li>
    </ul>
</nav>`;

if ((document.head.outerHTML.includes('<link rel="stylesheet" href="https://galaktisk.neocities.org/data/base.css"'))){
  const script = document.createElement('script');
  script.src = 'https://galaktisk.neocities.org/data/profile/blogObj.js';
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.body.insertAdjacentHTML("afterbegin", nav);
});