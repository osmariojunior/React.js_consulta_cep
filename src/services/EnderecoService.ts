import {API, APIe} from "../providers/API";
import Endereco from "../Interface/Endereco";
import {AxiosResponse} from "axios";


export default class EnderecoService {
    static obterEndereco(cep: string): Promise<Endereco> {
        return API.get(`${cep}/json`)
            .then((response) => response.data)
            .catch((error) => console.log(error))
    }
    static saveEndereco(endereco: Endereco): Promise<Endereco> {
        return APIe.get(`/endereco`)
    }
}