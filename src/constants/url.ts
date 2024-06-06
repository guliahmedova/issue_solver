interface IUrlObj {
    baseUrl: string;
}

interface IUrlConfig {
    local: IUrlObj
}
const urlConfig: IUrlConfig = Object.freeze({
    local: {
        baseUrl: "https://jsonplaceholder.typicode.com"
    }
})

export default urlConfig;