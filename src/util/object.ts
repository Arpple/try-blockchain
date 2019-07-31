export namespace Obj {
  export const patch = <A>(pa: Partial<A>) => (a: A): A => ({ ...a, ...pa })
}
