// Declaro contantes y variables que usaré en varias funciones
const imagenes = ["blank.png","white.png","cheeseburger.png","fries.png","hotdog.png","ice-cream.png","milkshake.png","pizza.png"];
const veces = [2,2,0,0,0,0,0,0];
const giradas = [];
const imagenes_random = [0,0,0,0,0,0,0,0,0,0,0,0];
const mejor_puntuacion = [];
let img1 = 12;
let img2 = 12;
let iniciado = 0;

// Función para iniciar y reiniciar el juego
function iniciar() { 
    reset();
    pon_imagen();
    genera_imagen();
    iniciado = 1;
}

//reset al nuemero de veces que se ha obtenido la imagen, a los parrafos de resultado y se oculta el botón de reset
function reset() { 
    for (i in imagenes){ // hago reset al numero de veces que he obtenido la imagen
        if (i<2){
            veces.splice(i,1,2);
            continue;
        }
        veces.splice(i,1,0);
    }

    document.getElementById("result").innerHTML = "0";
    document.getElementById("acierto").innerHTML = "";
    document.getElementById("reset").style.visibility = "hidden";

}

// función para generar los div con las imagenes
function pon_imagen() { 
    if (iniciado==1) { // compruebo si no es la primera partida y en caso de no serlo borro las imagenes
        let remove_ubi_scene = document.getElementsByClassName("scene");
        for (i in imagenes_random){
            let remove_cont_div_img = document.getElementById(i);
            remove_ubi_scene[i].removeChild(remove_cont_div_img)
        }
    }

    // a partir de aquí para crear las imagenes (dentro de div)
    let ubi_scene = document.getElementsByClassName("scene");
    for (i in imagenes_random){
        let cont_div_img = document.createElement("div");
        cont_div_img.setAttribute("class","card");
        cont_div_img.setAttribute("id",i);
        ubi_scene[i].appendChild(cont_div_img);
    }

    let ubi_card = document.getElementsByClassName("card");
    for (i in imagenes_random){
        for (x=0;x<2;x++){
            let div_img = document.createElement("div");
            if(x==0){
                div_img.setAttribute("class","card__face card__face--front");
                div_img.setAttribute("onmouseup","comprobar("+i+")");
                div_img.setAttribute("onmousedown","girar("+i+")");
            }else{
                div_img.setAttribute("class","card__face card__face--back");
                div_img.setAttribute("id","a"+i);
            }
            ubi_card[i].appendChild(div_img);
        }
    }
}

// genero un array donde guardo la posición sin repetir más de 2 veces que corresponde al nombre de la imagen
function genera_imagen(){ 
    let imagen;

    for (i = 0; i <12 ; i++) { 
        imagen = Math.floor(Math.random() *6)+2;
        if (veces[imagen]<2){
            let cual = "a"+i;
            var urlimg = "url(./img/" + imagenes[imagen] + ")";
            veces[imagen]++;
            imagenes_random[i]=imagen;
            giradas[i]=0;
            document.getElementById(cual).style.backgroundImage = urlimg;
            continue;
        }
        i--;
    }
}

// función para guardar la imagen pulsada (img1 para la primera y img2 para la segunda) y para girar la carta
function girar(elemento) { 
    if (imagenes_random[elemento]!=0){
        if (img1>11) {
            img1 = elemento;
        } else if(img1!=elemento){
            img2 = elemento;
        }
    }   
    var cards = document.querySelectorAll('.card');

    [...cards].forEach((card)=>{
        if (imagenes_random[parseInt(card.id)]!=0){
            if (card.id == elemento){
                card.classList.toggle('is-flipped');
            }
        }
    });            
}

// funcion para comprobar si la carta 1 es igual a la carta 2 y si es la última jugada
function comprobar(elemento) { 
    let puntos = parseInt(document.getElementById("result").innerHTML);
    let fin = 0;
    if (img2<12 && imagenes_random[img1]!=0 && imagenes_random[img2]!=0){
        if (imagenes_random[img1]==imagenes_random[img2]){
            alert("Felicidades, has ganado 20 puntos");
            puntos+=20;
            imagenes_random[img1]=0;
            imagenes_random[img2]=0;
        } else{
            if(puntos>4){
                alert("Lo siento, has perido 5 puntos. ¡Prueba otra vez!");
                puntos-=5;
            }else{
                alert("Lo siento, ¡Prueba otra vez!");
                puntos=0;
            }
            var cards = document.querySelectorAll('.card');

            [...cards].forEach((card)=>{
                if ((card.id == img1)||(card.id == img2)){
                    card.classList.toggle('is-flipped');
                }
            });
        }
        document.getElementById("result").innerHTML = puntos;
        img1=12;
        img2=12;
    }
    for (i in imagenes_random){
        if (imagenes_random[i] != 0 ){
            x=0;
            break;
        }
        x=1;
    }
    if (x==1){
        mejor_puntuacion.push(parseInt(puntos));
        let puntuacion = 0;
        
        document.getElementById("mejor").innerHTML = "La mejor puntuación obtenida hasta ahora es: " + Math.max(...mejor_puntuacion);
        document.getElementById("acierto").innerHTML = "Enorabuena, has acertado todas!!!";
        document.getElementById("reset").style.visibility = "visible";
    }
}

window.onload = iniciar();
