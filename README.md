# REPROGEN CENTRAL V5.3.3 — Data/Hora Local Protegida

Central web do sistema **REPROGEN SAL COCHO**, preparada para GitHub Pages.

## Objetivo desta versão

A versão **V5.3.3** corrige a exibição de data e hora na Central, preservando a hora real registrada no App Campo.

A regra técnica é:

> A data/hora do manejo é dado operacional de campo e não deve ser convertida para UTC.

## O que foi mantido

- Painel geral
- Autoavaliação
- Novos cadastros
- Notas do cocho
- Estoque
- Propriedades
- Cochos
- Lotes
- Produtos
- Movimentação
- Registros
- Mapa com tipos de base:
  - Padrão
  - Satélite
  - Topográfico
  - Claro
  - Sem base
- Configuração da URL do Apps Script

## O que foi corrigido

- A Central prioriza:
  1. `dataHoraBR`
  2. `dataHoraLocal`
  3. `dataHora`
- A data é exibida no padrão brasileiro: `DD/MM/AAAA HH:mm`.
- O mapa não usa conversão UTC para exibir a data/hora do manejo.
- O cálculo de dias no mapa usa parser local protegido.
- A exportação JSON usa hora local.

## Ordem correta de atualização

Antes de testar esta Central, atualize o **Apps Script V1.1 — Data/Hora Local Protegida**.

Sequência recomendada:

1. Atualizar o Apps Script.
2. Salvar o projeto.
3. Executar `setupReprogen`.
4. Reimplantar como **nova versão**.
5. Subir este `index.html` no repositório da Central no GitHub.
6. Fazer um novo registro no App Campo.
7. Sincronizar.
8. Atualizar a Central.

## Como subir no GitHub Pages

No repositório da Central:

1. Clique em **Add file**.
2. Clique em **Upload files**.
3. Envie:
   - `index.html`
   - `README.md`
4. Confirme em **Commit changes**.

Mensagem de commit sugerida:

```text
Atualiza Central V5.3.3 com data e hora local protegida
```

## Teste de aprovação

Faça um registro novo no Campo, por exemplo às **09:07**.

O correto é aparecer:

```text
Campo: 09:07
Planilha: 09:07
Central: 31/05/2026 09:07
```

Nunca deve virar:

```text
12:07
```

## Observação importante

Registros antigos que já foram gravados com +3 horas na planilha não são corrigidos automaticamente.

A correção vale para registros novos sincronizados depois da atualização do Apps Script e da Central.

## Versão

**REPROGEN CENTRAL V5.3.3 — Data/Hora Local Protegida**
