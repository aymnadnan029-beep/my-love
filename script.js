function startMessage(){

document.getElementById("start").classList.add("hidden");

document.getElementById("counterBox").classList.remove("hidden");

let number=3;

document.getElementById("count").innerHTML=number;

let timer=setInterval(function(){

number--;

document.getElementById("count").innerHTML=number;

if(number==0){

clearInterval(timer);

document.getElementById("counterBox").classList.add("hidden");

document.getElementById("message").classList.remove("hidden");

writeMessage();

}

},1000);

}

const text=`

🌸 صباح الخير يا حبيبتي رويدا 🌸

اليوم الجمعة...
وأول دعائي كان إلك. ❤️

الله يحفظك،
ويطمن قلبك،
ويكتب لك راحة وسعادة
أكثر مما تتمنين.

جمعة مباركة يا عمري.

أتمنى يكون يومك مليان
ابتسامة،
وفرحة،
وأخبار حلوة.

بحبك كتير يا حبيبتي،
بعشقك وبعبدك.

الله ما يحرمني منك،
ويديمك أجمل نعمة بحياتي.

وإن شاء الله يجي اليوم
اللي نصحى فيه بنفس البيت،
بيت حلو ودافي،
يجمعنا إحنا الاثنين.

وبعدين...
بإذن الله،
يصير عنا ولدين حلوين،
رحمة وأحمد ❤️

وجودك بحياتي نعمة،
وأنتِ أجمل شيء صار معي.

🌹 جمعة مباركة يا رويدا 🌹

`;

let i=0;

function writeMessage(){

if(i<text.length){

document.getElementById("message").innerHTML+=text.charAt(i);

i++;

setTimeout(writeMessage,35);

}else{

setInterval(createHeart,300);

}

}
function createHeart(){

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="fixed";

heart.style.left=Math.random()*100+"vw";

heart.style.top="-40px";

heart.style.fontSize=(20+Math.random()*25)+"px";

heart.style.zIndex="9999";

heart.style.pointerEvents="none";

heart.style.transition="transform 6s linear, opacity 6s linear";

document.body.appendChild(heart);

setTimeout(function(){

heart.style.transform="translateY(110vh) rotate(360deg)";

heart.style.opacity="0";

},50);

setTimeout(function(){

heart.remove();

},6200);

}

</script>

</body>

</html>
