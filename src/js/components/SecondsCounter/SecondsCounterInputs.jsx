export const SecondsCounterInputs = ({
    titulo,
    label,
    labelBoton,
    icon,
    value,
    onChange,
    onSubmit,
    disabled,
}) => {
    return (
        <div className="col-12 col-md-4 mb-3">
            <div className="card h-100">
                <div className="card-header">
                    <h5>{titulo}</h5>
                </div>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="card-body">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control text-end"
                                value={value}
                                min={1}
                                max={999999}
                                onChange={(event) =>
                                    onChange(parseInt(event.target.value) || 10)
                                }
                                disabled={disabled}
                            />
                            <label>{label}</label>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            type="submit"
                            className={`btn w-100 ${disabled ? 'btn-secondary' : 'btn-warning'}`}
                            disabled={disabled}
                        >
                            <i className={`fa-solid ${icon}`}></i> {labelBoton}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
