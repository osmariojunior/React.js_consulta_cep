import React, {useRef, useState, useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {Grid} from '@material-ui/core';
import {FaSearch} from 'react-icons/fa'
import ReactInputMask from 'react-input-mask';
import {API} from "../providers/API";
import EnderecoService from "../services/EnderecoService";
import Endereco from "../Interface/Endereco";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: 200
            },
        },
    }),
);


export default function InputText() {
    const classes = useStyles();
    const [endereco, setEndereco] = useState<Endereco>({} as Endereco);
    const [exibirEstado, setExibirEstado] = useState<boolean>(false);

    const [inputComplemento, setInputComplemento] = useState<boolean>(true)
    const [inputs, setInputs] = useState<Object>({
        bairro: true,
        complemento: true,
        ddd: true,
        ibge: true,
        localidade: true,
        logradouro: true,
        siafi: true,
        uf: true,
    })

    const cep = useRef<TextFieldProps>(null);

    const buscarEndereco = (cep: string) => {
        EnderecoService.obterEndereco(cep)
            .then((response) =>{
                setEndereco(response)
                setExibirEstado(true);
            })
    }

    useEffect(()=>{
        
    }, [endereco])

    const saveEndereco = () => {
        EnderecoService.saveEndereco(endereco);
    }

    return (
        <> <Grid container direction="column"> <Grid container direction="row" justify="center" alignItems="center">
            {console.log(endereco)}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => event.preventDefault()}>
                <h1>Buscar CEP</h1>
                <ReactInputMask
                    mask={'99999-999'}>
                    {() =>
                        <TextField inputRef={cep} id="outlined-basic" label="CEP" variant="outlined"/>}

                </ReactInputMask>

                <Grid container>
                    <Button variant="contained" color="primary" type={"button"}
                            onClick={() => buscarEndereco(String(cep.current?.value))}>
                        Buscar <FaSearch style={{paddingLeft: '5px'}}/>
                    </Button>
                </Grid>
            </form>
        </Grid>
            {
                exibirEstado && (
                    <div id="Cep">
                        <Grid container>
                            <Grid item>
                                <TextField value={endereco.bairro} id="outlined-basic" label="Bairro" disabled={!(endereco.bairro === "")}
                                           InputLabelProps={{
                                               shrink: true,
                                           }} variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField value={endereco.complemento}
                                           onChange={event => setEndereco({
                                               ...endereco,
                                               complemento: event.target.value
                                           })}
                                           id="outlined-basic" label="Complemento" disabled={inputComplemento}
                                           InputLabelProps={{
                                               shrink: true,
                                           }} variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField value={endereco.ddd} id="outlined-basic" label="ddd" disabled={!(endereco.ddd === "")} InputLabelProps={{
                                    shrink: true,
                                }} variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField value={endereco.gia} id="outlined-basic" label="Gia" disabled={!(endereco.gia === "")} InputLabelProps={{
                                    shrink: true,
                                }} variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField value={endereco.ibge} id="outlined-basic" label="IBGE" disabled={!(endereco.ibge === "")} InputLabelProps={{
                                    shrink: true,
                                }} variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField value={endereco.localidade} id="outlined-basic" label="Localidade" disabled={!(endereco.localidade === "")}
                                           InputLabelProps={{
                                               shrink: true,
                                           }} variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField value={endereco.logradouro} id="outlined-basic" label="Logradouro" disabled={!(endereco.logradouro === "")}
                                           InputLabelProps={{
                                               shrink: true,
                                           }} variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField value={endereco.siafi} id="outlined-basic" label="Siafi" disabled={!(endereco.siafi === "")} InputLabelProps={{
                                    shrink: true,
                                }} variant="outlined"/>
                            </Grid>
                            <Grid item>
                                <TextField value={endereco.uf} id="outlined-basic" label="Uf" disabled={!(endereco.uf === "")} InputLabelProps={{
                                    shrink: true,
                                }} variant="outlined"/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Button variant="contained" color="primary" size="large" type="submit"
                                    onClick={event => saveEndereco()}>
                                Salvar
                            </Button>
                        </Grid>
                    </div>
                )
            }
        </Grid>
        </>
    );
}

