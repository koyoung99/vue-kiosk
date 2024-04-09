<template>
    <div>
        <div class="wrap">

            <AppHeader />

            <div class="title">
                <h1>포인트 적립</h1>
            </div><!--title-->

            <form v-on:submit.prevent="savePoint" action="">
                <div class="hpInput">
                    <h2>핸드폰번호를 입력해주세요</h2>
                    <p>결제금액의 1% 적립됩니다</p>
                    <p class="showHp">{{ userVo.hp }}</p>
                    <div class="hpBtn">
                        <span v-for="(num, i) in 9" :key="i"><!--숫자패드-->
                            <button type="button" v-on:click="hpInput(num)">{{ num }}</button>
                            <!-- 3의배수마다 개행-->
                            <span v-if="num % 3 == 0"><br></span>
                        </span>
                        <div class="hplastBtn">
                            <button type="button" v-on:click="hpInput(0)">0</button>
                            <button type="button" v-on:click="hpInput(-1)">지우기</button>
                        </div>
                    </div><!--hpBtn-->
                </div><!--hpInput-->

                <div class="pointBtn">
                    <button v-on:click.prevent="noPoint(-1)">적립취소</button>
                    <button type="submit">적립</button>
                </div>
            </form>

            <div class="footer"></div>

        </div><!--wrap-->

        <div class="point-modal" v-show="showModal">
            <div class="modal-content">
                <h2>적립을 취소하시겠습니까?</h2>
                <div class="pointBtn">
                    <button v-on:click.prevent="closeModal()">취소</button>
                    <button v-on:click.prevent="nextPage(1)">확인</button>
                </div>
            </div>
        </div><!--no-point-modal-->

        <div class="point-modal" v-show="showSave">
            <div class="modal-content">
                <h2>{{ userVo.point }}포인트 적립되었습니다</h2>
                <div class="pointOkBtn">
                    <button v-on:click.prevent="nextPage(2)">확인</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import '@/assets/css/main/attention.css'
import '@/assets/css/payment/payment.css'
import AppHeader from '@/components/AppPayHeader.vue'

export default {
    name: "PointSaveView",
    components: {
        AppHeader
    },
    data() {
        return {
            showModal: false,
            showSave: false,
            userVo: {
                hp: "",
                point: ""
            },
            noSave: true,
            isPoint: false
        };
    },
    methods: {
        noPoint(no) { //적립취소
            console.log("적립안함");
            if (no == -1) {
                this.showModal = true;
            } else {
                this.showSave = true;
            }
        },
        closeModal() {  //적립취소-확인
            console.log("모달창닫기");
            this.showModal = false;//모달창 닫기
            this.showSave = false;
        },
        nextPage(no) {
            console.log("다음페이지");
            this.showModal = false;//모달창 닫기
            this.showSave = false;
            if(no == 1){    //적립취소
                let uVo = {
                    no : 1,
                    point : 0
                }
                this.$store.commit("setUserVo", uVo)
            } else if(no == 2){
                this.$store.commit("setUserVo", this.userVo);
            }
            console.log(this.$store.state.paymethod);

            if (this.$store.state.paymethod == "card") {
                console.log("카드결제");
                this.$router.push("/pays/card");
            } else if (this.$store.state.paymethod == "cupon") {
                console.log("모바일쿠폰결제");
                this.$router.push("/pays/mobile");
            } else if (this.$store.state.paymethod == "pay") {
                console.log("페이결제");
                this.$router.push("/pays/others");
            }


        },
        hpInput(no) {
            console.log('번호클릭' + no);

            //입력받은수가 -1이면 삭제
            if (no == -1) {
                let del = this.userVo.hp.charAt(this.userVo.hp.length - 2);
                console.log("삭제" + del);

                //지울 숫자 앞에 하이픈이 붙어있으면 하이픈까지삭제)
                if (del == "-") {
                    this.userVo.hp = this.userVo.hp.slice(0, -2);
                } else { //없으면 숫자만 삭제
                    this.userVo.hp = this.userVo.hp.slice(0, -1);
                }

            } else {
                //저장된 숫자의 길이가 핸드폰번호길이(11)보다 짧으면저장
                if (this.userVo.hp.length < 13) {
                    //하이픈 추가
                    if (this.userVo.hp.length === 3 || this.userVo.hp.length === 8) {
                        this.userVo.hp += "-";
                    }
                    this.userVo.hp += no;
                }
            }

            //넘길데이터에는 하이픈 빼주기
            console.log("temp: " + this.userVo.hp);
        },
        savePoint() {
            console.log("포인트 적립");
            this.userVo.point = this.$store.state.total * 0.01;
            this.$store.commit("setSavePoint", this.userVo.point);
            if (this.noSave == true && this.userVo.hp.length != 13) {
                console.log("길이가 짧습니다");
            } else {
                this.showSave = true;
                console.log("포인트 적립: " + this.userVo.hp + "(" + this.userVo.point + ")");

            }
        }
    },
    created() {
    }
};
</script>

<style></style>