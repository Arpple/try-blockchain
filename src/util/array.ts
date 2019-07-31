export namespace Arr {
  export const append = <A>(a: A) => (ar: A[]): A[] => [...ar, a]
}
