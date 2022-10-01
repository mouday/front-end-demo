const App = {
  data() {
    return {
      form: {
        action: "",
        headers: "{}",
        data: "{}",
        name: "file",
      },

      cacheKey: "cache-form",
    };
  },

  computed: {
    uploadData() {
      if (this.form.data) {
        return JSON.parse(this.form.data);
      }
    },

    uploadHeaders() {
      if (this.form.headers) {
        return JSON.parse(this.form.headers);
      }
    },
  },

  methods: {
    handleSubmit() {
      console.log("handleSubmit");
    },

    handleChange() {
      localStorage.setItem(this.cacheKey, JSON.stringify(this.form));
    },

    handleUploadError(error, uploadFile, uploadFiles) {
      this.$notify({
        title: "上传出错",
        message: error,
        type: "error",
      });
    },

    handleUploadSuccess(response, uploadFile, uploadFiles) {
      this.$notify({
        title: "状态码：200",
        message: response,
        type: "success",
      });
    },
  },

  mounted() {
    let data = localStorage.getItem(this.cacheKey);
    if (!data) {
      return;
    }

    data = JSON.parse(data);
    for (let key in this.form) {
      this.form[key] = data[key];
    }
  },
};

const app = Vue.createApp(App);
app.use(ElementPlus);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
