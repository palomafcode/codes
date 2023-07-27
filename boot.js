const apiKey = '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';
function initiateGPTChat() {
    // Mensagem inicial que você deseja exibir
    var initialMessage = 'Olá !Como posso ajudar?';

    // Adicione a mensagem inicial utilizando a função appendMessage
    appendMessage('Yas:', initialMessage);
}
function sendMessage() {
    var message = document.getElementById('message-input');
    if (!message.value) {
        message.style.border = '1px solid blue';
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
        appendMessage('', answer);
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
        '': 'Olá meu Nome é Yas , como posso ajudar?.',
        'qual é o seu nome?': 'Meu nome é Yas.',
        'é possível visitar os imóveis?': 'Na maioria dos casos, não é possível a visitação ao imóvel. Uma vez que o imóvel leiloado está ocupado. Mas pode haver exceções, nesses casos o edital informará.',
        'qual a forma de pagamento do lance?': 'Leilões Judiciais: Pagamentos à vista por meio de Guia Judicial emitida com os dados do processo. Leilões extrajudiciais: Pagamento à vista na conta bancária do credor fiduciário ou proprietário do imóvel.',
       
    };
    const lowercaseQuestion = question.toLowerCase();
    return predefinedAnswers[lowercaseQuestion];
}
function showNoAnswerOptions(question) {
    var historyBox = document.getElementById('history');
    var boxMessage = document.createElement('div');
    boxMessage.className = 'response-message';
    var textMessage = document.createElement('p');
    textMessage.className = 'message';
    textMessage.innerHTML = 'Desculpe, não entendi sua pergunta.<br>Por aqui eu consigo te ajudar com alguns assuntos selecione uma opção para prosseguirmos ⬇️';
    var btnPagamentos = document.createElement('button');
    btnPagamentos.className = 'btn-option';
    btnPagamentos.innerHTML = '▫ Forma de Pagamento';
    btnPagamentos.addEventListener('click', () => {
        showAnswer('pagamentos');
    });

    var btnJuridico = document.createElement('button');
    btnJuridico.className = 'btn-option';
    btnJuridico.innerHTML = '▫ Assuntos Jurídicos';
    btnJuridico.addEventListener('click', () => {
        showAnswer('jurídico');
    });

    var btnOutrasopcoes = document.createElement('button');
    btnOutrasopcoes.className = 'btn-option';
    btnOutrasopcoes.innerHTML = '▫ Outras Opções';
    btnOutrasopcoes.addEventListener('click', () => {
        showAnswer('outrasopcoes');
   
        btnChatGPT = document.createElement('button');
        btnChatGPT.className = 'btn-option2';
        btnChatGPT.innerHTML = 'Falar com o Chat GPT';
        btnChatGPT.addEventListener('click', () => {
            redirectToChatGPTPage();
        });

historyBox.appendChild(btnChatGPT);

btnAtendente = document.createElement('button');
btnAtendente.className = 'btn-option3';
btnAtendente.innerHTML = 'Falar com Atendente';
btnAtendente.addEventListener('click', () => {
    openWhatsApp();
});

historyBox.appendChild(btnAtendente);

    });

    var btnComercial = document.createElement('button');
    btnComercial.className = 'btn-option';
    btnComercial.innerHTML = '▫  Comercial';
    btnComercial.addEventListener('click', () => {
        showAnswer('comercial');
    });

    var btnLeiloes = document.createElement('button');
    btnLeiloes.className = 'btn-option';
    btnLeiloes.innerHTML = '▫ Dúvidas sobre os Leilões';
    btnLeiloes.addEventListener('click', () => {
        showAnswer('leilões');
    });

    boxMessage.appendChild(textMessage);
    boxMessage.appendChild(btnPagamentos);
    boxMessage.appendChild(btnJuridico);
    boxMessage.appendChild(btnOutrasopcoes);
    boxMessage.appendChild(btnComercial);
    boxMessage.appendChild(btnLeiloes);
    historyBox.appendChild(boxMessage);
    historyBox.scrollTop = historyBox.scrollHeight;
}
function showOptions() {
    var historyBox = document.getElementById('history');
    var table = document.createElement('table');
    table.className = 'response-table';
    
    var row1 = document.createElement('tr');
    var cell1 = document.createElement('td');
    cell1.colSpan = 3;
    cell1.innerHTML = 'Desculpe, não encontrei a resposta. O que você deseja fazer agora?';
    row1.appendChild(cell1);
    table.appendChild(row1);

    var row2 = document.createElement('tr');
    var cell2_1 = document.createElement('td');
    cell2_1.className = 'option-cell';
    var btnMaisOpcoes = document.createElement('button');
    btnMaisOpcoes.className = 'btn-option';
    btnMaisOpcoes.innerHTML = 'Mais Opções';
    btnMaisOpcoes.addEventListener('click', () => {
        showOptions();
    });
    cell2_1.appendChild(btnMaisOpcoes);
    row2.appendChild(cell2_1);

    var cell2_2 = document.createElement('td');
    cell2_2.className = 'option-cell';
    var btnChatGPT = document.createElement('button');
    btnChatGPT.className = 'btn-option';
    btnChatGPT.innerHTML = 'Falar com o Chat GPT';
    btnChatGPT.addEventListener('click', () => {
        redirectToChatGPTPage();
    });
    cell2_2.appendChild(btnChatGPT);
    row2.appendChild(cell2_2);

    var cell2_3 = document.createElement('td');
    cell2_3.className = 'option-cell';
    var btnAtendente = document.createElement('button');
    btnAtendente.className = 'btn-option2';
    btnAtendente.innerHTML = 'Falar com um Atendente';
    btnAtendente.addEventListener('click', () => {
        openWhatsApp();
    });
    cell2_3.appendChild(btnAtendente);
    row2.appendChild(cell2_3);

    table.appendChild(row2);

    historyBox.appendChild(table);
    historyBox.scrollTop = historyBox.scrollHeight;
}

function showAnswer(option) {
    var predefinedAnswers = {
        'pagamentos': '<span class="question">Formas de pagamento dos lances:<br></span> Leilões Judiciais: Pagamentos à vista por meio de Guia Judicial emitida com os dados do processo. Emitente: Tribunal de Justiça Leilões extrajudiciais: Pagamento à vista na conta bancária do credor fiduciário ou proprietário do imóvel.<br><br> <span class="question">Formas de forma de pagamento da comissão</span><br> Depósito, transferência ou PIX em conta corrente em nome do leiloeiro que consta no edital. <br><br><span class="question">Qual o prazo de pagamento?</span> <br>24 horas do encerramento da disputa.<br> <br><span class="question">Como faço para financiar o imóvel?</span><br> Leilões judiciais: não cabe financiamento, mas poderá ser apresentada proposta parcelada de acordo com Art. 895 e parágrafos do CPC com sinal de no mínimo 25% do valor da proposta, e o restante em até 30 meses, garantido por hipoteca do próprio bem, bem como mediante correção mensal pelo índice do E. TJ/SP, prevalecendo a de maior valor, que estarão sujeitas a apreciação pelo Juiz da causa. A proposta de pagamento do lance à vista sempre prevalecerá sobre as propostas de pagamento parcelado. <br>Leilões Extrajudicial de Alienação Fiduciária: não cabe financiamento, somente pagamento à vista. Leilões Extrajudiciais de retomados ou venda direta: poderá ser financiado ou parcelado de acordo com regras específicas do edital.',
        'jurídico': '<span class="question">Como dar baixa nas averbações da matrícula<br></span><br>Leilão Judicial: Caso haja outra averbação de penhora na matrícula do imóvel além daquela efetuada nos autos do processo judicial em que se realizou o leilão, após a expedição da Carta de Arrematação, o arrematante deverá solicitar a expedição de ofício ao Cartório de Registro de Imóveis competente para que seja efetuada a baixa da penhora constante na matrícula do imóvel. Na maioria dos casos o Juiz já determina que essa informação conste na própria Carta de Arrematação <br><br>Leilão Extrajudicial de Alienação Fiduciária: Caso haja averbação de penhora na matrícula do imóvel, anterior a consolidação da propriedade em favor do credor, o arrematante deverá peticionar nesses processos requerendo o cancelamento da penhora, uma vez comprovando com cópia da matrícula do imóvel, a arrematação do bem.</span>',
        'comercial': 'Resposta sobre comercial.',
        'leilões': '<span class="question">	Como Participar?<br></span>Para participar dos nossos leilões, é necessário realizar um cadastro e enviar documentos (identificação com foto e comprovante de endereço) em nosso site, após o cadastro analisado e aprovado, encaminharemos a Declaração de Participação para assinatura digital, via sistema ClickSign, concluída essa etapa seu cadastro estará liberado para habilitar-se e ofertar lance no imóvel de seu interesse.<br><br><span class="question">Sobre o estado de conservação do imóvel:</span><br>O bem será vendido no estado de conservação em que se encontra, sem garantia, cabendo ao interessado verificar suas condições, antes de ofertar o lance (Art. 18 da Resolução n° 236/2016).',
        'outrasopcoes': '💭Certo, para verificar quais os leilões disponíveis, editais e demais dúvidas acesse nossa página ➡️https://globoleiloes.com.br ou então retorne em uma das opções anteriores. Se deseja continuar por aqui selecione uma das opções:	',  
    };
    var historyBox = document.getElementById('history');
    var boxMessage = document.createElement('div');
    boxMessage.className = 'response-message';
    var textMessage = document.createElement('p');
    textMessage.className = 'message';
    textMessage.innerHTML = predefinedAnswers[option];
    boxMessage.appendChild(textMessage);
    historyBox.appendChild(boxMessage);
    historyBox.scrollTop = historyBox.scrollHeight;
}

function redirectToChatGPTPage() {
    window.location.href = 'yas.html';
}
function perguntardenovo() {
    window.location.href = 'boot.html';
}
function openWhatsApp() {
    var phoneNumber = 'SEU-NÚMERO-DE-TELEFONE';
    window.open(`https://api.whatsapp.com/send?phone=${1131816109}`);
}

function appendMessage(sender, message) {
    var historyBox = document.getElementById('history');
    var boxMessage = document.createElement('div');
        

    boxMessage.className = sender === 'Você:' ? 'box-my-message' : 'box-response-message';
 
    if (sender !== 'Você:') {
      var assistantImage = document.createElement('img');
      assistantImage.src = 'yas-fundo-branco.png';
      assistantImage.className = 'assistent-image';
      boxMessage.appendChild(assistantImage);
    }
    
    var textMessage = document.createElement('p');
    textMessage.className = 'my-message';
    textMessage.innerHTML = message;
  

  
    boxMessage.appendChild(textMessage);
    historyBox.appendChild(boxMessage);
    historyBox.scrollTop = historyBox.scrollHeight;
  } 

    var btnSubmit = document.getElementById('btn-submit');
    btnSubmit.addEventListener('click', sendMessage);

initiateGPTChat();