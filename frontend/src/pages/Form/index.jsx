import { useState, useEffect } from 'react';
import styles from "./Form.module.css"
import { Input } from '../../componentes/Input';
import { Select } from '../../componentes/Select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../esquemas/esquemaFormulario';
import axios from 'axios';

export const FormularioProjeto = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [showDeployFields, setShowDeployFields] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { 
        register, 
        handleSubmit,
        watch,
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            possui_testes: 'false',
            possui_documentacao: 'false',
            possui_deploy: 'false',
            status: 'em_andamento'
        }
    });

    const possuiDeploy = watch('possui_deploy');

    useEffect(() => {
        setShowDeployFields(possuiDeploy === 'true');
    }, [possuiDeploy]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            console.log('Dados do formulário:', data);
            
            // Preparar os dados do responsável
            const dadosResponsavel = {
                nome: data.nome_responsavel,
                cargo: data.funcao_responsavel,
                telefone: data.telefone_responsavel,
                email: data.email_responsavel
            };

            console.log('Dados do responsável:', dadosResponsavel);

            // Primeiro, cadastrar o responsável
            const respostaResponsavel = await axios.post('http://localhost:3000/responsaveis', dadosResponsavel);
            console.log('Resposta do cadastro de responsável:', respostaResponsavel.data);

            // Preparar os dados do projeto com data_preenchimento
            const dadosProjeto = {
                nome: data.nome,
                descricao: data.descricao,
                data_preenchimento: new Date().toISOString(),
                data_inicial: new Date(data.data_inicial).toISOString(),
                data_entrega: new Date(data.data_entrega).toISOString(),
                status: data.status,
                tecnologias_frontend: data.tecnologias_frontend,
                tecnologias_backend: data.tecnologias_backend,
                banco_dados: data.banco_dados,
                metodologia_apis: data.metodologia_apis,
                possui_testes: data.possui_testes === 'true',
                descricao_testes: data.descricao_testes || null,
                possui_deploy: data.possui_deploy === 'true',
                descricao_deploy: data.descricao_deploy || null,
                ambiente_homologacao: data.ambiente_homologacao || null,
                ambiente_producao: data.ambiente_producao || null,
                possui_documentacao: data.possui_documentacao === 'true',
                tipo_documentacao: data.link_documentacao || null,
                documentacao_atualizada: true,
                possui_medidas_seguranca: false,
                possui_conformidade: false,
                responsaveis: [{
                    responsavel_id: respostaResponsavel.data.responsavel.id,
                    tipo_responsabilidade: 'gerente_projetos'
                }]
            };

            console.log('Dados do projeto:', dadosProjeto);

            // Cadastrar o projeto
            const respostaProjeto = await axios.post('http://localhost:3000/projetos', dadosProjeto);
            console.log('Resposta do cadastro de projeto:', respostaProjeto.data);
            
            alert('Projeto cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro detalhado:', error.response?.data || error);
            alert('Erro ao cadastrar projeto. Verifique o console para mais detalhes.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Informações Básicas do Projeto</legend>
                    <Input 
                        label="Nome do Projeto"
                        type="text"
                        name="nome"
                        placeholder="Digite o nome do projeto"
                        register={register}
                        error={errors.nome}
                    />
                    <Input 
                        label="Descrição"
                        type="text"
                        name="descricao"
                        placeholder="Descreva o projeto detalhadamente"
                        register={register}
                        error={errors.descricao}
                    />
                    <Input 
                        label="Data de Início"
                        type="date"
                        name="data_inicial"
                        register={register}
                        error={errors.data_inicial}
                    />
                    <Input 
                        label="Data de Entrega"
                        type="date"
                        name="data_entrega"
                        register={register}
                        error={errors.data_entrega}
                    />
                    <Select
                        label="Status do Projeto"
                        name="status"
                        register={register}
                        error={errors.status}
                        options={[
                            { value: "em_andamento", label: "Em Andamento" },
                            { value: "concluido", label: "Concluído" },
                            { value: "pausado", label: "Pausado" }
                        ]}
                    />
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Stack Tecnológica</legend>
                    <Input 
                        label="Tecnologias Frontend"
                        type="text"
                        name="tecnologias_frontend"
                        placeholder="Ex: React, Vue, Angular..."
                        register={register}
                        error={errors.tecnologias_frontend}
                    />
                    <Input 
                        label="Tecnologias Backend"
                        type="text"
                        name="tecnologias_backend"
                        placeholder="Ex: Node.js, Python, Java..."
                        register={register}
                        error={errors.tecnologias_backend}
                    />
                    <Input 
                        label="Banco de Dados"
                        type="text"
                        name="banco_dados"
                        placeholder="Ex: PostgreSQL, MongoDB..."
                        register={register}
                        error={errors.banco_dados}
                    />
                    <Input 
                        label="Metodologia de APIs"
                        type="text"
                        name="metodologia_apis"
                        placeholder="Ex: REST, GraphQL..."
                        register={register}
                        error={errors.metodologia_apis}
                    />
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Testes e Qualidade</legend>
                    <Select
                        label="Possui Testes?"
                        name="possui_testes"
                        register={register}
                        error={errors.possui_testes}
                        options={[
                            { value: "true", label: "Sim" },
                            { value: "false", label: "Não" }
                        ]}
                    />
                    <Input 
                        label="Descrição dos Testes"
                        type="text"
                        name="descricao_testes"
                        placeholder="Descreva os tipos de testes implementados"
                        register={register}
                        error={errors.descricao_testes}
                    />
                    <Select
                        label="Possui Documentação?"
                        name="possui_documentacao"
                        register={register}
                        error={errors.possui_documentacao}
                        options={[
                            { value: "true", label: "Sim" },
                            { value: "false", label: "Não" }
                        ]}
                    />
                    <Input 
                        label="Link da Documentação"
                        type="url"
                        name="link_documentacao"
                        placeholder="https://..."
                        register={register}
                        error={errors.link_documentacao}
                    />
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Deploy e Infraestrutura</legend>
                    <Select
                        label="Possui Processo de Deploy?"
                        name="possui_deploy"
                        register={register}
                        error={errors.possui_deploy}
                        options={[
                            { value: "true", label: "Sim" },
                            { value: "false", label: "Não" }
                        ]}
                    />
                    {showDeployFields && (
                        <>
                            <Input 
                                label="Descrição do Deploy"
                                type="text"
                                name="descricao_deploy"
                                placeholder="Descreva o processo de deploy"
                                register={register}
                                error={errors.descricao_deploy}
                            />
                            <Input 
                                label="Ambiente de Homologação"
                                type="url"
                                name="ambiente_homologacao"
                                placeholder="URL do ambiente de homologação"
                                register={register}
                                error={errors.ambiente_homologacao}
                            />
                            <Input 
                                label="Ambiente de Produção"
                                type="url"
                                name="ambiente_producao"
                                placeholder="URL do ambiente de produção"
                                register={register}
                                error={errors.ambiente_producao}
                            />
                        </>
                    )}
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Responsáveis pelo Projeto</legend>
                    <Input 
                        label="Nome do Responsável"
                        type="text"
                        name="nome_responsavel"
                        placeholder="Nome completo"
                        register={register}
                        error={errors.nome_responsavel}
                    />
                    <Input 
                        label="Email do Responsável"
                        type="email"
                        name="email_responsavel"
                        placeholder="email@exemplo.com"
                        register={register}
                        error={errors.email_responsavel}
                    />
                    <Input 
                        label="Telefone do Responsável"
                        type="tel"
                        name="telefone_responsavel"
                        placeholder="(00) 00000-0000"
                        register={register}
                        error={errors.telefone_responsavel}
                    />
                    <Select
                        label="Função no Projeto"
                        name="funcao_responsavel"
                        register={register}
                        error={errors.funcao_responsavel}
                        options={[
                            { value: "gerente", label: "Gerente de Projeto" },
                            { value: "desenvolvedor", label: "Desenvolvedor" },
                            { value: "analista", label: "Analista" },
                            { value: "arquiteto", label: "Arquiteto de Software" }
                        ]}
                    />
                </fieldset>

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar Projeto'}
                </button>
            </form>
            <button 
                type="button"
                className={`${styles.scrollToTop} ${showScrollButton ? styles.visible : ''}`}
                onClick={scrollToTop}
                aria-label="Voltar ao topo"
            >
                ↑
            </button>
        </>
    );
};