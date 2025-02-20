import {z} from 'zod';

// o z.object cria um objeto que vai receber os campos do formulário e validar os campos do formulário com o zod e o z.string cria um campo do tipo string
// tipos de validações no zod string(), number(), boolean(), date(), email(), url(), regex()

/* 
o tipo de validação do zod é o seguinte:
    string() - string ele pode receber as propriedades .min(), .max(), .length(), .email(), .url(), .regex()
    number() - number ele pode receber as propriedades.min(),.max(),.int(),.positive(),.negative(),.multipleOf()
    boolean() - boolean ele pode receber as propriedades.optional() - torna o campo opcional
    date() - date ele pode receber as propriedades.min(),.max()
    email() - email ele pode receber as propriedades.email() - valida se o email é válido
    url() - url ele pode receber as propriedades.url() - valida se a url é válida
    regex() - regex ele pode receber as propriedades.regex() - valida se o regex é válido
*/
export const esquemaResponsavel = z.object({
    nome: z.string().min(3),
    cargo: z.string(),
    telefone: z.string(),
    email: z.string().email("Email inválido")
});

export const esquemaProjeto = z.object({
    nome: z.string().min(3, "Nome do projeto deve ter no mínimo 3 caracteres"),
    descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
    data_preenchimento: z.string().datetime(),
    data_inicial: z.string().datetime(),
    data_entrega: z.string().datetime(),
    status: z.string(),
    
    // Stack tecnológica
    tecnologias_frontend: z.string(),
    tecnologias_backend: z.string(),
    banco_dados: z.string(), // alterado de tecnologias_banco
    metodologia_apis: z.string(),

    // Testes e Deploy
    possui_testes: z.boolean(),
    descricao_testes: z.string()
        .optional()
        .nullable()
        .refine(val => !val || val.length >= 10, {
            message: 'A descrição dos testes deve ter no mínimo 10 caracteres'
        }),
    possui_deploy: z.string().transform(val => val === 'true'),
    descricao_deploy: z.string()
        .optional()
        .nullable()
        .refine((val, ctx) => {
            if (ctx.parent.processo_deploy === true && !val) {
                return false;
            }
            return val ? val.length >= 10 : true;
        }, { message: 'A descrição do deploy deve ter no mínimo 10 caracteres quando possui deploy' }),
    ambiente_homologacao: z.string()
        .url('Digite uma URL válida')
        .optional()
        .nullable()
        .refine((val, ctx) => {
            if (ctx.parent.processo_deploy === true && !val) {
                return false;
            }
            return true;
        }, { message: 'URL do ambiente de homologação é obrigatória quando possui deploy' }),
    ambiente_producao: z.string()
        .url('Digite uma URL válida')
        .optional()
        .nullable()
        .refine((val, ctx) => {
            if (ctx.parent.processo_deploy === true && !val) {
                return false;
            }
            return true;
        }, { message: 'URL do ambiente de produção é obrigatória quando possui deploy' }),
    deploy_automatizado: z.boolean().default(false),
    deploy_implementado: z.boolean().default(false),

    // Documentação
    possui_documentacao: z.boolean(),
    tipo_documentacao: z.string().optional(),
    documentacao_atualizada: z.boolean(),

    // Segurança
    possui_medidas_seguranca: z.boolean(),
    descricao_medidas_seguranca: z.string().optional(),
    possui_conformidade: z.boolean(),
    descricao_conformidade: z.string().optional(),

    // Responsáveis
    responsaveis: z.array(z.object({
        responsavel_id: z.number().optional(), // opcional para novos responsáveis
        tipo_responsabilidade: z.enum(['lider_tecnico', 'gerente_projetos', 'suporte'])
    }))
});