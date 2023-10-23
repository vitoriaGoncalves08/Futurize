package med.voll.api.atividade;


import java.util.Date;

public record DadosListagemAtividade(long id, String titulo, String descricacao, Date inicio, Date encerramento, Status status) {

    public DadosListagemAtividade(Atividade atividade){
        this(atividade.getID(), atividade.getTitulo(), atividade.getDescricao(), atividade.getInicio(), atividade.getEncerramento(), atividade.getStatus());
    }

}
