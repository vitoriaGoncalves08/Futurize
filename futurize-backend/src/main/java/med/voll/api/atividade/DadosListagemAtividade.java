package med.voll.api.atividade;


    import med.voll.api.projeto.Projeto;
    import med.voll.api.usuario.Usuario;

    import java.util.Date;

    public record DadosListagemAtividade(long id, String titulo, String descricao, Date inicio, Date encerramento, Estado estado, Dificuldade dificuldade, int prioridade, String tempo_execucao, Projeto projeto, Usuario responsavel, Boolean ativo){

        public DadosListagemAtividade(Atividade atividade){
            this(atividade.getId(), atividade.getTitulo(), atividade.getDescricao(), atividade.getInicio(), atividade.getEncerramento(), atividade.getEstado(), atividade.getDificuldade(), atividade.getPrioridade(), atividade.getTempo_execucao(), atividade.getProjeto(), atividade.getResponsavel(),  atividade.getAtivo());
        }

    }
