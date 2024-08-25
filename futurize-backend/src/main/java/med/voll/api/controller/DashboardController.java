package med.voll.api.controller;

import med.voll.api.domain.alocacaoProjeto.AlocacaoProjetoRepository;
import med.voll.api.domain.atividade.AtividadeRepository;
import med.voll.api.domain.projeto.ProjetoRepository;
import med.voll.api.domain.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/projetos-alocados/{userId}")
    public ResponseEntity<Long> getTotalProjetosAlocados(@PathVariable Long userId) {
        Long total = aloProjetoRepository.countProjetosAlocados(userId);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/projetos-concluidos/{userId}")
    public ResponseEntity<Long> getTotalProjetosConcluidos(@PathVariable Long userId) {
        Long total = projetoRepository.countProjetosConcluidos(userId);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/atividades/{userId}")
    public ResponseEntity<Long> getTotalAtividades(@PathVariable Long userId) {
        Long total = atividadeRepository.countAtividadesByUserId(userId);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/atividades-andamento/{userId}")
    public ResponseEntity<Long> getTotalAtividadesAndamento(@PathVariable Long userId) {
        Long total = atividadeRepository.countAtividadesAndamentoByUserId(userId);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/atividades-concluidas-por-projeto/{projetoId}")
    public ResponseEntity<Long> getTotalAtividadesConcluidasPorProjeto(@PathVariable Long projetoId) {
        Long total = atividadeRepository.countAtividadesConcluidasByProjetoId(projetoId);
        return ResponseEntity.ok(total);
    }
}
