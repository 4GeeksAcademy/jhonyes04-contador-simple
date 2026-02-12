export const SecondsCounterDisplay = ({ digitos }) => {
    return (
        <>
            {digitos.map((digito, index) => (
                <div
                    className={`col-2 col-md-1 display-3 fw-bold text-center border-top border-bottom
                        ${index === 0 ? 'border-start rounded-start' : ''}
                        ${index === digitos.length - 1 ? 'border-end rounded-end' : ''}
                    `}
                    key={index}
                >
                    {digito}
                </div>
            ))}
        </>
    );
};
