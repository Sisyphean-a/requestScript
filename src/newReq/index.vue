<template>
  <div class="request-container">
    <v-btn class="send-request-btn" @click="setReqData">配置请求</v-btn>
    <json-view :json="reqDataR" class="json-view" />
    <v-btn class="send-request-btn" @click="sendRequest">测试请求</v-btn>
    <json-view :json="response" class="json-view" />

    <v-bottom-sheet v-model="shellShow">
      <v-card>
        <v-card-text>
          <v-text-field label="url" v-model="reqDataR.url"></v-text-field>
          <v-select
            label="method"
            v-model="reqDataR.method"
            :items="['get', 'post']" />
        </v-card-text>
        <v-textarea
          style="margin: 0 20px"
          v-model="reqDataR.data"
          auto-grow
          variant="outlined" />
        <v-textarea
          style="margin: 0 20px"
          v-model="reqDataR.params"
          auto-grow
          variant="outlined" />
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import jsonView from "../components/jsonView.vue";

const response = ref("");
const shellShow = ref(false);

const reqData = {
  url: "https://ug.baidu.com/mcp/pc/pcsearch",
  method: "post",
  data: '{"invoke_info": {"pos_1": [{}],"pos_2": [{}],"pos_3": [{}]}}',
  params: "",
};

const reqDataR = reactive(reqData);

const setReqData = () => {
  shellShow.value = !shellShow.value;
};

const sendRequest = async () => {
  try {
    const data = reqDataR.data ? JSON.parse(reqDataR.data) : undefined;
    const res = await axios({
      url: reqDataR.url,
      method: reqDataR.method,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
      params: reqDataR.params,
    });
    response.value = res.data;
  } catch (err) {
    response.value = { 请求失败: err.message };
  }
};
</script>

<style lang="scss" scoped>
.request-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .send-request-btn {
    width: 100px;
    padding: 2px 6px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
  }

  .response-area {
    max-height: 500px;
  }

  .json-view {
    border: thin solid #ababab;
    padding: 4px;
    min-height: 200px;
    max-height: 500px;
    border-radius: 8px;
  }
}
</style>
