/**
 * ============================================
 * INOVACONNECT - DADOS MOCK (EXEMPLO)
 * ============================================
 * Este arquivo contém dados de exemplo para demonstração
 * do sistema. Inclui projetos pré-cadastrados, usuários
 * e configurações.
 * 
 * Autores: Arthur Morales e Barbarha Monteiro
 * Disciplina: Engenharia de Software - 3º Semestre
 * ============================================
 */

// ============================================
// PROJETOS DE EXEMPLO
// ============================================
/**
 * Lista de projetos acadêmicos pré-cadastrados
 * Cada projeto segue a estrutura da classe Projeto
 */
const projetosMock = [
    {
        id: 1,
        titulo: "SmartFarm - Agricultura de Precisão com IoT",
        descricao: "Sistema inteligente de monitoramento agrícola utilizando sensores IoT para otimizar irrigação, detectar pragas e aumentar produtividade. A solução utiliza machine learning para análise preditiva de safras.",
        categorias: ["IoT", "Agronegócio", "Sustentabilidade"],
        progresso: 75,
        autor: "Ana Silva",
        status: "ativo",
        investimentoNecessario: 150000,
        tecnologias: ["Arduino", "Python", "TensorFlow", "MQTT"]
    },
    {
        id: 2,
        titulo: "EcoEnergy - Painéis Solares Inteligentes",
        descricao: "Desenvolvimento de painéis solares com sistema de rastreamento automático do sol e limpeza autônoma. A tecnologia aumenta em 30% a eficiência energética comparado a painéis convencionais.",
        categorias: ["Sustentabilidade", "Energia", "Tecnologia"],
        progresso: 60,
        autor: "Carlos Mendes",
        status: "ativo",
        investimentoNecessario: 250000,
        tecnologias: ["Energia Solar", "Automação", "Sensores"]
    },
    {
        id: 3,
        titulo: "HealthAI - Diagnóstico por Imagem com IA",
        descricao: "Plataforma de diagnóstico médico auxiliado por inteligência artificial para detecção precoce de doenças em exames de imagem. Foco inicial em radiografias de tórax e mamografias.",
        categorias: ["Inteligência Artificial", "Saúde", "Tecnologia"],
        progresso: 85,
        autor: "Dra. Fernanda Costa",
        status: "ativo",
        investimentoNecessario: 500000,
        tecnologias: ["Deep Learning", "Python", "TensorFlow", "DICOM"]
    },
    {
        id: 4,
        titulo: "EduConnect - Plataforma de Ensino Adaptativo",
        descricao: "Sistema de educação personalizada que utiliza algoritmos de IA para adaptar o conteúdo ao ritmo de aprendizado de cada aluno. Inclui gamificação e análise de desempenho em tempo real.",
        categorias: ["Educação", "Inteligência Artificial", "Tecnologia"],
        progresso: 45,
        autor: "Prof. Roberto Santos",
        status: "ativo",
        investimentoNecessario: 180000,
        tecnologias: ["React", "Node.js", "Machine Learning", "MongoDB"]
    },
    {
        id: 5,
        titulo: "GreenLogistics - Roteirização Sustentável",
        descricao: "Algoritmo de otimização de rotas de entrega que minimiza emissões de carbono e custos operacionais. Considera tráfego, tipo de veículo e prioridades de entrega.",
        categorias: ["Sustentabilidade", "Tecnologia", "IoT"],
        progresso: 90,
        autor: "Marina Oliveira",
        status: "ativo",
        investimentoNecessario: 120000,
        tecnologias: ["Algoritmos Genéticos", "GPS", "APIs de Tráfego"]
    },
    {
        id: 6,
        titulo: "SafeCity - Monitoramento Urbano Inteligente",
        descricao: "Sistema de segurança pública utilizando câmeras com visão computacional para detectar situações de risco em tempo real. Integração com órgãos de segurança.",
        categorias: ["Tecnologia", "Inteligência Artificial", "IoT"],
        progresso: 55,
        autor: "João Pereira",
        status: "ativo",
        investimentoNecessario: 350000,
        tecnologias: ["Visão Computacional", "YOLO", "Edge Computing"]
    },
    {
        id: 7,
        titulo: "AquaPure - Purificação de Água com Nanotecnologia",
        descricao: "Filtro de água portátil utilizando membranas de nanotecnologia para remover contaminantes e microplásticos. Solução de baixo custo para comunidades carentes.",
        categorias: ["Sustentabilidade", "Saúde", "Tecnologia"],
        progresso: 70,
        autor: "Dra. Patricia Lima",
        status: "ativo",
        investimentoNecessario: 200000,
        tecnologias: ["Nanotecnologia", "Materiais Avançados"]
    },
    {
        id: 8,
        titulo: "AgroBot - Robô para Colheita Automatizada",
        descricao: "Robô autônomo para colheita de frutas delicadas utilizando braços robóticos com sensores de força e visão computacional. Reduz perdas e aumenta eficiência.",
        categorias: ["IoT", "Agronegócio", "Tecnologia"],
        progresso: 40,
        autor: "Eng. Lucas Ferreira",
        status: "ativo",
        investimentoNecessario: 400000,
        tecnologias: ["Robótica", "ROS", "Visão Computacional", "IoT"]
    }
];

// ============================================
// USUÁRIOS DE EXEMPLO
// ============================================

/**
 * Estudantes cadastrados (exemplo)
 */
const estudantesMock = [
    {
        id: 1,
        nome: "Ana Silva",
        email: "ana.silva@universidade.edu.br",
        curso: "Engenharia de Software",
        semestre: 7,
        universidade: "Universidade Federal de Tecnologia"
    },
    {
        id: 2,
        nome: "Carlos Mendes",
        email: "carlos.mendes@universidade.edu.br",
        curso: "Engenharia de Energia",
        semestre: 8,
        universidade: "Universidade Federal de Tecnologia"
    },
    {
        id: 3,
        nome: "Marina Oliveira",
        email: "marina.oliveira@universidade.edu.br",
        curso: "Ciência da Computação",
        semestre: 6,
        universidade: "Universidade Federal de Tecnologia"
    }
];

/**
 * Investidores cadastrados (exemplo)
 */
const investidoresMock = [
    {
        id: 1,
        nome: "Venture Capital Tech",
        email: "contato@vc-tech.com.br",
        empresa: "VC Tech Partners",
        areaInteresse: ["Tecnologia", "Inteligência Artificial", "IoT"],
        valorDisponivel: 2000000
    },
    {
        id: 2,
        nome: "Green Fund",
        email: "invest@greenfund.com.br",
        empresa: "Green Investment Fund",
        areaInteresse: ["Sustentabilidade", "Energia", "Agronegócio"],
        valorDisponivel: 1500000
    },
    {
        id: 3,
        nome: "Health Ventures",
        email: "contato@healthventures.com.br",
        empresa: "Health Ventures Capital",
        areaInteresse: ["Saúde", "Inteligência Artificial", "Tecnologia"],
        valorDisponivel: 3000000
    }
];

/**
 * Empresas parceiras (exemplo)
 */
const empresasMock = [
    {
        id: 1,
        nome: "TechCorp Brasil",
        email: "parcerias@techcorp.com.br",
        cnpj: "12.345.678/0001-90",
        setor: "Tecnologia da Informação",
        tecnologiasInteresse: ["IA", "IoT", "Cloud"]
    },
    {
        id: 2,
        nome: "EcoSolutions",
        email: "contato@ecosolutions.com.br",
        cnpj: "98.765.432/0001-10",
        setor: "Sustentabilidade",
        tecnologiasInteresse: ["Energia Renovável", "Reciclagem"]
    },
    {
        id: 3,
        nome: "AgroTech Industries",
        email: "inovacao@agrotech.com.br",
        cnpj: "11.222.333/0001-44",
        setor: "Agronegócio",
        tecnologiasInteresse: ["IoT", "Automação", "Drones"]
    }
];

// ============================================
// ESTATÍSTICAS DO SISTEMA
// ============================================
const estatisticasSistema = {
    projetosCadastrados: 47,
    investidoresAtivos: 23,
    empresasParceiras: 15,
    parceriasRealizadas: 12,
    valorTotalInvestido: 4500000,
    universidades: 8
};

// ============================================
// CATEGORIAS DISPONÍVEIS
// ============================================
const categoriasDisponiveis = [
    "Tecnologia",
    "Sustentabilidade",
    "Inteligência Artificial",
    "IoT",
    "Saúde",
    "Educação",
    "Agronegócio",
    "Energia"
];

// ============================================
// FUNÇÕES DE UTILIDADE PARA DADOS
// ============================================

/**
 * Converte dados mock em instâncias da classe Projeto
 * @returns {Array} Array de objetos Projeto
 */
function criarProjetosInstancias() {
    const { Projeto } = window.Classes;
    return projetosMock.map(dados => Projeto.fromJSON(dados));
}

/**
 * Cria instâncias de Estudante
 * @returns {Array} Array de objetos Estudante
 */
function criarEstudantesInstancias() {
    const { Estudante } = window.Classes;
    return estudantesMock.map(dados => 
        new Estudante(
            dados.id,
            dados.nome,
            dados.email,
            dados.curso,
            dados.semestre,
            dados.universidade
        )
    );
}

/**
 * Cria instâncias de Investidor
 * @returns {Array} Array de objetos Investidor
 */
function criarInvestidoresInstancias() {
    const { Investidor } = window.Classes;
    return investidoresMock.map(dados =>
        new Investidor(
            dados.id,
            dados.nome,
            dados.email,
            dados.empresa,
            dados.areaInteresse,
            dados.valorDisponivel
        )
    );
}

/**
 * Cria instâncias de Empresa
 * @returns {Array} Array de objetos Empresa
 */
function criarEmpresasInstancias() {
    const { Empresa } = window.Classes;
    return empresasMock.map(dados =>
        new Empresa(
            dados.id,
            dados.nome,
            dados.email,
            dados.cnpj,
            dados.setor,
            dados.tecnologiasInteresse
        )
    );
}

/**
 * Formata valor monetário
 * @param {number} valor - Valor a formatar
 * @returns {string} Valor formatado
 */
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

/**
 * Formata data
 * @param {Date} data - Data a formatar
 * @returns {string} Data formatada
 */
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

/**
 * Obtém ícone para categoria
 * @param {string} categoria - Nome da categoria
 * @returns {string} Classe do ícone Font Awesome
 */
function getIconeCategoria(categoria) {
    const icones = {
        'Tecnologia': 'fa-microchip',
        'Sustentabilidade': 'fa-leaf',
        'Inteligência Artificial': 'fa-brain',
        'IoT': 'fa-wifi',
        'Saúde': 'fa-heartbeat',
        'Educação': 'fa-graduation-cap',
        'Agronegócio': 'fa-tractor',
        'Energia': 'fa-bolt'
    };
    return icones[categoria] || 'fa-folder';
}

// Exportar dados para uso global
window.Dados = {
    projetosMock,
    estudantesMock,
    investidoresMock,
    empresasMock,
    estatisticasSistema,
    categoriasDisponiveis,
    criarProjetosInstancias,
    criarEstudantesInstancias,
    criarInvestidoresInstancias,
    criarEmpresasInstancias,
    formatarMoeda,
    formatarData,
    getIconeCategoria
};
