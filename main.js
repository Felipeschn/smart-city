function handleButton(modo) {
      var contador = 0;

      
      // ----------------  montando a cidade --------------------------------------------------
      const calcadaCima = Array.from({ length: 6 }, () => (Math.random() < 0.5 ? 1 : 0));
      const RuaMaoIda = Array.from({ length: 6 }, () => (Math.random() < 0.5 ? 1 : 0));
      const RuaMaoVolta = Array.from({ length: 6 }, () => (Math.random() < 0.5 ? 1 : 0));
      const calcadaBaixo = Array.from({ length: 6 }, () => (Math.random() < 0.5 ? 1 : 0));
      const calcadas = [calcadaCima, RuaMaoIda, RuaMaoVolta, calcadaBaixo];

      var eixoxlixeira = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      var eixoylixeira = Math.random() < 0.5 ? 0 : 3;
      var eixoxPostoColeta = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      var eixoyPostoColeta = Math.random() < 0.5 ? 0 : 3;

      while (eixoxPostoColeta == eixoxlixeira && eixoyPostoColeta == eixoylixeira) {
        eixoyPostoColeta = Math.random() < 0.5 ? 0 : 3;
        eixoxPostoColeta = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      }
      calcadas[eixoylixeira][eixoxlixeira] = 'L';
      calcadas[eixoyPostoColeta][eixoxPostoColeta] = 'PC';



      // ---------------------- Iniciando Varredura (Processo feito pelo varredor) ---------------
      var indexI = 0;
      var indexJ = 0;
      if (calcadas[indexI][indexJ] == 1) {
        contador++;
      }
      console.log('Legandas:');
      console.log('L = Lixo');
      console.log('V = Varredor');
      console.log('PC = Posto de coleta');
      console.log('-------------------');
      console.log('Cidade montada');
      console.table(calcadas);

      modo == 'true' ? console.log("Varrendo a cidade...") : '';
      for (let i = 0; i < calcadas.length; i++) {
        for (let j = 0; j < calcadas[i].length; j++) {
          if (calcadas[indexI][indexJ] == 1 || calcadas[indexI][indexJ] == 'V') {
            calcadas[indexI][indexJ] = 0;
          }
          indexI = i;
          indexJ = j;

          if (calcadas[i][j] != 1 && calcadas[i][j] != 0) {
            calcadas[i][j] = calcadas[i][j];
            continue;
          }

          if (calcadas[i][j] == 1) {
            contador++;
          }
          calcadas[i][j] = 'V';
          modo == 'true' ? console.table(calcadas) : '';
        }
      }
      if (calcadas[indexI][indexJ] == 1) {
        contador++;
      }
      calcadas[indexI][indexJ] =
        calcadas[indexI][indexJ] == ('L' || 'PC') ? calcadas[indexI][indexJ] : 0;
      modo == 'true' ? console.table(calcadas) : '';
      modo == 'true' ? console.log('Varredor finalizou a limpeza') : '';

      console.log(`O varredor encontrou ${contador} residos em sua limpeza`);



      // ---------------------- Varredor leva o lixo até a lixeira -------------------------------
      modo == 'true' ? console.log('Varredor irá levar o lixo até a lixeira') : '';
      var flag = true;
      for (let i = calcadas.length - 1; i >= 0; i--) {
        if (flag) {
          for (let j = calcadas[i].length - 1; j >= 0; j--) {
            if (calcadas[indexI][indexJ] == 1 || calcadas[indexI][indexJ] == 'V') {
              calcadas[indexI][indexJ] = 0;
            }
            indexI = i;
            indexJ = j;

            if (calcadas[i][j] == 'PC') {
              continue;
            }
            if (calcadas[i][j] == 'L') {
              calcadas[i][j] = 'LV';
              flag = false;
              break;
            }
            calcadas[i][j] = 'V';
            modo == 'true' ? console.table(calcadas) : '';
          }
        }
      }
      modo == 'true' ? console.log("Chegou na lixeira") : '';
      modo == 'true' ? console.table(calcadas) : '';
      result = getIndexOf(calcadas, 'LV');
      calcadas[result[0]][result[1]] = 'L';
      modo == 'true' ? console.log("Varredor finalizou suas ativades") : '';
      modo == 'true' ? console.table(calcadas) : '';


      
      // ---------------------- Recolhedor pega o lixo e leva ao ponto de coleta ------------------
      
      var PassouLixeira = false;
      var flagdirecao = true;
      var flagRecolhedor = true;
      
      modo == 'true' ? console.log("Recolhedor entra na cidade, seu papel é levar o lixo até o ponto de coleta.") : '';
      for (
        let i = flagdirecao ? calcadas.length - 1 : 0;
        flagdirecao ? i >= 0 : i < calcadas.length;
        flagdirecao ? i-- : i++
      ) {
        if (flagRecolhedor) {
          for (
            let j = flagdirecao ? calcadas[i].length - 1 : 0;
            flagdirecao ? j >= 0 : j < calcadas.length;
            flagdirecao ? j-- : j++
          ) {
            if (calcadas[indexI][indexJ] == 1 || calcadas[indexI][indexJ] == 'R') {
              calcadas[indexI][indexJ] = 0;
            }
            if (calcadas[indexI][indexJ] == 'PCR' || calcadas[indexI][indexJ] == 'LR') {
              calcadas[indexI][indexJ] = calcadas[indexI][indexJ].slice(0, -1);
            }
            indexI = i;
            indexJ = j;
            if (calcadas[i][j] == 'PC' || calcadas[i][j] == 'L') {
              calcadas[i][j] = calcadas[i][j] + 'R';
              modo == 'true' ? console.table(calcadas) : '';
            }

            if (calcadas[i][j] == 'LR') {
              PassouLixeira = true;
              result = getIndexOf(calcadas, 'PC');
              if (result !== undefined) {
                if (result[0] > i) {
                  flagdirecao = false;
                } else if (result[0] == i) {
                  if (result[1] >= j) {
                    flagdirecao = false;
                  }
                }
              }
              continue;
            }
            if (calcadas[i][j] == 'PCR') {
              if (PassouLixeira) {
                flagRecolhedor = false;
                break;
              }
              continue;
            }

            calcadas[i][j] = 'R';
            modo == 'true' ? console.table(calcadas) : '';
          }
        }
      }
      modo == 'true' ? console.table(calcadas) : '';
      // var seletorDeLixo = divideInteiro(contador, 3);
      // var valor1 = seletorDeLixo[0];
      // var valor2 = seletorDeLixo[1];
      // var valor3 = seletorDeLixo[2];
      // var teste = valor3 + valor2;
      console.log(`O recolhedor pegou os ${contador} lixos, sendo eles orgânicos e secos.`);

    }

    // -------------------------------- Funções auxiliares -------------------------------------

    function getIndexOf(arr, k) {
      for (var i = 0; i < arr.length; i++) {
        var index = arr[i].indexOf(k);
        if (index > -1) {
          return [i, index];
        }
      }
    }

    function divideInteiro(num, parts) {      
        var val;
        var mod = num % parts;
        if(mod == 0){
          val = num/parts;
          retData = Array(parts).fill(val);
        } else {
          val = (num-mod)/parts;
          retData = Array(parts).fill(val);
          for(i=0;i<mod;i++){
            retData[i] = retData[i] + 1;
          }
          retData.reverse()
        }
      
        return retData;
      
      }