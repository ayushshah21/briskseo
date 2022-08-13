
let instruction;
let urlBtn;
let txtBtn;
let textInput;
let urlSelected = true;
let selectedColor = "#007BBE";
let defaultColor = "#0087CF";
let hoverColor = "#0385cb";

function onLoad(){
    instruction = document.getElementById("instruction");
    urlBtn = document.getElementById("urlbtn");
    txtBtn = document.getElementById("txtbtn");
    textInput = document.getElementById("textInput");
    fileInput = document.getElementById("fileInput");

    urlBtn.addEventListener('mouseover', function(){
        if(!urlSelected){
            urlBtn.style.backgroundColor = hoverColor;
        }
    })
    
    urlBtn.addEventListener('mouseleave', function(){
        if(!urlSelected){
            urlBtn.style.backgroundColor = defaultColor;
        } else{
            urlBtn.style.backgroundColor = selectedColor;
        }
    })
    
    txtBtn.addEventListener('mouseover', function(){
        if(urlSelected){
            
            txtBtn.style.backgroundColor = hoverColor;
        }
    })
    
    txtBtn.addEventListener('mouseleave', function(){
        if(urlSelected){
            txtBtn.style.backgroundColor = defaultColor;
        } else{
            txtBtn.style.backgroundColor = selectedColor;
        }
    })
}


function onTXTClick(){
    urlSelected = false;
    //textFormat.style.visibility = "visible";
    //urlFormat.style.visibility = "hidden";
    textInput.style.display = "none";
    fileInput.style.display = "block";
    instruction.innerText = "Upload Text File:";
    urlBtn.style.backgroundColor = defaultColor;
    txtBtn.style.backgroundColor = selectedColor;
    txtBtn.style.cursor = "default";
    urlBtn.style.cursor = "pointer";
}
function onURLClick(){
    urlSelected = true;
    //textFormat.style.visibility = "hidden";
    //urlFormat.style.visibility = "visible";
    textInput.style.display = "block";
    fileInput.style.display = "none";
    instruction.innerText = "Enter YouTube URL:";
    urlBtn.style.backgroundColor = selectedColor;
    txtBtn.style.backgroundColor = defaultColor;
    txtBtn.style.cursor = "pointer";
    urlBtn.style.cursor = "default";

}

function validateForm(){
    if(!matchYoutubeUrl(textInput.value)){
        alert("YouTube URL not valid!");
        return false;
    }
    if(textInput.value.includes('youtu.be')){
        textInput.value = 'https://www.youtube.com/watch?v=' + textInput.value.split('.be/')[1];
    }
    return true;

}

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}

function onLinksLoad(){
    const shownElements = 8;
    let table = document.getElementById('table');
    let tbody = document.createElement('tbody');
    let blurred = document.createElement('tbody');
    blurred.classList.add('blurredContent');
    blurred.onclick = function(){
        blurred.classList.remove('blurredContent');
        blurred.classList.add('nonBlur');
        Array.from(blurred.children).forEach(element => {
            element.children[0].classList.add('linkBox');
            element.children[0].onclick = function(){
                element.children[0].children[0].click();
            }
        });
    };
    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let td2 = document.createElement('td');
        td2.innerText = element[1];
        let link = document.createElement('a');
        link.href = element;
        link.target = '_blank';
        link.innerText = element[0];
        td.appendChild(link);
        tr.appendChild(td);
        tr.appendChild(td2);
        if(i+1 > shownElements){
            blurred.appendChild(tr);
        } else{
            tbody.appendChild(tr);
            td.classList.add('linkBox');
            td.onclick = function(){
                link.click();
            }
        }
        
        
    }
    table.appendChild(tbody);
    table.appendChild(blurred);
}





