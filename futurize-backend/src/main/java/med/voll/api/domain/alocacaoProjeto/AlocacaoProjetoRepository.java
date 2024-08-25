package med.voll.api.domain.alocacaoProjeto;

import med.voll.api.domain.projeto.Projeto;
import med.voll.api.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlocacaoProjetoRepository extends JpaRepository<AlocacaoProjeto, Long> {
    List<AlocacaoProjeto> findByProjeto(Projeto projeto);
    List<AlocacaoProjeto> findByUsuario(Usuario usuario);

    AlocacaoProjeto findByProjetoAndUsuario(Projeto projeto, Usuario usuario);

    @Query("SELECT a FROM alocacao_projeto a WHERE a.projeto.id = :idProjeto AND a.usuario.id = :idUsuario")
    AlocacaoProjeto findByIdProjetoAndIdUsuario(@Param("idProjeto") Long idProjeto, @Param("idUsuario") Long idUsuario);


    @Query("SELECT COUNT(p) FROM Projeto p JOIN alocacao_projeto ap ON p.id = ap.projeto.id WHERE ap.usuario.id = :userId")
    Long countProjetosAlocados(Long userId);
}
