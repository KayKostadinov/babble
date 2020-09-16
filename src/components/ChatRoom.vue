<template>
  <main class="container">
    <h3>Babble on {{chatId}}</h3>
    <User #user="{user}" class="grid">
      <ul class="chat-card">
        <li
          v-for="msg of messages"
          :key="msg.id"
          :class="user.uid === msg.sender ? 'right' : 'left'"
        >{{msg.text}}</li>
      </ul>
      <input v-model="msgText" autofocus class="msg-input" />
      <button :disabled="!msgText || loading" class="btn" @click="addMessage(user.uid)">Send</button>
    </User>
  </main>
</template>

<style>
.chat-card {
  grid-row: 1/ 6;
  grid-column: 1/ 7;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr;
  border: 1px solid var(--main);
  margin: 1em 0;
  height: 80vh;
  overflow: scroll;
}

.chat-card > li {
  border-bottom: none;
  padding: 0.2em 0.5em;
  background: var(--main);
  width: fit-content;
  border-radius: 7px;
  font-weight: bold;
  margin: 0.5em;
}

.msg-input {
  grid-row: 6/ 7;
  grid-column: 1/ 6;
}

.btn {
  grid-row: 6/ 7;
  grid-column: 6/ 7;
}

.right {
  grid-column: 4/ 7;
  grid-row: span 6;
  justify-self: right;
  align-self: flex-end;
  text-align: right;
}

.left {
  grid-column: 1/ 4;
  text-align: left;
  grid-row: span 6;
  justify-self: right;
  align-self: flex-end;
}
</style>

<script>
import User from "./User";
import { db } from "../firebase";

export default {
  components: {
    User,
  },
  data() {
    return {
      msgText: "",
      messages: [],
      loading: false,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messageCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
  },
  firestore() {
    return {
      messages: this.messageCollection.orderBy("createdAt").limitToLast(20),
    };
  },
  methods: {
    async addMessage(uid) {
      this.loading = true;

      const { id: messageId } = this.messageCollection.doc();

      await this.messageCollection.doc(messageId).set({
        text: this.msgText,
        sender: uid,
        createdAt: Date.now(),
      });

      this.loading = false;
      this.msgText = "";
    },
  },
};
</script>