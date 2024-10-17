package med.voll.api.domain.projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    List<Projeto> findByGestor(Long gestor);
    Optional<Projeto> findById(Long id);


    @Query("SELECT COUNT(p) FROM Projeto p WHERE p.gestor = :userId AND p.estado = 'CONCLUIDO'")
    Long countProjetosConcluidos(Long userId);

    @Query("SELECT p.titulo, COUNT(a) FROM Projeto p " +
            "JOIN atividade a ON a.projeto.id = p.id " +
            "WHERE a.estado = 'CONCLUIDO' AND a.responsavel.id = :responsavelId " +
            "GROUP BY p.titulo")
    List<Object[]> countConcludedActivitiesByProject(@Param("responsavelId") Long responsavelId);


}