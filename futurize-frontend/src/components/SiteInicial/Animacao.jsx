document.addEventListener('DOMContentLoaded', function() {
    var secoes = document.querySelectorAll('.secao');
  
    function checarVisibilidade() {
      secoes.forEach(function(secao) {
        var retangulo = secao.getBoundingClientRect();
        if (retangulo.top < window.innerHeight && retangulo.bottom >= 0) {
          secao.classList.add('ativo');
        } else {
          secao.classList.remove('ativo');
        }
      });
    }
  
    checarVisibilidade();
  
    window.addEventListener('scroll', checarVisibilidade);
  });
  