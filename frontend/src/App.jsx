import './App.css'
import Footer from './componentes/Footer'

import { Header } from './componentes/Header'
import { FormularioProjeto } from './pages/Form'


function App() {
  

  return (
    <>
      <Header/>
      <main>
        <FormularioProjeto />
      </main>
      <Footer/>
    </>
  )

}

export default App
