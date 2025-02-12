import { HttpService } from "./Httpservice";


async function get() {
    return await HttpService.get('/Dvorana')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

export default{
    get
}