/**
 * Função para debug no console.log em desenvolvimento
 * @param args - any[] - parametros para debugar no console
 */

export const debug = (...args: any[]) => {
    if (process.env.DEBUG === "development") {
        console.log(...args)
    }
}