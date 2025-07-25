let rawCode=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://galaktisk.neocities.org/data/top.css">
    <link rel="stylesheet" href="https://galaktisk.neocities.org/data/base.css">
    <link rel="shortcut icon" href="icon.png">
    <title>{name}</title>
</head>
<body>
    <nav>
        <div class="top">
            <div class="sect">
                <a href="https://galaktisk.neocities.org"><img src="https://galaktisk.neocities.org/galaktisk.png" alt=""></a>
            </div>
            <div class="sect search">
                <form action="https://galaktisk.neocities.org/">
                    <label for="q">Search Pages:</label>
                    <input type="text" name="q" autocomplete="off">
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
        <ul>
            <li><a href="https://galaktisk.neocities.org">Browse</a></li>
            <li><a href="https://galaktisk.neocities.org/join/">Join</a></li>
            <li><a href="https://galaktisk.neocities.org/discord.html">Discord</a></li>
        </ul>
    </nav>
    <div class="main">
        <div class="container">
            <div class="left">
                <h1>{name}</h1>
                <div class="profile">
                    <img src="icon.png" alt="" class="profile-pic">
                    <p class="profile-text">{smalltext}</p>
                </div>
                
                <div class="object">
                    <p class="label">
                        Contacting {name}
                    </p>
                    <div class="inner">
                        <table class="contacts-table" cellspacing="3" cellpadding="3">
                            <tbody>
                                {contact}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="object">
                    <p class="label">
                        Page URL
                    </p>
                    <div class="inner">
                        <p>{url}</p>
                    </div>
                </div>
                
                <div class="object">
                    <p class="label">
                        {name}'s Interests
                    </p>
                    <div class="inner">
                        <table class="interests-table" cellspacing="3" cellpadding="3">
                            <tbody>
                                <tr>
                                <td class="tableLeft"><p>General</p></td>
                                <td class="tableRight"><p>{general}</p></td>
                                </tr>
                                <tr>
                                <td class="tableLeft"><p>Music</p></td>
                                <td class="tableRight"><p>{music}</p></td>
                                </tr>
                                <tr>
                                <td class="tableLeft"><p>Movies</p></td>
                                <td class="tableRight"><p>{movies}</td>
                                </tr>
                                <tr>
                                <td class="tableLeft"><p>Television</p></td>
                                <td class="tableRight"><p>{television}</td>
                                </tr>
                                <tr>
                                <td class="tableLeft"><p>Books</p></td>
                                <td class="tableRight"><p>{books}</p></td>
                                </tr>
                                <tr>
                                <td class="tableLeft"><p>Heroes</p></td>
                                <td class="tableRight"><p>{heroes}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="right">
                <div class="object">
                    <p class="label">
                        {name}'s Blurbs
                    </p>
                    <h4>About me:</h4>
                    <p>
                        {aboutme}
                    </p>
                    <h4>Who I'd like to meet:</h4>
                    <p>
                        {meet}
                    </p>
                </div>
                <div class="object">
                    <p class="label">
                        {name}'s Links
                    </p>
                    <div class="inner">
                        <table class="links-table" cellspacing="3" cellpadding="3">
                        <tbody>
                            {links}
                        </tbody>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

const displayname=document.getElementById('displayname');
const smalltext=document.getElementById('smalltext');
const url=document.getElementById('url');

const general=document.getElementById('general');
const music=document.getElementById('music');
const movies=document.getElementById('movies');
const television=document.getElementById('television');
const books=document.getElementById('books');
const heroes=document.getElementById('heroes');

const aboutme=document.getElementById('aboutme');
const meet=document.getElementById('meet');

const contact=document.getElementById('contact');
const links=document.getElementById('links');

function store(id){
    localStorage.setItem(id,document.getElementById(id).value);
}

function load(){
    let e=document.getElementsByTagName('textarea');
    for (let i=0; i<e.length; i++){
        e[i].value=localStorage.getItem(e[i].id);
    }
}

let code;
let contactTemp;
let linksTemp;

function generateCode(){
    code=rawCode;
    code=code.replaceAll('{name}',displayname.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{smalltext}',smalltext.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{url}',url.value.replaceAll('\n','<br>'));
    
    code=code.replaceAll('{general}',general.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{music}',music.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{movies}',movies.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{television}',television.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{books}',books.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{heroes}',heroes.value.replaceAll('\n','<br>'));

    code=code.replaceAll('{aboutme}',aboutme.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{meet}',meet.value.replaceAll('\n','<br>'));

    contactTemp='';
    if (contact.value.includes('|')){
        let data=contact.value.split('\n');

        for (let i=0; i<data.length; i++){
            contactTemp+='<tr>\n';
            let tdata=data[i].split('|');
            contactTemp+=`<td class="tableLeft"><a href="${tdata[2]}">${tdata[0]}</a>\n`
            contactTemp+=`<td class="tableRight"><a href="${tdata[2]}">${tdata[1]}</a>\n`
            contactTemp+='</tr>\n';
        }
        code=code.replaceAll('{contact}',contactTemp);   
    }else{
        code=code.replaceAll('{contact}','');
    }

    linksTemp='';
    let data=links.value.split('\n');

    if (links.value.includes('|')){
        for (let i=0; i<data.length; i++){
            linksTemp+='<tr>\n';
            let tdata=data[i].split('|');
            linksTemp+=`<td class="tableLeft"><a href="${tdata[2]}">${tdata[0]}</a>\n`
            linksTemp+=`<td class="tableRight"><a href="${tdata[2]}">${tdata[1]}</a>\n`
            linksTemp+='</tr>\n';
        }
        code=code.replaceAll('{links}',linksTemp);
    }else{
        code=code.replaceAll('{links}','');
    }
    download("index.html",code);

}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

load();