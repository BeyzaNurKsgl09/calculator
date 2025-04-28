let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen =document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←' :
            if(buffer.length ===1){
                buffer = '0';
            }  else{
                buffer = buffer.substring(0,buffer.length - 1);
            }
            break;
        case '+':   
        case '−':   
        case '×': 
        case '÷': 
              handleMath(symbol);
              break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}
init();
document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.createElement("div");
    starsContainer.classList.add("stars");
    document.body.appendChild(starsContainer);

    function createStar() {
        let star = document.createElement("div");
        star.classList.add("star");

        // Rastgele başlangıç konumu
        let startX = Math.random() * window.innerWidth;
        let startY = Math.random() * window.innerHeight;
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        // Rastgele animasyon süresi
        let duration = Math.random() * 3 + 2; 
        star.style.animationDuration = `${duration}s`;

        starsContainer.appendChild(star);

        // Yıldız kaydıktan sonra DOM'dan kaldır
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }

    // Sürekli kayan yıldız oluştur
    setInterval(createStar, 500);
});
