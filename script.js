    let qr;
    function gerarQRCode() {
      const conteudo = document.getElementById("text").value;
      const container = document.getElementById("qrcode");
      container.innerHTML = ""; // Limpa QR anterior

      if (!conteudo.trim()) {
        alert("Digite um texto ou URL.");
        return;
      }

      qr = new QRCode(container, {
        text: conteudo,
        width: 200,
        height: 200,
      });
      document.getElementById("preview").textContent = `Conteúdo: ${conteudo}`;
      const encoded = encodeURIComponent(conteudo);
document.getElementById("whatsapp-share").href = `https://wa.me/?text=${encoded}`;
document.getElementById("facebook-share").href = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
document.getElementById("twitter-share").href = `https://twitter.com/intent/tweet?text=${encoded}`;

  // 👇 Mostrar os links de compartilhamento
  const compartilhar = document.getElementById("compartilhar");
  compartilhar.classList.add("mostrar");

  document.getElementById("compartilhar").setAttribute("aria-hidden", "false");
    }


    function baixarQRCode() {
      const container = document.getElementById("qrcode");

      // Tenta encontrar um canvas ou img gerado pelo QRCode.js
      const canvas = container.querySelector("canvas");
      const img = container.querySelector("img");

      if (canvas) {
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else if (img) {
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = img.src;
        link.click();
      } else {
        alert("Por favor, gere um QR Code antes de baixar.");
      }
    }
      async function baixarPDF() {
    const container = document.getElementById("qrcode");
    const canvas = container.querySelector("canvas");

    if (!canvas) {
      alert("Por favor, gere um QR Code antes de baixar.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, 'PNG', 15, 40, 180, 180); // posição e tamanho
    pdf.save("qrcode.pdf");
  }

  function copiarLink() {
  const conteudo = document.getElementById("text").value;
  if (!conteudo.trim()) {
    alert("Nada para copiar.");
    return;
  }
  navigator.clipboard.writeText(conteudo).then(() => {
    alert("Link copiado para a área de transferência!");
  }).catch(err => {
    alert("Erro ao copiar link: " + err);
  });
}