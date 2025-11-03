 document.addEventListener('DOMContentLoaded', () => {
            const tipoSelect = document.getElementById('input-tipo');
            const regionaisOn = document.getElementById('regionais-on');
            const regionaisOff = document.getElementById('regionais-off');
            const gerarBtn = document.getElementById('gerar-btn');
            const copiarBtn = document.getElementById('copiar-btn');
            const outputContainer = document.getElementById('output-container');
            const outputText = document.getElementById('output-text');

            tipoSelect.addEventListener('change', () => {
                const tipo = tipoSelect.value;
                
                regionaisOn.classList.add('hidden');
                regionaisOff.classList.add('hidden');

                if (tipo === 'ON') {
                    regionaisOn.classList.remove('hidden');
                } else if (tipo === 'OFF' || tipo === 'ON e OFF' || tipo === 'Institucional') {
                    regionaisOff.classList.remove('hidden');
                }
            });

            gerarBtn.addEventListener('click', () => {
                const dataRaw = document.getElementById('input-data').value;
                const canal = document.getElementById('input-canal').value;
                const industria = document.getElementById('input-industria').value;
                const tipo = document.getElementById('input-tipo').value;
                const publico = document.getElementById('input-publico').value;
                const mensagem = document.getElementById('input-mensagem').value;

                const dataFormatada = dataRaw ? new Date(dataRaw + 'T00:00:00')
                                          .toLocaleDateString('pt-BR') 
                                          : 'DATA PENDENTE';

                let regionaisSelecionadas = [];
                let containerVisivel = '';

                if (!regionaisOn.classList.contains('hidden')) {
                    containerVisivel = 'regionais-on';
                } else if (!regionaisOff.classList.contains('hidden')) {
                    containerVisivel = 'regionais-off';
                }

                if (containerVisivel) {
                    document.querySelectorAll(`#${containerVisivel} input[type="checkbox"]:checked`).forEach(cb => {
                        regionaisSelecionadas.push(cb.value);
                    });
                }
                
                const regionais = regionaisSelecionadas.length > 0 ? regionaisSelecionadas.join(', ') : 'N/A';

                if (!dataRaw || !canal || !industria || !tipo || !publico || !mensagem || regionaisSelecionadas.length === 0) {
                    alert('Por favor, preencha todos os campos, incluindo as regionais.');
                    return;
                }

                const textoFinal = 
`${dataFormatada} - ${canal.toUpperCase()} - ${industria.toUpperCase()}
TIPO: ${tipo}
REGIONAIS: ${regionais}
PÚBLICO: ${publico}
MENSAGEM: ${mensagem}`;

                outputText.value = textoFinal;
                outputContainer.classList.remove('hidden');
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
                }
            });
        });
