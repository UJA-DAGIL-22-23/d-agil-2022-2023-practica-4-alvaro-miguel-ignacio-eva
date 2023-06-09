/**
 * @file proxy-routes.js
 * @description Objeto que almacena las rutas que deben ser consideradas por el proxy.
 * Cualquier URL que empiece por /personas es derivada al ms de personas; igual para /proyectos, etc.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */



const ROUTES = [
    {
        url: '/Quidditch',
        proxy: {
            target: "http://localhost:8002",
            changeOrigin: true,
            pathRewrite: {
                [`^/Quidditch`]: '',
            },
        }
    },
    {
        url: '/BADMINTON',

        proxy: {
            target: "http://localhost:8003",
            changeOrigin: true,
            pathRewrite: {
                [`^/BADMINTON`]: '',
            },
        }
    },
    {
        url: '/Rugby',

        proxy: {
            target: "http://localhost:8004",
            changeOrigin: true,
            pathRewrite: {
                [`^/Rugby`]: '',
            },
        }
    },
    {
        url: '/Automovilismo',

        proxy: {
            target: "http://localhost:8005",
            changeOrigin: true,
            pathRewrite: {
                [`^/Automovilismo`]: '',
            },
        }
    },
]

exports.routes = ROUTES;