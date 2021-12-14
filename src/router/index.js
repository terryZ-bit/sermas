import Vue from "vue"
import Router from "vue-router"
import login from "../components/login/login"
import signup from "../components/signup/signup"
import chooseRolePage from "../components/chooseRolePage/chooseRolePage";

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
                path: '/chooseRolePage',
                name: 'chooseRolePage',
                component: chooseRolePage
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