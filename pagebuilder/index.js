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
    <!-- Built using Galaktisk Page Builder - the Myspace-esque social webring -->
    <!-- https://galaktisk.neocities.org/ -->
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
                    <div class="inner">
                        <h4>About me:</h4>
                        <p>
                            {aboutme}
                        </p>
                        <h4>Who I'd like to meet:</h4>
                        <p>
                            {meet}
                        </p>
                      </div>
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
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://galaktisk.neocities.org/data/navloader.js"></script>
</body>
</html>`;

let rawJSON=`
{
    "displayname": "{display}",
    "smalltext": "{smalltext}",
    "url": "{url}",
    "general": "{general}",
    "music": "{music}",
    "movies": "{movies}",
    "television": "{television}",
    "books": "{books}",
    "heroes": "{heroes}",
    "aboutme": "{aboutme}",
    "meet": "{meet}",
    "contact":[
        {contacts}
    ],
    "links":[
        {links}
    ]
}
`;

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

normInputs=[displayname,smalltext,url,general,music,movies,television,books,heroes,aboutme,meet]
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
let json;
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

function patchForJSON(t){
    return t.replaceAll('\n','<br>').replaceAll('"','&quot;');
}

function patchFromJSON(t){
    return t.replaceAll('<br>','\n').replaceAll('&quot;','"');
}

function downloadJSON(){
    json=rawJSON;
    json=json.replaceAll('{display}',patchForJSON(displayname.value));
    json=json.replaceAll('{smalltext}',patchForJSON(smalltext.value));
    json=json.replaceAll('{url}',patchForJSON(url.value));
    
    json=json.replaceAll('{general}',patchForJSON(general.value));
    json=json.replaceAll('{music}',patchForJSON(music.value));
    json=json.replaceAll('{movies}',patchForJSON(movies.value));
    json=json.replaceAll('{television}',patchForJSON(television.value));
    json=json.replaceAll('{books}',patchForJSON(books.value));
    json=json.replaceAll('{heroes}',patchForJSON(heroes.value));

    json=json.replaceAll('{aboutme}',patchForJSON(aboutme.value));
    json=json.replaceAll('{meet}',patchForJSON(meet.value));

    contactTemp='';
    if (contact.value.includes('|')){
        let data=contact.value.split('\n');

        for (let i=0; i<data.length; i++){
            contactTemp+='[\n';
            let tdata=data[i].split('|');
            contactTemp+=`            "${patchForJSON(tdata[0])}",\n`
            contactTemp+=`            "${patchForJSON(tdata[1])}",\n`
            contactTemp+=`            "${patchForJSON(tdata[2])}"\n`;
            contactTemp+='        ]';
            if (i<data.length-1){
                contactTemp+=',';
            }
        }
        json=json.replaceAll('{contacts}',contactTemp);   
    }else{
        json=json.replaceAll('{contacts}','');
    }

    linksTemp='';
    if (links.value.includes('|')){
        let data=links.value.split('\n');

        for (let i=0; i<data.length; i++){
            linksTemp+='[\n';
            let tdata=data[i].split('|');
            linksTemp+=`            "${patchForJSON(tdata[0])}",\n`
            linksTemp+=`            "${patchForJSON(tdata[1])}",\n`
            linksTemp+=`            "${patchForJSON(tdata[2])}"\n`;
            linksTemp+='        ]';
            if (i<data.length-1){
                linksTemp+=',';
            }
        }
        json=json.replaceAll('{links}',linksTemp);   
    }else{
        json=json.replaceAll('{links}','');
    }

    download("galaktiskprofile.json",json)
}

const jsonElm = document.getElementById("json");

function importJSON(){
    const json = jsonElm.files[0];
    if (json) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                normInputs.forEach(e => {
                    e.value=patchFromJSON(jsonData[e.id]);
                });
            } catch (error) {
                console.error('No parse', error);
            }
        };
        reader.readAsText(json);
    }
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