let table = document.getElementById("sourceTable");
const dataOphalen = async () => {
  const rawData = await fetch('./json/openSource.json');
  const dataJson = await rawData.json();
  return dataJson;
  
}
//haalt alle items van opensource.json en displayed ze op de site
dataOphalen().then((data) => {
  data.forEach(element => {
    let tr = document.createElement("tr")
    let naam = document.createElement("td");
    let versie = document.createElement("td");
    let link = document.createElement("a");

    naam.textContent = element.naam;
    versie.textContent = element.version;
    link.textContent = 'Link';
    link.href = element.link;
    link.target = "_blank";
    tr.appendChild(naam);
    tr.appendChild(versie);
    tr.appendChild(link);
    table.appendChild(tr);
  });
});






