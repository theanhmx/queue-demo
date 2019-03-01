const ipsum = new LoremIpsum();
const app = new Vue({
  el: '#queue-demo',
  data: {
    message: 'A super simple queue demo with Vue!',
    queue: [],
    offset: 0,
    redText: 'The Anh',
    greenText: 'Gian Ac',
    blueText: 'theanhgianac',
    fileArray: []
  },
  computed: {
    queueLength: function () {
      return (this.queue.length - this.offset);
    }
  },
  methods: {
    enqueue: function (item) {
      this.queue.push(item);
    },
    dequeue: function () {
      // if the queue is empty, return immediately
      if (this.queue.length == 0) return undefined;
  
      // store the item at the front of the queue
      var item = this.queue[this.offset];
  
      // increment the offset and remove the free space if necessary
      if (++this.offset * 2 >= this.queue.length) {
        this.queue = this.queue.slice(this.offset);
        this.offset = 0;
      }
  
      // return the dequeued item
      return item;
    },
    peek: function () {
      return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
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
