<template>
  <div class="KHQ bg_white">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 头部信息 -->
    <div class="title col_3 font_28 txt_c">{{NAME}}</div>
    <!-- 中间部分 -->
    <div class="KHQ_c box_b">
      <form id="KHQ_form" action="#">

        <div v-for="(item,i) in data" :key="item.ID" >
          <!-- 输入框 -->
          <div v-if="data[i].FIELDTYPE===0" class="KHQ_formCell box_pad3">
            <div class="fx">
              <div class="fx_3">{{item.NAME}}</div>
              <div class="fx_2">
                <input type="text" v-model="data[i].ANSWER" placeholder="请输入...">
              </div>
            </div>
          </div>
          <!-- 单选框 -->
          <div v-if="data[i].FIELDTYPE===2" class="KHQ_formItem">
            <div>{{item.NAME}}</div>
            <ul class="clearfix">
              <li v-for="(detail,ind) in item.DETAIL">           
                <label :for="item.ID + detail.index">
                  <input :id="item.ID + detail.index" 
                    type="radio" 
                    :value="detail.index" 
                    v-model="data[i].ANSWER">
                  {{detail.name}}
                </label>            
              </li>          
            </ul>
          </div>
          <!-- 多选框 -->
          <div v-if="data[i].FIELDTYPE===1" class="KHQ_formItem">
            <div>{{item.NAME}}</div>
            <ul class="clearfix">
              <li v-for="(detail,ind) in item.DETAIL">           
                <label :for="item.ID + detail.index">
                  <input :id="item.ID + detail.index" 
                    type="checkbox" 
                    :value="detail.index" 
                    v-model="data[i].ANSWER">
                  {{detail.name}}
                </label>            
              </li>             
            </ul>
          </div>

        </div>


        <!-- 单选框 -->
        <!-- <div class="KHQ_formItem">
          <div>性别</div>
          <ul class="clearfix">
            <li>           
              <label for="one1">
                <input id="one1" type="radio" name="gender" value="one" v-model="gender">
                先生
              </label>            
            </li>
            <li>           
              <label for="two1">
                <input id="two1" type="radio" name="gender" value="two" v-model="gender">
                女士
              </label>            
            </li>            
          </ul>
        </div> -->
        <!-- 多选框 -->
        <!-- <div class="KHQ_formItem">
          <div>饮酒史</div>
          <ul class="clearfix">
            <li>           
              <label for="one">
                <input id="one" type="checkbox" name="yinjiu" value="one" v-model="yinjiu">
                少量或者偶尔
              </label>            
            </li>
            <li>           
              <label for="two">
                <input id="two" type="checkbox" name="yinjiu" value="two" v-model="yinjiu">
                少量或者偶尔
              </label>            
            </li>
            <li>           
              <label for="three">
                <input id="three" type="checkbox" name="yinjiu" value="three" v-model="yinjiu">
                少量或者偶尔
              </label>            
            </li>
          </ul>
        </div> -->
        <!--输入框 -->
        <!-- <div class="KHQ_formCell box_pad3">
          <div class="fx">
            <div class="fx_3">你的学习成绩怎么样?</div>
            <div class="fx_2">
              <input type="text" value="" placeholder="请输入...">
            </div>
          </div>
        </div> -->
        
        


      </form>
    </div>
    
    
    <div class="act_but txt_c font_30 color_white" @click="submitFn">提 &nbsp;交 </div>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
export default {
  name: 'khq',
  components: {
    myHeader: HeaderBack,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back", 
        HBC_text:"健康问卷", 
        HBR_icon: " ",
      },
      colRed: false,
     
      userId:'c263b379f6244c3da428535a48b77ed8',
      ID: '',
      NAME: '健康问卷',
      data:[
        {
          DEL:true,
          DETAIL:"",
          FIELDGROUP:0,
          FIELDTYPE:0,
          ID:"dad319e019df4dab8845064ef6021581",
          INFO_DETECTIONID:"e0b50de165894cada3c67b10fae58915",
          NAME:"姓名",
          SORT:1,
        }
      ],
    }
  },
  computed:{
    
  },
  methods: {
    submitFn() {
      this.actSure = true;
      let params = [];
      this.data.forEach((ele,index) => {
        let obj = {};
        obj.USERID = this.userId;
        obj.INFO_DETECTIONID = this.ID;
        obj.INFO_DETE_FIELDID = ele.ID;
        obj.ANSWER = ele.ANSWER;
        params.push(obj);
      });

      this.$http.post('/interface/infoDetection/addInfoDection',params)
        .then((data) => {
        })
    },   
  },
  created () {
    this.$http.get('/interface/infoDetection/getInfoDection',{'ID':'e0b50de165894cada3c67b10fae58915'})
      .then((data) => {
        this.ID = data.ID;
        this.NAME = data.NAME;
        this.data = data.data;              
        this.data.forEach((ele,i) => {
          this.data[i].ANSWER = "";
          let str = ele.DETAIL;
          if (ele.FIELDTYPE === 2){
            this.data[i].DETAIL = JSON.parse(str);
          } else if(ele.FIELDTYPE === 1) {
            this.data[i].ANSWER = [];
            this.data[i].DETAIL = JSON.parse(str);
          }
        });
      });
      
  },
}
</script>

<style scoped>
.KHQ {
  padding-top: 0.75rem;
  padding-bottom: 0.5rem;
}
.KHQ_formItem{
  padding-left: 0.3rem;
  padding-bottom: 0.1rem;
  border-bottom: 1px solid #e5e5e5;
}
.KHQ_formItem>div:first-child,
.KHQ_formItem>ul li{
  height: 0.7rem;
  line-height: 0.7rem;
}
#KHQ_form ul li{
  float: left;
  margin-right: 0.3rem; 
}
.KHQ_formCell{
  border-bottom: 1px solid #e5e5e5;
}
.KHQ_formCell>div{
  height: 0.7rem;
  line-height: 0.7rem;
}
.KHQ_formCell input{
  width: 100%;
  text-align: right;
}

/* .checked {
  width: 0.4rem;
  background-image: url("../../assets/images/icon_selector.png");
  background-size: 0.4rem 0.4rem;
}
.selected .checked {
   background-image: url("../../assets/images/icon_selected.png");
  background-size: 0.4rem 0.4rem;
} */

.act_but {
  width: 90%;
  margin: 0.5rem auto;
  padding: 0.2rem 0;
  border-radius: 0.1rem;
  background-color: #18A6AA;
}
.title {
  padding-top: 0.2rem;
}
 
</style>
