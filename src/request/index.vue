<template>
  <div class="request-container">
    <v-btn variant="outlined" @click="goNewReq">NEW</v-btn>
    <div class="send-request-btn-container">
      <v-btn variant="outlined" class="send-request-btn-1" @click="sendRequest">
        请求1
      </v-btn>
      <v-btn variant="outlined" class="send-request-btn-2" @click="sendRequest">
        更新
      </v-btn>
    </div>
    <json-view :json="response" class="json-view" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useUTools } from "../composables/useUTools";
import jsonView from "../components/jsonView.vue";

const response = ref("");
const { isUTools } = useUTools();

const sendRequest = async () => {
  try {
    const res = await axios({
      url: "https://ug.baidu.com/mcp/pc/pcsearch",
      method: "post",
      data: {
        invoke_info: {
          pos_1: [{}],
          pos_2: [{}],
          pos_3: [{}],
        },
      },
    });
    response.value = res.data;
  } catch (err) {
    response.value = "请求失败: " + err.message;
  }
};

const goNewReq = () => {
  if (isUTools.value) {
    utools.redirect("newReq");
  } else {
    window.location.hash = "newReq";
  }
};
</script>

<style lang="scss" scoped>
.request-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .request-btn-container {
    display: flex;
    gap: 20px;
  }

  .send-request-btn {
    width: 100px;
    padding: 2px 6px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
  }

  .send-request-btn-container {
    display: flex;
    .send-request-btn-1 {
      border-radius: 8px 0 0 8px;
      border-right: none;
    }
    .send-request-btn-2 {
      border-radius: 0 8px 8px 0;
    }
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
