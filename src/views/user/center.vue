<template>
  <div  >
    <a-row  >
      <a-col :span="9" >
        <a-row>
          <a-col :span="8">
            <div :class="`${prefixCls}-top__avatar`">
              <a-avatar  src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>


              <span>Edgar Deng</span>
              <div>海纳百川，有容乃大</div>
            </div>
          </a-col>
          <a-col :span="16">
            <div  >

              <Icon :icon="detail.icon" /> 前端工程师
              <Icon :icon="detail.icon" /> 部门
              <Icon :icon="detail.icon" /> 上海
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="7" >

      </a-col>
      <a-col :span="8" :class="`${prefixCls}-col`">

      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, unref, computed} from 'vue';


</script>

<style lang="scss" scoped>

</style>
