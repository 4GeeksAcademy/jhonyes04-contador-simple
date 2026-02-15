import { useEffect, useState, useMemo } from 'react';
import { SecondsCounterDisplay } from './SecondsCounterDisplay';
import { SecondsCounterInputs } from './SecondsCounterInputs';

import Swal from 'sweetalert2';
import './SecondsCounter.css';

export const SecondsCounter = () => {
    // Estados principales
    const [contar, setContar] = useState(true);
    const [contador, setContador] = useState(0);
    const [modo, setModo] = useState({ regresivo: false, alerta: false });

    // Valores de configuración de los inputs
    const [config, setConfig] = useState({ regresivo: 10, alerta: 10 });
    const [valorMostrarAlerta, setValorMostrarAlerta] = useState(null);

    // OPTIMIZACIÓN: Memorizar los dígitos para no procesar strings en cada render innecesario
    const digitos = useMemo(
        () => contador.toString().padStart(6, '0').split(''),
        [contador],
    );

    // 1. UN SOLO EFECTO PARA EL TIEMPO
    useEffect(() => {
        if (!contar) return;

        const intervalo = setInterval(() => {
            setContador((prev) => {
                if (modo.regresivo) return prev > 0 ? prev - 1 : 0;
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(intervalo);
    }, [contar, modo.regresivo]);

    // 2. LÓGICA DE EVENTOS (Alertas)
    useEffect(() => {
        // Caso: Cuenta atrás termina
        if (modo.regresivo && contador === 0 && contar) {
            setContar(false);
            lanzarSwal(
                'success',
                `Terminó la cuenta atrás de ${config.regresivo} segundos`,
            );

            setModo((prev) => ({ ...prev, regresivo: false }));
        }

        // Caso: Alerta programada
        if (valorMostrarAlerta !== null && contador === valorMostrarAlerta) {
            lanzarSwal(
                'error',
                `Han pasado los ${config.alerta} segundos programados`,
            );
            setValorMostrarAlerta(null);
            setModo((prev) => ({ ...prev, alerta: false }));
        }
    }, [contador, modo, valorMostrarAlerta, contar, config]);

    // Función auxiliar para no repetir código de Swal
    const lanzarSwal = (icon, title) => {
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

    // --- Handlers Optimizados ---
    const handleAction = (tipo) => {
        if (tipo === 'regresivo') {
            setContador(config.regresivo);
            setModo({ regresivo: true, alerta: false });
            setContar(true);
        } else if (tipo === 'alerta') {
            setValorMostrarAlerta(contador + config.alerta);
            setModo((prev) => ({ ...prev, alerta: true, regresivo: false }));
        }
    };

    const reiniciar = () => {
        setContador(0);
        setContar(true);
        setModo({ regresivo: false, alerta: false });
        setValorMostrarAlerta(null);
    };

    return (
        <div className="container mt-4">
            <div className="card bg-dark mb-4">
                <div className="card-body">
                    <div className="row justify-content-center align-items-center text-white">
                        <div className="col-12 col-md-2 display-4 text-center mb-2 mb-md-0">
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <SecondsCounterDisplay digitos={digitos} />
                    </div>
                </div>
            </div>

            <div className="row text-center py-4">
                <SecondsCounterInputs
                    titulo="Cuenta atrás"
                    label="Empezar en..."
                    labelBoton="Iniciar cuenta atrás"
                    icon="fa-clock-rotate-left"
                    value={config.regresivo}
                    onChange={(valor) =>
                        setConfig({ ...config, regresivo: valor })
                    }
                    onSubmit={() => handleAction('regresivo')}
                    disabled={modo.regresivo || modo.alerta}
                />

                <div className="col-12 col-md-4 mb-3">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="card-title">Controles</h5>
                        </div>
                        <div className="card-body d-grid gap-2">
                            <div className="btn-group">
                                <button
                                    onClick={() => setContar(false)}
                                    className={`btn ${contar ? 'btn-warning' : 'btn-secondary'}`}
                                    disabled={!contar}
                                >
                                    <i className="fa-solid fa-pause fa-2x"></i>
                                </button>
                                <button
                                    onClick={() => setContar(true)}
                                    className={`btn ${!contar ? 'btn-warning' : 'btn-secondary'}`}
                                    disabled={contar}
                                >
                                    <i className="fa-solid fa-play fa-2x"></i>
                                </button>
                                <button
                                    onClick={reiniciar}
                                    className="btn btn-danger"
                                >
                                    <i className="fa-solid fa-rotate fa-2x"></i>{' '}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <SecondsCounterInputs
                    titulo="Alerta"
                    label="Mostrar alerta en..."
                    labelBoton="Activar alerta"
                    icon="fa-bell"
                    value={config.alerta}
                    onChange={(valor) =>
                        setConfig({ ...config, alerta: valor })
                    }
                    onSubmit={() => handleAction('alerta')}
                    disabled={modo.regresivo || modo.alerta}
                />
            </div>
        </div>
    );
};
