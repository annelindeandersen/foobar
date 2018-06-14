"use strict";

let data;
let jsonData;
let i;
let beerTypes;
let beerType;
let totalServe;
let serveArr;

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
        clone.querySelector(".beerPic").src = "img/" + beerImg;

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
            document.querySelector("#BeerImg").src = "img/" + beerImg;
            document.querySelector("#bottle").src = "img/bottle-" + beerImg;
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


    if ( orderArr.length >= 1 ) {

        // set padding top so it matches when no orders
        document.querySelector("#orderList").style.paddingTop = "1vw";

        // foreach loop for orders starting with variable for total orders with empty value/object
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

                // lav til string og lav ny linje
                let strBeer = JSON.stringify(total, null, 1);
                // replace alle tegn, der ikke skal være der
                let str = strBeer.replace('{', '').replace('}', '').replace(/,/gi, '').replace(/"/gi, '').replace(/:/gi, ' x ');
                
                // indsæt den fulde ordre i HTML
                document.querySelector("#orderList").innerText = str;
            });
        });
    
    } else {
        // no orders up yet
        document.querySelector("#orderList").style.paddingTop = "2vw";
        document.querySelector("#orderList").innerHTML = "No orders coming in currently";
    }
 
    // list of servings
    let serveArr = jsonData.serving;

    // updated every second and making sure to have a clean slate everytime!!
    document.querySelector("#serveList").innerHTML = "";

    // if length is 1 or more show servings
    if ( serveArr.length >= 1 ) {

        // set padding top so it matches when no servings
        document.querySelector("#serveList").style.paddingTop = "1vw";

        // foreach loop for servings starting with variable of totalServe empty value/object
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
                
                // lav til string og lav ny linje
                let strServe = JSON.stringify(totalServe, null, 1);
                // replace alle tegn, der ikke skal være der
                let str = strServe.replace('{', '').replace('}', '').replace(/,/gi, '').replace(/"/gi, '').replace(/:/gi, ' x ');
            
                // indsæt det fulde antal af typer øl, der serveres i HTML
                document.querySelector("#serveList").innerText = str;

            });
        });

    } else {
        // no servings currently
        document.querySelector("#serveList").style.paddingTop = "2vw";
        document.querySelector("#serveList").innerHTML = "No taps pouring currently";
    }   
};

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

    // erase last number
    document.querySelector("#hoursOpen").innerHTML = "",
    
    // insert closing hours to HTML
    document.querySelector("#closingTime").innerHTML = "Foo Bar will be closing at: " + jsonData.bar.closingTime;
    
    // lukker klokken 22, få fat i det
    let closeStr = jsonData.bar.closingTime.substr(0,2);

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
    let hoursLeft = closeStr - hours - 1;
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