import styles from './Select.module.css';

export const Select = ({ 
    label, 
    error, 
    register, 
    name,
    options,
    placeholder 
}) => {
    return (
        <div className={styles.selectContainer}>
            <label className={styles.selectLabel}>{label}</label>
            <select
                className={`${styles.selectField} ${error ? styles.selectError : ''}`}
                {...register(name)}
            >
                <option value="">{placeholder || "Selecione uma opção"}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
};