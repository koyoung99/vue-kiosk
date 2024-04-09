<template>
    <div class="wrap">
        <header class="coffeeHeader">
            <router-link to="/setting" class="home"><img src="@/assets/images/home_icon.png">
            </router-link>
            <router-link to="/setting" class="logoImg"><img src="@/assets/images/attention.png"></router-link>
            <ul>
                <li><router-link to="/manager">메뉴등록</router-link></li>
                <li><router-link to="/chart/main">총매출</router-link></li>
                <li><router-link to="/chart/coffeeview">카테고리매출</router-link></li>
            </ul>
        </header>

        <div>
            <div class="categoryGroup02">
                <div class="titleGroup">

                    <label>
                        <router-link to="/chart/main"> 매출현황</router-link>
                    </label>
                    <div>
                        <ul>
                            <li v-on:click="menuClcik('커피', $event)"><router-link
                                    to="/chart/coffeeview">커피</router-link>
                            </li>
                            <li v-on:click="menuClcik('논커피', $event)"><router-link to="">논커피</router-link>
                            </li>
                            <li v-on:click="menuClcik('쉐이크', $event)"><router-link to="">밀크쉐이크</router-link>
                            </li>
                            <li v-on:click="menuClcik('스무디/프라페', $event)"><router-link to="">스무디/프라페</router-link></li>
                            <li v-on:click="menuClcik('디저트', $event)"><router-link to="">디저트</router-link>
                            </li>
                        </ul>
                        <input type="date" v-model="selectedDate" v-on:change="dateChange">
                    </div>
                </div>
                <div class="chartListGorup">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>제품명</th>
                                <th>총 수량</th>
                                <th>총 금액</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-bind:key="i" v-for="(AttentionCartVo, i) in cartList">
                                <td>{{ i + 1 }}</td>
                                <td>{{ AttentionCartVo.productName }}</td>
                                <td>{{ AttentionCartVo.totalCount }}</td>
                                <td>{{ numberWithCommas(AttentionCartVo.totalPrice) }}</td>
                            </tr>

                            <tr>
                                <td colspan="2"> 총 금액</td>
                                <td colspan="2">{{ numberWithCommas(totalPricesSum) }}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div> <!-- categoryGroup -->
        </div>

    </div>
</template>


<script>
import '@/assets/css/chartCategory.css';
import axios from 'axios';
export default {
    name: "CoffeeView",
    components: {
    },
    data() {
        return {
            // 초기값으로 현재 날짜를 설정
            selectedDate: new Date().toISOString().substring(0, 10),
            cartList: [],
            totalCount: "",
            category: "커피"

        };
    },
    methods: {
        menuClcik(categoryName, event) {
            // console.log(categoryName);
            this.category = categoryName;

            // 모든 li 요소의 하위 a 요소를 선택합니다.
            const links = document.querySelectorAll(".titleGroup li a");
            console.log(links);
            // console.log(this.category);
            // 각 요소에 대해 반복하여 초기화 설정
            links.forEach(link => {
                link.style.backgroundColor = "white";
                link.style.color = "black";
                link.style.height = "22px";
            });

            // 클릭한 요소의 변경
            event.target.style.backgroundColor = "#5e2d1a";
            event.target.style.color = "white";
            event.target.style.fontWeight = "bold";
            event.target.style.borderRadius = "5px";
            event.target.style.paddingLeft="15px";
            event.target.style.paddingRight="15px";
            event.target.style.paddingTop="5px";
            event.target.style.paddingBottom="5px";
           
            this.dateChange();

        },


        dateChange() {
            //console.log(this.selectedDate);
            console.log("데이터 가져오기");
            //console.log(this.category);

            let attentionVo = {
                selectedDate: this.selectedDate, 
                category: this.category
            }
            console.log(attentionVo);
            axios({
                method: 'post',  //put,post,delete
                url: 'http://localhost:9000/attention/manager/chart/coffee',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: { selectedDate: this.selectedDate}, //get방식 파라미터로 값이 전달
                data: attentionVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                console.log(response.data.apiData); //수신데이타
                this.cartList = response.data.apiData;

            }).catch(error => {
                console.log(error);
            });


        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    },
    computed: {
        totalPricesSum() {
            return this.cartList.reduce((acc, item) => acc + item.totalPrice, 0);
        }

    }, created() {
        this.dateChange();
    }
};
</script>


<style></style>
