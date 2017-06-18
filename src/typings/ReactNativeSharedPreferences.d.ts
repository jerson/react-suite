declare module 'react-native-shared-preferences' {
    export function getItem(key: string, callback?: (result?: string) => void): Promise<string>

    export function setItem(key: string, value: string, callback?: (error?: Error) => void): Promise<void>

    export function removeItem(key: string, callback?: (error?: Error) => void): Promise<void>


}
