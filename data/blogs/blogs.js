let pagesContainer=document.getElementById('blogs');
let data;
let pages;

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function loadPages(){
    let priority=[];
    let norm=[];
    for (i=0; i<pages.length; i++){
        if (pages[i]["pinned"]){
            priority.push(i);
        }else{
            norm.push(i);
        }
    }
    priority.forEach(e => {
        appendPage(pages[e]);
    });
    norm.forEach(e => {
        appendPage(pages[e]);
    });
}

function appendPage(page){
    let elm=document.createElement('div');
    elm.classList="blog";

    let mainContainer=document.createElement('div');
    mainContainer.classList='blog-container';

    let date=document.createElement('p');
    date.classList='blog-date';

    let postDate=new Date(page["time"] * 1000);
    date.textContent=`Posted ${postDate.toLocaleDateString()}`;
    elm.appendChild(date);

    let title=document.createElement('h2');
    title.textContent=page["title"];
    title.classList="blog-title";

    let text=document.createElement('p');
    text.textContent=page["text"];
    text.classList="blog-text";
    
    let open=document.createElement('a');
    open.href=page["path"];
    let opentext=document.createElement('p');
    opentext.classList='blog-open';
    opentext.textContent='» View Blog Entry';
    open.appendChild(opentext);

    let tags=document.createElement('p');
    tags.classList='tags';
    tags.innerHTML=`Tags: `;
    for (let i=0; i<page["tags"].length; i++){
        tags.innerHTML+=`<a href="?tag=${page["tags"][i]}">${page["tags"][i]}</a>`;
        if (i<page["tags"].length-1){
            tags.innerHTML+=', ';
        }
    }

    if (page["pinned"]){
        let pinned = document.createElement('p');
        pinned.classList='blog-pinned';
        pinned.textContent='Pinned';
        elm.appendChild(pinned);
    }

    mainContainer.appendChild(title);
    mainContainer.appendChild(tags);
    mainContainer.appendChild(text);
    mainContainer.appendChild(open);

    elm.appendChild(mainContainer);
    pagesContainer.appendChild(elm);
}

const urlParams = new URLSearchParams(window.location.search);
let search = urlParams.get('tag');

readTextFile("blogs.json", function(text){
    data = JSON.parse(text);
    pages=data["blogs"];
    loadHTML();
});

function loadHTML(){
    if (search!=null && search!=""){
        document.getElementById('context').textContent=`Filtering for tag: "${search}"`;
        let priority=[];
        let norm=[];
        let added;
        for (i=0; i<pages.length; i++){
            added=false;
            pages[i]["tags"].forEach(e => {
                if (e.toLowerCase()==search.toLowerCase() && (!added)){
                    added=true;
                    if (pages[i]["pinned"]){
                        priority.push(i);
                    }else{
                        norm.push(i);
                    }
                }
            });
        }
        
        if (priority.length+norm.length==0){
            context.innerHTML+='<br><br>No results found';
            loadPages();
        }else{
            priority.forEach(e => {
                appendPage(pages[e]);
            });
            norm.forEach(e => {
                appendPage(pages[e]);
            });
        }
    }else{
        loadPages();
    }
}