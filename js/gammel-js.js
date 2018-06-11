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


async function beerLoad() {
    data = FooBar.getData();
    jsonData = JSON.parse(data);
    // store beertypes in variable
    beerTypes = jsonData.beertypes;
    
    console.log(beerTypes);

    // foreach for imgs
    beerTypes.forEach(beerType => {
        let template = document.querySelector("#beerPicture");

        //clone content
        let clone = template.content.cloneNode(true);
        console.log(clone);

        let beerImg = beerType.label;
        console.log(beerImg);

        clone.querySelector(".beerPic").setAttribute("data-id", beerType.name);
        clone.querySelector(".beerPic").src = "/img/" + beerImg;

        // indsæt billederne i HTML

        document.querySelector("#beerContainer").appendChild(clone);


    })

    // KLIK FOR MODAL
    // document.querySelector(".beerPic").addEventListener("click", clickModal);

    // let beerData = document.querySelector(".beerPic[data-id='']");
    // console.log(beerData);

    // if (beerData == "El Hefe") {
    //     document.querySelector("#beerModal").innerHTML = beertypes.name;
    // }


    // make clone foreach to dislay json for each element in modal
    beerTypes.forEach(beerType => {
        let template = document.querySelector("#beerTemplate");

        // clone templates content
        let clone = template.content.cloneNode(true);
        console.log(clone);

        // variabler til at gemme info om øl
            let beerNavn = beerType.name;
            let beerCat = beerType.category;
            let beerPop = beerType.popularity;
            let beerAlc = beerType.alc;
            let beerImg = beerType.label;
            let beerFlava = beerType.description.flavor;
            let beerFeel = beerType.description.mouthfeel;
            let beerImpress = beerType.description.overallImpression;

            // clone.querySelector(".beerPic").setAttribute("data-id", beerType.name);
            document.querySelector(".beerPic").addEventListener("click", (evt) => {
                let imgId = evt.currentTarget.getAttribute("data-id");
                console.log(imgId);
            });

            // let imgId = document.querySelector(".beerPic[data-id='']"); VIRKER IKKE
            

            // if (beerNavn == imgId) {

                clone.querySelector("#beerName").textContent = beerNavn;
                console.log(beerNavn);
                clone.querySelector("#beerImg").src = "/img/" + beerImg;
                console.log(beerImg);
                clone.querySelector("#beerCat").textContent = "Beer Type: " + beerCat;
                clone.querySelector("#beerPopular").textContent = "Popularity: " + beerPop;
                clone.querySelector("#beerAlc").textContent = "Alcohol Percentage: " + beerAlc + "%";
                clone.querySelector("#beerFlava").textContent = "Flavor: " + beerFlava;
                clone.querySelector("#beerFeel").textContent = "Mouthfeel: " + beerFeel;
                clone.querySelector("#beerImpress").textContent = "General Impression: " + beerImpress;


                $(".beerPic").click(openModal);
                // indsæt beertypes i modalvindue

                if ("data-id='El Hefe'" == beerNavn) {
                    document.querySelector("#beerModal").appendChild(clone);
                }

                
                

            // } 
            
        });
        
    }

    function openModal() {
        $("#beerModal").show();
        $("#close").click(closeBeer);
    }


function clickModal(e) {
    // ved klik kommer modal vindue op og ved klik på kryds forsvinder det
    document.querySelector("#beerModal").style.display = "block";
    // skjul indhold, så boksen ikke går udover 100vh
    document.querySelector("#grid").style.display = "none";
    document.querySelector("#close").addEventListener("click", closeBeer);
    
    // store data attribute in variable
    let dataID = e.currentTarget.getAttribute("data-id");
    console.log(dataID);

    let singleView = jsonData.find(function(idElm) {
        return idElm.name == dataID;
        console.log(idElm.name);
    });

    document.querySelector("#beerModal").innerHTML = idElm.name;
    // variabler til at gemme info om øl
    let beerNavn = beerType.name;
    console.log(beerNavn);
    let beerCat = beerType.category;
    let beerPop = beerType.popularity;
    let beerAlc = beerType.alc;
    let beerImg = beerType.label;
    let beerFlava = beerType.description.flavor;
    let beerFeel = beerType.description.mouthfeel;
    let beerImpress = beerType.description.overallImpression;

    // forsøg at loade indholdet ind
    // let imgId = document.querySelector(".beerPic[data-id='']");

    // if (beerNavn == imgId) {
    //     document.querySelector("#beerModal").innerHTML = imgId;
    // }
}

function closeBeer() {
    // vis indhold igen, når modal lukkes
    document.querySelector("#beerModal").style.display = "none";
    document.querySelector("#grid").style.display = "grid";
}


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

    orderArr.forEach(orderElm => {

        let template = document.querySelector("#orderTemplate");

        //clone templates content
        let clone = template.content.cloneNode(true);
        // console.log(clone);    

        // for (let i = 0; i < orderArr.length; i++) {
            let ordersUp = orderElm.order;
            // ordersUp.join();
            // console.log(ordersUp);

            clone.querySelector("#order").textContent = ordersUp;

            // document.querySelector("#orderList").appendChild(clone);

            if (orderArr.includes(ordersUp)) {
                // ordersUp.splice();
                document.querySelector("#orderList").appendChild(clone);
            } else {
                ordersUp.splice();
            }

            // document.querySelector("#orderList").appendChild(clone);
         
            
        

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

function bartenders() {
    // list of bartenders 
    let bartendersArr = jsonData.bartenders;
    console.log(bartendersArr);

    bartendersArr.forEach(bartender => {
        //clone content
        let template = document.querySelector("#bartenderTemplate");
        let clone = template.content.cloneNode(true);
        console.log(clone);

        let bartenderName = bartender.name;
        let bartenderStat = bartender.status;
        console.log(bartenderName);

        // sæt attribut lig med status, så man kan lave et er lig med if statement
        clone.querySelector("#bartStatus").setAttribute("data-id", bartender.status);
        console.log(bartenderStat);
        // gem i variabel
        let bartStat = clone.querySelector('#bartStatus[data-id=""]');
        console.log(bartStat);
        
        clone.querySelector("#bartName").textContent = bartenderName;
        clone.querySelector("#bartStatus").textContent = "Status: " + bartenderStat;

        // indsæt billederne i HTML


        if ( bartStat != bartenderStat ) {
            document.querySelector(".tenders").appendChild(clone);
        }

        

        



        // document.querySelector(".tenders").innerHTML = bartender.name;
        // console.log(bartender.name)
    })

}

// refreshing queue every second
window.setInterval(queueStarted, 1000);
queueStarted();

beerLoad();

// window.setInterval(bartenders, 10000);
bartenders();