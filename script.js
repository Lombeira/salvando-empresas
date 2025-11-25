// Função para rolar até a seção de doação
function scrollToDonate() {
    const donateSection = document.getElementById('donate');
    if (donateSection) {
        donateSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Função para copiar texto para a área de transferência
function copyToClipboard(elementId, successMessage) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.textContent.trim();
    
    // Usar a API moderna de clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMessage);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            fallbackCopyToClipboard(text, successMessage);
        });
    } else {
        // Fallback para navegadores mais antigos
        fallbackCopyToClipboard(text, successMessage);
    }
}

// Função fallback para copiar (compatibilidade com navegadores antigos)
function fallbackCopyToClipboard(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast(successMessage);
    } catch (err) {
        console.error('Erro ao copiar:', err);
        showToast('Erro ao copiar. Por favor, copie manualmente.');
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar notificação toast
function showToast(message) {
    // Remove toast existente se houver
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Cria novo toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Mostra o toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remove o toast após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Função para solicitar dados de doação internacional
function requestInternationalDetails() {
    // Aqui você pode implementar um modal, redirecionar para um formulário,
    // ou abrir um email. Por enquanto, vamos mostrar uma mensagem.
    const email = 'contato@salvandoempresas.com.br';
    const subject = 'Solicitação de Dados para Doação Internacional';
    const body = 'Olá,\n\nGostaria de receber as instruções bancárias completas para realizar uma doação internacional.\n\nAtenciosamente,';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Tenta abrir o cliente de email
    window.location.href = mailtoLink;
    
    // Mostra também uma mensagem alternativa
    showToast('Redirecionando para o cliente de email. Se não abrir, entre em contato: ' + email);
}

// Adiciona animação suave ao scroll
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona efeito de fade-in nas seções ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplica animação nas seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

