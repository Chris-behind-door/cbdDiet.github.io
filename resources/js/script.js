const xml_path="./resources/js/data.xml";

var phy = null;
var cat = null;

function afterSetPhy(){
    const button = document.querySelector("#phy");
    button.innerText = phy;
}

function afterSetCat(){
    const button = document.querySelector("#cat");
    button.innerText = cat;
}

function setPhy1(){
    phy="湿热";
    afterSetPhy();
    update_content();
}
function setPhy2(){
    phy="平和";
    afterSetPhy();
    update_content();
}
function setPhy3(){
    phy="气虚";
    afterSetPhy();
    update_content();
}
function setPhy4(){
    phy="阴虚";
    afterSetPhy();
    update_content();
}
function setPhy5(){
    phy="气郁";
    afterSetPhy();
    update_content();
}
function setPhy6(){
    phy="血瘀";
    afterSetPhy();
    update_content();
}
function setPhy7(){
    phy="痰湿";
    afterSetPhy();
    update_content();
}
function setPhy8(){
    phy="阳虚";
    afterSetPhy();
    update_content();
}
function setCat1(){
    cat="菜肉";
    afterSetCat();
    update_content();
}
function setCat2(){
    cat="水果";
    afterSetCat();
    update_content();
}
function setCat3(){
    cat="茶饮";
    afterSetCat();
    update_content();
}
function setCat4(){
    cat="汤补";
    afterSetCat();
    update_content();
}

function replace(text){
    const maintext = document.querySelector("#maintext");
    maintext.innerHTML = text;
}

function update_content(){
    if (cat!=null && phy!=null){
        
        fetch(xml_path).then(response=>response.text()).then(str=>{
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        
        let replaceText = "";
        const PhyNode = xmlDoc.getElementsByTagName(phy)[0];
        if (!PhyNode){ 
            replaceText="暂时还没有适合您体质的菜谱~"
            replace(replaceText);
            return;
        }
        const CatNode = PhyNode.getElementsByTagName(cat)[0];
        if (!CatNode) {
            replaceText="换个食物种类试试吧~"
            replace(replaceText);
            return;
        }
        const children = CatNode.children;
        for(let i = 0;i<children.length;i++){
            const current = children[i];
            if (current.tagName==="name"){
                replaceText+="<h3>"
                replaceText+=current.textContent;
                replaceText+="</h3>";
            }
            else if (current.tagName === "content"){
                replaceText+=current.textContent;
                replaceText+"<br>";
            }
        }
        
        replace(replaceText);
    })
    }
}