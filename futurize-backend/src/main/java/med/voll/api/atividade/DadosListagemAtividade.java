package med.voll.api.atividade;


    import med.voll.api.projeto.Projeto;

    import java.util.Date;

    public record DadosListagemAtividade(long id, String titulo, String descricacao, Date inicio, Date encerramento, Estado estado, Dificuldade dificuldade, Prioridade prioridade, String tempo_execucao, Projeto projeto, Boolean ativo){

        public DadosListagemAtividade(Atividade atividade){
            this(atividade.getId(), atividade.getTitulo(), atividade.getDescricao(), atividade.getInicio(), atividade.getEncerramento(), atividade.getEstado(), atividade.getDificuldade(), atividade.getPrioridade(), atividade.getTempo_execucao(), atividade.getProjeto(), atividade.getAtivo());
        }

    }
