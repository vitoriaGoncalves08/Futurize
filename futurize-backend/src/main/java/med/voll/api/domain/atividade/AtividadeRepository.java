package med.voll.api.domain.atividade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    List<Atividade> findByProjeto_Id(Long idProjeto);

    @Query("SELECT a.estado, COUNT(a) FROM atividade a WHERE a.responsavel = :userId GROUP BY a.estado")
    Long countAtividadesByUserId(Long userId);

    @Query("SELECT COUNT(a) FROM atividade a LEFT JOIN alocacao_atividade aa WHERE aa.usuario.id = :userId AND a.estado = 'EM_ANDAMENTO'")
    Long countAtividadesAndamentoByUserId(Long userId);

    @Query("SELECT COUNT(a) FROM atividade a WHERE a.projeto.id = :projetoId AND a.estado = 'CONCLUIDO'")
    Long countAtividadesConcluidasByProjetoId(Long projetoId);
}
