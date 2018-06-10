"use strict";

let data;
let jsonData;
let i;
let beerTypes;
let beerNavn;
let beerCat;
let beerPop;
let beerAlc;
let beerImg;
let beerFlava;
let beerFeel;
let beerImpress;

async function beerLoad() {
    data = FooBar.getData();
    jsonData = JSON.parse(data);
    // store beertypes in variable
    beerTypes = jsonData.beertypes;
    
    console.log(beerTypes);

    // make clone foreach to dislay json for each element
    beerTypes.forEach(element => {
        let template = document.querySelector("#beerTemplate");

        //clone templates content
        let clone = template.content.cloneNode(true);
        console.log(clone);

        // make for loop for all beertypes??

        for (let i = 0; i < beerTypes.length; i++) {
            let beerNavn = beerTypes[i].name;
            // console.log(beerNavn);
            let beerCat = beerTypes[i].category;
            let beerPop = beerTypes[i].popularity;
            let beerAlc = beerTypes[i].alc;
            let beerImg = beerTypes[i].label;
            let beerFlava = beerTypes[i].description.flavor;
            let beerFeel = beerTypes[i].description.mouthfeel;
            let beerImpress = beerTypes[i].description.overallImpression;

            clone.querySelector("#beerName").textContent = beerNavn;
            console.log(beerNavn);
            clone.querySelector("#beerImg").src = "/img/" + beerImg;
            clone.querySelector("#beerCat").textContent = "Beer Type: " + beerCat;
            clone.querySelector("#beerPopular").textContent = "Popularity: " + beerPop;
            clone.querySelector("#beerAlc").textContent = "Alcohol Percentage: " + beerAlc + "%";
            clone.querySelector("#beerFlava").textContent = "Flavor: " + beerFlava;
            clone.querySelector("#beerFeel").textContent = "Mouthfeel: " + beerFeel;
            clone.querySelector("#beerImpress").textContent = "General Impression: " + beerImpress;
            
            // indsæt beertypes i modalvindue
            document.querySelector("#beerModal").appendChild(clone);
        
        }

        // for (let i = 0; i < beerTypes.length; i++) {
        //     let beerImg = beerTypes[i].label;
        //     console.log("læser den dette????")
        //     // load billederne ind i beer containerne på forside også

        //     clone.querySelector("#beerImg").src = "/img/" + beerImg;
        //     document.querySelector(".beer").appendChild(clone);
        //     console.log("VIRKER DET????")
        // }

        });
        
    };


async function queueStarted() {
    console.log("queue & serving started");

    data = FooBar.getData();
    jsonData = JSON.parse(data);

    // getting the length of queue
    document.querySelector("#queue").innerHTML = jsonData.queue.length;
    if(jsonData.queue.length > 7) {
        document.querySelector("#queue").style.backgroundColor = "#DE5F52";
    } else if (jsonData.queue.length > 4) {
        document.querySelector("#queue").style.backgroundColor = "#E2BC6F";
    } else {
        document.querySelector("#queue").style.backgroundColor = "#689667";
    }

    // getting the length of queue served
    document.querySelector("#served").innerHTML = jsonData.serving.length;


    // list of orders coming up
    let orderArr = jsonData.queue;

    // foreach loop for orders

    orderArr.forEach(element => {

        let template = document.querySelector("#orderTemplate");

        //clone templates content
        let clone = template.content.cloneNode(true);
        // console.log(clone);    

        for (let i = 0; i < orderArr.length; i++) {
            let ordersUp = jsonData.queue[i].order;
            ordersUp.splice();

            clone.querySelector("#order").textContent = ordersUp;

            // document.querySelector("#orderList").appendChild(clone);

            if (orderArr.includes(ordersUp)) {
                // ordersUp.splice();
                document.querySelector("#orderList").appendChild(clone);
            } else {
                ordersUp.splice();
            }

            // document.querySelector("#orderList").appendChild(clone);
         
            
        }

    });

    
    // console.log(jsonData.queue[4].order);
    // if(orderArr > 0) {
    //     console.log("virker")
    //     for (let i = 0; i < orderArr.length; i++) {
    //         let ordersUp = jsonData.queue[i].order;
    //         document.querySelector("#orderList").innerHTML = ordersUp;
    //         console.log("orders kommer");
            
    //         }
    // }

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