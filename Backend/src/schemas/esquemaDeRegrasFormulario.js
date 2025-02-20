import {z} from 'zod';

export const esquemaResponsavel = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    cargo: z.string(),
    telefone: z.string(),
    email: z.string().email("Email inválido")
});

export const esquemaProjeto = z.object({
    nome: z.string().min(3),
    descricao: z.string().min(10),
    data_preenchimento: z.string(),
    data_inicial: z.string(),
    data_entrega: z.string(),
    status: z.string(),
    
    // Stack tecnológica
    tecnologias_frontend: z.string(),
    tecnologias_backend: z.string(),
    banco_dados: z.string(),
    metodologia_apis: z.string(),

    // Campos booleanos
    possui_testes: z.boolean(),
    descricao_testes: z.string().nullable().optional(),
    possui_deploy: z.boolean(),
    descricao_deploy: z.string().nullable().optional(),
    ambiente_homologacao: z.string().nullable().optional(),
    ambiente_producao: z.string().nullable().optional(),
    deploy_automatizado: z.boolean().default(false),
    deploy_implementado: z.boolean().default(false),
    possui_documentacao: z.boolean(),
    tipo_documentacao: z.string().nullable().optional(),
    documentacao_atualizada: z.boolean().default(false),
    possui_medidas_seguranca: z.boolean().default(false),
    possui_conformidade: z.boolean().default(false),

    // Responsáveis
    responsaveis: z.array(z.object({
        responsavel_id: z.number(),
        tipo_responsabilidade: z.enum(['lider_tecnico', 'gerente_projetos', 'suporte'])
    }))
});