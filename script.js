const text = document.getElementById("text");
const court = document.getElementById("court");
const start = document.getElementById("start");
const choices = document.getElementById("choices");
const forgive = document.getElementById("forgive");
const no = document.getElementById("no");
const final = document.getElementById("final");

const lines = [
"⚖️ بدأت جلسة محكمة الحب...",
"",
"القاضي: هل يعترف المتهم بما فعل؟",
"",
"أيمن:",
"نعم... أعترف.",
"",
"أعترف أني أخطأت...",
"وأعترف أني زعلت أغلى إنسانة عندي.",
"",
"لكن...",
"ولا يوم كان قصدي أوجع قلبها.",
"",
"كل اللي أتمناه...",
"إنها تسمعني للآخر. ❤️"
];

let i = 0;

function typeLine() {

    if (i >= lines.length) {

        choices.style.display = "flex";

        return;

    }

    text.innerHTML += lines[i] + "<br>";

    court.classList.remove("hidden");

    i++;

    setTimeout(typeLine, 1500);

}

start.onclick = function () {

    start.style.display = "none";

    typeLine();
  

};
// زر "لسه زعلانة" يهرب

no.addEventListener("mouseover", () => {

    const x = Math.random() * (window.innerWidth - 180);

    const y = Math.random() * (window.innerHeight - 80);

    no.style.position = "fixed";

    no.style.left = x + "px";

    no.style.top = y + "px";

});


// عند الضغط على "أسامحك"

forgive.addEventListener("click", () => {

    choices.style.display = "none";

    final.style.display = "block";

    createHearts();

});


// إنشاء القلوب

function createHearts(){

    for(let i=0;i<120;i++){

        setTimeout(()=>{

            let heart=document.createElement("div");

            heart.className="heart";

            heart.innerHTML="❤️";

            heart.style.left=Math.random()*100+"vw";

            heart.style.fontSize=(20+Math.random()*30)+"px";

            heart.style.animationDuration=(3+Math.random()*3)+"s";

            document.body.appendChild(heart);

            setTimeout(()=>{

                heart.remove();

            },6000);

        },i*60);

    }

}
