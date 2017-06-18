interface Params {
    [key: string]: string
}

declare module 'string-format' {
    function format(key: string, params: Params): string

    export = format;
}

