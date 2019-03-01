const ipsum = new LoremIpsum();
const app = new Vue({
  el: '#queue-demo',
  data: {
    message: 'A super simple queue demo with Vue!',
    queue: [],
    redText: 'The Anh',
    greenText: 'Gian Ac',
    blueText: 'theanhgianac',
    fileArray: []
  },
  computed: {
    queueLength: function () {
      return this.queue.length;
    }
  },
  methods: {
    enqueue: function (item) {
      this.queue.push(item);
    },
    dequeue: function () {
      return this.queue.shift();
  
    },
    peek: function () {
      return (this.queue[0] ? this.queue[0] : undefined);
    },
    writeToFile: function(color, text) {
      this.enqueue({
        color,
        text
      });
      switch (color) {
        case 'red':
          this.redText = ipsum.sentence();
          break;
        case 'green':
          this.greenText = ipsum.sentence();
          break;
        case 'blue':
          this.blueText = ipsum.sentence();
          break;
      }
    }
  },
  created: function () {
    setInterval(() => {
      let item = this.dequeue();
      if (item) {
        this.fileArray.push(item);
      }
    }, 1500);
  }
});
