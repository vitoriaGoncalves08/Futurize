package med.voll.api.atividade;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    List<Atividade> findByProjeto_Id(Long idProjeto);

    //Paginação
//    Page<Atividade> findAllByAtivoTrue(Pageable paginacao);
}
