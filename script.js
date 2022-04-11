let numberCards, firstClick, firstCard, plays = 0, secondCard;

function gameStart(){
    alert ("Esse é o jogo da memória dos Papagaios, por favor, escolha um número entre 4 e 14 cartas, lembrando de escolher sempre números pares e escrever em caracteres numéricos");
    numberCards = prompt("Quantas cartas deseja?");

    let verification = (numberCards % 2 !== 0 || numberCards < 4 || numberCards > 14 || isNaN(numberCards));
    while(verification){
        numberCards = prompt("Atente-se as regras do jogo! Digite um número par entre 4 e 14 para definir o número de cartas:");
        verification = (numberCards % 2 !== 0 || numberCards < 4 || numberCards > 14 || isNaN(numberCards));
}

    dealCards(numberCards);
}

function dealCards(numberCards){
    const cards = ["bobrossparrot.gif","bobrossparrot.gif", "explodyparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "metalparrot.gif", "revertitparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "tripletsparrot.gif", "unicornparrot.gif", "unicornparrot.gif" ];
    const list = document.querySelector("ul");

    ulSizeAdjust(list, numberCards);

    const cardsInGame = cards.slice(0, numberCards)
    cardsInGame.sort(randomizer);
        for (let i = 0; i < cardsInGame.length; i ++){
            list.innerHTML += `
            <li>
                <div class = "parrotCard" onclick="selectCard(this)">
                    <div class = "front-face face">
                        <img src = "./img/front.png">
                    </div>
                    <div class = "back-face face">
                    <img src = "./gif/${cardsInGame[i]}">
                    </div>
                </div>
            </li>`;
        }
 }

 function randomizer(){
     return Math.random() - 0.5;
 }

function ulSizeAdjust(list, numberCards){
    if (window.screen.width > 414) {
        list.style.width = `${132 * (numberCards/2)}px`
    }else {
        list.style.width = "117px";
    }
}

function selectCard(element){
    const click = element.children[1].innerHTML;
    if (firstClick === undefined) {
        cardFlip(element);
        firstClick = click;
        firstCard = element;
        plays ++;
    } else if (click === firstClick) {
        cardFlip(element);
        firstClick = undefined;
        plays ++;
        endgame();
    } else if (click !== firstClick) {
        cardFlip(element);
        secondCard = element;
        setTimeout(cardUnflip, 1000);
        firstClick = undefined;
        plays ++;
    }
}

function cardFlip(card){
    card.children[0].classList.add("flipped");
    card.children[1].classList.add("flipped");
}

function cardUnflip(){
    firstCard.children[0].classList.remove("flipped");
    firstCard.children[1].classList.remove("flipped");
    secondCard.children[0].classList.remove("flipped");
    secondCard.children[1].classList.remove("flipped");
}

function endgame(){
    const cards = document.querySelectorAll("div.flipped");

    if (cards.length === 2*numberCards){
        alert("Você ganhou em " + plays + " jogadas!");
    }
}

gameStart();