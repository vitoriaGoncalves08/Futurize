package med.voll.api.alocacaoProjeto;

import med.voll.api.projeto.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlocacaoProjetoRepository extends JpaRepository<AlocacaoProjeto, Long> {
    List<AlocacaoProjeto> findByProjeto(Projeto projeto);
}
