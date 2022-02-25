interface IGameOver {
  draw: (canvas: HTMLCanvasElement) => void;
}

export class GameOver implements IGameOver {
  public draw(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image(250, 134);
    img.src = '/assets/images/gameOver.png';
    img.onload = () => ctx.drawImage(img, 10, canvas.height / 3);

    ctx.fillStyle = '#002758';
    ctx.globalAlpha = 0.95;
    const gradient = ctx.createRadialGradient(
      canvas.width / 3,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      620
    );

    gradient.addColorStop(0, '#0022a2');
    gradient.addColorStop(1, 'black');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
