import styles from './Header.module.css';
import logoATI from '../../assets/logo-ati-pe.png';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img 
                    src={logoATI} 
                    alt="Logo ATI" 
                    className={styles.logo}
                />
            </div>
        </header>
    );
};