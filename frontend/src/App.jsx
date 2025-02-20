
import './App.css'

import {useForm} from "react-hook-form"
import {Input} from './componentes/Input'

function App() {
  const {register, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }
  

  return (
    <>
      <Input
        label="Nome"
        type="text"
        placeholder="Digite seu nome"
        name="nome"
        register={register}
        errors={errors.nome}
      />
    </>
  )
}

export default App
