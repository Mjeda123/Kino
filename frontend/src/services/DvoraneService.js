import { HttpService } from "./Httpservice";


async function get() {
    return await HttpService.get('/Dvorana')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function getBySifra(sifra) {
    return await HttpService.get('/Dvorana/' + sifra)
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function dodaj(dvorana) {
    return HttpService.post('/Dvorana',dvorana)
    .then(()=>{return {greska: false, poruka: 'Dodano'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod dodavanja'}})
}

async function promjena(sifra,dvorana) {
    return HttpService.put('/Dvorana/'+sifra,dvorana)
    .then(()=>{return {greska: false, poruka: 'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod promjene'}})
}

async function obrisi(sifra) {
    return HttpService.delete('/Dvorana/'+sifra)
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