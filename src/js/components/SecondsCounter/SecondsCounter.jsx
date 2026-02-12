import { useEffect, useState } from 'react';
import './SecondsCounter.css';
import { SecondsCounterDisplay } from './SecondsCounterDisplay';

//create your first component
const NUMERO_DIGITOS = 6;
export const SecondsCounter = () => {
    const [contar, setContar] = useState(true);
    const [contador, setContador] = useState(0);

    const [regresivo, setRegresivo] = useState(false);
    const [valorRegresivo, setValorRegresivo] = useState(10);

    const [alerta, setAlerta] = useState(false);
    const [valorAlerta, setValorAlerta] = useState(10);
    const [valorMostrarAlerta, setValorMostrarAlerta] = useState(0);

    useEffect(() => {
        let intervalo = null;

        if (contar) {
            intervalo = setInterval(() => {
                setContador((prev) => {
                    if (regresivo) {
                        return prev > 0 ? prev - 1 : 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalo);
        }

        return () => clearInterval(intervalo);
    }, [contar, regresivo]);

    useEffect(() => {
        if (regresivo && contador === 0 && contar) {
            setContar(false);

            mostarSwal(
                'success',
                `Ya terminó la cuenta atrás de ${valorRegresivo} segundos`,
            );

            setRegresivo(false);
            setValorRegresivo(10);
        }
    }, [contador, regresivo, valorRegresivo]);

    useEffect(() => {
        if (valorMostrarAlerta !== 0 && contador === valorMostrarAlerta) {
            mostarSwal(
                'error',
                `Alerta\nYa han pasado los ${valorAlerta} segundos`,
            );

            setValorAlerta(10);
            setAlerta(false);
            setValorMostrarAlerta(0);
        }
    }, [contador, alerta]);

    const mostarSwal = (icon, title) => {
        Swal.fire({
            position: 'center',
            theme: 'auto',
            grow: 'fullscreen',
            timerProgressBar: true,
            icon,
            title,
            showConfirmButton: true,
            timer: 5000,
        });
    };

    const handleClickRegresivo = () => {
        setContador(valorRegresivo);
        setContar(true);
        setRegresivo(true);
        setAlerta(false);
    };

    const handleClickParar = () => {
        setContar(false);
    };

    const handleClickReanudar = () => {
        setContar(true);
    };

    const handleClickReiniciar = () => {
        setContador(0);
        setContar(true);
        setRegresivo(false);
        setValorRegresivo(10);
        setAlerta(false);
        setValorAlerta(10);
        setValorMostrarAlerta(0);
    };

    const handleClickAlerta = () => {
        const iniciarAlerta = contador + valorAlerta;

        setValorMostrarAlerta(iniciarAlerta);
        setAlerta(true);
        setRegresivo(false);
    };

    const digitos = contador.toString().padStart(6, '0').split('');

    return (
        <>
            <div className="container mt-4">
                <div className="card bg-dark">
                    <div className="card-body">
                        <div className="row bg-dark justify-content-center align-items-center text-white">
                            <div className="col-12 col-md-2 display-4 text-center pb-2 pb-md-0">
                                <i className="fa-regular fa-clock"></i>
                            </div>

                            <SecondsCounterDisplay digitos={digitos} />
                        </div>
                    </div>
                </div>

                <div className="row text-center py-4">
                    <div className="col-12 col-md-4 my-2 my-md-0">
                        <div className="card h-100">
                            <div className="card-header">
                                <h5 className="card-title">Cuenta atrás</h5>
                            </div>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleClickRegresivo();
                                }}
                            >
                                <div className="card-body">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            id="cuentaAtras"
                                            className="form-control text-end"
                                            value={valorRegresivo}
                                            min={1}
                                            max={999999}
                                            disabled={regresivo || alerta}
                                            onChange={(event) =>
                                                setValorRegresivo(
                                                    parseInt(
                                                        event.target.value,
                                                    ) || 10,
                                                )
                                            }
                                        />
                                        <label htmlFor="cuentaAtras">
                                            Iniciar en
                                        </label>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button
                                        type="submit"
                                        className={
                                            regresivo || alerta
                                                ? 'btn btn-secondary text-muted w-100'
                                                : 'btn btn-warning w-100'
                                        }
                                        disabled={regresivo || alerta}
                                    >
                                        <i className="fa-solid fa-clock-rotate-left"></i>{' '}
                                        Inciar cuenta atrás
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 my-2 my-md-0">
                        <div className="card h-100">
                            <div className="card-header">
                                <h5 className="card-title">
                                    Opciones de contador
                                </h5>
                            </div>
                            <div className="card-body d-grid gap-2">
                                <div className="btn-group">
                                    <button
                                        onClick={handleClickParar}
                                        className={
                                            contar
                                                ? 'btn btn-warning'
                                                : 'btn btn-secondary text-muted'
                                        }
                                        disabled={!contar}
                                        title="Pausar"
                                    >
                                        <i className="fa-solid fa-pause fa-2x"></i>{' '}
                                    </button>
                                    <button
                                        onClick={handleClickReanudar}
                                        className={
                                            contar
                                                ? 'btn btn-secondary text-muted'
                                                : 'btn btn-warning'
                                        }
                                        disabled={contar}
                                        title="Reanudar"
                                    >
                                        <i className="fa-solid fa-play fa-2x"></i>{' '}
                                    </button>
                                    <button
                                        onClick={handleClickReiniciar}
                                        className="btn btn-danger"
                                        title="Reiniciar"
                                    >
                                        <i className="fa-solid fa-rotate fa-2x"></i>{' '}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 my-2 my-md-0">
                        <div className="card h-100">
                            <div className="card-header">
                                <h5 className="card-title">Alerta</h5>
                            </div>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleClickAlerta();
                                }}
                            >
                                <div className="card-body">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control text-end"
                                            value={valorAlerta}
                                            min={1}
                                            max={999999}
                                            disabled={regresivo || alerta}
                                            onChange={(event) => {
                                                setValorAlerta(
                                                    parseInt(
                                                        event.target.value,
                                                    ) || 10,
                                                );
                                            }}
                                        />
                                        <label>Mostrar alerta en...</label>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button
                                        type="submit"
                                        className={
                                            alerta || regresivo
                                                ? 'btn btn-secondary text-muted w-100'
                                                : 'btn btn-warning w-100'
                                        }
                                        disabled={alerta || regresivo}
                                    >
                                        <i className="fa-solid fa-alarm-clock"></i>{' '}
                                        Activar alerta
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
