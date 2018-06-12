"use strict";

let data;
let jsonData;
let i;
let beerTypes;
let beerType;
let beerNavn;
let beerCat;
let beerPop;
let beerAlc;
let beerImg;
let beerFlava;
let beerFeel;
let beerImpress;
let totalServe;


async function beerLoad() {
    data = FooBar.getData();
    jsonData = JSON.parse(data);
    // store beertypes in variable
    beerTypes = jsonData.beertypes;
    
    // console.log(beerTypes);

    // foreach for imgs
    beerTypes.forEach(beerType => {
        let template = document.querySelector("#beerPicture");

        //clone content
        let clone = template.content.cloneNode(true);
        // console.log(clone);

        let beerImg = beerType.label;
        // console.log(beerImg);

        clone.querySelector(".beerPic").setAttribute("data-id", beerType.name);
        clone.querySelector(".beerPic").src = "/img/" + beerImg;

        clone.querySelector(".beerPic").addEventListener("click", (evt) => {
            let imgId = evt.currentTarget.dataset.id;
            // console.log(imgId);

            // viser modal-data
            // variabler til at gemme info om øl
            beerNavn = beerType.name;
            beerCat = beerType.category;
            beerPop = beerType.popularity;
            beerAlc = beerType.alc;
            beerImg = beerType.label;
            beerFlava = beerType.description.flavor;
            beerFeel = beerType.description.mouthfeel;
            beerImpress = beerType.description.overallImpression;

            // NU KOMMER INDHOLDET
            document.querySelector("#BeerName").textContent = beerNavn;
            document.querySelector("#BeerImg").src = "/img/" + beerImg;
            document.querySelector("#bottle").src = "/img/bottle-" + beerImg;
            document.querySelector("#BeerCat").textContent = "Beer Type: " + beerCat;
            document.querySelector("#BeerPopular").textContent = "Popularity: " + beerPop;
            document.querySelector("#BeerAlc").textContent = "Alcohol Percentage: " + beerAlc + "%";
            document.querySelector("#BeerFlava").textContent = "Flavor: " + beerFlava;
            document.querySelector("#BeerFeel").textContent = "Mouthfeel: " + beerFeel;
            document.querySelector("#BeerImpress").textContent = "General Impression: " + beerImpress;

            document.querySelector("#beerModal").style.display = "block";
            document.querySelector("#grid").style.display = "none";
            document.querySelector("#close").addEventListener("click",closeBeer);

        });
        // indsæt billederne i HTML

        document.querySelector("#beerContainer").appendChild(clone);

    });
        
    }

function clickModal() {
    document.querySelector("#beerModal").style.display = "block";
    document.querySelector("#grid").style.display = "none";
    document.querySelector("#close").addEventListener("click", closeBeer);
}

function closeBeer() {
    // vis indhold igen, når modal lukkes
    document.querySelector("#beerModal").style.display = "none";
    document.querySelector("#grid").style.display = "grid";
}


async function queueStarted() {
    // console.log("queue & serving started");

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

    document.querySelector("#orderList").innerHTML = "";

    // foreach loop for orders

    const total = {};

    orderArr.forEach(orderElm => {

        let template = document.querySelector("#orderTemplate");
        
        //clone templates content
        let clone = template.content.cloneNode(true);
        // console.log(clone);    

        // hver ordre gemt i variabel
        let ordersUp = orderElm.order;

        clone.querySelector("#order").textContent = ordersUp;

        // append ordrerne
        // document.querySelector("#orderList").appendChild(clone);
        
         
        // lav 
        ordersUp.forEach( beerType => {
            let count = total[ beerType ];
            if( count == undefined ) {
                count = 0;
            } 
            count++;
            total[beerType] = count;

            let str = JSON.stringify(total, null, 4);
            
            document.querySelector("#orderList").textContent = str;

            // if ( jsonData.queue.length < 0 ) {
            //     console.log("ingen order lige nu")
            //     document.querySelector("#orderList").innerHTML = "Currently no orders";
            // }

            // document.querySelector("#orderList").innerHTML = total [beerType] + " types of beer";
            // document.querySelector("#orderList2").innerHTML = total[beerType];

            // if (count = 0) {
            //     document.querySelector("#orderList").innerHTML = "Currently no orders";
            // }
        })
        
    });

    // console.log("total: ", total);


    // list of orders being served
    // let served = jsonData.serving.order;
    // document.querySelector("#serveList").innerHTML = served;
    // console.log("serving list")

    // list of orders coming up
    let serveArr = jsonData.serving;

    document.querySelector("#serveList").innerHTML = "";

    // foreach loop for orders

    const totalServe = {};

    serveArr.forEach(serveElm => {

        let template = document.querySelector("#serveTemplate");
        
        //clone templates content
        let clone = template.content.cloneNode(true);
        // console.log(clone);    

        // hver ordre gemt i variabel
        let serveUp = serveElm.order;

        clone.querySelector("#serves").textContent = serveUp;

        // append ordrerne
        // document.querySelector("#serveList").appendChild(clone);
        
         
        // lav 
        serveUp.forEach( beerType => {
            let count = totalServe[ beerType ];
            if( count == undefined ) {
                count = 0;
            } 
            count++;
            totalServe[beerType] = count;
            // console.log("count: ", count);
            // console.log("totalServe: ", totalServe);
            // console.log("beerType: ", beerType);
            // console.log("totalServe[beerType]: ", totalServe[beerType])

            // if ( jsonData.serving.length < 1 ) {
            //     console.log("ingen serve lige nu")
            //     document.querySelector("#serveList").innerHTML = "Currently no servings";
            // }
            
            let str = JSON.stringify(totalServe, null, 4);
            
            document.querySelector("#serveList").textContent = str;
           
        })
        // console.log(totalServe);
        
    });
}


function bartenders() {
    // list of bartenders 
    let bartendersArr = jsonData.bartenders;
    // console.log(bartendersArr);

    document.querySelector(".tenders").innerHTML = "";

    bartendersArr.forEach(bartender => {
        //clone content
        let template = document.querySelector("#bartenderTemplate");
        let clone = template.content.cloneNode(true);
        // console.log(clone);

        let bartenderName = bartender.name;
        let bartenderStat = bartender.status;
        // console.log(bartenderName);

        // sæt attribut lig med status, så man kan lave et er lig med if statement
        // clone.querySelector("#bartStatus").setAttribute("data-id", bartender.status);
        // console.log(bartenderStat);
        
        clone.querySelector("#bartImg").textContent = "";
        clone.querySelector("#bartName").textContent = bartenderName;
        clone.querySelector("#bartStatus").textContent = "Status: " + bartenderStat;

        // indsæt billederne i HTML

        document.querySelector(".tenders").appendChild(clone);

    })

}

async function hours() {
    data = FooBar.getData();
    jsonData = JSON.parse(data);

    // store closing time i variable
    const closeTime = jsonData.bar.closingTime;
    console.log(closeTime);

    // insert closing hours to HTML
    document.querySelector("#closingTime").innerHTML = "Foo Bar serves no beer past: " + closeTime;
    
    let time = new Date();
    console.log(time);
    let toTime = time.toTimeString();
    console.log(toTime);
    let hours = time.getHours();
    console.log(hours);
    let min = time.getMinutes();
    console.log(min);
    let sec = time.getSeconds();
    console.log(sec);
    // let realTime = (((((timeNow/60)/60)/60)/24)/17694);
    // console.log(realTime);
    
    let timeCalc = ( hours + ":" + min + ":" + sec);
    let currentTime = timeCalc.toString("hh:mm:ss tt");
    let timeNow = timeCalc;
    let endTime = ("22:00:00");

    
    
    document.querySelector("#hoursOpen").innerHTML = "Time left to buy beers: ";
}

// refreshing queue every second
window.setInterval(queueStarted, 1000);
queueStarted();

beerLoad();

hours();

window.setInterval(bartenders, 10000);
bartenders();