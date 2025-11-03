document.addEventListener('DOMContentLoaded', () => {

    const canalSelect = document.getElementById('input-canal');
    const regionaisOn = document.getElementById('regionais-on');
    const regionaisOff = document.getElementById('regionais-off');

    const segmentadaRadios = document.querySelectorAll('input[name="segmentada"]');
    const grupoClientesContainer = document.getElementById('grupo-clientes-container');
    const grupoClientesInput = document.getElementById('input-grupo-clientes');

    const gerarBtn = document.getElementById('gerar-btn');
    const copiarBtn = document.getElementById('copiar-btn');
    const outputContainer = document.getElementById('output-container');
    const outputText = document.getElementById('output-text');

    canalSelect.addEventListener('change', () => {
        const tipoCanal = canalSelect.value;
        
        regionaisOn.classList.add('hidden');
        regionaisOff.classList.add('hidden');

        if (tipoCanal === 'ON') {
            regionaisOn.classList.remove('hidden');
        } else if (tipoCanal === 'OFF' || tipoCanal === 'ON E OFF' || tipoCanal === 'INSTITUCIONAL') {
            regionaisOff.classList.remove('hidden');
        }
    });

    segmentadaRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.value === 'SIM') {
                grupoClientesContainer.classList.remove('hidden');
                grupoClientesInput.required = true;
            } else {
                grupoClientesContainer.classList.add('hidden');
                grupoClientesInput.value = ''; 
                grupoClientesInput.required = false;
            }
        });
    });

    gerarBtn.addEventListener('click', () => {
        
        const formatarData = (dataStr) => {
            if (!dataStr) return 'N/A';
            const data = new Date(dataStr + 'T00:00:00');
            return data.toLocaleDateString('pt-BR');
        };

        const getRadioValue = (name) => {
            const radio = document.querySelector(`input[name="${name}"]:checked`);
            return radio ? radio.value : 'N/A';
        };

        const getCheckboxValues = () => {
            let containerId = '';
            if (!regionaisOn.classList.contains('hidden')) {
                containerId = 'regionais-on';
            } else if (!regionaisOff.classList.contains('hidden')) {
                containerId = 'regionais-off';
            }

            if (!containerId) return 'N/A';

            const selecionadas = [];
            document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`).forEach(cb => {
                selecionadas.push(cb.value);
            });
            return selecionadas.length > 0 ? selecionadas.join(', ') : 'Nenhuma selecionada';
        };

        try {
            const autorizada = getRadioValue('autorizada');
            const periodo = formatarData(document.getElementById('input-periodo').value);
            const canal = document.getElementById('input-canal').value;
            const regionais = getCheckboxValues();
            const tipoCampanha = document.getElementById('input-tipo').value;
            const mecanica = document.getElementById('input-mecanica').value;
            const descricao = document.getElementById('input-descricao').value;
            const limitador = document.getElementById('input-limitador').value;
            const etiqueta = getRadioValue('etiqueta');
            const segmentada = getRadioValue('segmentada');
            let grupoClientes = 'N/A';
            if (segmentada === 'SIM') {
                grupoClientes = grupoClientesInput.value || 'N/A';
            }
            const banners = getRadioValue('banners');
            const imagens = document.getElementById('input-imagens').value;
            const anexo = document.getElementById('input-anexo').value;

            if (!canal || !tipoCampanha || !mecanica || !descricao || !limitador || !imagens || !anexo) {
                 alert('Por favor, preencha todos os campos obrigatórios.');
                 return;
            }
            
            const textoFinal = `AUTORIZADA: ${autorizada}
PERÍODO: ${periodo}
CANAL: ${canal}
RWGIONAIS: ${regionais}
TIPO: ${tipoCampanha}
MECÂNICA: ${mecanica}
DESCRIÇÃO: ${descricao}
LIMITADOR: ${limitador}
ETIQUETA: ${etiqueta}
SEGMENTADA: ${segmentada}
CLIENTES: ${grupoClientes}
BANNERS: ${banners}
IMAGENS: ${imagens}
PLANILHA: ${anexo}`;

            outputText.value = textoFinal;
            outputContainer.classList.remove('hidden');

        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao gerar o texto. Verifique o console.');
        }
    });

    copiarBtn.addEventListener('click', () => {
        outputText.select();
        outputText.setSelectionRange(0, 99999); 

        try {
            navigator.clipboard.writeText(outputText.value);
            
            copiarBtn.textContent = 'Copiado com Sucesso!';
            setTimeout(() => {
                copiarBtn.textContent = 'Copiar Texto';
            }, 2000);

        } catch (err) {
            copiarBtn.textContent = 'Erro ao copiar';
            console.error('Falha ao copiar: ', err);
        }
    });

});
