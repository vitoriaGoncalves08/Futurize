package med.voll.api.projeto;

import java.util.Date;

public record DadosListagemProjeto(String titulo, Date inicio, Date encerramento, Estado estado) {
    public DadosListagemProjeto(Projeto projeto){
        this(projeto.getTitulo(), projeto.getInicio(), projeto.getEncerramento(), projeto.getEstado());
    }

}
