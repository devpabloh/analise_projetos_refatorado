import styles from "./Footer.module.css"
import LogoGovPE from "../../assets/LogoGovPE.png"


const Footer = ()=>{
    return(
        <footer className={styles.footer}>
          <div className={styles.container}>
            <img className={styles.logoGovPE} src={LogoGovPE} alt="Logo marca do governo de Pernambuco" />
          </div>
        </footer>
    )
}

export default Footer