export class ImageLoader {
  private image: HTMLImageElement;

  constructor(private imageUrl: string) {
    this.image = new Image();
  }

  load(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      this.image.onload = () => resolve(this.image);
      this.image.onerror = reject;
      this.image.src = this.imageUrl;
    });
  }
}
