let accordionList = document.getElementById("accordeons");


//filter arrays
let alleGemeentes = [],
	antwerpenFilter = [],
	berchemFilter = [],
	bezaliFilter = [],
	borgerhoutFilter = [],
	deurneFilter = [],
	ekerenFilter = [],
	hobokenFilter = [],
	merksemFilter = [],
	wilrijkFilter = [],
	edegemFilter = [];


let appendGegevens = (element) => {

	let button = document.createElement('button');
	let panel = document.createElement('div');
	let adres = document.createElement("p");
	let postcodeGemeente = document.createElement("p");
	let pEmail = document.createElement("p");
	let email = document.createElement("a");
	let pSite = document.createElement("p");
	let siteLink = document.createElement("a");
	let pTelefoon = document.createElement("p");
	let telefoon = document.createElement("a");
	let gegevens = document.createElement("div");
	let favoriet = document.createElement("div");
	let favorietBtn = document.createElement('button');
	let contactDiv = document.createElement("div");
	let adresDiv = document.createElement("div");
	gegevens.className = "gegevens";
	favoriet.className = "favorieten";
	contactDiv.className = "contactDiv";
	adresDiv.className = "adresDiv";
	panel.className = "panel";
	button.className = "acc";
	button.textContent = element.attributes.naam;

	favorietBtn.textContent = '☆';

//on click stuurt da de gegevens door van het geklikte locatie en voegt deze toe aan favorieten
	favorietBtn.addEventListener('click', () => {
		const locatie = element.attributes;
		const data = {
			naam: locatie.naam,
			adres: `${locatie.straat} ${locatie.huisnr}`,
			gemeente: `${locatie.postcode} ${locatie.gemeente}`,
			contact: {
				email: locatie.email,
				site: locatie.link,
				telefoon: locatie.telefoon
			}
		};
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}

		fetch('/favorieten', options);
	}
	)

	adres.textContent = element.attributes.straat + " " + element.attributes.huisnr;
	postcodeGemeente.textContent = element.attributes.postcode + " " + element.attributes.gemeente;
	if (element.attributes.email == undefined) { email.textContent = "geen email adres gevonden"; }
	else { email.textContent = "Email adres"; email.href = "mailto:" + element.attributes.email; }

	if (element.attributes.link == null) {
		siteLink.textContent = "geen website gevonden";
	}
	else {
		if (element.attributes.link.substring(0, 8) == "https://") { siteLink.href = element.attributes.link; }
		else if (element.attributes.link.substring(0, 7 == "http://")) { sitelink.href = element.attributes.link }
		else { siteLink.href = "https://" + element.attributes.link; }
		siteLink.target = "_blank";
		siteLink.textContent = "website";
	};

	if (element.attributes.telefoon == undefined) { telefoon.textContent = "geen telefoonnummer gevonden"; }
	else { telefoon.textContent = "Telefoon nummer"; telefoon.href = "tel:" + element.attributes.telefoon; }

	button.addEventListener('click', function () {
		this.classList.toggle("active");
		let panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		}
		else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	})

	pEmail.appendChild(email);
	pSite.appendChild(siteLink);
	pTelefoon.appendChild(telefoon);
	adresDiv.appendChild(adres);
	adresDiv.appendChild(postcodeGemeente);
	contactDiv.appendChild(pEmail);
	contactDiv.appendChild(pSite);
	contactDiv.appendChild(pTelefoon);
	gegevens.appendChild(adresDiv);
	gegevens.appendChild(contactDiv);
	favoriet.appendChild(favorietBtn);
	panel.appendChild(gegevens);
	panel.appendChild(favoriet);
	accordionList.appendChild(button);
	accordionList.appendChild(panel);
}

let displayLocaties= (array, categorie) =>{

	array.forEach(element => {

		if (categorie == "Geen") {
			appendGegevens(element);
		}
		else {
			if (element.attributes.categorie == categorie) {
				appendGegevens(element);
			}
		}
	});

}

const dataOphalen = async () => {
	const rawData = await fetch(`./json/datasets.json`);
	const dataJson = await rawData.json();
	return dataJson;

}
let loadData = ()=> {

	dataOphalen().then(datasets => {
		datasets.forEach(link => {

			fetch(link.url).then((resp) => { return resp.json(); }).then((data) => {
				data.features.forEach(element => {
					alleGemeentes.push(element);
					switch (element.attributes.gemeente) {
						case "Antwerpen":
							antwerpenFilter.push(element);
							break;
						case "Berchem (Antwerpen)":
							berchemFilter.push(element);
							break;
						case "BeZaLi (Antwerpen)":
							bezaliFilter.push(element);
							break;
						case "Borgerhout (Antwerpen)":
							borgerhoutFilter.push(element);
							break;
						case "Deurne (Antwerpen)":
							deurneFilter.push(element);
							break;
						case "Ekeren (Antwerpen)":
							ekerenFilter.push(element);
							break;
						case "Hoboken (Antwerpen)":
							hobokenFilter.push(element);
							break;
						case "Merksem (Antwerpen)":
							merksemFilter.push(element);
							break;
						case "Wilrijk (Antwerpen)":
							wilrijkFilter.push(element);
							break;
						case "Zandvliet (Antwerpen)":
							bezaliFilter.push(element);
							break;
						case "Lillo (Antwerpen)":
							bezaliFilter.push(element);
							break;
						case "Edegem":
							edegemFilter.push(element);
							break;

					}

				})
			})
		});
	});
}


let checkFilter=()=> {


	let antwerpen = document.getElementById('antwerpen').checked;
	let berchem = document.getElementById('berchem').checked;
	let bezali = document.getElementById('bezali').checked;
	let borgerhout = document.getElementById('borgerhout').checked;
	let deurne = document.getElementById('deurne').checked;
	let ekeren = document.getElementById('ekeren').checked;
	let hoboken = document.getElementById('hoboken').checked;
	let merksem = document.getElementById('merksem').checked;
	let wilrijk = document.getElementById('wilrijk').checked;
	let edegem = document.getElementById('edegem').checked;
	let alles = document.getElementById('alles').checked;
	let bibliotheekCheck = document.getElementById('bibliotheek').checked;
	let cultuurcentrumCheck = document.getElementById('cultuurcentrum').checked;
	let archiefCheck = document.getElementById('archief').checked;
	let erfgoedbibliotheekCheck = document.getElementById('erfgoedbibliotheek').checked;
	let museumCheck = document.getElementById('museum').checked;
	let erfgoedverenigingCheck = document.getElementById('erfgoedvereniging').checked;
	let documentatieCentrumCheck = document.getElementById('documentatiecentrum').checked;
	let levensErfgoedCheck = document.getElementById('levensbeschouwelijkErfgoed').checked;
	let museumdepotCheck = document.getElementById('museumdepot').checked;
	let geenCheck = document.getElementById('geen').checked;
	let array = antwerpenFilter;

	let categorie = "Geen";

	accordionList.textContent = "";

	if (berchem) { array = berchemFilter; }
	else if (bezali) { array = bezaliFilter; }
	else if (borgerhout) { array = borgerhoutFilter; }
	else if (deurne) { array = deurneFilter; }
	else if (ekeren) { array = ekerenFilter; }
	else if (hoboken) { array = hobokenFilter; }
	else if (merksem) { array = merksemFilter; }
	else if (wilrijk) { array = wilrijkFilter; }
	else if (edegem) { array = edegemFilter; }
	else if (antwerpen) { array = antwerpenFilter; }
	else if (alles) { array = alleGemeentes; }

	if (cultuurcentrumCheck) { categorie = "Cultuurcentrum" }
	else if (bibliotheekCheck) { categorie = "Bibliotheek" }
	else if (archiefCheck) { categorie = "Archief" }
	else if (erfgoedbibliotheekCheck) { categorie = "Erfgoedbibliotheek" }
	else if (museumCheck) { categorie = "Museum" }
	else if (erfgoedverenigingCheck) { categorie = "Erfgoedvereniging" }
	else if (documentatieCentrumCheck) { categorie = "Documentatiecentrum" }
	else if (levensErfgoedCheck) { categorie = "Levensbeschouwelijk erfgoed" }
	else if (museumdepotCheck) { categorie = "Museumdepot" }
	else if (geenCheck) { categorie = "Geen" }

	displayLocaties(array, categorie);
}


loadData();
checkFilter();
