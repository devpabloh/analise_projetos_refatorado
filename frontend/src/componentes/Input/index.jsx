import './Input.module.css';

export const Input = ({
    label,
    type,
    placeholder,
    error,
    register,    // Adicionado para integração com React Hook Form
    name,  
    })=>{

    return(
        <div className="inputContainer">
            <label className="inputLabel">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className={`inputField ${error ? "input-error":""}`}
                {...register(name)}
            />
            {error && <span className="error-message">{error.message}</span>}
        </div>
    )
}