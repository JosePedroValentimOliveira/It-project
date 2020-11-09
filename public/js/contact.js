let form = document.getElementById("emailForm");

//eventlistener met een post naar server side voor het sturen van email
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let voornaam = form.voornaam.value,
        familienaam = form.familienaam.value,
        email = form.email.value,
        onderwerp = "ContactForm",
        opmerking = form.opmerking.value;


        const data = {
			voornaam,familienaam,email,onderwerp,opmerking
		};
		const options = {
			method : 'POST',
			headers : {
				'Content-Type':'application/json'
			},
			body : JSON.stringify(data)
        }
        
        fetch('/email',options);
        location.reload();
   
});