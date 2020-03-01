<template>
  <div class="chat container">
    <h2 class="teal-text center">Ninja Chat</h2>
    <div class="card">
      <div class="card-content">
        <p v-if="emptyMsg">{{ emptyMsg }}</p>
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="name teal-text">{{ message.name }}:</span>
            <span class="message-text grey-text text-darken-3">{{ message.content }}</span>
            <span class="message-time grey-text">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
  import NewMessage from '@/components/NewMessage'
  import db from '@/firebase/init.js'
  import moment from 'moment'

  export default {
    name: 'Chat',
    props: ['name'],
    components: {
      NewMessage
    },
    data() {
      return {
        messages: [],
        emptyMsg: null
      }
    },
    created() {
      this.emptyMsg = 'Loading...'
      db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let message = change.doc.data()
            message.id = change.doc.id
            message.timestamp = moment(message.timestamp).format('lll')
            this.messages.push(message)
            this.emptyMsg = null
          }
        })
      })
    }
  }
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.4em;
}
.chat .message-time {
  display: block;
  font-size: 1em;
}

.chat .messages {
  max-height: 300px;
  overflow: auto;
}

.chat .messages::-webkit-scrollbar {
  width: 3px;
}

.chat .messages::-webkit-scrollbar-track {
  background-color: #ddd;
}

.chat .messages::-webkit-scrollbar-thumb {
  background-color: #aaa;
}
</style>