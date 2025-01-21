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
    <v-textarea
      v-model="response"
      auto-grow
      style="max-height: 500px"
      variant="outlined"></v-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const response = ref("");

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
    response.value = JSON.stringify(res.data, null, 4);
  } catch (err) {
    response.value = "请求失败: " + err.message;
  }
};

const goNewReq = () => {
  utools.redirect("newReq");
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
}
</style>
