import { HttpService } from "./Httpservice";


async function get() {
    return await HttpService.get('/Dvorana')
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

export default{
    get,
    dodaj
}