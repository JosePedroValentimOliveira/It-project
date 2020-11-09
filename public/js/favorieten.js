

//post voor onclick verwijder alle favorieten
let removeFavorites = ()=>{
    const options = {
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(user)
    }
    fetch('/verwijderFavorieten', options);
    location.reload();
};



//displayed alle favorieten van huidig ingelogde user
for (let index = 0; index < user.favorieten.length; index++) {
    
    

    let element = user.favorieten[index]
   
    let naam = document.createElement("p");
    naam.setAttribute("id", "name")
    let adres = document.createElement("p");
    let postcodeGemeente = document.createElement("p");
    let pEmail = document.createElement("p");
    let email = document.createElement("a");
    let pSite = document.createElement("p");
    let siteLink = document.createElement("a");
    let pTelefoon = document.createElement("p");
    let telefoon = document.createElement("a");
    let remove = document.createElement('button');
    remove.textContent ="x";
    remove.className ="verwijderFav";

    remove.addEventListener("click",()=>{
        const obj ={
            naam:element.naam
        }
        const options = {
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(obj)
        }
        fetch('/verwijderEnkeleFavoriet', options);
        location.reload();
        
    });




    let item = document.createElement("div");
    item.className = 'item';
    let favo = document.getElementById("favorieten");

    naam.textContent = element.naam;
    naam.style.fontWeight= "bold";
    adres.textContent = element.adres;
    postcodeGemeente.textContent = element.gemeente;
    if (element.contact.email == undefined) { email.textContent = "geen email adres gevonden"; }
    else { email.textContent = element.contact.email; email.href = "mailto:" + element.contact.email; }

    if (element.contact.site == null) {
        siteLink.textContent = "geen website gevonden";
    }
    else {
        if (element.contact.site.substring(0, 8) == "https://") { siteLink.href = element.contact.site; }
        else if (element.contact.site.substring(0, 7 == "http://")) { sitelink.href = element.contact.site }
        else { siteLink.href = "https://" + element.contact.site; }
        siteLink.target = "_blank";
        siteLink.textContent = element.contact.site;

    };


    if (element.contact.telefoon == undefined) { telefoon.textContent = "geen telefoonnummer gevonden"; }
    else { telefoon.textContent = element.contact.telefoon; telefoon.href = "tel:" + element.contact.telefoon; }

    item.appendChild(naam);
    item.appendChild(remove);
    item.appendChild(adres);
    item.appendChild(postcodeGemeente);
    pEmail.appendChild(email);
    pSite.appendChild(siteLink);
    pTelefoon.appendChild(telefoon);
    item.appendChild(adres);
    item.appendChild(postcodeGemeente);
    item.appendChild(pEmail);
    item.appendChild(pSite);
    item.appendChild(pTelefoon);
   

    favo.appendChild(item);
    


}


