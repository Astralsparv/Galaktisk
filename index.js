let pagesContainer=document.getElementById('pages');
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
    for (i=0; i<pages.length; i++){
        appendPage(pages[i]);
    }
}

function appendPage(page){
    var elm=document.createElement('a');
    elm.classList="page";
    elm.href=page["url"];
    var name=document.createElement('p');
    name.classList="page-name";
    name.textContent=page["name"];
    var img=document.createElement('img');
    img.classList="page-profile";
    img.src=`${page["url"]}/icon.png`;
    img.alt=`${page["name"]}'s profile picture`;
    elm.appendChild(name);
    elm.appendChild(img);
    pagesContainer.appendChild(elm);
}

const urlParams = new URLSearchParams(window.location.search);
let search = urlParams.get('q');

readTextFile("/data/database.json", function(text){
    data = JSON.parse(text);
    pages=data["pages"];
    loadHTML();
});

function loadHTML(){
    if (search!=null && search!=""){
        document.getElementById('label-left').textContent=`Results for "${search}"`;
        document.getElementById('label-right').remove();
        search=search.toLowerCase();
        var nopriority=[];
        for (i=0; i<pages.length; i++){
            if (pages[i]["name"].toLowerCase()==search){
                appendPage(pages[i]);
            }else{
                if (pages[i]["name"].toLowerCase().includes(search)){
                    nopriority.push(i);
                }
            }
        }
        for (let i=0; i<nopriority.length; i++){
            appendPage(pages[i]);
        }
    }else{
        loadPages();
    }
}