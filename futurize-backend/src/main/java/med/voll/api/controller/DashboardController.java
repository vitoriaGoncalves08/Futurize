package med.voll.api.controller;

import med.voll.api.domain.alocacaoProjeto.AlocacaoProjetoRepository;
import med.voll.api.domain.atividade.AtividadeRepository;
import med.voll.api.domain.projeto.ProjetoRepository;
import med.voll.api.domain.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private AlocacaoProjetoRepository aloProjetoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    //Atividades Concluídas por Projeto v
    @GetMapping("/atividades-concluidas-por-projeto/{projetoId}")
    public ResponseEntity<List<Object[]>> getTotalAtividadesConcluidasPorProjeto(@PathVariable Long projetoId) {
        List<Object[]> total = projetoRepository.countConcludedActivitiesByProject(projetoId);
        return ResponseEntity.ok(total);
    }

    //Minhas atividades v
    @GetMapping("/atividades/{userId}")
    public ResponseEntity<List<Object[]>> getTotalAtividades(@PathVariable Long userId) {
        List<Object[]> total = atividadeRepository.countAtividadesByUserId(userId);
        return ResponseEntity.ok(total);
    }

    //Projetos Criados v
    @GetMapping("/projetos-criados/{userId}")
    public ResponseEntity<Long> getTotalProjetosCriados(@PathVariable Long userId) {
        Long total = aloProjetoRepository.countProjetosCriados(userId);
        return ResponseEntity.ok(total);
    }

    //Projetos Alocados v
    @GetMapping("/projetos-alocados/{userId}")
    public ResponseEntity<Long> getTotalProjetosAlocados(@PathVariable Long userId) {
        Long total = aloProjetoRepository.countProjetosAlocados(userId);
        return ResponseEntity.ok(total);
    }

    //Projetos Concluídos v
    @GetMapping("/projetos-concluidos/{userId}")
    public ResponseEntity<Long> getTotalProjetosConcluidos(@PathVariable Long userId) {
        Long total = projetoRepository.countProjetosConcluidos(userId);
        return ResponseEntity.ok(total);
    }

    //Atividades Em Andamento
    @GetMapping("/atividades-andamento/{userId}")
    public ResponseEntity<Long> getTotalAtividadesAndamento(@PathVariable Long userId) {
        Long total = atividadeRepository.countAtividadesAndamentoByUserId(userId);
        return ResponseEntity.ok(total);
    }

}
