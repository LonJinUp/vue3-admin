<template>
  <div class="polymerization-wrapper">
    <div class="polymerization">
      <div class="polymerization-flex">
        <div class="polymerization-left">
          <div class="left-flex">
            <div class="left-title">{{ merchantStatisticsList.title }}</div>
            <div class="left-button">
              <el-radio-group v-model="merchantStatisticsList.activeName" @change="handleRadioChange">
                <el-radio-button label="untreated">昨日</el-radio-button>
                <el-radio-button label="processing">本月</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="left-conter">
            <div v-for="(item, index) in merchantStatisticsList.list" :key="index" class="left-for">
              <div class="sum">{{ item.sum }}</div>
              <div class="title">{{ item.title }}</div>
              <!-- <img :src="require(`@/${item.img}`)" alt="" class="left-img" /> -->
            </div>
          </div>
        </div>
        <div class="polymerization-boder"></div>
        <div class="polymerization-right">
          <div class="left-flex">
            <div class="left-title">{{ statisticsList.name }}</div>
            <div class="left-button">
              <el-radio-group v-model="statisticsList.activeName" @change="agentRankingChange">
                <el-radio-button label="untreated">昨日</el-radio-button>
                <el-radio-button label="processing">本月</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="right-tabel">
            <!-- v-model="filter.rankingType" -->
            <el-tabs @tab-click="updateTabData">
              <el-tab-pane v-for="(tab, index) in statisticsList.data" :key="index" :label="tab.name">
                <table class="tabel-ww">
                  <tr v-for="(item, index) in tab.data" :key="index" class="tabel">
                    <td :class="{
                      'tabel-td-one': index === 0,
                      'tabel-td-two': index === 1,
                      'tabel-td-three': index === 2,
                      'tabel-td-four': index >= 3,
                    }">
                      {{ index + 1 }}
                    </td>
                    <td class="tabel-td-name">{{ item.iavName }}</td>
                    <td class="tabel-td">{{ item.mchtNum }}个</td>
                  </tr>
                  <tr v-if="tab.data.length == 0">
                    <td class="tabel-td-zw">暂无数据</td>
                  </tr>
                </table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  merchantStatisticsList: {
    type: Object,
    default: true,
  },
  statisticsList: {
    type: Object,
    default: true,
  },
})
</script>
<style lang="scss" scoped>
.polymerization {
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-top: 20px;

  .polymerization-flex {
    display: flex;

    .polymerization-left {
      width: 50%;
      height: 100%;
      position: relative;

      .left-flex {
        display: flex;
        justify-content: space-between;

        .left-title {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #111827;
          line-height: 20px;
          margin: 20px 0px 16px 20px;
          position: relative;

          &::before {
            background-color: #456ce6;
            content: ' ';
            padding-left: 4px;
            border-radius: 0px 3px 3px 0px;
            margin-right: 8px;
          }
        }

        .left-button {
          margin-top: 15px;
          padding-right: 20px;
          position: relative;
        }
      }

      .left-conter {
        display: flex;
        margin-left: 20px;
        flex-wrap: wrap;

        .left-for {
          position: relative;
          background: #f7f8f9;
          padding: 20px 0px 40px 16px;
          margin-right: 20px;
          margin-bottom: 16px;
          width: calc(50% - 20px);

          .sum {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #456ce6;
            line-height: 26px;
          }

          .title {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #111827;
            line-height: 18px;
            position: absolute;
            z-index: 99;
          }

          .left-img {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 50px;
            width: 36px;
          }
        }
      }
    }

    .polymerization-boder {
      width: 1px;
      background: #f3f4f6;
      margin: 20px 0px;
    }

    .polymerization-right {
      width: 50%;

      .left-flex {
        display: flex;
        justify-content: space-between;

        .left-title {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #111827;
          line-height: 20px;
          margin: 20px 0px 16px 20px;

          &::before {
            background-color: #456ce6;
            content: ' ';
            padding-left: 4px;
            border-radius: 0px 3px 3px 0px;
            margin-right: 8px;
          }
        }

        .left-button {
          margin-top: 15px;
          padding-right: 20px;
        }
      }

      .right-tabel {
        line-height: 36px;
        margin-left: 20px;
        margin-right: 20px;

        .tabel {
          display: flex;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          flex-wrap: wrap;
          // box-shadow: inset 0px -1px 0px 0px #e5e7eb;
        }

        .tabel-td-one {
          width: 16px;
          height: 16px;
          background: #456ce6;
          color: #ffffff;
          border-radius: 4px;
          text-align: center;
          line-height: 16px;
          margin-top: 11px;
          font-weight: 600;
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 11px;
        }

        .tabel-td-two {
          width: 16px;
          height: 16px;

          background: #a2b5f2;
          color: #ffffff;
          border-radius: 4px;
          text-align: center;
          line-height: 16px;
          margin-top: 11px;
          font-weight: 600;
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 11px;
        }

        .tabel-td-three {
          width: 16px;
          height: 16px;

          background: #dae2fa;
          color: #ffffff;
          border-radius: 4px;
          text-align: center;
          line-height: 16px;
          margin-top: 11px;
          font-weight: 600;
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 11px;
        }

        .tabel-td-four {
          width: 16px;
          height: 16px;
          background: #cfd0d3;
          color: #ffffff;
          border-radius: 4px;
          text-align: center;
          line-height: 16px;
          margin-top: 11px;
          font-weight: 600;
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 11px;
        }

        .tabel-ww {
          width: 100%;
        }

        .tabel-td {
          width: 45%;
          line-height: 36px;
          margin-left: 10px;
          text-align: right;
        }

        .tabel-td-name {
          width: 45%;
          line-height: 20px;
          margin-left: 10px;
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
