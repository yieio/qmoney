<template>
  <div class="container">
    <a-card title="查一查您的信用卡积分可换多少钱？" :bordered="false" style="margin:10px;" class="q-container">   
      <a-form> 
        <div> 
          <a-form-item label="选择信用卡开卡银行">
            <a-radio-group
              @change="handleBankChange"
              v-model="selectBankName"
              :default-value="selectBankName"
            >
              <a-radio-button
                class="bank-item"
                v-for="(bank,index) in oftenBankNames"
                v-bind:key="index"
                :value="bank.name"
              >{{bank.simpleName}}</a-radio-button>
            </a-radio-group> 
            <a-select
              showSearch
              placeholder="输入查询"
              v-model="selectBankName"
              style="width: 100%"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              @change="handleBankChange"
            >
              <a-select-option
                v-for="(bank,index) in bankNames"
                v-bind:key="index"
                :value="bank"
              >{{bank}}</a-select-option>
            </a-select>

            <a-radio-group
              style="display:none;"
              @change="handleTypeChange"
              :default-value="exchangeType"
              v-model="exchangeType"
            >
              <a-radio-button
                v-for="(etype,index) in exchanges"
                v-bind:key="index"
                :value="etype.uPrice"
              >{{etype.productName}}</a-radio-button>
            </a-radio-group> 
          <div class="ant-col ant-form-item-label" style="padding:0; padding-top:8px;"><label title="输入您的信用卡积分" class="">输入您的信用卡积分</label></div>
            <a-input
              name="score"
              class="score-input"
              placeholder="信用卡积分"
              @change="handleScoreChange"
              v-model="scoreNum"
              type="tel"
              :allowClear="true"
            />
          </a-form-item>
          <a-form-item>
            <label class="money-label">可兑换金额（元）：</label>
            <span class="money">{{money}}</span>
          </a-form-item>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { scoreList, bankNames } from "../data/score.js";

export default {
  name: "QIndex",
  props: {},
  data: () => {
    return {
      scoreList: scoreList,
      bankNames: bankNames,
      selectBankName: "",
      oftenBankNames: [
        { simpleName: "工行", name: "工商银行" },
        { simpleName: "建行", name: "建设银行" },
        { simpleName: "农行", name: "农业银行" },
        { simpleName: "招行", name: "招商银行" },
        { simpleName: "中行", name: "中国银行" },
        { simpleName: "浦发", name: "浦发银行" },
        { simpleName: "兴业", name: "兴业银行" },
        { simpleName: "民生", name: "民生银行" }
      ],
      exchanges: [],
      exchangeType: "0",
      scoreNum: 10000
    };
  },

  computed: {
    money: function() {
      if (this.scoreNum == null) {
        return 0;
      }

      return ((this.scoreNum / 10000) * parseFloat(this.exchangeType)).toFixed(
        2
      );
    }
  },

  created: function() { 
  },
  methods: {
    handleBankChange: function() { 
      this.exchanges = this.getExchangeType(this.selectBankName);
      this.exchangeType = this.getBestExchangeType(this.exchanges); 
    },

    handleTypeChange: function() { 
    },

    handleScoreChange: function() {
    },

    /**
     * 获取银行可兑换类型
     */
    getExchangeType: function(bankName) {
      console.log(bankName);
      var exchanges = [];
      for (var i = 0; i < scoreList.length; i++) {
        var item = scoreList[i];
        if (bankName == item.bankName) {
          exchanges.push(item);
        }
      }
      return exchanges;
    },

    getBestExchangeType: function(exchanges) {
      var etype = 0;
      for (var i = 0; i < exchanges.length; i++) {
        var item = exchanges[i];
        var uprice = parseFloat(item.uPrice);
        if (uprice > etype) {
          etype = uprice;
        }
      }
      return etype + "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    border: solid 0.1px #f1f1f1;
}
.q-container { 
}
.money {
  font-size: 1.8rem;
  color: #e22f92;
}

.bank-item {
  margin-bottom: 5px;
}
</style>