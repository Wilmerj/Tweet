const ServiceFactory = {
    serverUrl: 'http://localhost:4000', //Esto por lo general va en variables de entorno,
    vAPi: '/api/v1',
    routes: {
        search: '/search',
        retweet: '/retweet'
    }
}

export {
    ServiceFactory
}