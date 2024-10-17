package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.domain.atividade.*;
import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.atividade.AtividadeRepository;
import med.voll.api.domain.atividade.DadosListagemAtividade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("Atividade")
public class AtividadeController {
    @Autowired
    private AtividadeRepository repository;

    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public void CadastrarAtividade(@RequestBody @Valid DadosCadastroAtividade dadosCadastroAtividade){
        repository.save(new Atividade(dadosCadastroAtividade));
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public List<DadosListagemAtividade> listarAtividade(@PathVariable Long id){
        return repository.findByProjeto_Id(id)
                .stream()
                .map(DadosListagemAtividade::new)
                .collect(Collectors.toList());
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity AtualizarAtividade(@PathVariable Long id, @RequestBody @Valid DadosAtualizarAtividade dadosAtualizarAtividade){
        var atividade = repository.getReferenceById(id);
        atividade.atualizarInformacoes(dadosAtualizarAtividade);
        return ResponseEntity.ok(new DadosListagemAtividade(atividade));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity ExcluirAtividade(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Transactional
    @PutMapping("/{id}/tempo-execucao")
    public ResponseEntity<?> atualizarTempoExecucao(@PathVariable Long id, @RequestBody Map<String, Integer> tempoExecucao) {
        try {
            System.out.println("Atualizando tempo de execução para atividade ID: " + id + " com tempo: " + tempoExecucao);
            Atividade atividade = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Atividade não encontrada com id: " + id));

            int horas = tempoExecucao.get("horas");
            int minutos = tempoExecucao.get("minutos");
            int segundos = tempoExecucao.get("segundos");

            // Converter o tempo já salvo (em formato "HH:mm:ss") para segundos
            String[] partesTempoSalvo = atividade.getTempo_execucao().split(":");
            int horasSalvas = Integer.parseInt(partesTempoSalvo[0]);
            int minutosSalvos = Integer.parseInt(partesTempoSalvo[1]);
            int segundosSalvos = Integer.parseInt(partesTempoSalvo[2]);
            int tempoAtualSegundos = horasSalvas * 3600 + minutosSalvos * 60 + segundosSalvos;

            // Converter o novo tempo para segundos
            int novoTempoSegundos = horas * 3600 + minutos * 60 + segundos;

            // Somar os tempos
            int totalTempoSegundos = tempoAtualSegundos + novoTempoSegundos;

            // Converter de volta para o formato "HH:mm:ss"
            int totalHoras = totalTempoSegundos / 3600;
            int totalMinutos = (totalTempoSegundos % 3600) / 60;
            int totalSegundos = totalTempoSegundos % 60;

            String totalTempoFormatado = String.format("%02d:%02d:%02d", totalHoras, totalMinutos, totalSegundos);
            atividade.setTempo_execucao(totalTempoFormatado);
            repository.save(atividade);

            return ResponseEntity.ok("Tempo de execução atualizado com sucesso para a atividade com id: " + id);

        } catch (RuntimeException e) {
            System.err.println("Erro de runtime ao processar a requisição: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno ao processar a requisição: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Erro desconhecido ao processar a requisição: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro desconhecido ao processar a requisição: " + e.getMessage());
        }
    }

    @Transactional
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> atualizarEstadoAtividade(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        try {
            String novoEstado = requestBody.get("estado");
            Optional<Atividade> atividadeOptional = repository.findById(id);

            if (atividadeOptional.isPresent()) {
                Atividade atividade = atividadeOptional.get();
                atividade.setEstado(Estado.valueOf(novoEstado));
                repository.save(atividade);
                return ResponseEntity.ok("Estado da tarefa atualizado com sucesso.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Atividade não encontrada.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Estado inválido fornecido.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o estado da atividade.");
        }
    }

    //PAGINAÇÂO

/*    @CrossOrigin("*")
    @GetMapping
    public Page<DadosListagemAtividade> ListarAtividades(@PageableDefault(sort = {}) Pageable paginacao){
        return repository.findAllByAtivoTrue(paginacao).map(DadosListagemAtividade::new);
    }*/

/*    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirAtividade(@PathVariable Long id){
        var atividade = repository.getReferenceById(id);
        atividade.excluir();
    }*/


//    @CrossOrigin("*")
//    @GetMapping("/status")
//    public List<Atividade> encontrarPorStatus(String status){
//        return AtividadeRepository.findByStatus(status);
//    }
}
