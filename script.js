document.addEventListener('DOMContentLoaded', () => {
  const imgBox = document.getElementById('imgBox');
  const QRImage = document.getElementById('QRImage');
  const qrText = document.getElementById('qrText');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const msg = document.getElementById('msg');

  function generateQR() {
    const text = qrText.value.trim();

    msg.textContent = '';
    if (text.length === 0) {
      qrText.classList.add('error');
      setTimeout(() => qrText.classList.remove('error'), 500);
      msg.textContent = 'Please enter some text or URL!';
      return;
    }

    const src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(text);
    QRImage.src = src;
    QRImage.alt = 'QR for ' + text;

    imgBox.classList.add('show-img');
    QRImage.classList.add('fade-in');

    setTimeout(() => QRImage.classList.remove('fade-in'), 600);

    QRImage.onload = () => {
      downloadBtn.href = src;
      downloadBtn.removeAttribute('hidden');
    };

    QRImage.onerror = () => {
      msg.textContent = 'Failed to generate QR code. Please try again.';
      imgBox.classList.remove('show-img');
      downloadBtn.setAttribute('hidden', '');
    };
  }

  generateBtn.addEventListener('click', generateQR);
  qrText.addEventListener('keydown', (e) => { if (e.key === 'Enter') generateQR(); });
});
