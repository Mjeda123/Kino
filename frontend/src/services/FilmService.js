import { HttpService } from "./Httpservice";


async function get() {
    return await HttpService.get('/Film')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function getBySifra(sifra) {
    return await HttpService.get('/Film/' + sifra)
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function dodaj(Film) {
    return HttpService.post('/Film',Film)
    .then(()=>{return {greska: false, poruka: 'Dodano'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod dodavanja'}})
}

async function promjena(sifra,film) {
    return HttpService.put('/Film/'+sifra,film)
    .then(()=>{return {greska: false, poruka: 'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod promjene'}})
}

async function obrisi(sifra) {
    return HttpService.delete('/Film/'+sifra)
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