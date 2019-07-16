<template>
  <v-container
    grid-list-xl
    text-xs-center
  >
    <v-layout
      align-center
      justify-center
      column
      fill-height
    >
      <v-flex>
        <h1>个人简介</h1>
        <h4>个人信息+履历</h4>
      </v-flex>

      <!-- 基本信息 -->
      <v-container
        grid-list-xl
        text-xs-center
      >
        <v-divider />
        <v-layout
          align-center
          justify-center
          row
          fill-height
        >
          <v-flex
            xs12
            sm12
            md6
            lg6
            xl3
          >
            <v-card>
              <v-card-title class="green justify-center">
                <h3 class="headline white--text font-weight-light">
                  基本信息
                </h3>
              </v-card-title>
              <v-container>
                <v-layout
                  align-center
                  justify-center
                  column
                  fill-height
                >
                  <v-flex>
                    <p
                      v-for="(p, i) in basicInfo"
                      :key="i"
                      v-html="p"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>

          <!-- 扩展信息 -->
          <v-flex
            xs12
            sm12
            md6
            lg6
            xl3
          >
            <v-card>
              <v-card-title class="blue justify-center">
                <h3 class="headline white--text font-weight-light">
                  扩展信息
                </h3>
              </v-card-title>
              <v-container>
                <v-layout
                  align-center
                  justify-center
                  column
                  fill-height
                >
                  <v-flex>
                    <p
                      v-for="(p, i) in extendedInfo"
                      :key="i"
                      v-html="p"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- 文本履历 -->
      <v-flex
        xs12
        md6
        lg6
        xl6
      >
        <v-card>
          <v-card-title class="grey justify-center">
            <h3 class="headline white--text font-weight-light">
              履历
            </h3>
          </v-card-title>
          <v-container>
            <v-layout
              align-center
              justify-center
              column
              fill-height
            >
              <v-flex xs10>
                <p
                  v-for="(p, i) in resume"
                  :key="i"
                  v-html="p"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <!-- 时间轴履历 -->
      <v-flex style="min-width:700px;">
        <v-divider />
        <v-timeline>
          <v-timeline-item
            v-for="(info,i) in infomation"
            :key="i"
            :color="info.color"
            fill-dot
            :left="i%2==0"
            :right="i%2==1"
            :icon="info.icon"
            small
          >
            <span
              slot="opposite"
              :class="`title font-weight-bold ${info.color}--text`"
              v-text="info.date"
            />
            <!-- 信息卡 -->
            <v-card>
              <v-card-title :class="`${info.color} ${i%2==0?'justify-end':'justify-start'}`">
                <v-icon
                  v-show="i%2!=0"
                  dark
                >
                  {{ info.icon }}
                </v-icon>
                <h3 class="headline white--text font-weight-light">
                  &nbsp;<a
                    :href="info.url"
                    target="_blank"
                  >
                    {{ info.title }}
                  </a>&nbsp;
                </h3>
                <v-icon
                  v-show="i%2==0"
                  dark
                >
                  {{ info.icon }}
                </v-icon>
              </v-card-title>
              <v-container>
                <v-layout
                  align-center
                  justify-center
                  column
                  fill-height
                >
                  <v-flex xs10>
                    <p
                      v-for="(p,i) in info.content"
                      :key="i"
                      v-html="p"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'PageAbout',
  components: {
  },
  methods: {
    $_getAge() {  // 计算年龄
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const nowMyAge = Math.floor((((100 * year) + month) - 198703) / 100);
      return `${nowMyAge}岁`;
    },
  },
  data() {
    return {
      basicInfo: [
        `<b>李宣 / 男 / ${this.$_getAge()}</b>`,
        '<b>生日</b>： 1987-03-14',
        '<b>家乡</b>： 河北 昌黎',
        '<b>视力</b>： 近视（-250°），绿色弱',
        '<b>网名</b>： 凡星有梦 / 野鹤 / Sqroots',
      ],
      extendedInfo: [
        '<b>专业</b>： 数学、统计',
        '<b>职业</b>： 数据分析师',
        '<b>擅长</b>： Mathematica',
        '<b>掌握</b>： Office / Python / SQL / 算法 / 前端',
        '<b>邮箱</b>： lixuan.xyz@gmail.com',
      ],
      resume: [
        '1987年',
        '我出生于一个并不偏远的村庄',
        '有值得怀念的童年',
        '1994年入学',
        '小学和初中走读',
        '2003年，在一所普通的高中寄读，是一名严重偏科的学生',
        '（期间自学了：《高等数学》《大学物理》《初等数论》《线性代数》《VB程序设计》和HTML语言）',
        '2006年高考，数学失利',
        '同年进入保定学院的专科学习数学',
        '2009年继续在该校进修了同专业的本科',
        '2011年考入了燕山大学的概率论与数理统计专业读研',
        '2014年来到北京就业',
        '漂泊至今',
      ],
      infomation: [
        {
          date: '2019-04 ~ 今',
          title: '便利蜂',
          url: 'https://www.bianlifeng.com/',
          color: 'pink',
          icon: 'fas fa-building',
          content: [
            '<b>职位</b>： 数据分析师',
            '<b>部门</b>： 店务智能决策部',
          ],
        },
		{
          date: '2016-04 ~ 2019-04',
          title: '北京中彩在线',
          url: 'http://www.clo.com.cn/',
          color: 'cyan',
          icon: 'fas fa-building',
          content: [
            '<b>职位</b>： 数据分析师',
            '<b>部门</b>： 数据分析部',
          ],
        },
        {
          date: '2014-12 ~ 2016-04',
          title: '北京360',
          url: 'https://www.360.cn/',
          color: 'green',
          icon: 'fas fa-building',
          content: [
            '<b>职位</b>： 数据分析师',
            '<b>部门</b>： 在线营销部',
          ],
        },
        {
          date: '2014-06 ~ 2014-12',
          title: '北京新东方',
          url: 'http://www.xdf.cn/',
          color: 'pink',
          icon: 'fas fa-building',
          content: [
            '<b>职位</b>： 数据分析师',
            '<b>部门</b>： 教务管理部',
          ],
        },
        {
          date: '2014-02 ~ 2014-04',
          title: '人大经济论坛',
          url: 'https://bbs.pinggu.org/',
          color: 'cyan',
          icon: 'fas fa-building',
          content: [
            '<b>职位</b>： 数据分析师',
            '<b>部门</b>： 数据分析部',
          ],
        },
        {
          date: '2011-09 ~ 2014-01',
          title: '燕山大学',
          url: 'https://www.ysu.edu.cn/',
          color: 'orange',
          icon: 'fas fa-graduation-cap',
          content: [
            '<b>专业</b>： 概率论与数理统计',
            '<b>院系</b>： 理学院',
            '<b>学位</b>： 理学硕士',
            '<b>学历</b>： 全日制研究生',
          ],
        },
        {
          date: '2006-09 ~ 2011-06',
          title: '保定学院',
          url: 'http://www.bdu.edu.cn/',
          color: 'blue',
          icon: 'fas fa-graduation-cap',
          content: [
            '<b>专业</b>： 数学教育+数学与应用数学',
            '<b>院系</b>： 数学与计算机系',
            '<b>学位</b>： 理学学士',
            '<b>学历</b>： 全日制专接本',
          ],
        },
        {
          date: '2003-09 ~ 2006-06',
          title: '昌黎汇文二中',
          url: 'http://www.hbclhwez.com/',
          color: 'brown',
          icon: 'fas fa-graduation-cap',
          content: [
            '<b>学历</b>： 全日制普通高中',
          ],
        },
        {
          date: '2000-09 ~ 2003-06',
          title: '泥井镇中学',
          url: '',
          color: 'indigo',
          icon: 'fas fa-graduation-cap',
          content: [
            '<b>学历</b>： 全日制初级中学',
          ],
        },
        {
          date: '1994-09 ~ 2000-06',
          title: '泥井镇中心小学',
          url: '',
          color: 'teal',
          icon: 'fas fa-graduation-cap',
          content: [
            '<b>学历</b>： 全日制小学',
          ],
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    text-align: center;
  }
  .v-card.theme--light {
    border-radius: 10px;
  }
  .v-card__title {
    padding: 8px 16px;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
</style>
