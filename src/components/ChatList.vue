<template>
  <div>
    <button @click="createRoom()">Create Room</button>
    <ul>
      <router-link :to="{name: 'chat', params: {id: chat.id}}">
        <li v-for="chat of chats" :key="chat.id">
          <p>Started: {{new Date(chat.createdAt).toLocaleString()}}</p>
          <p>Participants: {{chat.members.join(', ')}}</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      chats: [],
    };
  },

  firestore() {
    return {
      chats: db.collection("chats").where("owner", "==", this.uid),
    };
  },

  methods: {
    async createRoom() {
      const newChat = await db.collection("chats").add({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid],
      });
      console.log(newChat);
    },
  },
  props: ["uid"],
};
</script>