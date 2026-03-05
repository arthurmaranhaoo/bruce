export interface ProcessStage {
  id: string;
  title: string;
  horizon: string;
  focus: string;
  description: string;
  canvas: {
    objective: string;
    entryGate: string;
    exitGate: string;
    artifacts: string[];
    gateCriteria: string[];
    team: string[];
    duration: string;
  };
  gate: string;
}

export const processStages: ProcessStage[] = [
  { id: 'H3.1', title: 'Discovery e Concepção', horizon: 'H3: VALIDAÇÃO', focus: 'Estruturar a tese e o PMF inicial', description: 'O ponto de partida de qualquer produto. Mergulhamos no problema para estruturar a tese do produto, definindo o problema real e o público-alvo estratégico.', canvas: { objective: 'Estruturar a tese do produto e definir o Product-Market Fit inicial.', entryGate: 'Tese de oportunidade ou gap de mercado identificado.', exitGate: 'Tese de valor aprovada e backlog de discovery concluído.', artifacts: ['Canvas de Proposta de Valor', 'Mapa de Empatia', 'Lean Canvas'], gateCriteria: ['Problema validado com stakeholders', 'Público-alvo definido', 'Diferenciais competitivos claros'], team: ['Product Manager', 'UX Researcher', 'Stakeholders'], duration: '2-4 semanas' }, gate: 'GATE_01: ALINHAMENTO_DA_TESE' },
  { id: 'H3.2', title: 'Análise de Mercado e Viabilidade', horizon: 'H3: VALIDAÇÃO', focus: 'Validar viabilidade econômica e técnica', description: 'Quantificar a oportunidade de negócio e analisar profundamente os riscos técnicos, legais e operacionais antes da prototipagem.', canvas: { objective: 'Validar a viabilidade econômica, técnica e jurídica da solução.', entryGate: 'Tese de valor aprovada (H3.1).', exitGate: 'Business Case validado e sinal verde para prototipagem.', artifacts: ['Estudo de TAM/SAM/SOM', 'Matriz de Riscos', 'Projeção Financeira'], gateCriteria: ['ROI estimado positivo', 'Riscos técnicos mapeados', 'Viabilidade jurídica confirmada'], team: ['Business Analyst', 'Tech Lead', 'Legal/Compliance'], duration: '3-5 semanas' }, gate: 'GATE_02: REVISÃO_DE_VIABILIDADE' },
  { id: 'H3.3', title: 'Prova de Conceito (PoC)', horizon: 'H3: VALIDAÇÃO', focus: 'Obter prova tangível de valor', description: 'Transformamos a tese em algo tangível para obter prova quantitativa e qualitativa do valor da solução para o usuário final.', canvas: { objective: 'Validar tecnicamente a solução e obter primeiros sinais de mercado.', entryGate: 'Business Case aprovado (H3.2).', exitGate: 'PoC funcional validado com usuários reais.', artifacts: ['Protótipo funcional', 'Relatório de testes', 'Métricas de validação'], gateCriteria: ['Tecnologia validada', 'Pelo menos 3 usuários testaram', 'Problema confirmado como real'], team: ['Tech Lead', 'Product Manager', 'UX Designer'], duration: '4-6 semanas' }, gate: 'GATE_03: VALIDAÇÃO_TÉCNICA' },
  { id: 'H2.1', title: 'MVP e Primeiros Clientes', horizon: 'H2: CRESCIMENTO', focus: 'Lançar e capturar primeiros clientes pagantes', description: 'Construímos o mínimo produto viável para colocar nas mãos dos primeiros clientes e gerar receita inicial.', canvas: { objective: 'Lançar MVP e conquistar primeiros clientes pagantes.', entryGate: 'PoC validado (H3.3).', exitGate: 'MVP em produção com pelo menos 3 clientes pagantes.', artifacts: ['MVP em produção', 'Contrato de early adopters', 'Playbook de onboarding'], gateCriteria: ['MVP estável em produção', '3+ clientes pagantes', 'NPS > 30'], team: ['Squad completo', 'CS', 'Comercial'], duration: '8-12 semanas' }, gate: 'GATE_04: PRODUCT_MARKET_FIT' },
  { id: 'H2.2', title: 'Iteração e Product-Market Fit', horizon: 'H2: CRESCIMENTO', focus: 'Refinar o produto até o PMF', description: 'Ciclos rápidos de feedback com os primeiros clientes para refinar o produto até atingir o Product-Market Fit.', canvas: { objective: 'Atingir Product-Market Fit com base em dados reais de uso.', entryGate: 'MVP com primeiros clientes (H2.1).', exitGate: 'PMF confirmado: retenção > 40%, NPS > 50.', artifacts: ['Roadmap priorizado', 'Análise de churn', 'Matriz de features por valor'], gateCriteria: ['Retenção mensal > 40%', 'NPS > 50', 'Churn < 5%'], team: ['Product Manager', 'Squad', 'CS', 'Dados'], duration: '12-24 semanas' }, gate: 'GATE_05: ESCALA_AUTORIZADA' },
  { id: 'H1.1', title: 'Escala Comercial', horizon: 'H1: ESCALA', focus: 'Escalar receita e base de clientes', description: 'Com PMF confirmado, acionamos o motor de crescimento: marketing, vendas e parcerias para escalar a base de clientes.', canvas: { objective: 'Escalar receita ARR e base de clientes de forma sustentável.', entryGate: 'PMF confirmado (H2.2).', exitGate: 'ARR > R$ 1M, base de clientes > 20.', artifacts: ['Playbook de vendas', 'Materiais de marketing', 'Partner program'], gateCriteria: ['ARR > R$ 1M', 'CAC payback < 12 meses', 'Base > 20 clientes'], team: ['Comercial', 'Marketing', 'CS', 'Product'], duration: 'Contínuo' }, gate: 'GATE_06: SUSTENTABILIDADE' },
];
