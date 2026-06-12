/**
 * ============================================
 * INOVACONNECT - LÓGICA PRINCIPAL
 * ============================================
 * Este arquivo contém a lógica principal da aplicação,
 * incluindo inicialização, manipulação de DOM, eventos,
 * modais e integração com LocalStorage.
 * 
 * Autores: Arthur Morales e Barbarha Monteiro
 * Disciplina: Engenharia de Software - 3º Semestre
 * ============================================
 */

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================
let projetos = [];
let dashboard = null;
let modalAberto = false;

// ============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================

/**
 * Inicializa a aplicação quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 InovaConnect - Iniciando aplicação...');
    
    // Carregar projetos do LocalStorage ou usar mock data
    carregarProjetos();
    
    // Inicializar componentes baseados na página atual
    inicializarPorPagina();
    
    // Configurar menu mobile
    configurarMenuMobile();
    
    // Configurar animações de scroll
    configurarAnimacoesScroll();
    
    console.log('✅ Aplicação inicializada com sucesso!');
});

/**
 * Carrega projetos do LocalStorage ou usa dados mock
 */
function carregarProjetos() {
    const { Projeto } = window.Classes;
    const { criarProjetosInstancias } = window.Dados;
    
    const projetosSalvos = localStorage.getItem('inovaconnect_projetos');
    
    if (projetosSalvos) {
        const dados = JSON.parse(projetosSalvos);
        projetos = dados.map(d => Projeto.fromJSON(d));
        console.log(`📦 ${projetos.length} projetos carregados do LocalStorage`);
    } else {
        projetos = criarProjetosInstancias();
        console.log(`📦 ${projetos.length} projetos carregados do mock data`);
    }
}

/**
 * Salva projetos no LocalStorage
 */
function salvarProjetos() {
    const dados = projetos.map(p => p.toJSON());
    localStorage.setItem('inovaconnect_projetos', JSON.stringify(dados));
    console.log('💾 Projetos salvos no LocalStorage');
}

/**
 * Inicializa componentes específicos de cada página
 */
function inicializarPorPagina() {
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
    
    console.log(`📄 Página atual: ${paginaAtual}`);
    
    switch(paginaAtual) {
        case 'index.html':
        case '':
            inicializarHome();
            break;
        case 'dashboard.html':
            inicializarDashboard();
            break;
        case 'projetos.html':
            inicializarProjetos();
            break;
        case 'sobre.html':
            inicializarSobre();
            break;
    }
}

// ============================================
// INICIALIZAÇÃO - HOME (INDEX.HTML)
// ============================================

/**
 * Inicializa a página inicial
 */
function inicializarHome() {
    // Atualizar estatísticas
    atualizarEstatisticasHome();
    
    // Adicionar animação aos números
    animarNumeros();
}

/**
 * Atualiza as estatísticas na home page
 */
function atualizarEstatisticasHome() {
    const { estatisticasSistema } = window.Dados;
    
    const statsElements = {
        'stat-projetos': estatisticasSistema.projetosCadastrados,
        'stat-investidores': estatisticasSistema.investidoresAtivos,
        'stat-empresas': estatisticasSistema.empresasParceiras,
        'stat-parcerias': estatisticasSistema.parceriasRealizadas
    };
    
    Object.entries(statsElements).forEach(([id, valor]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = valor;
        }
    });
}

/**
 * Anima os números das estatísticas
 */
function animarNumeros() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// ============================================
// INICIALIZAÇÃO - DASHBOARD
// ============================================

/**
 * Inicializa a página de dashboard
 */
function inicializarDashboard() {
    const { Dashboard } = window.Classes;
    
    // Criar instância do dashboard
    dashboard = new Dashboard(projetos, '#projetos-container');
    
    // Renderizar projetos
    dashboard.renderizar();
    
    // Configurar filtros
    configurarFiltros();
    
    // Configurar gráfico
    renderizarGrafico();
    
    // Configurar modal de novo projeto
    configurarModalNovoProjeto();
    
    // Configurar botão de adicionar à fila
    configurarFilaAprovacao();
}

/**
 * Configura os botões de filtro
 */
function configurarFiltros() {
    const { categoriasDisponiveis } = window.Dados;
    const filtrosContainer = document.getElementById('filtros-categorias');
    
    if (!filtrosContainer) return;
    
    // Botão "Todos"
    let html = `<button class="filter-btn active" data-categoria="todos">Todos</button>`;
    
    // Botões de categorias
    categoriasDisponiveis.forEach(categoria => {
        html += `<button class="filter-btn" data-categoria="${categoria}">${categoria}</button>`;
    });
    
    filtrosContainer.innerHTML = html;
    
    // Adicionar eventos
    filtrosContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos
            filtrosContainer.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active')
            );
            
            // Adicionar active ao clicado
            btn.classList.add('active');
            
            // Filtrar projetos
            const categoria = btn.dataset.categoria;
            if (dashboard) {
                dashboard.filtroAtual = categoria;
                dashboard.renderizar();
            }
        });
    });
}

/**
 * Renderiza o gráfico de categorias
 */
function renderizarGrafico() {
    const graficoContainer = document.getElementById('grafico-categorias');
    if (!graficoContainer) return;
    
    // Contar projetos por categoria
    const contagemCategorias = {};
    projetos.forEach(projeto => {
        projeto.categorias.forEach(cat => {
            contagemCategorias[cat] = (contagemCategorias[cat] || 0) + 1;
        });
    });
    
    // Encontrar máximo para escala
    const maxValor = Math.max(...Object.values(contagemCategorias), 1);
    
    // Gerar HTML do gráfico
    let html = '<div class="chart-bars">';
    
    Object.entries(contagemCategorias).slice(0, 6).forEach(([categoria, valor]) => {
        const altura = (valor / maxValor) * 150; // Altura máxima de 150px
        html += `
            <div class="chart-bar">
                <span class="chart-bar-value">${valor}</span>
                <div class="chart-bar-fill" style="height: ${altura}px"></div>
                <span class="chart-bar-label">${categoria.substring(0, 8)}</span>
            </div>
        `;
    });
    
    html += '</div>';
    graficoContainer.innerHTML = html;
}

/**
 * Configura o modal de novo projeto
 */
function configurarModalNovoProjeto() {
    const btnNovoProjeto = document.getElementById('btn-novo-projeto');
    const modalNovo = document.getElementById('modal-novo-projeto');
    const btnFecharNovo = document.getElementById('btn-fechar-novo-projeto');
    const btnCancelarNovo = document.getElementById('btn-cancelar-novo');
    const btnSalvarNovo = document.getElementById('btn-salvar-novo');
    
    if (!btnNovoProjeto || !modalNovo) return;
    
    // Abrir modal
    btnNovoProjeto.addEventListener('click', () => {
        modalNovo.classList.add('active');
        modalAberto = true;
    });
    
    // Fechar modal
    const fecharModal = () => {
        modalNovo.classList.remove('active');
        modalAberto = false;
        limparFormularioNovoProjeto();
    };
    
    btnFecharNovo?.addEventListener('click', fecharModal);
    btnCancelarNovo?.addEventListener('click', fecharModal);
    
    // Salvar novo projeto
    btnSalvarNovo?.addEventListener('click', salvarNovoProjeto);
    
    // Fechar ao clicar fora
    modalNovo.addEventListener('click', (e) => {
        if (e.target === modalNovo) {
            fecharModal();
        }
    });
}

/**
 * Limpa o formulário de novo projeto
 */
function limparFormularioNovoProjeto() {
    const form = document.getElementById('form-novo-projeto');
    if (form) {
        form.reset();
    }
}

/**
 * Salva um novo projeto
 */
function salvarNovoProjeto() {
    const { Projeto } = window.Classes;
    const { gerenciadorEstruturas } = window;
    
    const titulo = document.getElementById('novo-titulo')?.value;
    const descricao = document.getElementById('novo-descricao')?.value;
    const categorias = document.getElementById('novo-categorias')?.value;
    const autor = document.getElementById('novo-autor')?.value;
    const progresso = parseInt(document.getElementById('novo-progresso')?.value) || 0;
    const investimento = parseFloat(document.getElementById('novo-investimento')?.value) || 0;
    
    if (!titulo || !descricao || !autor) {
        mostrarToast('Preencha todos os campos obrigatórios!', 'error');
        return;
    }
    
    // Criar novo projeto
    const novoId = Math.max(...projetos.map(p => p.id), 0) + 1;
    const novoProjeto = new Projeto({
        id: novoId,
        titulo,
        descricao,
        categorias: categorias ? categorias.split(',').map(c => c.trim()) : ['Geral'],
        progresso,
        autor,
        investimentoNecessario: investimento
    });
    
    // Adicionar à fila de aprovação (demonstrando uso da estrutura de dados FILA)
    gerenciadorEstruturas.adicionarAprovacao(novoProjeto);
    
    // Adicionar aos projetos
    projetos.push(novoProjeto);
    salvarProjetos();
    
    // Atualizar dashboard
    if (dashboard) {
        dashboard.adicionarProjeto(novoProjeto);
    }
    
    // Fechar modal
    document.getElementById('modal-novo-projeto')?.classList.remove('active');
    modalAberto = false;
    
    // Mostrar feedback
    mostrarToast('Projeto enviado para aprovação!', 'success');
    
    // Atualizar contador da fila
    atualizarContadorFila();
}

/**
 * Configura funcionalidades da fila de aprovação
 */
function configurarFilaAprovacao() {
    atualizarContadorFila();
    
    const btnProcessarFila = document.getElementById('btn-processar-fila');
    if (btnProcessarFila) {
        btnProcessarFila.addEventListener('click', processarFilaAprovacao);
    }
}

/**
 * Atualiza o contador da fila de aprovação
 */
function atualizarContadorFila() {
    const { gerenciadorEstruturas } = window;
    const contador = document.getElementById('fila-aprovacao-contador');
    
    if (contador) {
        const quantidade = gerenciadorEstruturas.quantidadeAprovacao();
        contador.textContent = quantidade;
        
        if (quantidade > 0) {
            contador.parentElement.style.display = 'flex';
        }
    }
}

/**
 * Processa próximo item da fila de aprovação
 */
function processarFilaAprovacao() {
    const { gerenciadorEstruturas } = window;
    
    const item = gerenciadorEstruturas.processarAprovacao();
    
    if (item) {
        mostrarToast(`Projeto "${item.projeto.titulo}" aprovado!`, 'success');
        atualizarContadorFila();
        
        // Re-renderizar dashboard
        if (dashboard) {
            dashboard.renderizar();
        }
    } else {
        mostrarToast('Não há projetos na fila de aprovação', 'error');
    }
}

// ============================================
// INICIALIZAÇÃO - PROJETOS
// ============================================

/**
 * Inicializa a página de projetos
 */
function inicializarProjetos() {
    const { Dashboard } = window.Classes;
    
    // Criar dashboard
    dashboard = new Dashboard(projetos, '#lista-projetos');
    
    // Renderizar
    dashboard.renderizar();
    
    // Configurar busca
    configurarBusca();
    
    // Configurar filtros
    configurarFiltros();
}

/**
 * Configura a busca de projetos
 */
function configurarBusca() {
    const searchInput = document.getElementById('search-projetos');
    
    if (!searchInput) return;
    
    let timeout = null;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            const termo = e.target.value;
            
            if (dashboard) {
                const resultados = dashboard.buscar(termo);
                renderizarResultadosBusca(resultados);
            }
        }, 300); // Debounce de 300ms
    });
}

/**
 * Renderiza resultados da busca
 * @param {Array} resultados - Projetos encontrados
 */
function renderizarResultadosBusca(resultados) {
    const container = document.getElementById('lista-projetos');
    if (!container) return;
    
    if (resultados.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--medium-gray);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Nenhum projeto encontrado</p>
            </div>
        `;
        return;
    }
    
    const { Dashboard } = window.Classes;
    const dashboardTemp = new Dashboard(resultados);
    
    container.innerHTML = resultados.map(projeto => 
        dashboardTemp.criarCardProjeto(projeto)
    ).join('');
    
    // Re-adicionar eventos
    const cards = container.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                const projetoId = parseInt(card.dataset.projetoId);
                abrirModalProjeto(projetoId);
            }
        });
    });
}

// ============================================
// INICIALIZAÇÃO - SOBRE
// ============================================

/**
 * Inicializa a página sobre
 */
function inicializarSobre() {
    // Animação de fade-in nos elementos
    const sections = document.querySelectorAll('.sobre-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// MODAL DE DETALHES DO PROJETO
// ============================================

/**
 * Abre modal com detalhes do projeto
 * @param {number} projetoId - ID do projeto
 */
function abrirModalProjeto(projetoId) {
    const { gerenciadorEstruturas } = window;
    
    const projeto = projetos.find(p => p.id === projetoId);
    if (!projeto) return;
    
    // Adicionar ao histórico de visualizações (demonstrando PILHA)
    gerenciadorEstruturas.adicionarVisualizacao(projetoId);
    
    const modal = document.getElementById('modal-detalhes-projeto');
    if (!modal) return;
    
    // Preencher dados do modal
    document.getElementById('modal-projeto-titulo').textContent = projeto.titulo;
    document.getElementById('modal-projeto-categoria').textContent = projeto.categorias.join(', ');
    document.getElementById('modal-projeto-descricao').textContent = projeto.descricao;
    document.getElementById('modal-projeto-autor').textContent = projeto.autor;
    document.getElementById('modal-projeto-progresso').textContent = `${projeto.progresso}%`;
    document.getElementById('modal-projeto-progresso-bar').style.width = `${projeto.progresso}%`;
    document.getElementById('modal-projeto-investimento').textContent = 
        window.Dados.formatarMoeda(projeto.investimentoNecessario);
    
    // Tecnologias
    const tecnologiasContainer = document.getElementById('modal-projeto-tecnologias');
    if (tecnologiasContainer && projeto.tecnologias.length > 0) {
        tecnologiasContainer.innerHTML = projeto.tecnologias
            .map(tech => `<span class="card-category">${tech}</span>`)
            .join('');
        tecnologiasContainer.parentElement.style.display = 'block';
    } else if (tecnologiasContainer) {
        tecnologiasContainer.parentElement.style.display = 'none';
    }
    
    // Status
    const statusElement = document.getElementById('modal-projeto-status');
    if (statusElement) {
        statusElement.textContent = projeto.status.charAt(0).toUpperCase() + projeto.status.slice(1);
        statusElement.style.color = projeto.status === 'ativo' ? 'var(--sustainable-green)' : 'var(--medium-gray)';
    }
    
    // Mostrar modal
    modal.classList.add('active');
    modalAberto = true;
    
    // Configurar botões
    configurarModalDetalhes(projeto);
}

/**
 * Configura botões do modal de detalhes
 * @param {Projeto} projeto - Projeto atual
 */
function configurarModalDetalhes(projeto) {
    const modal = document.getElementById('modal-detalhes-projeto');
    const btnFechar = document.getElementById('btn-fechar-detalhes');
    const btnInteresse = document.getElementById('btn-tenho-interesse');
    
    btnFechar?.addEventListener('click', () => {
        modal.classList.remove('active');
        modalAberto = false;
    });
    
    btnInteresse?.addEventListener('click', () => {
        mostrarToast('Interesse registrado! Entraremos em contato.', 'success');
        modal.classList.remove('active');
        modalAberto = false;
    });
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalAberto = false;
        }
    });
}

// ============================================
// MENU MOBILE
// ============================================

/**
 * Configura o menu mobile
 */
function configurarMenuMobile() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================

/**
 * Configura animações ao fazer scroll
 */
function configurarAnimacoesScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card, .stat-card, .ods-content').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// SISTEMA DE TOAST (NOTIFICAÇÕES)
// ============================================

/**
 * Mostra notificação toast
 * @param {string} mensagem - Mensagem a exibir
 * @param {string} tipo - Tipo: 'success', 'error' ou 'info'
 */
function mostrarToast(mensagem, tipo = 'info') {
    // Remover toast existente
    const toastExistente = document.querySelector('.toast');
    if (toastExistente) {
        toastExistente.remove();
    }
    
    // Criar novo toast
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensagem;
    
    document.body.appendChild(toast);
    
    // Mostrar
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Esconder após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// FUNÇÕES GLOBAIS EXPORTADAS
// ============================================

// Tornar funções acessíveis globalmente para eventos HTML
window.abrirModalProjeto = abrirModalProjeto;
window.mostrarToast = mostrarToast;

// ============================================
// DEBUG E UTILITÁRIOS
// ============================================

/**
 * Exibe informações de debug no console
 */
function debugInfo() {
    console.group('🔍 InovaConnect - Debug Info');
    console.log('Projetos:', projetos.length);
    console.log('Classes disponíveis:', window.Classes);
    console.log('Estruturas disponíveis:', window.Estruturas);
    console.log('Gerenciador Estruturas:', window.gerenciadorEstruturas.obterResumo());
    console.groupEnd();
}

// Disponibilizar função de debug
window.debugInfo = debugInfo;

console.log('📚 InovaConnect - Scripts carregados. Use debugInfo() para ver informações.');
