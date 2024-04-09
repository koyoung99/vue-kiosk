<template>

    <div class="wrap">

        <div class="card-container">

            <AppPayHeader />
            <!-- 로고부분 -->

            <div class="card-box resultContainer">

                <img class="receiptImg" src="../../assets/images/receipt.png">

                <div class="receiptList">
                    <p>주문 완료 (주문 번호 : {{ orderNo }} <!--가져와야함--> )</p>
                    <div class="order-receipt">
                        <table class="orderList">
                            <colgroup>
                                <col style="width: 220px;">
                                <col style="width: 80px;">
                                <col style="width: 120px;">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>수량</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(list, i) in cartList" v-bind:key="i">
                                    <td>{{ list.name }}</td>
                                    <td>{{ list.count }}</td>
                                    <td>{{ list.price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- order-receipt 테이블 -->

                </div>
                <!--receiptList-->

                <div class="payMsg">

                    <span class="finMsg">
                        결제 금액 : {{ this.outPrice }} 원
                    </span><br><br>
                    <!-- <hr cla> -->
                    <!-- finMsg -->


                </div>
                <div v-if="this.$store.state.userVo.no != 1" class="pointMsg">
                    {{ this.$store.state.userVo.hp }}님 보유 포인트 : <span>{{ this.outPoint }}</span> 점
                </div>
                <!-- pointMsg -->
                <!-- payMsg -->

            </div>
            <!-- card-box -->

            <div class="text-result">

                <div class="timer">
                    <span class="big">{{ timeCounter }}</span> 초 후 처음화면으로 돌아갑니다.
                </div>
                <!-- timer -->

                <router-link class="goHome" to="/">처음화면으로</router-link>

            </div>
            <!-- text-result -->

        </div>
        <!-- card-container -->

    </div>
    <!-- wrap -->

</template>

<script>
import '@/assets/css/main/attention.css';
import '@/assets/css/payment/payend.css';
import '@/assets/css/main/scrollbar.module.css'
import AppPayHeader from '@/components/AppPayHeader.vue'
import axios from 'axios';

export default {
    name: 'PayResult',
    components: {
        AppPayHeader
    },
    data() {
        return {
            timeCounter: 10, // 타이머
            resTimeData: '', // 타이머
            userVo: {}, // 결제되었습니다 밑에 정보 보여주려고 만듬
            orderNo: '', // 주문 번호
            totalPrice: 0, // 결제한 금액 총합
            outPrice: this.$store.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), // 총합이 보여질 문자열
            outPoint: "", // 보유포인트 보여질 문자열
            cartList: this.$store.state.cartList,

            billVo: { // db 에서 bill 테이블에 넣을 데이터
                userNo: "",
                total: this.$store.state.total,
                point: ""
            },
            order: this.$store.state.order
        };
    },

    methods: {

        // 결제완료된 데이터 등록, 주문번호 받아오기
        getOrderNo() {  // 결제완료되면 결제완료 페이지로 이동되고 데이터를 보내서 등록,
            console.log("결제완료");
            // 주문번호를 받아와서 화면에 표시 
            // sales 테이블에 등록할 데이터

            let data = {};
            data.billVo = this.billVo;      // bill 테이블에 등록할 데이터
            data.list = this.cartList;


            axios({
                method: 'post', // put, post, delete
                url: 'http://localhost:9000/attention/pays',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                data: data,  //put, post, delete 방식 자동으로 JSON으로 변환 전달 -> requestbody
                responseType: 'json' //수신타입
            }).then(response => {
                // 등록성공하면 주문번호 가져옴
                if (response.data.result == 'success') {
                    this.orderNo = response.data.apiData;
                } else {
                    alert(response.data.message);
                }
            }).catch(error => {
                console.log(error);
            });
        },

        start() {
            // 1초에 한번씩 start 호출
            this.polling = setInterval(() => {
                this.timeCounter--; //1찍 감소
                this.resTimeData = this.prettyTime();
                if (this.timeCounter <= 0) this.timeStop();
            }, 1000)
        },
        // 시간 형식으로 변환 리턴
        prettyTime() {
            let time = this.timeCounter / 60;
            let minutes = parseInt(time);
            let secondes = Math.round((time - minutes) * 60);
            return this.pad(minutes, 2) + ":" + this.pad(secondes, 2);
        },
        // 2자리수로 만들어줌 09,08...
        pad(n, width) {
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        },
        timeStop() {
            clearInterval(this.polling);
            //this.$router.push('/'); // 시간이 0 이 되면 메인페이지로 이동
        },
        /////////////////////////////////////// 타이머 ///////////////////////////////////////
        updatePoint() {
            console.log("포인트ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ")

            this.userVo = this.$store.state.userVo;
            if (this.userVo.no != 1) {
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/attention/kiosk/savepoint', //SpringBoot주소
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    data: this.userVo,
                    responseType: 'json'
                }).then(response => {
                    console.log(response.data); //수신데이터
                    if (response.data.result == "success") {
                        console.log("적립완료");
                        //store에 보유포인트 저장
                        this.$store.commit("setUserVo", response.data.apiData);
                        console.log(this.$store.state.userVo);
                        this.outPoint = this.$store.state.userVo.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                        this.billVo.userNo = this.$store.state.userVo.no,
                            this.billVo.total = this.$store.state.total,
                            this.billVo.point = this.$store.state.savePoint

                    }
                    
                }).catch(error => {
                    console.log(error);
                });

            }
            this.getOrderNo(); // 데이터 넘기고 받기 
        }
    },
    created() {
        this.updatePoint();
        this.start(); // 타이머
        
    }
}
</script>

<style></style>