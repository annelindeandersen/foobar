"use strict";

let data = FooBar.getData();
let jsonData = JSON.parse(data);

async function queueStarted() {
    console.log("queue & serving started");

    // getting the length of queue
    document.querySelector("#queue").innerHTML = jsonData.queue.length;

    // getting the length of queue served
    document.querySelector("#served").innerHTML = jsonData.serving.length;

    // list of orders coming up
    let orders = jsonData.queue.order;
    document.querySelector("#orderList").innerHTML = orders;
    // console.log("order list")

    // list of orders being served
    let served = jsonData.serving.order;
    document.querySelector("#serveList").innerHTML = served;
    // console.log("serving list")
}

async function bartender() {
    // list of bartenders 
    let bartenderNames = jsonData.bartenders.name;
    console.log(bartenderNames);
}

// refreshing queue every second
window.setInterval(queueStarted, 1000);
queueStarted();

window.setInterval(bartender, 10000);
bartender();