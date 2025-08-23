let rawCode=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://galaktisk.neocities.org/data/blogs/blog.css">
    <link rel="stylesheet" href="https://galaktisk.neocities.org/data/top.css">
    <link rel="shortcut icon" href="../../icon.png">
    <title>{name} | {title}</title>
</head>
<body>
    <div class="main">
        <div class="container">
            <div class="left">
                <div class="postinfo">
                    <img class="postinfo-icon" src="../../icon.png" alt="{name}'s profile picture">
                    <div class="postinfo-margin"></div>
                    <p class="postinfo-text">Published by <a href="../../" class="postinfo-poster">{name}</a></p>
                    <p class="postinfo-date">published {date}</p>
                    <div class="postinfo-margin"></div>
                    <p class="tags">
                        Tags: {tags}
                    </p>
                    <div class="postinfo-margin"></div>
                    <a href="../" class="postinfo-button">View Blog</a>
                    <br>
                    <a href="../../" class="postinfo-button">View Profile</a>
                </div>
            </div>
            <div class="right">
                <h1 class="blog-subject">{title}</h1>
                <p class="blog-text">{content}</p>
            </div>
        </div>
    </div>
    <script src="https://galaktisk.neocities.org/data/navloader.js"></script>
</body>
</html>`;

let rawJSON=`
{
    "displayname": "{display}",
    "title": "{title}",
    "content": "{content}",
    "tags": {tags}
}
`;

const displayname=document.getElementById('displayname');
const title=document.getElementById('title');
const content=document.getElementById('content');
const tags=document.getElementById('tags');

normInputs=[displayname,content,title];
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
let tagsTemp;
let tagArray;
function generateCode(){
    code=rawCode;
    code=code.replaceAll('{name}',displayname.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{title}',title.value.replaceAll('\n','<br>'));
    code=code.replaceAll('{content}',content.value.replaceAll('\n','<br>'));

    tagsTemp='';
    tagArray=tags.value.split('|');
    if ((tagArray.length>1) || (tagArray[0]!="")){
        for (let i=0; i<tagArray.length; i++){
            tagsTemp+=`<a href="../?tag=${tagArray[i]}" class="tag">${tagArray[i]}</a>`;
            if (i<tagArray.length-1){
                tagsTemp+=', ';
            }
        }
        code=code.replaceAll('{tags}',tagsTemp);
    }else{
        alert('Minimum one tag');
        return;
    }
    code=code.replaceAll('{date}',new Date().toLocaleDateString());

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
    json=json.replaceAll('{title}',patchForJSON(title.value));
    json=json.replaceAll('{content}',patchForJSON(content.value));

    tagsTemp='';
    tagArray=tags.value.split('|');
    if ((tagArray.length>1) || (tagArray[0]!="")){
        tagsTemp+='[\n';
        for (let i=0; i<tagArray.length; i++){
            tagsTemp+=`"${patchForJSON(tagArray[i])}"`;
            if (i<tagArray.length-1){
                tagsTemp+=',';
            }
        }
        tagsTemp+=']';
        json=json.replaceAll('{tags}',tagsTemp);
    }else{
        alert('Minimum one tag');
        return;
    }

    download(`${title.value}.json`,json);
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

                nv='';
                for (let i=0; i<jsonData["tags"].length; i++){
                    nv+=`${jsonData["tags"][i]}`;
                    if (i<jsonData["tags"].length-1){
                        nv+=`|`;
                    }
                }

                tags.value=nv;
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