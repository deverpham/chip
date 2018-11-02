interface Options {
    callback: OptionsCallBack,
    config: Config
}
interface Config {

}
interface OptionsCallBack {
    (): void
}
interface startServer {
    (options: Options): void
}
interface App {
    startServer: startServer
}