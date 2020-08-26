type Listener = (...args: any[]) => unknown

export default class EventEmitter {
  private readonly listeners = new Map<string, Listener[]>()

  on(type: string, listener: Listener): void {
    const listeners = this.listeners.get(type) || []
    listeners.push(listener)
    this.listeners.set(type, listeners)
  }

  off(type: string, listener: Listener): void {
    const listeners = this.listeners.get(type) || []
    const index = listeners.findIndex((l) => l === listener)
    if (index >= 0) {
      listeners.splice(index, 1)
      this.listeners.set(type, listeners)
    }
  }

  emit(type: string, ...values: unknown[]): void {
    const listeners = this.listeners.get(type) || []
    listeners.forEach((l) => l(...values))
  }
}
