<template>
  <div id="app">
    <FileUpload uploadUrl="http://localhost:3000/upload" @upload-done="onUploadDone"></FileUpload>
    <div class="upload--result">
      <a :href="uploadResult.path">{{ uploadResult.name }}</a>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload'

export default {
  name: 'App',
  components: {
    FileUpload
  },

  data: () => ({
    uploadResult: {
      name: '',
      path: ''
    }
  }),

  methods: {
    onUploadDone(e) {
      this.uploadResult = e
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

.upload--result {
  margin-top: 8px;
}

#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
