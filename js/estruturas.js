/**
 * ============================================
 * INOVACONNECT - ESTRUTURAS DE DADOS
 * ============================================
 * Este arquivo implementa estruturas de dados fundamentais:
 * - FILA (Queue): Para gerenciar projetos aguardando aprovação
 * - PILHA (Stack): Para histórico de visualizações
 * - LISTA ENCADEADA: Para organização de categorias
 * 
 * Autores: Arthur Morales e Barbarha Monteiro
 * Disciplina: Engenharia de Software - 3º Semestre
 * ============================================
 */

// ============================================
// ESTRUTURA 1: FILA (QUEUE)
// ============================================
/**
 * Implementação de uma FILA (FIFO - First In, First Out)
 * Usada para gerenciar projetos que aguardam aprovação
 * 
 * OPERAÇÕES:
 * - enqueue(): Adiciona elemento ao final da fila
 * - dequeue(): Remove elemento do início da fila
 * - peek(): Visualiza o primeiro elemento sem remover
 * - isEmpty(): Verifica se a fila está vazia
 * - size(): Retorna tamanho da fila
 * 
 * @class Fila
 */
class Fila {
    #elementos;
    #inicio;
    #fim;

    /**
     * Construtor da Fila
     */
    constructor() {
        this.#elementos = {};
        this.#inicio = 0;
        this.#fim = 0;
    }

    /**
     * Adiciona um elemento ao final da fila (enqueue)
     * @param {any} elemento - Elemento a ser adicionado
     */
    enqueue(elemento) {
        this.#elementos[this.#fim] = elemento;
        this.#fim++;
    }

    /**
     * Remove e retorna o elemento do início da fila (dequeue)
     * @returns {any|null} Elemento removido ou null se vazia
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const elemento = this.#elementos[this.#inicio];
        delete this.#elementos[this.#inicio];
        this.#inicio++;
        return elemento;
    }

    /**
     * Retorna o primeiro elemento sem remover (peek)
     * @returns {any|null} Primeiro elemento ou null
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.#elementos[this.#inicio];
    }

    /**
     * Verifica se a fila está vazia
     * @returns {boolean} True se vazia
     */
    isEmpty() {
        return this.#fim - this.#inicio === 0;
    }

    /**
     * Retorna o tamanho da fila
     * @returns {number} Quantidade de elementos
     */
    size() {
        return this.#fim - this.#inicio;
    }

    /**
     * Retorna todos os elementos da fila como array
     * @returns {Array} Array com elementos
     */
    toArray() {
        const array = [];
        for (let i = this.#inicio; i < this.#fim; i++) {
            array.push(this.#elementos[i]);
        }
        return array;
    }

    /**
     * Limpa a fila
     */
    clear() {
        this.#elementos = {};
        this.#inicio = 0;
        this.#fim = 0;
    }
}

// ============================================
// ESTRUTURA 2: PILHA (STACK)
// ============================================
/**
 * Implementação de uma PILHA (LIFO - Last In, First Out)
 * Usada para gerenciar histórico de visualizações de projetos
 * 
 * OPERAÇÕES:
 * - push(): Adiciona elemento ao topo da pilha
 * - pop(): Remove elemento do topo da pilha
 * - peek(): Visualiza o topo sem remover
 * - isEmpty(): Verifica se a pilha está vazia
 * - size(): Retorna tamanho da pilha
 * 
 * @class Pilha
 */
class Pilha {
    #elementos;

    /**
     * Construtor da Pilha
     */
    constructor() {
        this.#elementos = [];
    }

    /**
     * Adiciona um elemento ao topo da pilha (push)
     * @param {any} elemento - Elemento a ser adicionado
     */
    push(elemento) {
        this.#elementos.push(elemento);
    }

    /**
     * Remove e retorna o elemento do topo (pop)
     * @returns {any|null} Elemento removido ou null
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.#elementos.pop();
    }

    /**
     * Retorna o elemento do topo sem remover (peek)
     * @returns {any|null} Elemento do topo ou null
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.#elementos[this.#elementos.length - 1];
    }

    /**
     * Verifica se a pilha está vazia
     * @returns {boolean} True se vazia
     */
    isEmpty() {
        return this.#elementos.length === 0;
    }

    /**
     * Retorna o tamanho da pilha
     * @returns {number} Quantidade de elementos
     */
    size() {
        return this.#elementos.length;
    }

    /**
     * Retorna todos os elementos como array
     * @returns {Array} Array com elementos
     */
    toArray() {
        return [...this.#elementos];
    }

    /**
     * Limpa a pilha
     */
    clear() {
        this.#elementos = [];
    }
}

// ============================================
// ESTRUTURA 3: LISTA ENCADEADA
// ============================================
/**
 * Nó da Lista Encadeada
 * @class No
 */
class No {
    #dado;
    #proximo;

    /**
     * Construtor do Nó
     * @param {any} dado - Dado armazenado no nó
     */
    constructor(dado) {
        this.#dado = dado;
        this.#proximo = null;
    }

    // Getters e Setters
    get dado() { return this.#dado; }
    set dado(novoDado) { this.#dado = novoDado; }
    get proximo() { return this.#proximo; }
    set proximo(novoProximo) { this.#proximo = novoProximo; }
}

/**
 * Implementação de LISTA ENCADEADA SIMPLES
 * Usada para organizar categorias de projetos
 * 
 * OPERAÇÕES:
 * - inserirInicio(): Adiciona no início da lista
 * - inserirFim(): Adiciona no final da lista
 * - remover(): Remove um elemento específico
 * - buscar(): Busca um elemento
 * - tamanho(): Retorna tamanho da lista
 * - toArray(): Converte para array
 * 
 * @class ListaEncadeada
 */
class ListaEncadeada {
    #cabeca;
    #tamanho;

    /**
     * Construtor da Lista Encadeada
     */
    constructor() {
        this.#cabeca = null;
        this.#tamanho = 0;
    }

    /**
     * Insere um elemento no início da lista
     * @param {any} dado - Dado a ser inserido
     */
    inserirInicio(dado) {
        const novoNo = new No(dado);
        novoNo.proximo = this.#cabeca;
        this.#cabeca = novoNo;
        this.#tamanho++;
    }

    /**
     * Insere um elemento no final da lista
     * @param {any} dado - Dado a ser inserido
     */
    inserirFim(dado) {
        const novoNo = new No(dado);
        
        if (this.#cabeca === null) {
            this.#cabeca = novoNo;
        } else {
            let atual = this.#cabeca;
            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
        this.#tamanho++;
    }

    /**
     * Remove um elemento específico da lista
     * @param {any} dado - Dado a ser removido
     * @returns {boolean} True se removido com sucesso
     */
    remover(dado) {
        if (this.#cabeca === null) {
            return false;
        }

        // Se o elemento está na cabeça
        if (this.#cabeca.dado === dado) {
            this.#cabeca = this.#cabeca.proximo;
            this.#tamanho--;
            return true;
        }

        // Procurar o elemento
        let atual = this.#cabeca;
        while (atual.proximo !== null && atual.proximo.dado !== dado) {
            atual = atual.proximo;
        }

        if (atual.proximo === null) {
            return false;
        }

        atual.proximo = atual.proximo.proximo;
        this.#tamanho--;
        return true;
    }

    /**
     * Busca um elemento na lista
     * @param {any} dado - Dado a ser buscado
     * @returns {boolean} True se encontrado
     */
    buscar(dado) {
        let atual = this.#cabeca;
        while (atual !== null) {
            if (atual.dado === dado) {
                return true;
            }
            atual = atual.proximo;
        }
        return false;
    }

    /**
     * Retorna o tamanho da lista
     * @returns {number} Tamanho da lista
     */
    tamanho() {
        return this.#tamanho;
    }

    /**
     * Verifica se a lista está vazia
     * @returns {boolean} True se vazia
     */
    vazia() {
        return this.#tamanho === 0;
    }

    /**
     * Converte a lista para array
     * @returns {Array} Array com elementos
     */
    toArray() {
        const array = [];
        let atual = this.#cabeca;
        while (atual !== null) {
            array.push(atual.dado);
            atual = atual.proximo;
        }
        return array;
    }

    /**
     * Limpa a lista
     */
    limpar() {
        this.#cabeca = null;
        this.#tamanho = 0;
    }

    /**
     * Itera sobre todos os elementos
     * @param {Function} callback - Função chamada para cada elemento
     */
    forEach(callback) {
        let atual = this.#cabeca;
        let indice = 0;
        while (atual !== null) {
            callback(atual.dado, indice);
            atual = atual.proximo;
            indice++;
        }
    }
}

// ============================================
// GERENCIADOR DE ESTRUTURAS
// ============================================
/**
 * Classe que gerencia todas as estruturas de dados do sistema
 * @class GerenciadorEstruturas
 */
class GerenciadorEstruturas {
    #filaAprovacao;
    #historicoVisualizacoes;
    #listaCategorias;

    /**
     * Construtor do Gerenciador
     */
    constructor() {
        // FILA: Projetos aguardando aprovação
        this.#filaAprovacao = new Fila();
        
        // PILHA: Histórico de visualizações (últimos projetos vistos)
        this.#historicoVisualizacoes = new Pilha();
        
        // LISTA ENCADEADA: Categorias organizadas
        this.#listaCategorias = new ListaEncadeada();
        
        // Inicializa categorias padrão
        this.inicializarCategorias();
    }

    /**
     * Inicializa categorias padrão na lista encadeada
     */
    inicializarCategorias() {
        const categoriasPadrao = [
            'Tecnologia',
            'Sustentabilidade', 
            'Inteligência Artificial',
            'IoT',
            'Saúde',
            'Educação',
            'Agronegócio',
            'Energia'
        ];
        
        categoriasPadrao.forEach(cat => {
            this.#listaCategorias.inserirFim(cat);
        });
    }

    // ========================================
    // MÉTODOS DA FILA DE APROVAÇÃO
    // ========================================
    
    /**
     * Adiciona projeto à fila de aprovação
     * @param {Projeto} projeto - Projeto a ser aprovado
     */
    adicionarAprovacao(projeto) {
        this.#filaAprovacao.enqueue({
            projeto: projeto,
            dataSolicitacao: new Date()
        });
    }

    /**
     * Processa próximo projeto da fila de aprovação
     * @returns {Object|null} Projeto processado ou null
     */
    processarAprovacao() {
        return this.#filaAprovacao.dequeue();
    }

    /**
     * Visualiza próximo projeto sem remover da fila
     * @returns {Object|null} Próximo projeto ou null
     */
    proximoAprovacao() {
        return this.#filaAprovacao.peek();
    }

    /**
     * Retorna quantidade de projetos aguardando aprovação
     * @returns {number} Quantidade na fila
     */
    quantidadeAprovacao() {
        return this.#filaAprovacao.size();
    }

    // ========================================
    // MÉTODOS DO HISTÓRICO DE VISUALIZAÇÕES
    // ========================================
    
    /**
     * Adiciona projeto ao histórico de visualizações
     * @param {number} projetoId - ID do projeto visualizado
     */
    adicionarVisualizacao(projetoId) {
        this.#historicoVisualizacoes.push({
            projetoId: projetoId,
            dataVisualizacao: new Date()
        });
        
        // Mantém apenas as últimas 10 visualizações
        while (this.#historicoVisualizacoes.size() > 10) {
            // Remove a visualização mais antiga (que está no fundo da pilha)
            // Para isso, precisamos inverter temporariamente
            const temp = new Pilha();
            while (!this.#historicoVisualizacoes.isEmpty()) {
                temp.push(this.#historicoVisualizacoes.pop());
            }
            temp.pop(); // Remove o mais antigo
            while (!temp.isEmpty()) {
                this.#historicoVisualizacoes.push(temp.pop());
            }
        }
    }

    /**
     * Retorna última visualização
     * @returns {Object|null} Última visualização ou null
     */
    ultimaVisualizacao() {
        return this.#historicoVisualizacoes.peek();
    }

    /**
     * Retorna todo o histórico
     * @returns {Array} Array de visualizações
     */
    obterHistorico() {
        return this.#historicoVisualizacoes.toArray();
    }

    // ========================================
    // MÉTODOS DA LISTA DE CATEGORIAS
    // ========================================
    
    /**
     * Adiciona nova categoria
     * @param {string} categoria - Nome da categoria
     */
    adicionarCategoria(categoria) {
        if (!this.#listaCategorias.buscar(categoria)) {
            this.#listaCategorias.inserirFim(categoria);
        }
    }

    /**
     * Remove categoria
     * @param {string} categoria - Nome da categoria
     * @returns {boolean} True se removida
     */
    removerCategoria(categoria) {
        return this.#listaCategorias.remover(categoria);
    }

    /**
     * Verifica se categoria existe
     * @param {string} categoria - Nome da categoria
     * @returns {boolean} True se existe
     */
    categoriaExiste(categoria) {
        return this.#listaCategorias.buscar(categoria);
    }

    /**
     * Retorna todas as categorias
     * @returns {Array} Array de categorias
     */
    obterCategorias() {
        return this.#listaCategorias.toArray();
    }

    /**
     * Retorna quantidade de categorias
     * @returns {number} Quantidade de categorias
     */
    quantidadeCategorias() {
        return this.#listaCategorias.tamanho();
    }

    // ========================================
    // MÉTODOS GERAIS
    // ========================================
    
    /**
     * Exporta estado das estruturas para JSON
     * @returns {Object} Estado serializado
     */
    toJSON() {
        return {
            filaAprovacao: this.#filaAprovacao.toArray(),
            historicoVisualizacoes: this.#historicoVisualizacoes.toArray(),
            categorias: this.#listaCategorias.toArray()
        };
    }

    /**
     * Obtém resumo das estruturas
     * @returns {Object} Resumo estatístico
     */
    obterResumo() {
        return {
            filaAprovacao: {
                tamanho: this.#filaAprovacao.size(),
                vazia: this.#filaAprovacao.isEmpty()
            },
            historicoVisualizacoes: {
                tamanho: this.#historicoVisualizacoes.size(),
                vazia: this.#historicoVisualizacoes.isEmpty()
            },
            categorias: {
                quantidade: this.#listaCategorias.tamanho(),
                lista: this.#listaCategorias.toArray()
            }
        };
    }
}

// Exportar estruturas para uso global
window.Estruturas = {
    Fila,
    Pilha,
    No,
    ListaEncadeada,
    GerenciadorEstruturas
};

// Criar instância global do gerenciador
window.gerenciadorEstruturas = new GerenciadorEstruturas();
