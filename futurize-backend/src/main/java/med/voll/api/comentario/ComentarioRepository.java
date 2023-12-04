package med.voll.api.comentario;

import med.voll.api.atividade.Atividade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByAtividadecomentada_Id(Long idAtividade);

}

