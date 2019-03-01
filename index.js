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
      let contain = false;

      // iterating through the entire
      // item array to add element at the
      // correct location of the Queue
      for (var i = 0; i < this.queue.length; i++) {
        if (this.queue[i].priority > item.priority) {
          // Once the correct location is found it is
          // enqueued
          this.queue.splice(i, 0, item);
          contain = true;
          break;
        }
      }

      // if the element have the highest priority
      // it is added at the end of the queue
      if (!contain) {
        this.queue.push(item);
      }
    },
    dequeue: function () {
      // return the dequeued element 
      // and remove it. 
      // if the queue is empty 
      // returns Underflow 
      if (this.queue.length === 0) 
        return 'Underflow'; 
      return this.queue.shift(); 
    },
    peek: function () {
      return (this.queue[0] ? this.queue[0] : undefined);
    },
    writeToFile: function (color, text, priority) {
      this.enqueue({
        color,
        text,
        priority
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
