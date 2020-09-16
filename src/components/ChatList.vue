<template>
  <div class="container">
    <button @click="createRoom()">Create Room</button>
    <ul>
      <li v-for="chat of chats" :key="chat.id" class="chat-list">
        <p>
          Started:
          {{new Date(chat.createdAt).toLocaleString()}}
        </p>
        <p>
          Participants:
          {{chat.members.join(', ')}}
        </p>
        <router-link :to="{name: 'chat', params: {id: chat.id}}">View</router-link>
      </li>
    </ul>
  </div>
</template>

<style>
.chat-list {
  display: flex;
  margin: 1em 0;
  padding: 0.5em 0;
  border-bottom: 1px solid var(--main);
  font-size: 0.9em;
}
</style>

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