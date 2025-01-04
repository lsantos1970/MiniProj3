<template>
  <div>
    <h1>Manage Sponsors</h1>
    <div>
      <h2>List of Sponsors</h2>
      <ul>
        <li v-for="sponsor in sponsors" :key="sponsor._id">
          {{ sponsor.name }} ({{ sponsor.category }}) - {{ sponsor.email }}
          <button @click="editSponsor(sponsor)">Edit</button>
          <button @click="deleteSponsor(sponsor._id)">Delete</button>
        </li>
      </ul>
    </div>

    <div>
      <h2>{{ isEditing ? 'Edit Sponsor' : 'Add Sponsor' }}</h2>
      <form @submit.prevent="isEditing ? updateSponsor() : addSponsor()">
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
        <div>
          <label>Website:</label>
          <input type="url" v-model="form.website" />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" @change="handlePhotoUpload" />
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
      sponsors: [],
      form: {
        _id: null,
        name: "",
        email: "",
        phone: "",
        category: "dogs",
        website: "",
        photo: null,
      },
      isEditing: false,
    };
  },
  methods: {
    fetchSponsors() {
      axios.get("/api/sponsors").then((response) => {
        this.sponsors = response.data;
      });
    },
    addSponsor() {
      axios.post("/api/sponsors", this.form).then(() => {
        this.fetchSponsors();
        this.resetForm();
      });
    },
    editSponsor(sponsor) {
      this.form = { ...sponsor };
      this.isEditing = true;
    },
    updateSponsor() {
      axios.put(`/api/sponsors/${this.form._id}`, this.form).then(() => {
        this.fetchSponsors();
        this.resetForm();
      });
    },
    deleteSponsor(id) {
      axios.delete(`/api/sponsors/${id}`).then(() => {
        this.fetchSponsors();
      });
    },
    resetForm() {
      this.form = {
        _id: null,
        name: "",
        email: "",
        phone: "",
        category: "dogs",
        website: "",
        photo: null,
      };
      this.isEditing = false;
    },
    handlePhotoUpload(event) {
      this.form.photo = event.target.files[0];
    },
  },
  mounted() {
    this.fetchSponsors();
  },
};
</script>

<style>
/* Add your styles here */
</style>
