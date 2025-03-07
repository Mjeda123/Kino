import { HttpService } from "./Httpservice";

async function get(){
    return await HttpService.get('/Projekcija')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/Projekcija/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji Projekcija!'}
    })
}

async function obrisi(sifra) {
    return await HttpService.delete('/Projekcija/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Projekcija se ne može obrisati!'}
    })
}

async function dodaj(Projekcija) {
    return await HttpService.post('/Projekcija',Projekcija)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Projekcija se ne može dodati!'}
        }
    })
}

async function promjena(sifra,Projekcija) {
    return await HttpService.put('/Projekcija/' + sifra,Projekcija)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Projekcija se ne može promjeniti!'}
        }
    })
}


async function getGledatelji(sifra){
    return await HttpService.get('/Projekcija/Gledatelji/'+ sifra)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod dohvaćanja polaznika'}})
}

async function dodajGledatelja(projekcija,gledatelj) {
    return await HttpService.post('/Projekcija/' + projekcija + '/dodaj/'+gledatelj)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
                return {greska: true, poruka: 'Gledatelj se ne može dodati na grupu'}
    })
}

async function obrisiGledatelja(grupa,polaznik) {
    return await HttpService.delete('/Grupa/' + grupa + '/obrisi/'+polaznik)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
                return {greska: true, poruka: 'Polaznik se ne može obrisati iz grupe'}
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena,

    getGledatelji,
    dodajGledatelja,
    obrisiGledatelja
}