declare module 'noisejs' {
  export default class Noise {
    seed(seed: number): void;
    simplex2(x: number, y: number): number;
    perlin2(x: number, y: number): number;
    // Add other methods as needed
  }
}
