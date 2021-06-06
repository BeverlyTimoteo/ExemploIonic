import { Empresa } from "./empresa";

export interface Usuario {
    id_usuario: number;
    id_empresa: number;
    nome: string;
    senha: string;
    fg_bloqueado: boolean;
    token: string;
    empresas_usuario: Empresa[];
}