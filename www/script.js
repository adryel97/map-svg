document.addEventListener('DOMContentLoaded', function () { 
// Seu objeto de dados
var data = {
    pais: ["BR", "AR", "JP"]
  };
const svg = document.querySelector('svg');

// Carregue o ícone SVG
fetch('point.svg')
  .then(response => response.text())
  .then(svgData => {
    // Itere sobre os IDs dos países no objeto de dados
    data.pais.forEach(function (countryId) {
      // Encontre o país pelo ID
      const countryPath = document.getElementById(countryId);
      if (!countryPath) {
        console.error(`País com o ID ${countryId} não encontrado.`);
        return;
      }

      // Obtenha o bounding box do país
      const bbox = countryPath.getBBox();

      // Calcula as coordenadas do ponto no centro do país
      const centerX = bbox.x + bbox.width / 2;
      const centerY = bbox.y + bbox.height / 2;

      // Crie um elemento SVG a partir dos dados do ícone
      const svgElement = new DOMParser().parseFromString(svgData, 'image/svg+xml').querySelector('svg');

      // Defina as coordenadas do elemento SVG
      svgElement.setAttribute('x', centerX - 10); // Ajuste para centralizar o ícone
      svgElement.setAttribute('y', centerY - 10); // Ajuste para centralizar o ícone
      // Adicione o atributo 'target' com o valor do 'countryId'
      svgElement.setAttribute('target', countryId);

      // Adicione o elemento SVG ao SVG principal
      svg.appendChild(svgElement);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar o ícone SVG:', error);
  });
  
})

function ScalePais(countryId, btn) {
    const svgElement = document.querySelector(`svg [target="${countryId}"]`);
    const originalWidth = svgElement.getAttribute('width'); 
    const originalHeight = svgElement.getAttribute('height');
    const buttons = document.querySelectorAll(".btn_pais");
    // Seu objeto de dados
    var data = {
        pais: ["BR", "AR", "JP"]
    };

    const ScaleUp = () => {
        const newWidth = originalWidth * 1.5; // Aumentar a largura em 50%
        const newHeight = originalHeight * 1.5; // Aumentar a altura em 50%
  
        // Aplique o novo tamanho ao ícone SVG
        svgElement.setAttribute('width', newWidth);
        svgElement.setAttribute('height', newHeight);
    }

   

    if (!btn.classList.contains("active")) {
        // Remove a classe "active" de todos os botões com a classe "btn_pais"
        buttons.forEach(function(botao) {
            botao.classList.remove("active");
        });
        
        // Adiciona a classe "active" apenas ao botão clicado
        btn.classList.add("active");

        // Chama sua função ScaleUp
        ScaleUp();
    } else {
        return
    }
   
    
    //Faz um filtro trazendo outros pais fora o que foi clicado
    var result = data.pais.filter((data) => {
        return data != countryId
    })

    //Após o resultado, ele chama para o tamanho deles original
    result.forEach(idPais => {
        const otherSvgElement = document.querySelector(`svg [target="${idPais}"]`);
        if (otherSvgElement) {
            otherSvgElement.setAttribute('width', originalWidth);
            otherSvgElement.setAttribute('height', originalHeight);
        }
    });

   
}
