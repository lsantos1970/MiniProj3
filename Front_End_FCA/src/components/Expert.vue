<template>
  <div>
    <h1>Manage Experts</h1>
    <div>
      <h2>List of Experts</h2>
      <ul>
        <li v-for="expert in experts" :key="expert._id">
          {{ expert.name }} ({{ expert.category }}) - {{ expert.email }}
          <button @click="editExpert(expert)">Edit</button>
          <button @click="deleteExpert(expert._id)">Delete</button>
        </li>
      </ul>
    </div>

    <div>
      <h2>{{ isEditing ? 'Edit Expert' : 'Add Expert' }}</h2>
      <form @submit.prevent="isEditing ? updateExpert() : addExpert()">
        <div>
          <label>Name:</label>
          <input v-model="form.name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="form.email" required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" v-model="form.phone" required />
        </div>
        <div>
          <label>Category:</label>
          <select v-model="form.category" required>
            <option value="dogs">Dogs</option>
            <option value="cats">Cats</option>
            <option value="birds">Birds</option>
            <option value="xxxxx">Xxxxx</option>
          </select>
        </div>
        <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
        <button type="button" @click="resetForm">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      experts: [],
      form: {
        _id: null,
        name: "",
        email: "",
        phone: "",
        category: "dogs",
      },
      isEditing: false,
    };
  },
  methods: {
    fetchExperts() {
      axios.get("/api/experts").then((response) => {
        this.experts = response.data;
      });
    },
    addExpert() {
      axios.post("/api/experts", this.form).then(() => {
        this.fetchExperts();
        this.resetForm();
      });
    },
    editExpert(expert) {
      this.form = { ...expert };
      this.isEditing = true;
    },
    updateExpert() {
      axios.put(`/api/experts/${this.form._id}`, this.form).then(() => {
        this.fetchExperts();
        this.resetForm();
      });
    },
    deleteExpert(id) {
      axios.delete(`/api/experts/${id}`).then(() => {
        this.fetchExperts();
      });
    },
    resetForm() {
      this.form = {
        _id: null,
        name: "",
        email: "",
        phone: "",
        category: "dogs",
      };
      this.isEditing = false;
    },
  },
  mounted() {
    this.fetchExperts();
  },
};
</script>

<style>
/* Add your styles here */
</style>
