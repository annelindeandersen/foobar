"use strict";

let data;
let jsonData;
let i;
let beerClone;

async function beerLoad() {
    data = FooBar.getData();
    jsonData = JSON.parse(data);
    beerClone = jsonData.beertypes;
    let container = document.querySelector("#beerModal");
    // container = beerClone.cloneNode(true);
    console.log(beerClone);
}

async function queueStarted() {
    console.log("queue & serving started");

    data = FooBar.getData();
    jsonData = JSON.parse(data);

    // getting the length of queue
    document.querySelector("#queue").innerHTML = jsonData.queue.length;

    // getting the length of queue served
    document.querySelector("#served").innerHTML = jsonData.serving.length;

    // list of orders coming up
    let orderArr = jsonData.queue[i];
    // console.log(jsonData.queue[4].order);
    if(orderArr > 0) {
        console.log("virker")
        for (let i = 0; i < orderArr.length; i++) {
            let ordersUp = jsonData.queue[i].order;
            document.querySelector("#orderList").innerHTML = ordersUp;
            console.log("orders kommer");
            
            }
    }

    // list of orders being served
    let served = jsonData.serving.order;
    document.querySelector("#serveList").innerHTML = served;
    // console.log("serving list")
}

function bartender() {
    // list of bartenders 
    let bartendersArr = jsonData.bartenders;
    console.log(bartendersArr.length);
    if(bartendersArr.length > 0) {
        for(let i = 0; i < bartendersArr.length; i++) {
            console.log(bartendersArr[i].name);
            let bartenderNames = bartendersArr[i].name;
                bartendersArr.forEach(element => {
                document.querySelector(".tenders").innerHTML = bartenderNames;
                console.log("hvert navn udskrevet på site")
            });
        }
    }
}

// refreshing queue every second
window.setInterval(queueStarted, 1000);
queueStarted();

beerLoad();

// window.setInterval(bartender, 10000);
bartender();