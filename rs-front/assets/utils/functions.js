export function primeiraLetraMaiuscula(palavra) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

export function formatarDataHora(data) {
    const date = new Date(data);
    const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false, 
        timeZone: 'America/Sao_Paulo' 
    };
    return date.toLocaleString('pt-BR', options);
}