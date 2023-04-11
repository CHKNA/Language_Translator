const fromtext = document.querySelector(".from-text"),
selectTag = document.querySelectorAll("select"),
toText = document.querySelector(".to-text"),
exchangeIcon = document.querySelector(".exchange"),
icons = document.querySelectorAll(".row i"),
translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
    for(const country_code in countries){
        let selected;
        if(id==0 && country_code == "en-GB"){
            selected = "selected";
        }else if(id == 1 && country_code =="th-TH"){
            selected = "selected";
        }
        let option = `<option value="${country_code}"${selected} >
        ${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromtext.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder","Translating...");
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
    fetch(apiURL).then(res => res.json()).then(data =>{
        console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation")
    });
});

exchangeIcon.addEventListener("click",() => {
    let temptext = fromtext.value;
    tempLang = selectTag[0].value;
    fromtext.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = temptext;
    selectTag[1].value = tempLang;
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromtext.value);
            } else{
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});