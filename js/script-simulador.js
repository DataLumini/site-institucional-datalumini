
 function calcularSimulacao() {
            let horasLigado = Number(id_horasLigado.value);
            let kwhGastoMensal = Number(id_kwhGasto.value);
            let precoKWh = Number(id_precoKWh.value);
            let numCameras = Number(id_numCameras.value);

            if (id_horasLigado.value === "" ||
                id_kwhGasto.value === "" ||
                id_precoKWh.value === "" ||
                id_numCameras.value === "") {
                id_mensagem.innerHTML = `<p class="destaque-vermelho">Por favor, preencha todos os campos.</p>`;
                return;
            }

            if (horasLigado < 0 || horasLigado > 24) {
                id_mensagem.innerHTML = `<p class="destaque-vermelho">Erro: O dia possui apenas 24 horas e não pode ser negativo.</p>`;
                return;
            }

            if (kwhGastoMensal < 0 || precoKWh < 0 || numCameras < 0) {
                id_mensagem.innerHTML = `<p class="destaque-vermelho">Erro: O consumo, o preço e o número de câmaras não podem ser valores negativos.</p>`;
                return;
            }

            let gastoAnualTotal = kwhGastoMensal * precoKWh * 12;
            let perdaCicloCientifico = numCameras * 15000;
            let custoRetrabalho = numCameras * 2000;

            if (horasLigado === 0) {
                id_mensagem.innerHTML = `
                    <div class="alerta-card">
                        <h3 class="destaque-vermelho">Alerta Crítico: Risco de Perda Total</h3>
                        <p>A <i>Arabidopsis thaliana</i> precisa de luz para sobreviver. Sem iluminação, a amostra morrerá em dias e a pesquisa será <b>totalmente perdida</b>.</p>
                        <p><i>De acordo com os dados da Embrapa, a ausência de iluminação compromete completamente o ciclo de desenvolvimento das plantas.</i></p>
                        <ul class="impacto-lista">
                            <li><b>Prejuízo Científico Imediato:</b> <span class="destaque-vermelho">${formatBRL(perdaCicloCientifico)}</span> perdidos (6 meses de bolsas e reagentes nas ${numCameras} câmaras).</li>
                            <li><b>Ação necessária:</b> Ative a iluminação imediatamente.</li>
                        </ul>
                    </div>
                `;
            }
            else if (horasLigado > 0 && horasLigado < 16) {
                id_mensagem.innerHTML = `
                    <div class="alerta-card">
                        <h3 class="destaque-vermelho">Alerta: Risco de Perda do Experimento</h3>
                        <p>O ideal são <b>16 horas</b> diárias. Com apenas <b>${horasLigado}h</b>, a planta sofre estresse metabólico e retardo no desenvolvimento, invalidando os dados da pesquisa.</p>
                        <p><i>De acordo com dados da Embrapa, a Arabidopsis thaliana requer 16 horas de iluminação diária para manter o fotoperiodismo correto e desenvolvimento adequado.</i></p>
                        <ul class="impacto-lista">
                            <li><b>Desperdício Científico Estimado:</b> <span class="destaque-vermelho">${formatBRL(perdaCicloCientifico)}</span> (bolsas e reagentes importados) em risco nas ${numCameras} câmaras.</li>
                            <li><b>Custo de Retrabalho:</b> <span class="destaque-vermelho">${formatBRL(custoRetrabalho)}</span> adicionais para reiniciar ensaios e limpar equipamentos.</li>
                        </ul>
                        <p><b>Recomendação:</b> Ajuste para 16h/dia para garantir a padronização e o rigor do estudo.</p>
                    </div>
                `;
            }
            else if (horasLigado === 16) {
                id_mensagem.innerHTML = `
                    <div class="sucesso-card">
                        <h3 class="destaque-verde">Eficiência Máxima Alcançada</h3>
                        <p>Seu laboratório fornece exatamente <b>16 horas</b> de luz, o padrão-ouro para o ciclo perfeito da <i>Arabidopsis thaliana</i>.</p>
                        <p><i>De acordo com os dados técnicos da Embrapa, essa configuração atende aos padrões internacionais para o cultivo controlado desta espécie.</i></p>
                        <ul class="impacto-lista">
                            <li><b>Zero Custo Fantasma:</b> Você não está desperdiçando energia elétrica.</li>
                            <li><b>Zero Desperdício Científico:</b> Sua pesquisa está protegida contra falhas de estresse luminoso.</li>
                        </ul>
                        <p>Custo anual projetado de energia: <b>${formatBRL(gastoAnualTotal)}</b> (100% otimizado).</p>
                    </div>
                `;
            }
            else if (horasLigado > 16) {
                let horasExtras = horasLigado - 16;
                let porcentagemDesperdicio = horasExtras / horasLigado;
                let custoFantasmaAnual = gastoAnualTotal * porcentagemDesperdicio;

                id_mensagem.innerHTML = `
                    <div class="alerta-card">
                        <h3 class="destaque-vermelho">Alerta: Custo Fantasma Detectado</h3>
                        <p><i>De acordo com os estudos da Embrapa, fotoperíodos superiores a 16 horas favorecem o aparecimento de anomalias fisiológicas e reduzem a qualidade dos dados experimentais.</i></p>
                        <p>O uso de <b>${horasLigado}h</b> de luz ultrapassa o ideal de 16h. Esse excesso causa estresse oxidativo e floração precoce nas plantas, além de gerar custos desnecessários que impactam o orçamento do projeto.</p>
                        <ul class="impacto-lista">
                            <li><b>Desperdício de Energia (Custo Fantasma):</b> <span class="destaque-vermelho">${formatBRL(custoFantasmaAnual)}</span> perdidos por ano (<b>${(porcentagemDesperdicio * 100).toFixed(1)}%</b> da sua conta de energia).</li>
                            <li><b>Risco de Desperdício Científico:</b> <span class="destaque-vermelho">${formatBRL(perdaCicloCientifico)}</span> em risco caso as ${numCameras} câmaras precisem ser abortadas por estresse.</li>
                            <li><b>Retrabalho e Manutenção:</b> <span class="destaque-vermelho">${formatBRL(custoRetrabalho)}</span> extras anuais com desgaste precoce de lâmpadas e reinício de testes.</li>
                        </ul>
                        <p><b>Recomendação:</b> Reduza a iluminação para 16h para preservar a verba e proteger suas amostras.</p>
                    </div>
                `;
            }
        }

        function formatBRL(valor) {
            return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }