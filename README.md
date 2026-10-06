# Barbearia Levittado — V4

Direção editorial baseada no novo wireframe: Header > Hero em vídeo > Posicionamento > Experiência > Serviços > Cortes > Quem Somos > Avaliações > Experiência da barbearia > Localização > CTA > Footer.

## Antes de publicar
1. Adicione `assets/hero.mp4` com um vídeo real da barbearia. O hero usa `assets/corte-2.jpg` como fallback.
2. Troque `55SEUNUMEROAQUI` no `index.html` pelo número de WhatsApp com DDI + DDD.
3. Confirme o endereço da barbearia e, se necessário, substitua o iframe do Google Maps pelo link/embed correto.
4. Substitua a avaliação demonstrativa por avaliações reais. Não publique depoimentos fictícios.
5. Confira se o link de agendamento `https://bit.ly/4mBVcPC` continua correto.


## Workflow de Desenvolvimento com GitHub

Este projeto utiliza **GitHub Issues + Branches + Pull Requests** como fluxo oficial de desenvolvimento. A regra vale para qualquer pessoa ou agente de IA que trabalhe no repositório, independentemente do modelo utilizado.

### Regra principal

Toda **correção, melhoria ou nova função** deve estar vinculada a uma Issue do GitHub.

A branch `main` representa a versão de produção. Alterações não devem ser feitas diretamente nela.

### Fluxo obrigatório

```text
Issue
  ↓
Branch de trabalho
  ↓
Implementação
  ↓
Testes / validação
  ↓
Pull Request
  ↓
Review
  ↓
Merge na main
  ↓
Deploy
  ↓
Validação em produção
```

### Antes de modificar o projeto

O agente deve:

1. Consultar as Issues abertas e verificar se a tarefa já possui uma Issue.
2. Criar uma nova Issue caso a tarefa ainda não esteja registrada.
3. Criar uma branch específica para a tarefa a partir da `main` atualizada.
4. Implementar somente o escopo da Issue.
5. Testar e revisar a alteração.
6. Criar um Pull Request direcionado para `main`.
7. Mencionar explicitamente a Issue no corpo do PR usando `Closes #N`.
8. Aguardar revisão antes do merge, salvo quando o responsável pelo projeto determinar o contrário.
9. Após o merge, verificar o deploy e validar a versão publicada.

### Branches

Use nomes descritivos, preferencialmente seguindo estes padrões:

- `feature/nome-da-funcao` — nova função
- `fix/nome-do-problema` — correção
- `improvement/nome-da-melhoria` — melhoria
- `seo/nome-da-tarefa` — SEO
- `chore/nome-da-tarefa` — manutenção/configuração

Nunca trabalhe diretamente na `main`.

### Commits

Os commits devem ser pequenos, objetivos e relacionados à Issue. Exemplos:

- `feat: adiciona nova funcionalidade`
- `fix: corrige problema`
- `refactor: reorganiza código`
- `perf: melhora performance`
- `seo: melhora otimização para buscadores`
- `docs: atualiza documentação`
- `chore: manutenção do projeto`

### Pull Requests

Todo PR deve conter:

- objetivo da alteração;
- contexto;
- resumo do que foi implementado;
- arquivos ou áreas afetadas;
- testes/validações realizados;
- possíveis impactos ou pendências;
- referência à Issue relacionada.

**Obrigatório:** o corpo do PR deve conter uma linha como:

```text
Closes #N
```

Isso mantém a tarefa rastreável e permite que o GitHub encerre a Issue automaticamente quando o PR for integrado.

### Deploy

O fluxo de publicação é:

`Issue → Branch → PR → Review → Merge na main → Deploy → Validação`

A `main` é a referência de produção. Não fazer alterações manuais diretamente na versão publicada quando a alteração puder ser feita pelo repositório.

### Não misturar tarefas

Se durante uma tarefa surgir outro problema ou melhoria fora do escopo da Issue atual:

1. não misture a alteração no PR atual;
2. registre uma nova Issue;
3. implemente a nova tarefa em outro branch e PR.

### Regra para agentes de IA

Qualquer agente deve ler e seguir este workflow antes de modificar arquivos do projeto.

O agente não deve assumir que uma alteração pode ser feita diretamente na `main`. Deve primeiro identificar a Issue correspondente, criar ou usar a branch apropriada, implementar a mudança e entregar o resultado por Pull Request.
