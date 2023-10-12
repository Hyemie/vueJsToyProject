<template>
  <div>
    <div class="MemoBody shadow">
      <div class="btnDiv">
        <button @click="showPopup" class="containerBtn">추가</button>
        <button class="containerBtn" @click="deleteSelected">삭제</button>
        
        <input type="checkbox" class="selectAll" @change="handleAllSelected" v-model="isAllSelected" style="width:auto; margin: 5px;">
        <div style="font-size: smaller; align-self: center; margin: 5px 0 5px 0;">전체선택</div>
      </div>
      <p v-if="diaryEntries.length == 0" style="font-size: 14px;">등록된 일기가 없습니다!</p>
      <div class="inMemoBody">
        <div
          v-for="(entry, index) in diaryEntries"
          :key="index"
          @dblclick="readPopup(entry, index)"
          :class="{ 'selected': entry.isSelected }"
          class="diaryEntry"
          @click="toggleEntrySelected(entry)">
          <div class="entry-content">{{ entry.content }}</div>
        </div>
      </div>
    </div>

    <div v-if="isPopupVisible" class="popup">
      <textarea v-model="newEntry" placeholder="일기를 입력하세요"></textarea>
      <button @click="addEntry" class="popupBtn">저장</button>
      <button @click="closePopup" class="popupBtn">닫기</button>
    </div>

    <div v-if="isReadVisible" class="readPopup">
      <div style="font-size: 0.875rem; padding: 5px;">{{ createdDateTime }}</div>
      <textarea v-model="newEntry" type="text" class="readContent"></textarea>
      <button @click="updateEntry" class="popupBtn">수정</button>
      <button @click="deleteEntry" class="delete-button">삭제</button>
      <button @click="closeReadPopup" class="popupBtn">닫기</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      diaryEntries: JSON.parse(localStorage.getItem("diaryEntries")) || [],
      isPopupVisible: false,
      isReadVisible: false,
      newEntry: "",
      readEntry: "",
      isEditable: false,
      readEntryIndex: null,
      createdDateTime: null,
      isAllSelected: false
    };
  },
methods: {
  showPopup() {
      this.isPopupVisible = true;
    },
    readPopup(entry, index){
      this.isReadVisible = true;
      this.newEntry = entry.content;
      this.readEntryIndex = index;
      this.createdDateTime = entry.createdDateTime;
    },
    closePopup() {
      this.isPopupVisible = false;
      this.newEntry = "";
    },
    closeReadPopup() {
      this.isReadVisible = false;
      this.readEntry = "";
    },
    currentDateTime(){
      const current = new Date();
      const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
      const time = current.getHours() + ":" + current.getMinutes();
      const dateTime = date + " " + time;

      return dateTime;
    },
    addEntry() {
      const newEntry = {
        content: this.newEntry,
        createdDateTime: this.currentDateTime()
      };
      this.diaryEntries.unshift(newEntry);
      this.saveToLocalStorage();
      alert("일기가 등록되었습니다.");
      this.closePopup();
    },
    deleteEntry() {
      if(confirm("일기를 정말 삭제하시겠습니까?")){
        if(this.readEntryIndex !== null){
          this.diaryEntries.splice(this.readEntryIndex, 1);
          this.saveToLocalStorage();
          alert("일기가 삭제되었습니다.");
        }
      };
      this.closeReadPopup();
    },
    handleAllSelected(){
      this.diaryEntries.forEach(entry => {
        entry.isSelected = this.isAllSelected;
      })
    },
    toggleEntrySelected(entry){
      Vue.set(entry, 'isSelected', !entry.isSelected);
    },
    deleteSelected(entry){
      const selectedEntries = this.diaryEntries.filter(entry => entry.isSelected);

      if(selectedEntries.length > 0){
        if(confirm("선택한 일기를 삭제하시겠습니까?")){
          selectedEntries.forEach(entry => {
            const index = this.diaryEntries.indexOf(entry);
            this.diaryEntries.splice(index, 1);
          });
          this.saveToLocalStorage();
          alert("선택한 일기가 삭제되었습니다.");
        }
      }else {
          alert("선택된 항목이 없습니다.");
      }
      this.isAllSelected = false;
    },
    saveToLocalStorage() {
      localStorage.setItem("diaryEntries", JSON.stringify(this.diaryEntries));
    },
    updateEntry() {
      const updatedContent = this.newEntry;

      if (this.readEntryIndex !== null && this.readEntryIndex >= 0 && this.readEntryIndex < this.diaryEntries.length) {
        this.diaryEntries[this.readEntryIndex].content = updatedContent;

        this.saveToLocalStorage();
        alert("수정되었습니다.");
        this.closeReadPopup();
      } else {
        console.error("인덱스를 찾을 수 없습니다.");
      }
    },
  },
  created() {
    this.diaryEntries.forEach((entry) => {
      Vue.set(entry, 'isSelected', false);
    })
  },
};
</script>

<style>
MemoBody:focus{
  outline: none;
}
.MemoBody{
  padding: 0 30px 30px 30px;
  width: 90%;
  display: inline-block;
  background-color: #d4f0d4;
  border-radius: 10px;
}
.inMemoBody{
  display: flex;
  flex-wrap: wrap;
}
.btnDiv{
  display: flex;
  padding: 20px 0 20px 0;
}
.containerBtn{
    background: linear-gradient(to right, #b0ecd7, #ead3b8);
    display: block;
    position: relative;
    width: 3rem;
    height: 1.8rem;
    border-radius: 5px;
    border: 0px;
    color: white;
    font-weight: bold;
    margin: 5px;
    cursor: pointer;
}
.popupBtn{
    background: linear-gradient(to right, #b0ecd7, #ffdbb3);
    width: 3rem;
    height: 1.8rem;
    border-radius: 5px;
    border: 0px;
    color: white;
    font-weight: bold;
    margin: 0 0 0 5px;
    cursor: pointer;
}
.addBtn{
    color: white;
    vertical-align: middle;
}
.header {
  background-color: #d4f0d4;
  text-align: center;
  padding: 10px;
  font-weight: bold;
}
.body {
  background-color: #d4f0d4;
  padding: 20px;
}
.diaryEntry {
  border: 0px;
  margin: 10px;
  padding: 10px;
  border-radius: 1rem;
  background-color: white;
  font-size: smaller;
  cursor: pointer;
  
  flex-basis: calc(33.33% - 20px);
  /* max-width: calc(33.33% - 20px); */
  margin-left: 10px;
  box-sizing: border-box;
}
@media (max-width: 768px) {
  .inMemoBody {
    /* justify-content: flex-start; */
  }
  .diaryEntry {
    flex-basis: calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
  @media (max-width: 480px) {
    .diaryEntry {
      flex-basis: calc(100% - 20px);
      max-width: calc(100% - 20px);
    }
  }
}
.delete-button {
  background: #ff937b;
    width: 3rem;
    height: 1.8rem;
    border-radius: 5px;
    border: 0px;
    color: white;
    font-weight: bold;
    margin: 0 0 0 5px;
    cursor: pointer;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
}
.readPopup{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 10px 20px 60px 20px;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  width: 314px;
  height: 190px;
}
textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border-color: white;
  resize: none;
}
textarea:focus{
  outline:1px solid #d4f0d4;
  border-radius: 5px;
}
.readContent{
  overflow-y: scroll;
  height: 85%;
  font-family: margun-gothic;
}
.readContent:focus{
  outline: 0px;
}
.selected {
  border: 1px solid #6e6e6e;
}
</style>