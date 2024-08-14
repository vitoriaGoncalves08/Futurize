package med.voll.api.domain.projeto;

import java.util.Date;

public record DadosListagemProjeto(Long id, String titulo, Date inicio, Date encerramento, Estado estado, Long gestor) {
    public DadosListagemProjeto(Projeto projeto){
        this(projeto.getId(), projeto.getTitulo(), projeto.getInicio(), projeto.getEncerramento(), projeto.getEstado(), projeto.getGestor());
    }

}
