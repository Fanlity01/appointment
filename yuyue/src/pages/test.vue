
<template>
  <div class="appointment">
    <h1>预约实验室界面</h1>
    <div class="labs">
      <button v-for="lab in labs" :key="lab.id" @click="selectLab(lab)">
        {{ lab.name }}
      </button>
    </div>
    <div v-if="selectedLab" class="schedule">
      <h2>{{ selectedLab.name }} 预约课表</h2>
      <table>
        <thead>
          <tr>
            <th>时间</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slot in selectedLab.schedule" :key="slot.time" @click="openModal(slot)">
            <td>{{ slot.time }}</td>
            <td>{{ slot.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>预约 {{ selectedSlot.time }}</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">姓名:</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <button type="submit">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labs: [
        { id: 1, name: '实验室1', schedule: [{ time: '09:00', status: '空闲' }, { time: '10:00', status: '已预约' }] },
        { id: 2, name: '实验室2', schedule: [{ time: '09:00', status: '空闲' }, { time: '10:00', status: '空闲' }] }
      ],
      selectedLab: null,
      selectedSlot: null,
      showModal: false,
      form: {
        name: ''
      }
    };
  },
  methods: {
    selectLab(lab) {
      this.selectedLab = lab;
    },
    openModal(slot) {
      this.selectedSlot = slot;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    submitForm() {
      console.log('预约信息:', this.form, '时间:', this.selectedSlot.time, '实验室:', this.selectedLab.name);
      this.closeModal();
      // Add your form submission logic here
    }
  }
};
</script>

<style scoped>
.appointment {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.labs button {
  margin: 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.labs button:hover {
  background-color: #0056b3;
}
.schedule {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>