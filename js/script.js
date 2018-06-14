"use strict";

let data;
let jsonData;
let i;
let beerTypes;
let beerType;
let totalServe;

async function beerLoad() {
    data = FooBar.getData();
    jsonData = JSON.parse(data);
    // store beertypes in variable
    beerTypes = jsonData.beertypes;

    // foreach for beer badges imgs
    beerTypes.forEach(beerType => {
        let template = document.querySelector("#beerPicture");

        //clone content
        let clone = template.content.cloneNode(true);
    
        let beerImg = beerType.label;

        clone.querySelector(".beerPic").setAttribute("data-id", beerType.name);
        clone.querySelector(".beerPic").src = "/img/" + beerImg;

        // klik event, der tjekker, hvilket data-id, der er klikket på
        clone.querySelector(".beerPic").addEventListener("click", (evt) => {
            let imgId = evt.currentTarget.dataset.id;

            // variabler til at gemme info om øl til visning af modalvindue
            const beerNavn = beerType.name;
            const beerCat = beerType.category;
            const beerPop = beerType.popularity;
            const beerAlc = beerType.alc;
            const beerImg = beerType.label;
            const beerFlava = beerType.description.flavor;
            const beerFeel = beerType.description.mouthfeel;
            const beerImpress = beerType.description.overallImpression;

            // indholdet sættes ind i de deres plads i HTML
            document.querySelector("#BeerName").textContent = beerNavn;
            document.querySelector("#BeerImg").src = "/img/" + beerImg;
            document.querySelector("#bottle").src = "/img/bottle-" + beerImg;
            document.querySelector("#BeerCat").textContent = "Beer Type: " + beerCat;
            document.querySelector("#BeerPopular").textContent = "Popularity: " + beerPop;
            document.querySelector("#BeerAlc").textContent = "Alcohol Percentage: " + beerAlc + "%";
            document.querySelector("#BeerFlava").textContent = "Flavor: " + beerFlava;
            document.querySelector("#BeerFeel").textContent = "Mouthfeel: " + beerFeel;
            document.querySelector("#BeerImpress").textContent = "General Impression: " + beerImpress;

            // modal vindue vises, og container med indhold skjules. 
            document.querySelector("#beerModal").style.display = "block";
            document.querySelector("#grid").style.display = "none";
            // luk knap bliver en mulighed
            document.querySelector("#close").addEventListener("click",closeBeer);

        });
        // indsæt billederne i HTML
        document.querySelector("#beerContainer").appendChild(clone);
    });
}

function closeBeer() {
    // luk modal ved klik og vis alt indhold
    document.querySelector("#beerModal").style.display = "none";
    document.querySelector("#grid").style.display = "grid";
}

async function queueStarted() {
    // hent json data ind
    data = FooBar.getData();
    jsonData = JSON.parse(data);

    // getting the length of queue and marking stress level with matching color
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

    // updated every second and making sure to have a clean slate everytime!!
    document.querySelector("#orderList").innerHTML = "";

    // foreach loop for orders starting with variable for total orders
    const total = {};

    orderArr.forEach(orderElm => {

        // hver ordre gemt i variabel
        let ordersUp = orderElm.order;
        
        // foreach for hver beertype, der tæller, hvor mange af hver type, der bestilles
        ordersUp.forEach( beerType => {
            let count = total[ beerType ];
            if( count == undefined ) {
                count = 0;
            } 
            count++;
            total[beerType] = count;

            if ( jsonData.queue == [] ) {
                document.querySelector("#orderList").innerHTML = "Currently no orders";
            }
            // console.log("total: ", total);

            // lav til string og lav ny linje
            let strBeer = JSON.stringify(total, null, 1);
            // replace alle tegn, der ikke skal være der
            let str = strBeer.replace('{', '').replace('}', '').replace(/,/gi, '').replace(/"/gi, '').replace(/:/gi, ' x ');
            
            // indsæt den fulde ordre i HTML
            document.querySelector("#orderList").innerText = str;
        }) 
    });

    // list of servings
    let serveArr = jsonData.serving;

    // updated every second and making sure to have a clean slate everytime!!
    document.querySelector("#serveList").innerHTML = "";

    // foreach loop for servings starting with variable of total serves
    const totalServe = {};

    serveArr.forEach(serveElm => {   
        // hver ordre gemt i variabel
        let serveUp = serveElm.order;
         
        // foreach for hver beertype, der tæller, hvor mange af hver type, der serveres
        serveUp.forEach( beerType => {
            let count = totalServe[ beerType ];
            if( count == undefined ) {
                count = 0;
            } 
            count++;
            totalServe[beerType] = count;
            
            if ( jsonData.serving == [] ) {
                document.querySelector("#serveList").innerHTML = "Currently no orders";
            }

            // lav til string og lav ny linje
            let strServe = JSON.stringify(totalServe, null, 1);
            // replace alle tegn, der ikke skal være der
            let str = strServe.replace('{', '').replace('}', '').replace(/,/gi, '').replace(/"/gi, '').replace(/:/gi, ' x ');
            
            // indsæt det fulde antal af typer øl, der serveres i HTML
            document.querySelector("#serveList").innerText = str;
        })
    });
}

function bartenders() {
    // list of bartenders 
    let bartendersArr = jsonData.bartenders;
   
     // updated every second and making sure to have a clean slate everytime!!
    document.querySelector(".tenders").innerHTML = "";

    // klon i foreach for hver enkelte bartender
    bartendersArr.forEach(bartender => {
        //clone content
        let template = document.querySelector("#bartenderTemplate");
        let clone = template.content.cloneNode(true);

        let bartenderName = bartender.name;
        let bartenderStat = bartender.status;
        
        clone.querySelector("#bartImg").textContent = "";
        clone.querySelector("#bartName").textContent = bartenderName;
        clone.querySelector("#bartStatus").textContent = "Status: " + bartenderStat;

        // indsæt i HTML
        document.querySelector(".tenders").appendChild(clone);
    })
}

async function hours() {
    data = FooBar.getData();
    jsonData = JSON.parse(data);

    document.querySelector("#hoursOpen").innerHTML = "",

    // store closing time i variable
    // let closedTime = jsonData.bar.closingTime;
    // console.log(closedTime);
    
    // insert closing hours to HTML
    document.querySelector("#closingTime").innerHTML = "Foo Bar serves no beer past: " + jsonData.bar.closingTime;
    
    // lukker klokken 22
    let closeStr = jsonData.bar.closingTime.substr(0,2);
    console.log(closeStr);

    // tid nu
    let time = new Date();
    let timeNow = time.toLocaleTimeString();
    let hours = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    //remaining time to 22
    const s = 60;
    let secLeft = s - sec;

    const m = 60;
    let minLeft = m - min;

    const h = closeStr;
    let hoursLeft = closeStr - hours;

    let remainTime = (hoursLeft+"h "+minLeft+"m "+secLeft+"s");

    document.querySelector("#hoursOpen").textContent = "Time left to buy beers: " + remainTime;
}

// refreshing queue every second
window.setInterval(queueStarted, 1000);
queueStarted();

beerLoad();

window.setInterval(hours, 1000);
hours();

// refresh bartender status every 10 seconds
window.setInterval(bartenders, 10000);
bartenders();