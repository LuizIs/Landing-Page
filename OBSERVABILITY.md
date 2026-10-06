# Observabilidade

## Estratégia

A aplicação é uma landing page estática hospedada no GitHub Pages. A observabilidade deve ser proporcional ao produto.

### Sentry

Sentry é o primeiro candidato para monitoramento de erros de JavaScript no navegador. O SDK oficial oferece suporte a browsers. A ativação exige um DSN real do projeto e não será feita com placeholder.

Quando o projeto Sentry estiver criado, adicionar o DSN por configuração de produção e inicializar o SDK antes do restante do código da página.

### OpenTelemetry

OpenTelemetry é mantido como opção de instrumentação para traces/telemetria. A documentação oficial informa que a instrumentação de cliente no navegador ainda é experimental e pouco especificada. Portanto, não será adicionada como dependência obrigatória da landing page neste momento.

### Datadog e New Relic

São alternativas de observabilidade, não integrações simultâneas obrigatórias. Adicionar as duas junto com Sentry/OpenTelemetry duplicaria coleta, peso e configuração sem benefício proporcional para esta landing page.

## Regras

- nunca publicar DSN/token inexistente;
- nunca enviar dados pessoais ou conteúdo de formulário sem necessidade e base legal;
- monitoramento não pode bloquear a renderização da página;
- telemetria deve ser carregada de forma não crítica;
- qualquer provedor adicional deve ser aprovado em uma Issue própria.

## Próximo passo

Depois da aprovação do site pelo cliente, se houver necessidade real de monitoramento em produção, criar uma Issue para ativar Sentry com o projeto/DSN oficial e validar o impacto de performance.
