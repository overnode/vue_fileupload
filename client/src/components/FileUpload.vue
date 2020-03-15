<template>
  <div class="fileupload">
    <input type="file" name="file" @change="onFileChange" />
    <div
      v-if="progress"
      class="fileupload--progressbar"
      :style="{'width': progress+'%'}"
    >{{progress}}%</div>
    <button :disabled="!selectedFile" v-show="!isUploading" @click="onUploadFile">Upload</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FileUpload',

  props: {
    uploadUrl: {
      type: String,
      requred: true
    }
  },

  data: () => ({
    selectedFile: '',
    isUploading: false,
    progress: 0
  }),

  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0]
      this.progress = 0
      this.isUploading = false
    },
    onUploadFile() {
      const formData = new FormData()
      formData.append('file', this.selectedFile)

      this.isUploading = true

      axios
        .post(this.uploadUrl, formData, {
          onUploadProgress: progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )
            this.progress = progress
          }
        })
        .then(({ data }) => {
          this.$emit('upload-done', data)
        })
        .catch(err => {
          console.error(err.response.statusText)
        })
        .finally(() => {
          this.isUploading = false
        })
    }
  }
}
</script>

<style>
.fileupload {
  box-shadow: 0px 0px 4px 2px #ccc;
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  justify-content: space-between;
  margin: 0 auto;
  padding: 2rem;
  width: 60vw;
}
.fileupload input {
  width: 80%;
}
.fileupload .fileupload--progressbar {
  background-color: #eee;
  border: 1px solid #999;
  margin-right: 4px;
}
</style>