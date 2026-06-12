/**
 * ============================================
 * INOVACONNECT - CLASSES (PROGRAMAÇÃO ORIENTADA A OBJETOS)
 * ============================================
 * Este arquivo implementa o paradigma de POO em JavaScript
 * utilizando classes ES6+ com herança e encapsulamento.
 * 
 * Autores: Arthur Morales e Barbarha Monteiro
 * Disciplina: Engenharia de Software - 3º Semestre
 * ============================================
 */

// ============================================
// CLASSE BASE: USUARIO
// ============================================
/**
 * Classe abstrata que representa um usuário do sistema
 * Serve como base para as subclasses Estudante, Investidor e Empresa
 * @class Usuario
 */
class Usuario {
    // Atributos privados (encapsulamento)
    #id;
    #nome;
    #email;
    #tipo;
    #dataCadastro;

    /**
     * Construtor da classe Usuario
     * @param {number} id - Identificador único do usuário
     * @param {string} nome - Nome completo do usuário
     * @param {string} email - E-mail do usuário
     * @param {string} tipo - Tipo de usuário (estudante, investidor, empresa)
     */
    constructor(id, nome, email, tipo) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#tipo = tipo;
        this.#dataCadastro = new Date();
    }

    // Getters (métodos de acesso)
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get email() { return this.#email; }
    get tipo() { return this.#tipo; }
    get dataCadastro() { return this.#dataCadastro; }

    // Setters (métodos de modificação)
    set nome(novoNome) { this.#nome = novoNome; }
    set email(novoEmail) { this.#email = novoEmail; }

    // Métodos públicos
    /**
     * Retorna informações formatadas do usuário
     * @returns {string} Informações do usuário
     */
    obterInfo() {
        return `${this.#nome} (${this.#email}) - ${this.#tipo}`;
    }

    /**
     * Método que deve ser implementado pelas subclasses
     * @returns {string} Descrição do tipo de usuário
     */
    descreverTipo() {
        return `Usuário do tipo ${this.#tipo}`;
    }
}

// ============================================
// SUBCLASSE: ESTUDANTE
// ============================================
/**
 * Classe que representa um estudante cadastrado
 * Herda de Usuario e adiciona atributos específicos
 * @class Estudante
 * @extends Usuario
 */
class Estudante extends Usuario {
    #curso;
    #semestre;
    #universidade;
    #projetos;

    /**
     * Construtor da classe Estudante
     * @param {number} id - Identificador único
     * @param {string} nome - Nome do estudante
     * @param {string} email - E-mail institucional
     * @param {string} curso - Nome do curso
     * @param {number} semestre - Semestre atual
     * @param {string} universidade - Nome da universidade
     */
    constructor(id, nome, email, curso, semestre, universidade) {
        super(id, nome, email, 'estudante'); // Chamada ao construtor da classe pai
        this.#curso = curso;
        this.#semestre = semestre;
        this.#universidade = universidade;
        this.#projetos = [];
    }

    // Getters específicos
    get curso() { return this.#curso; }
    get semestre() { return this.#semestre; }
    get universidade() { return this.#universidade; }
    get projetos() { return [...this.#projetos]; }

    // Setters específicos
    set curso(novoCurso) { this.#curso = novoCurso; }
    set semestre(novoSemestre) { this.#semestre = novoSemestre; }

    // Métodos específicos
    /**
     * Adiciona um projeto ao estudante
     * @param {Projeto} projeto - Projeto a ser adicionado
     */
    adicionarProjeto(projeto) {
        this.#projetos.push(projeto);
    }

    /**
     * Remove um projeto do estudante
     * @param {number} projetoId - ID do projeto a remover
     */
    removerProjeto(projetoId) {
        this.#projetos = this.#projetos.filter(p => p.id !== projetoId);
    }

    /**
     * Sobrescrita do método da classe pai
     * @returns {string} Descrição específica do estudante
     */
    descreverTipo() {
        return `Estudante de ${this.#curso} - ${this.#semestre}º semestre na ${this.#universidade}`;
    }

    /**
     * Retorna informações completas do estudante
     * @returns {string} Informações formatadas
     */
    obterInfo() {
        return `${super.obterInfo()} | ${this.descreverTipo()} | Projetos: ${this.#projetos.length}`;
    }
}

// ============================================
// SUBCLASSE: INVESTIDOR
// ============================================
/**
 * Classe que representa um investidor
 * Herda de Usuario e adiciona atributos específicos
 * @class Investidor
 * @extends Usuario
 */
class Investidor extends Usuario {
    #empresa;
    #areaInteresse;
    #valorDisponivel;
    #investimentosRealizados;

    /**
     * Construtor da classe Investidor
     * @param {number} id - Identificador único
     * @param {string} nome - Nome do investidor
     * @param {string} email - E-mail corporativo
     * @param {string} empresa - Nome da empresa/venture capital
     * @param {Array} areaInteresse - Áreas de interesse
     * @param {number} valorDisponivel - Valor disponível para investimento
     */
    constructor(id, nome, email, empresa, areaInteresse, valorDisponivel) {
        super(id, nome, email, 'investidor');
        this.#empresa = empresa;
        this.#areaInteresse = areaInteresse;
        this.#valorDisponivel = valorDisponivel;
        this.#investimentosRealizados = [];
    }

    // Getters específicos
    get empresa() { return this.#empresa; }
    get areaInteresse() { return [...this.#areaInteresse]; }
    get valorDisponivel() { return this.#valorDisponivel; }
    get investimentosRealizados() { return [...this.#investimentosRealizados]; }

    // Setters específicos
    set valorDisponivel(novoValor) { this.#valorDisponivel = novoValor; }

    // Métodos específicos
    /**
     * Verifica se tem interesse em uma categoria
     * @param {string} categoria - Categoria do projeto
     * @returns {boolean} True se tiver interesse
     */
    temInteresse(categoria) {
        return this.#areaInteresse.includes(categoria);
    }

    /**
     * Realiza um investimento
     * @param {Projeto} projeto - Projeto a ser investido
     * @param {number} valor - Valor do investimento
     */
    investir(projeto, valor) {
        if (valor <= this.#valorDisponivel) {
            this.#valorDisponivel -= valor;
            this.#investimentosRealizados.push({ projeto, valor, data: new Date() });
            return true;
        }
        return false;
    }

    /**
     * Sobrescrita do método da classe pai
     * @returns {string} Descrição específica do investidor
     */
    descreverTipo() {
        return `Investidor da ${this.#empresa} | Áreas: ${this.#areaInteresse.join(', ')} | Disponível: R$ ${this.#valorDisponivel.toLocaleString()}`;
    }
}

// ============================================
// SUBCLASSE: EMPRESA
// ============================================
/**
 * Classe que representa uma empresa parceira
 * Herda de Usuario e adiciona atributos específicos
 * @class Empresa
 * @extends Usuario
 */
class Empresa extends Usuario {
    #cnpj;
    #setor;
    #parceriasAtivas;
    #tecnologiasInteresse;

    /**
     * Construtor da classe Empresa
     * @param {number} id - Identificador único
     * @param {string} nome - Nome da empresa
     * @param {string} email - E-mail corporativo
     * @param {string} cnpj - CNPJ da empresa
     * @param {string} setor - Setor de atuação
     * @param {Array} tecnologiasInteresse - Tecnologias de interesse
     */
    constructor(id, nome, email, cnpj, setor, tecnologiasInteresse) {
        super(id, nome, email, 'empresa');
        this.#cnpj = cnpj;
        this.#setor = setor;
        this.#parceriasAtivas = [];
        this.#tecnologiasInteresse = tecnologiasInteresse;
    }

    // Getters específicos
    get cnpj() { return this.#cnpj; }
    get setor() { return this.#setor; }
    get parceriasAtivas() { return [...this.#parceriasAtivas]; }
    get tecnologiasInteresse() { return [...this.#tecnologiasInteresse]; }

    // Métodos específicos
    /**
     * Adiciona uma parceria
     * @param {Projeto} projeto - Projeto parceiro
     */
    adicionarParceria(projeto) {
        this.#parceriasAtivas.push(projeto);
    }

    /**
     * Verifica compatibilidade com projeto
     * @param {Projeto} projeto - Projeto a verificar
     * @returns {boolean} True se for compatível
     */
    temCompatibilidade(projeto) {
        return this.#tecnologiasInteresse.some(tech => 
            projeto.categorias.some(cat => cat.toLowerCase().includes(tech.toLowerCase()))
        );
    }

    /**
     * Sobrescrita do método da classe pai
     * @returns {string} Descrição específica da empresa
     */
    descreverTipo() {
        return `Empresa do setor ${this.#setor} | CNPJ: ${this.#cnpj} | Parcerias: ${this.#parceriasAtivas.length}`;
    }
}

// ============================================
// CLASSE: PROJETO
// ============================================
/**
 * Classe que representa um projeto acadêmico
 * Contém todas as informações necessárias sobre um projeto
 * @class Projeto
 */
class Projeto {
    // Atributos privados
    #id;
    #titulo;
    #descricao;
    #categorias;
    #progresso;
    #autor;
    #dataCriacao;
    #status;
    #investimentoNecessario;
    #tecnologias;

    /**
     * Construtor da classe Projeto
     * @param {Object} params - Parâmetros do projeto
     */
    constructor({
        id,
        titulo,
        descricao,
        categorias,
        progresso = 0,
        autor,
        status = 'ativo',
        investimentoNecessario = 0,
        tecnologias = []
    }) {
        this.#id = id;
        this.#titulo = titulo;
        this.#descricao = descricao;
        this.#categorias = categorias;
        this.#progresso = Math.min(100, Math.max(0, progresso));
        this.#autor = autor;
        this.#dataCriacao = new Date();
        this.#status = status;
        this.#investimentoNecessario = investimentoNecessario;
        this.#tecnologias = tecnologias;
    }

    // Getters
    get id() { return this.#id; }
    get titulo() { return this.#titulo; }
    get descricao() { return this.#descricao; }
    get categorias() { return [...this.#categorias]; }
    get progresso() { return this.#progresso; }
    get autor() { return this.#autor; }
    get dataCriacao() { return this.#dataCriacao; }
    get status() { return this.#status; }
    get investimentoNecessario() { return this.#investimentoNecessario; }
    get tecnologias() { return [...this.#tecnologias]; }

    // Setters
    set titulo(novoTitulo) { this.#titulo = novoTitulo; }
    set descricao(novaDescricao) { this.#descricao = novaDescricao; }
    set progresso(novoProgresso) { 
        this.#progresso = Math.min(100, Math.max(0, novoProgresso)); 
    }
    set status(novoStatus) { this.#status = novoStatus; }

    // Métodos públicos
    /**
     * Atualiza o progresso do projeto
     * @param {number} incremento - Valor a incrementar
     */
    atualizarProgresso(incremento) {
        this.#progresso = Math.min(100, this.#progresso + incremento);
    }

    /**
     * Verifica se projeto está completo
     * @returns {boolean} True se progresso for 100%
     */
    estaCompleto() {
        return this.#progresso >= 100;
    }

    /**
     * Verifica se projeto tem categoria específica
     * @param {string} categoria - Categoria a verificar
     * @returns {boolean} True se tiver a categoria
     */
    temCategoria(categoria) {
        return this.#categorias.some(cat => 
            cat.toLowerCase().includes(categoria.toLowerCase())
        );
    }

    /**
     * Retorna resumo do projeto
     * @returns {string} Resumo formatado
     */
    obterResumo() {
        return `${this.#titulo} - ${this.#categorias.join(', ')} (${this.#progresso}%)`;
    }

    /**
     * Converte para objeto JSON
     * @returns {Object} Objeto serializável
     */
    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descricao: this.#descricao,
            categorias: this.#categorias,
            progresso: this.#progresso,
            autor: this.#autor,
            status: this.#status,
            investimentoNecessario: this.#investimentoNecessario,
            tecnologias: this.#tecnologias,
            dataCriacao: this.#dataCriacao.toISOString()
        };
    }

    /**
     * Cria projeto a partir de JSON
     * @param {Object} data - Dados do projeto
     * @returns {Projeto} Nova instância de Projeto
     */
    static fromJSON(data) {
        return new Projeto({
            id: data.id,
            titulo: data.titulo,
            descricao: data.descricao,
            categorias: data.categorias,
            progresso: data.progresso,
            autor: data.autor,
            status: data.status,
            investimentoNecessario: data.investimentoNecessario,
            tecnologias: data.tecnologias
        });
    }
}

// ============================================
// CLASSE: DASHBOARD
// ============================================
/**
 * Classe responsável por gerenciar a exibição do dashboard
 * @class Dashboard
 */
class Dashboard {
    #projetos;
    #elementoContainer;
    #filtroAtual;

    /**
     * Construtor da classe Dashboard
     * @param {Array} projetos - Lista de projetos
     * @param {string} seletorContainer - Seletor do container HTML
     */
    constructor(projetos = [], seletorContainer = '#projetos-container') {
        this.#projetos = projetos;
        this.#elementoContainer = document.querySelector(seletorContainer);
        this.#filtroAtual = 'todos';
    }

    // Getters
    get projetos() { return [...this.#projetos]; }
    get filtroAtual() { return this.#filtroAtual; }

    // Setters
    set filtroAtual(novoFiltro) { this.#filtroAtual = novoFiltro; }

    /**
     * Adiciona um projeto ao dashboard
     * @param {Projeto} projeto - Projeto a adicionar
     */
    adicionarProjeto(projeto) {
        this.#projetos.push(projeto);
        this.renderizar();
    }

    /**
     * Remove um projeto do dashboard
     * @param {number} projetoId - ID do projeto
     */
    removerProjeto(projetoId) {
        this.#projetos = this.#projetos.filter(p => p.id !== projetoId);
        this.renderizar();
    }

    /**
     * Filtra projetos por categoria
     * @param {string} categoria - Categoria para filtrar
     * @returns {Array} Projetos filtrados
     */
    filtrarPorCategoria(categoria) {
        this.#filtroAtual = categoria;
        if (categoria === 'todos') {
            return this.#projetos;
        }
        return this.#projetos.filter(p => p.temCategoria(categoria));
    }

    /**
     * Busca projetos por termo
     * @param {string} termo - Termo de busca
     * @returns {Array} Projetos encontrados
     */
    buscar(termo) {
        const termoLower = termo.toLowerCase();
        return this.#projetos.filter(p => 
            p.titulo.toLowerCase().includes(termoLower) ||
            p.descricao.toLowerCase().includes(termoLower) ||
            p.categorias.some(c => c.toLowerCase().includes(termoLower))
        );
    }

    /**
     * Renderiza os projetos no container HTML
     */
    renderizar() {
        if (!this.#elementoContainer) return;

        const projetosParaRenderizar = this.filtrarPorCategoria(this.#filtroAtual);
        
        this.#elementoContainer.innerHTML = projetosParaRenderizar.map(projeto => 
            this.criarCardProjeto(projeto)
        ).join('');

        // Adiciona eventos aos cards
        this.adicionarEventosCards();
    }

    /**
     * Cria HTML de um card de projeto
     * @param {Projeto} projeto - Projeto a renderizar
     * @returns {string} HTML do card
     */
    criarCardProjeto(projeto) {
        const categoriaPrincipal = projeto.categorias[0] || 'Geral';
        return `
            <div class="card animate-fade-in" data-projeto-id="${projeto.id}">
                <div class="card-header">
                    <span class="card-category">${categoriaPrincipal}</span>
                    <span style="color: var(--medium-gray); font-size: 0.85rem;">
                        <i class="fas fa-user"></i> ${projeto.autor}
                    </span>
                </div>
                <h3 class="card-title">${projeto.titulo}</h3>
                <p class="card-description">${projeto.descricao.substring(0, 100)}${projeto.descricao.length > 100 ? '...' : ''}</p>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Progresso</span>
                        <span>${projeto.progresso}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${projeto.progresso}%"></div>
                    </div>
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="abrirModalProjeto(${projeto.id})">
                    <i class="fas fa-eye"></i> Ver Detalhes
                </button>
            </div>
        `;
    }

    /**
     * Adiciona eventos de clique aos cards
     */
    adicionarEventosCards() {
        const cards = this.#elementoContainer.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const projetoId = parseInt(card.dataset.projetoId);
                    abrirModalProjeto(projetoId);
                }
            });
        });
    }

    /**
     * Obtém estatísticas dos projetos
     * @returns {Object} Estatísticas calculadas
     */
    obterEstatisticas() {
        const total = this.#projetos.length;
        const completados = this.#projetos.filter(p => p.estaCompleto()).length;
        const emAndamento = this.#projetos.filter(p => p.progresso > 0 && p.progresso < 100).length;
        const progressoMedio = this.#projetos.reduce((acc, p) => acc + p.progresso, 0) / (total || 1);

        // Contagem por categoria
        const categorias = {};
        this.#projetos.forEach(p => {
            p.categorias.forEach(cat => {
                categorias[cat] = (categorias[cat] || 0) + 1;
            });
        });

        return {
            total,
            completados,
            emAndamento,
            progressoMedio: Math.round(progressoMedio),
            categorias
        };
    }
}

// Exportar classes para uso global
window.Classes = {
    Usuario,
    Estudante,
    Investidor,
    Empresa,
    Projeto,
    Dashboard
};
