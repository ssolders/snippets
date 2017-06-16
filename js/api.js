const baseURL = "https://myurl.com";

export const MyServiceAPI = {
    buildUrl(path) {
        return `${baseUrl}/${path}`;
    },
    getExampleList() {
        return httpClient.get(this.buildUrl('exampleList'));
    },
    getAnotherList(params) {
        return httpClient.get(this.buildUrl('anotherlist'), {params});
    },
};
