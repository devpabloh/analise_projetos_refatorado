import styles from './Input.module.css';

export const Input = ({
    label,
    type,
    placeholder,
    error,
    register,
    name,  
    })=>{

    return(
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className={`${styles.inputField} ${error ? styles.inputError : ""}`}
                {...register(name)}
            />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    )
}