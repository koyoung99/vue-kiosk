import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state() {
        return {
            cartList : [],
            paymethod: "",   //결제방식
            userVo:{
                point: "",
                hp: "",
                no: ""  
            },
            savePoint: "",
            total: "",
            order: ""
        };
    },

    //Vuex의 상태메소드
    mutations: {
        setCartList(state,payload){
            state.cartList = payload;
        },
        setPay(state, pay){
            state.paymethod = pay
        },
        setUserVo(state, UserVo){
            state.userVo = UserVo
        },
        setSavePoint(state, savePoint){
            state.savePoint = savePoint
        },
        setTotal(state, total){
            state.total = total
        },
        setOrder(state, order){
            state.order = order
        }
    },
    //vuex-persistedstate
    //세션유지
    plugins: [
        createPersistedState({
            paths: ['cartList','payMethod', 'userVo', 'savePoint','total']

        })
    ]
});
