src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"

function leggTilBillett() {

    // Sjekker om feltene er tomme og setter errormelding om de er det
    erFyltFilm();
    erTom("antall", "antallError");
    erTom("fornavn", "fornavnError");
    erTom("etternavn", "etternavnError");
    erTom("tlfnr", "tlfError");
    erTom("epost", "epostError");

    // Dersom feltene har en error skal funksjonen avbrytes
    if (document.getElementById("filmError").innerHTML !== "" ||
        document.getElementById("antallError").innerHTML !== "" ||
        document.getElementById("fornavnError").innerHTML !== "" ||
        document.getElementById("etternavnError").innerHTML !== "" ||
        document.getElementById("tlfError").innerHTML !== "" ||
        document.getElementById("epostError").innerHTML !== "") {
        return;
    }

    // Legger bestilling inn i billett
    billett = opprettBestilling("filmer", "antall", "fornavn", "etternavn", "tlfnr", "epost");
    //console.log(billett);

    // Sender billett-objektet til BillettController
    $.post("http://localhost:8080/lagreBillett", billett, function(data) {
        console.log(data);
        // Skriver ut billetter i billeter-arrayet som ikke allerede er skrevet ut
        leggTilHTML();
    })


    // Resetter inputs etter at billett blir kjøpt
    document.getElementById("filmer").selectedIndex = "default";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("tlfnr").value = "";
    document.getElementById("epost").value = "";



}

// Oppretter returnerer et objekt av bestilling
function opprettBestilling(film, antall, fornavn, etternavn, tlf, epost) {
    return {
        film: document.getElementById(film).value,
        antall: document.getElementById(antall).value,
        fornavn: document.getElementById(fornavn).value,
        etternavn: document.getElementById(etternavn).value,
        tlf: document.getElementById(tlf).value,
        epost: document.getElementById(epost).value
    };
}

// Tar inn array med billetter og skriver dem ut
function leggTilHTML() {
    $.get("http://localhost:8080/hentBilletter", function(data) {
        console.log("Mottatt og viser foelgende data:" + data);
        let billettTekst = "<tr>" +
                           "<th>Film</th>" +
                           "<th>Antall</th>" +
                           "<th>Navn</th>" +
                           "<th>Telefonnr</th>" +
                           "<th>Epost</th>";
        for (const billett of data) {
            let nyBillett = "<tr>";
            nyBillett += "<td>" + billett.film + "</td>" +
                         "<td>" + billett.antall + "</td>" +
                         "<td>" + billett.fornavn + " " + billett.etternavn + "</td>" +
                         "<td>" + billett.tlf + "</td>" +
                         "<td>" + billett.epost + "</td>" +
                         "<td><button onclick='slettBillett(" + billett.id + ")' class='btn btn-danger'>Slett</button> </td>" +
                         "</tr>";
            billettTekst += nyBillett;
        }
        document.getElementById("billetter").innerHTML = billettTekst;
    })
}

// Fjerner alle billettene fra databasen
function slettAlleBilletter() {
    $.get("http://localhost:8080/slettAlleBilletter", function(data) {
        console.log(data);
        document.getElementById("billetter").innerHTML = "";
    })
}

// Fjerner enkelte billetter fra databasen
function slettBillett(id) {
    $.ajax({
        url: "http://localhost:8080/slettBillett?id="+id,
        type: "DELETE",
        success: function(result) {
            console.log("Billett slettet");
            leggTilHTML();
        }
    });
}

// Sjekker at navn er riktig formatert
function sjekkNavn(navn, error) {
    let tillatt = /^[a-zA-ZÆØÅæøå]*$/;

    if (!tillatt.test(document.getElementById(navn).value)) {
        document.getElementById(error).innerHTML = "Ikke gyldig fornavn";
    } else if (document.getElementById(navn).value.length < 1) {
        document.getElementById(error).innerHTML = "Må fylles inn";
    } else {
        document.getElementById(error).innerHTML = "";
    }
}

// Sjekker at telefonnummer er riktig formatert
function sjekkTlf() {
    let tillatt = /^[0-9]*$/;

    if (!tillatt.test(document.getElementById("tlfnr").value) || document.getElementById("tlfnr").value.length !== 8) {
        document.getElementById("tlfError").innerHTML = "Ikke gyldig telefonnummer";
    } else {
        document.getElementById("tlfError").innerHTML = "";
    }
}

// Sjekker at epost er riktig formatert
function sjekkEpost() {
    let trenger = /\S+@\S+\.\S+$/;

    if (!trenger.test(document.getElementById("epost").value)) {
        document.getElementById("epostError").innerHTML = "Ikke gyldig epostadresse";
    } else {
        document.getElementById("epostError").innerHTML = "";
    }
}

// Sjekker om valgte input-felt er tomt
function erTom(id, error) {
    if (document.getElementById(id).value === "") {
        document.getElementById(error).innerHTML = "Må fylles inn";
        return true;
    } else {
        document.getElementById(error).innerHTML = "";
        return false;
    }
}

// Sjekker at det er blitt valgt en film
function erFyltFilm() {
    if (document.getElementById("filmer").value != "default") {
        document.getElementById("filmError").innerHTML = "";
    } else {
        document.getElementById("filmError").innerHTML = "Må velge en film";
    }
}