package med.voll.api.domain.comentario;

import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.comentario.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByAtividadeComentada_Id(Long idAtividade);
}