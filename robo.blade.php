<?php
session_start();

function getAnswer($question) {
    // Aqui você pode implementar a lógica do chatbot para fornecer respostas
    // com base nas perguntas recebidas
    $predefinedAnswers = [
        '' => 'Olá meu Nome é Yas, como posso ajudar?.',
        'qual é o seu nome?' => 'Meu nome é Yas.',
        'é possível visitar os imóveis?' => 'Na maioria dos casos, não é possível a visitação ao imóvel. Uma vez que o imóvel leiloado está ocupado. Mas pode haver exceções, nesses casos o edital informará.',
        'qual a forma de pagamento do lance?' => 'Leilões Judiciais: Pagamentos à vista por meio de Guia Judicial emitida com os dados do processo. Leilões extrajudiciais: Pagamento à vista na conta bancária do credor fiduciário ou proprietário do imóvel.',
        // Adicione mais respostas aqui
    ];

    $lowercaseQuestion = strtolower($question);
    return $predefinedAnswers[$lowercaseQuestion] ?? 'Desculpe, não entendi sua pergunta.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['message'])) {
        $question = trim($_POST['message']);
        $_SESSION['chat_history'][] = ['Você:', $question];

        $answer = getAnswer($question);
        $_SESSION['chat_history'][] = ['', $answer];
    }
}

// Redireciona de volta para a página do chat
header('Location: index.php');
exit;
?>