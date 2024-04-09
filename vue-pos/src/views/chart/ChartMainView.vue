<template>
    <div class="wrap">
        <header class="chartMainHeader">
            <router-link to="/setting" class="home"><img src="@/assets/images/home_icon.png">
            </router-link>
            <router-link to="/setting" class="logoImg"><img src="@/assets/images/attention.png"></router-link>
            <ul>

                <li><router-link to="/manager">메뉴등록</router-link></li>
                <li><router-link to="/chart/main">총매출</router-link></li>
                <li><router-link to="/chart/coffeeview">카테고리매출</router-link></li>

            </ul>
        </header>
        <!-- <h1>매출현황</h1> -->

        <div>
            <div class="chartMainGorup">
                <div class="titleGroup">
                    <label>
                        <router-link to="/chart/main"> 매출현황</router-link>
                    </label>

                </div>
                <div class="chartMainGorup2">
                    <table>
                        <!-- <tr>
                                <td rowspan="8">총 매출액</td>
                            </tr> -->
                        <tr>
                            <td colspan="2">총매출</td>
                            <!-- <th>매출액</th> -->
                        </tr>
                        <tr>
                            <td colspan="2">{{ numberWithCommas(totalPricesSum) }}</td>

                            <td><input type="date" v-model="selectedDate" v-on:change="dateChange"></td>

                        </tr>
                        <tr>
                            <td>카테고리명</td>
                            <td>수량</td>
                            <td>금액</td>
                        </tr>

                        <tr v-bind:key="i" v-for="(AttentionCartVo, i) in cartList">
                            <td>{{ AttentionCartVo.category }}</td>
                            <td> {{ AttentionCartVo.totalCount }}</td>
                            <td> {{ numberWithCommas(AttentionCartVo.totalPrice) }}</td>
                        </tr>


                    </table>

                </div>
                
            </div> <!-- categoryGroup2 -->
        </div>

    </div>
</template>


<script>
import '@/assets/css/chartMain.css';
import axios from 'axios';

export default {
    name: "ChartMainView",
    components: {
    },
    data() {
        return {
            // 초기값으로 현재 날짜를 설정
            selectedDate: new Date().toISOString().substring(0, 10),
            cartList: [],
            totalCount: ""

        };
    },
    methods: {
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        dateChange() {
            console.log('date:', this.selectedDate);
            console.log("데이터 가져오기");
            console.log(this.selectedDate);

            axios({
                method: 'get',  //put,post,delete
                url: 'http://localhost:9000/attention/manager/chart/main',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: { selectedDate: this.selectedDate }, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.cartList = response.data.apiData;


            }).catch(error => {
                console.log(error);
            });
        },


    },
    computed: {
        totalPricesSum() {
            return this.cartList.reduce((acc, item) => acc + item.totalPrice, 0);
        }
    },
    created() {
        this.dateChange();
    }
    
};
</script>


<style></style>
