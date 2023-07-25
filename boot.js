const apiKey = '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';




function sendMessage() {
    var message = document.getElementById('message-input');
    if (!message.value) {
        message.style.border = '1px solid red';
        return;
    }
    message.style.border = 'none';
    var status = document.getElementById('status');
    var btnSubmit = document.getElementById('btn-submit');
    status.style.display = 'block';
    status.innerHTML = 'Carregando...';
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = 'not-allowed';
    message.disabled = true;

    var question = message.value.trim();
    appendMessage('Você:', question);
    message.value = '';

    var answer = getAnswer(question);
    if (answer) {
        appendMessage('Yas:', answer);
        status.style.display = 'none';
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = 'pointer';
        message.disabled = false;
    } else {
        showNoAnswerOptions(question);
    }
}

function getAnswer(question) {
    const predefinedAnswers = {
        'qual é o seu nome?': 'Meu nome é Yas.',
        'é possível visitar os imóveis?': 'Na maioria dos casos, não é possível a visitação ao imóvel. Uma vez que o imóvel leiloado está ocupado. Mas pode haver exceções, nesses casos o edital informará.',
        'qual a forma de pagamento do lance?': 'Leilões Judiciais: Pagamentos à vista por meio de Guia Judicial emitida com os dados do processo. Leilões extrajudiciais: Pagamento à vista na conta bancária do credor fiduciário ou proprietário do imóvel.',
        // Adicione mais perguntas e respostas definidas aqui
    };

    const lowercaseQuestion = question.toLowerCase();
    return predefinedAnswers[lowercaseQuestion];
}

function showNoAnswerOptions(question) {
    var historyBox = document.getElementById('history');

    var boxMessage = document.createElement('div');
    boxMessage.className = 'box-response-message';

    var textMessage = document.createElement('p');
    textMessage.className = 'message';
    textMessage.innerHTML = 'Desculpe, não encontrei a resposta. O que você deseja fazer agora?';

    var btnChatGPT = document.createElement('button');
    btnChatGPT.className = 'btn-option';
    btnChatGPT.innerHTML = 'Falar com o Chat GPT';
    btnChatGPT.addEventListener('click', () => {
        redirectToChatGPTPage();
    });
    var btnperguntardenovo = document.createElement('button');
    btnperguntardenovo.className = 'btn-option';
    btnperguntardenovo.innerHTML = 'Peguntar Novamente';
    btnperguntardenovo.addEventListener('click', () => {
        redirectToperguntardenovo();
    });
    var btnAtendente = document.createElement('button');
    btnAtendente.className = 'btn-option';
    btnAtendente.innerHTML = 'Falar com um Atendente';
    btnAtendente.addEventListener('click', () => {
        openWhatsApp();
    });

    boxMessage.appendChild(textMessage);
    boxMessage.appendChild(btnChatGPT);
    boxMessage.appendChild(btnAtendente);

    historyBox.appendChild(boxMessage);

    // Role a caixa de chat para exibir a nova mensagem
    historyBox.scrollTop = historyBox.scrollHeight;
}

function redirectToChatGPTPage() {
    // Redirecionar para a página do Chat GPT
    window.location.href = 'yas.html';
}
function perguntardenovo() {
    // Redirecionar para a página do Chat GPT
    window.location.href = 'boot.html';
}
function openWhatsApp() {
    // Altere o número de telefone abaixo para o número de WhatsApp desejado
    var phoneNumber = 'SEU-NÚMERO-DE-TELEFONE';

    window.open(`https://api.whatsapp.com/send?phone=${1131816109}`);
}

function appendMessage(sender, message) {
    var historyBox = document.getElementById('history');

    var boxMessage = document.createElement('div');
    boxMessage.className = sender === 'Você:' ? 'box-my-message' : 'box-response-message';

    var senderMessage = document.createElement('p');
    senderMessage.className = 'sender';
    senderMessage.innerHTML = sender;

    var textMessage = document.createElement('p');
    textMessage.className = 'message';
    textMessage.innerHTML = message;

    boxMessage.appendChild(senderMessage);
    boxMessage.appendChild(textMessage);

    historyBox.appendChild(boxMessage);

    // Role a caixa de chat para exibir a nova mensagem
    historyBox.scrollTop = historyBox.scrollHeight;
}

// Função para inicializar o Chat GPT
function initiateGPTChat() {
    var btnSubmit = document.getElementById('btn-submit');
    btnSubmit.addEventListener('click', sendMessage);
}














// Inicialização do Chat GPT
initiateGPTChat();