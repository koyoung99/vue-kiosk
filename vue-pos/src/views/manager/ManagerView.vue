<template>
    <div class="wrap">
        <header class="ManagerMainHeader">
            <router-link to="/manager/loginform" class="home"><img src="@/assets/images/home_icon.png">
            </router-link>
            <router-link to="/setting" class="logoImg"><img src="@/assets/images/attention.png"></router-link>
            <ul>

                <li><router-link to="/manager">메뉴등록</router-link></li>
                <li><router-link to="/chart/main">총매출</router-link></li>
                <li><router-link to="/chart/coffeeview">카테고리매출</router-link></li>

            </ul>
        </header>
        <div class="inner">
            <h1 class="h1Box">메뉴등록</h1>

            <form v-on:submit.prevent="menuInsert" class="insertMenuBox" action="">
                <div class="categoryBox">
                    <select v-model="productVo.category" class="category" id="category">
                        <option disabled value="">카테고리선택</option>
                        <option>커피</option>
                        <option>논커피</option>
                        <option>밀크쉐이크</option>
                        <option>스무디/프라페</option>
                        <option>디저트</option>
                    </select>
                </div>

                <div class="textBox">
                    <label for="menuName"><strong>메뉴명</strong></label>
                    <input type="text" name="menuName" id="menuName" v-model="productVo.name">

                    <label for="menuPrice"><strong>가격</strong></label>
                    <input type="text" name="menuPrice" id="menuPrice" v-model="productVo.price">
                </div>


                <button class="submitBtn" type="submit">등록</button>
            </form>

            <div class="listBox">
                <div class="listBoxTitle">

                    <h1 v-on:click.prevent="getList('all')">메뉴 리스트</h1>
                    <select v-model="listCate" v-on:click="getList()" class="category" id="category">
                        <option value="">전체카테고리</option>
                        <option>커피</option>
                        <option>논커피</option>
                        <option>밀크쉐이크</option>
                        <option>스무디/프라페</option>
                        <option>디저트</option>
                    </select>
                </div>
                <div>
                    <table>
                        <colgroup>
                            <col style="width: 30px;">
                            <col style="width: 100px;">
                            <col style="width: 120px;">
                            <col style="width: 120px;">
                            <col style="width: 40px;">
                            <col style="width: 40px;">
                            <col style="width: 50px;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>카테고리</th>
                                <th>메뉴</th>
                                <th>가격</th>
                                <th>삭제</th>
                                <th>수정</th>
                                <th>이미지</th>
                            </tr>
                        </thead>
                        <tbody v-bind:key="i" v-for="(productVo, i) in menuList">
                            <tr v-if="productVo.no != modifyNo">
                                <td>{{ productVo.no }}</td>
                                <td>{{ productVo.category }}</td>
                                <td>{{ productVo.name }}</td>
                                <td>{{ numberWithCommas(productVo.price) }}</td>
                                <td>
                                    <button v-on:click.prevent="menuDelete(productVo.no, i)"
                                        class="modifyBtn">삭제</button>
                                </td>
                                <td>
                                    <button class="modifyBtn" v-on:click="modifyMenu(productVo.no)">수정</button>
                                </td>
                                <td>
                                    <button v-on:click.prevent="imgModal(productVo.no, productVo.name)"
                                        class="modifyBtn">등록</button>
                                </td>
                            </tr>
                            <tr v-else>
                                <td>{{ productVo.no }}</td>
                                <td>
                                    <select v-model="productVo.category" class="category" id="category">
                                        <option disabled>카테고리 선택</option>
                                        <option>커피</option>
                                        <option>논커피</option>
                                        <option>밀크쉐이크</option>
                                        <option>스무디/프라페</option>
                                        <option>디저트</option>
                                    </select>
                                </td>
                                <td><input class="category categoryName" type="text" name="name" id=""
                                        v-model="productVo.name"></td>
                                <td><input class="category categoryPrice" type="text" name="price" id=""
                                        v-model="productVo.price"></td>
                                <td>
                                    <button></button>
                                </td>
                                <td>
                                    <button class="modifyBtn" v-on:click.prevent="modifyUpload(productVo)">완료</button>
                                </td>
                                <td>
                                    <button v-on:click.prevent="imgModal(productVo.no, productVo.name)"
                                        class="modifyBtn">등록</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> <!-- //inner -->

    </div> <!--//wrap-->
    <div class="imgModalBox" v-show="modalOpen">
        <div class="imgModal">
            <span class="closeBtn" v-on:click="closeModal">X</span>
            <h1>이미지 등록</h1>

            <div class="textbox">
                <!-- <span>제품번호</span>
                <span>{{ productVo.no }}</span> -->


                <span>제품명 :</span>
                <span>{{ productVo.name }}</span>
            </div>

            <form v-on:submit.prevent="uploadFile(productVo.no)" action="">
                <input type="hidden" name="no" id="" v-model="productVo.no">
                <input v-on:change="selectFile" type="file" name="file" id="">
                <div>
                    <button type="submit" class="modifyBtn modalModifyBtn">등 록</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import "@/assets/css/ManagerView.css"

import axios from 'axios';

export default {
    name: "ManagerView",
    components: {},
    data() {
        return {
            file: "",
            menuList: [],
            productVo: {
                no: "",
                name: "",
                price: "",
                category: "",

            },
            modalOpen: false,
            modifyNo: "",
            listCate: ""
        };
    },
    methods: {
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        getList(cate) {
            console.log("카테고리리스트: " + this.listCate);
            if(cate === "all"){
                this.listCate = "";
            }
            axios({
                method: 'post', // put, post, delete
                url: 'http://localhost:9000/attention/managers/categorylist',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: {category: this.listCate}, //get방식 파라미터로 값이 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.menuList = response.data.apiData;

            }).catch(error => {
                console.log(error);
            });
        },
        menuInsert() {
            console.log("메뉴 등록");

            if (this.productVo.name == "" || this.productVo.price == "" || this.productVo.category == "") {
                alert("정보를 모두 입력해주세요");
            } else {
                axios({
                    method: 'post', // put, post, delete
                    url: 'http://localhost:9000/attention/managers/list',
                    headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                    //params: guestbookVo, //get방식 파라미터로 값이 전달
                    data: this.productVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response); //수신데이타
                    console.log(this.productVo); //수신데이타

                    this.productVo.name = "";
                    this.productVo.price = "";
                    this.productVo.category = "";

                    this.getList();

                }).catch(error => {
                    console.log(error);
                });

            }

        },
        menuDelete(no, i) {
            console.log("메뉴 삭제" + no);
            axios({
                method: 'delete', // put, post, delete
                url: 'http://localhost:9000/attention/managers/list/' + no,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.productVo.no, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타

                //삭제가 정상적으로 완료
                if (response.data.result == "success" && response.data.apiData == "삭제완료") {
                    alert("삭제가 완료되었습니다\n(삭제할 이미지가 없습니다.)");
                    this.menuList.splice(i, 1); //화면에서 삭제
                } else if (response.data.result == "success" && response.data.apiData == "이미지") {
                    alert("삭제가 완료되었습니다");
                    this.menuList.splice(i, 1); //화면에서 삭제
                } else { //삭제 실패시
                    alert("삭제실패");
                }

            }).catch(error => {
                console.log(error);
            });
        },
        selectFile(event) {
            console.log("파일선택");
            this.file = event.target.files[0];

        },
        imgModal(no, name) {
            console.log("이미지 등록 모달창 오픈");
            this.modalOpen = true;
            this.productVo.no = no;
            this.productVo.name = name;

        },
        closeModal() {
            console.log("이미지 등록 모달창 닫기");
            this.modalOpen = false;
            this.productVo.name = "";
        },
        uploadFile(no) {
            console.log("파일업로드" + no);

            //서버에 전송할 형태(여러개 담을 수 있음)
            let formData = new FormData();
            formData.append("file", this.file);
            formData.append("no", this.productVo.no);

            // data로 보낸다(json 방식이 아님)

            axios({
                method: 'post', // put, post, delete
                url: 'http://localhost:9000/attention/managers/attach',
                headers: { "Content-Type": "multipart/form-data" }, //전송타입
                data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달 -requestbody로 받아야함
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                console.log(response.data.apiData); //수신데이타
                console.log(response.data); //수신데이타


                alert("이미지 등록에 성공했습니다");

                this.modalOpen = false;
                this.productVo.name = "";

            }).catch(error => {
                console.log(error);
            });

        },
        modifyMenu(no) {
            console.log("수정버튼");
            console.log(no);
            this.modifyNo = no;
        },
        modifyUpload(pVo) {
            console.log("수정완료");
            console.log(pVo);
            this.modifyNo = "";
        }
    },
    created() {
        //this.getList();
        this.getList()
    }
};
</script>