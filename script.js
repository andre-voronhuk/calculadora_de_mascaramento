function calculateMasking() {
    // Obtendo os valores dos campos de entrada
    const cond_aerea_testada = parseFloat(document.getElementById('ac_t').value);
    const cond_aerea_nao_testada = parseFloat(document.getElementById('ac_nte').value);

    // const cond_ossea_testada = parseFloat(document.getElementById('bc_t').value);
    // const cond_ossea_nao_testada = parseFloat(document.getElementById('bc_nte').value);

    const frequency = document.getElementById('frequency').value;

    if (frequency == 0) {
        document.getElementById('result').innerHTML = "Preencha os campos para calcular o mascaramento."

        return;
    }
    // Atenuação Interaural para condução aérea
    const IA = getIA();

    let qtd_ruido_chega = cond_aerea_testada - IA;
    let ossea = cond_aerea_nao_testada - 10;

    let sensacao = qtd_ruido_chega - ossea;

    let qtd_mascaramento = sensacao + 10;
    const needsMasking = checkMaskingNecessity(cond_aerea_testada, cond_aerea_nao_testada, IA);


    if (needsMasking) {
        // Calcula o mascaramento para condução aérea e óssea
        const masking_air = cond_aerea_nao_testada + IA - 10;

        // const masking_bone = cond_ossea_nao_testada + 10;

        // Cria a mensagem de resultado formatada
        const resultMessage = ` Frequência: ${frequency} Hz
        <br><br>
      Mascaramento Aéreo: ${qtd_mascaramento} dB <br> <br>
      
    `;

        // Exibe a mensagem de resultado na div 'result'
        document.getElementById('result').innerHTML = resultMessage;
    } else {
        // Informa que o mascaramento não é necessário
        document.getElementById('result').innerHTML = `Frequência: ${frequency} Hz  <br><br>Mascaramento não é necessário.`
            ;
    }
}

function getIA() {

    let frequency = parseFloat(document.getElementById('frequency').value)
    let IA;
    if (frequency == 250 || frequency == 500 || frequency == 1000) {
        IA = 40;
    } else if (frequency == 2000 || frequency == 3000) {
        IA = 45;
    } else if (frequency == 4000 || frequency == 6000 || frequency == 8000) {
        IA = 50;
    }
    return IA;
}

function checkMaskingNecessity(cond_aerea_testada, cond_aerea_nao_testada, IA) {
    console.log(cond_aerea_nao_testada + " nao testada")
    console.log(cond_aerea_testada - IA + "  (quanto chega la) testada - IA")
    console.log(cond_aerea_nao_testada - 10 + "  ossea estimada")


    return (cond_aerea_testada - IA) > cond_aerea_nao_testada - 10


    // cond_aerea_testada - IA) o quanto o cara ouve 

}