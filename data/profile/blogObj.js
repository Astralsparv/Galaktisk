function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status == "200"){
                callback(rawFile.responseText);
            }else{
                callback("does not exist");
            }
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
        if ((priority.length+norm.length)==4){
            break;
        }
    }

    let div=document.createElement('div');
    div.classList='object';
    
    let label=document.createElement('p');
    label.classList='label';
    label.innerHTML='Latest Blog Entries <a href="blog/">[View Blog]</a>';

    let inner=document.createElement('div');
    inner.classList='inner';

    div.appendChild(label);

    priority.forEach(e => {
        inner.appendChild(createPage(pages[e]));
    });
    norm.forEach(e => {
        inner.appendChild(createPage(pages[e]));
    });
    
    div.appendChild(inner);

    blogAppend=div.outerHTML;
    
    document.getElementsByClassName('right')[0].insertAdjacentHTML("afterbegin", blogAppend);
}

function createPage(page){
    let e=document.createElement('p');
    e.classList="blog";
    if (page["pinned"]){
        e.innerHTML='📌';
    }
    e.innerHTML+=`${page["title"]} (<a href="blog/${page["path"]}">view more</a>)`;
    return e;
}

readTextFile("blog/blogs.json", function(text){
    if (text!="does not exist"){
        data = JSON.parse(text);
        pages=data["blogs"];
        loadHTML();
    }
});

function loadHTML(){
    loadPages();
}