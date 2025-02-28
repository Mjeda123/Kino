import { HttpService } from "./Httpservice";


async function get() {
    return await HttpService.get('/Gledatelj')
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function getBySifra(sifra) {
    return await HttpService.get('/Gledatelj/' + sifra)
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function dodaj(Gledatelj) {
    return HttpService.post('/Gledatelj',Gledatelj)
    .then(()=>{return {greska: false, poruka: 'Dodano'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod dodavanja'}})
}

async function promjena(sifra,gledatelj) {
    return HttpService.put('/Gledatelj/'+sifra,gledatelj)
    .then(()=>{return {greska: false, poruka: 'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod promjene'}})
}

async function obrisi(sifra) {
    return HttpService.delete('/Gledatelj/'+sifra)
    .then(()=>{return {greska: false, poruka: 'Obrisano'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod brisanje'}})
}

export default{
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi
}