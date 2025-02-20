import styles from "./Footer.module.css"
import LogoGovPE from "../../assets/LogoGovPE.png"
import Linkedin from "../../assets/logoLinkedin.png"
import Twitter from "../../assets/logoXtwitter.png"
import Instagram from "../../assets/logoInstagram.png"
import Youtube from "../../assets/logoYoutube.png"


const Footer = ()=>{
    return(
        <footer className={styles.containerFooter}>
          <img className={styles.logoGovPE} src={LogoGovPE} alt="Logo marca do governo de Pernambuco" />
          <ul className={styles.containerLista}>
            <li>
              <a href="https://www.instagram.com/atipeoficial" target="_blank">
                <img className={styles.logo} src={Instagram} alt="Logo marca do intagram que encaminha para o instagram da ATI" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/ati---ag-ncia-estadual-de-tecnologia-da-informa-o-pe/posts/?feedView=all&viewAsMember=true" target="_blank">
                <img className={styles.logo} src={Linkedin} alt="Logo marca do facebook que encaminha para o facebook da ATI" />
              </a>
            </li>
            <li>
              <a href="https://x.com/i/flow/login?redirect_after_login=%2Fatipeoficial">
                <img className={styles.logo} src={Twitter} alt="Logo marca do xtwitter que encaminha para o xtwitter da ATI" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@atipeoficial">
                <img className={styles.logo} src={Youtube} alt="Logo marca do youtube que encaminha para o youtube da ATI" />
              </a>
            </li>
          </ul>
        </footer>
    )
}

export default Footer