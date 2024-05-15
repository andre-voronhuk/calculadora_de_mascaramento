informado_cond_ossea = false;

function toggleBoneConduction() {
    const bcNteDiv = document.getElementById('bc_nte_div');
    const checkbox = document.getElementById('toggle_bc_nte');

    if (checkbox.checked) {

        bcNteDiv.classList.remove('hidden');
        informado_cond_ossea = true;
    } else {
        bcNteDiv.classList.add('hidden');
        informado_cond_ossea = false;
    }
    calculateMasking();
}
function calculateMasking() {

    const cond_aerea_testada = parseFloat(document.getElementById('ac_t').value);
    const cond_aerea_nao_testada = parseFloat(document.getElementById('ac_nte').value);
    const frequency = document.getElementById('frequency').value;


    if (frequency == 0) {
        document.getElementById('result').innerHTML = "Preencha os campos para calcular o mascaramento."

        return;
    }

    // Atenuação Interaural para condução aérea
    const IA = getIA();

    let qtd_ruido_chega = cond_aerea_testada - IA;

    let ossea = cond_aerea_nao_testada - 10;

    if (informado_cond_ossea) {
        ossea = parseFloat(document.getElementById('bc_nte').value);
    } else {
        ossea = cond_aerea_nao_testada - 10;
    }

    let sensacao = qtd_ruido_chega - ossea;

    let qtd_mascaramento = sensacao + 10;

    const needsMasking = checkMaskingNecessity(cond_aerea_testada, cond_aerea_nao_testada, IA);

    if (qtd_mascaramento.toString() == "NaN") {
        document.getElementById('result').innerHTML = "Preencha os campos para calcular o mascaramento."

        return;
    }



    if (needsMasking && qtd_mascaramento > 0) {


        const resultMessage = ` Frequência: ${frequency} Hz
        <br><br>
      Mascaramento Aéreo: ${qtd_mascaramento} dB <br> <br>
      
    `;


        document.getElementById('result').innerHTML = resultMessage;
    } else {

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

    return (cond_aerea_testada - IA) > cond_aerea_nao_testada - 10

}