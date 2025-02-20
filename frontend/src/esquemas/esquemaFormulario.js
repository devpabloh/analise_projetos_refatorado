import { z } from 'zod';

export const formSchema = z.object({
    // Informações Básicas
    nome: z.string()
        .min(3, 'O nome deve ter no mínimo 3 caracteres')
        .max(100, 'O nome deve ter no máximo 100 caracteres'),
    descricao: z.string()
        .min(10, 'A descrição deve ter no mínimo 10 caracteres')
        .max(500, 'A descrição deve ter no máximo 500 caracteres'),
    data_inicial: z.string()
        .min(1, 'A data inicial é obrigatória'),
    data_entrega: z.string()
        .min(1, 'A data de entrega é obrigatória'),
    status: z.string()
        .min(1, 'O status é obrigatório'),

    // Stack Tecnológica
    tecnologias_frontend: z.string()
        .min(2, 'Informe ao menos uma tecnologia frontend'),
    tecnologias_backend: z.string()
        .min(2, 'Informe ao menos uma tecnologia backend'),
    banco_dados: z.string()
        .min(2, 'Informe o banco de dados utilizado'),
    metodologia_apis: z.string()
        .min(2, 'Informe a metodologia de APIs'),

    // Testes e Qualidade
    possui_testes: z.string(),
    descricao_testes: z.string()
        .optional()
        .nullable()
        .superRefine((val, ctx) => {
            if (ctx.parent?.possui_testes === 'true' && (!val || val.length < 10)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'A descrição dos testes deve ter no mínimo 10 caracteres quando possui testes'
                });
            }
        }),
    possui_documentacao: z.string(),
    link_documentacao: z.string()
        .optional()
        .nullable()
        .superRefine((val, ctx) => {
            // Só valida se possui_documentacao for true
            if (ctx.parent?.possui_documentacao === 'true') {
                if (!val) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'URL da documentação é obrigatória quando possui documentação'
                    });
                } else if (!val.startsWith('http://') && !val.startsWith('https://')) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Digite uma URL válida'
                    });
                }
            }
        }),

    // Deploy e Infraestrutura
    possui_deploy: z.string(),
    descricao_deploy: z.string()
        .optional()
        .nullable()
        .superRefine((val, ctx) => {
            if (ctx.parent?.possui_deploy === 'true' && (!val || val.length < 10)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'A descrição do deploy deve ter no mínimo 10 caracteres quando possui deploy'
                });
            }
        }),
    
        ambiente_homologacao: z.string()
        .url('Digite uma URL válida')
        .optional()
        .nullable()
        .superRefine((val, ctx) => {
            if (ctx.parent?.possui_deploy === 'true' && !val) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'URL do ambiente de homologação é obrigatória quando possui deploy'
                });
            }
        }),

        ambiente_producao: z.string()
        .url('Digite uma URL válida')
        .optional()
        .nullable()
        .superRefine((val, ctx) => {
            if (ctx.parent?.possui_deploy === 'true' && !val) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'URL do ambiente de produção é obrigatória quando possui deploy'
                });
            }
        }),

    // Responsáveis
    nome_responsavel: z.string()
        .min(3, 'O nome deve ter no mínimo 3 caracteres')
        .max(100, 'O nome deve ter no máximo 100 caracteres'),
    email_responsavel: z.string()
        .email('Digite um email válido'),
    telefone_responsavel: z.string()
        .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, 'Digite um telefone válido: (00) 00000-0000'),
    funcao_responsavel: z.string()
        .min(1, 'A função é obrigatória')
});