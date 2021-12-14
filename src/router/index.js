import Vue from "vue"
import Router from "vue-router"
import login from "@/components/login/login"
import mainpage from "@/components/mainpage/mainpage"
import signup from "@/components/signup/signup"

Vue.use(Router)

export default new Router(
    {
        routes: [
            {
                path: '/',
                name: 'login',
                component: login
            },
            {
                path: '/mainPage',
                name: 'mainPage',
                component: mainpage
            },
            {
                path: '/signup',
                name: 'signup',
                component: signup
            }
        ],
        mode: "history"
    }
)