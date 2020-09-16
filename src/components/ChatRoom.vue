<template>
  <main class="container">
    <h3>Babble on {{chatId}}</h3>
    <User #user="{user}" class="grid">
      <ul class="chat-card">
        <li
          v-for="msg of messages"
          :key="msg.id"
          :class="user.uid === msg.sender ? 'right' : 'left'"
        >
          {{msg.text}}
          <audio v-if="msg.audioURL" :src="msg.audioURL" controls></audio>
        </li>
      </ul>
      <audio v-if="newAudio" :src="newAudioURL" controls></audio>
      <textarea
        v-else
        v-model="msgText"
        rows="1"
        autofocus
        class="msg-input"
        v-on:keyup.enter="e => addMessage(e, user.uid)"
      />
      <button v-if="!recorder" @click="record()">Record</button>
      <button v-else @click="stop()">Stop</button>
      <button
        :disabled="(!msgText && !newAudio) || loading"
        class="btn"
        @click="e => addMessage(e, user.uid)"
      >Send</button>
    </User>
  </main>
</template>

<style>
audio {
  outline: none;
  margin: 0.5em;
  background: none;
}
.chat-card {
  grid-row: 1/ 6;
  grid-column: 1/ 7;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  border: 1px solid var(--main);
  border-radius: 7px;
  margin: 1em 0;
  padding: 1em;
  height: 80vh;
  overflow: scroll;
  overscroll-behavior-y: contain;
  scroll-snap-type: y proximity;
  background: rgba(65, 184, 131, 0.1);
}

.chat-card > li {
  border-bottom: none;
  padding: 0.2em 0.5em;
  width: fit-content;
  font-weight: bold;
  border-radius: 7px;
  margin: 0.1em 0;
}

.chat-card > li > li:last-child {
  scroll-snap-align: end;
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
  justify-self: right;
  align-self: flex-end;
  text-align: right;
  background: var(--accent);
}

.left {
  text-align: left;
  justify-self: left;
  align-self: flex-start;
  background: #234636;
}
</style>

<script>
import User from "./User";
import { db, storage } from "../firebase";

export default {
  components: {
    User,
  },
  data() {
    return {
      msgText: "",
      messages: [],
      loading: false,
      newAudio: null,
      recorder: null,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messageCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
  },

  firestore() {
    return {
      messages: this.messageCollection.orderBy("createdAt").limitToLast(30),
    };
  },

  methods: {
    async addMessage(e, uid) {
      e.preventDefault();
      this.loading = true;

      let audioURL = null;

      const { id: messageId } = this.messageCollection.doc();

      if (this.newAudio) {
        const storageRef = storage.ref("chats").child(`${messageId}.wav`);

        await storageRef.put(this.newAudio);

        audioURL = await storageRef.getDownloadURL();
      }

      await this.messageCollection.doc(messageId).set({
        text: this.msgText,
        sender: uid,
        createdAt: Date.now(),
        audioURL,
      });

      this.loading = false;
      this.msgText = "";
      this.newAudio = null;
    },

    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: "audio/webm" };
      const recordedChunk = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunk.push(e.data);
        }
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunk);
      });

      this.recorder.start();
    },

    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
};
</script>