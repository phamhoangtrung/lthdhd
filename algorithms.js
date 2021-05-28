//Run algorithms method
function runAlgorithm(algorithm = "", arr = [], head = 0, direction = "") {
    switch (algorithm) {
      case "fcfs":
        return FCFS(arr, head);
      case "sstf":
        return SSTF(arr, head);
      case "look":
        return LOOK(arr, head, direction);
      case "c-look":
        return CLOOK(arr, head, direction);
    }
  }
  // LOOK algorithm
  function LOOK(arr = [], head, direction = "") {
    let seek_count = 0;
    let distance, cur_track;
  
    let down = [];
    let up = [];
    let seek_sequence = [];
  
    // Appending values which are
    // currently at down and up
    // direction from the head.
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < head) down.push(arr[i]);
      if (arr[i] > head) up.push(arr[i]);
    }
    down.sort(compareNumbers);
    up.sort(compareNumbers);
  
    let run = 2;
    while (run-- > 0) {
      if (direction == "down") {
        for (let i = down.length - 1; i >= 0; i--) {
          cur_track = down[i];
  
          // Appending current track to
          // seek sequence
          seek_sequence.push(cur_track);
  
          // Calculate absolute distance
          distance = Math.abs(cur_track - head);
  
          // Increase the total count
          seek_count += distance;
  
          // Accessed track is now the new head
          head = cur_track;
        }
  
        // Reversing the direction
        direction = "up";
      } else if (direction == "up") {
        for (let i = 0; i < up.length; i++) {
          cur_track = up[i];
  
          // Appending current track to
          // seek sequence
          seek_sequence.push(cur_track);
  
          // Calculate absolute distance
          distance = Math.abs(cur_track - head);
  
          // Increase the total count
          seek_count += distance;
  
          // Accessed track is now new head
          head = cur_track;
        }
  
        // Reversing the direction
        direction = "down";
      }
    }
    return {
      seek_sequence,
      seek_count,
    };
  }
  // FCFS algorithm
  function FCFS(arr = [], head) {
    let seek_count = 0;
    let seek_sequence = [...arr];
    let distance, cur_track;
  
    for (let i = 0; i < arr.length; i++) {
      cur_track = arr[i];
  
      // calculate absolute distance
      distance = Math.abs(cur_track - head);
  
      // increase the total count
      seek_count += distance;
  
      // accessed track is now new head
      head = cur_track;
    }
  
    return {
      seek_sequence,
      seek_count,
    };
  }
  // SSTF algorithm
  // Ideal: Use one array to loop and one to get value after calculated
  function SSTF(arr = [], head) {
    // Init data
    let seek_count = 0;
    let seek_sequence = [];
    let arrTemp = [...arr];
    let currentHead = head;
  
    // Loop though n-1 item (can use other loop)
    for (let a in arr) {
      //find min index by head
      let idx = findMinIndexFromHead(currentHead, arrTemp);
  
      // new array after cut the previous 'idx'
      let val = arrTemp.splice(idx, 1)[0];
  
      // push to 'seek_sequence'
      seek_sequence.push(val);
  
      //increment the distance ('seek_count')
      seek_count += Math.abs(currentHead - val);
  
      //update new head
      currentHead = val;
    }
    // console.log(`seek_sequence`, seek_sequence)
    return {
      seek_sequence,
      seek_count,
    };
  }
  // CLOOK algorithm
  function CLOOK(arr = [], head, direction = "") {
    let seek_count = 0;
    let distance, cur_track;
  
    let down = [];
    let up = [];
    let seek_sequence = [];
  
    // Tracks on the down of the
    // head will be serviced when
    // once the head comes back
    // to the beggining (down end)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < head) down.push(arr[i]);
      if (arr[i] > head) up.push(arr[i]);
    }
  
    down.sort(compareNumbers);
    up.sort(compareNumbers);
  
    // First service the requests
    // on the up side of the
    // head
    if (direction == "up") {
      for (let i = 0; i < up.length; i++) {
        cur_track = up[i];
  
        // Appending current track
        // to seek sequence
        seek_sequence.push(cur_track);
  
        // Calculate absolute distance
        distance = Math.abs(cur_track - head);
  
        // Increase the total count
        seek_count += distance;
  
        // Accessed track is now new head
        head = cur_track;
      }
  
      // Once reached the up end
      // jump to the last track that
      // is needed to be serviced in
      // down direction
      seek_count += Math.abs(head - down[0]);
      head = down[0];
  
      // Now service the requests again
      // which are down
      for (let i = 0; i < down.length; i++) {
        cur_track = down[i];
  
        // Appending current track to
        // seek sequence
        seek_sequence.push(cur_track);
  
        // Calculate absolute distance
        distance = Math.abs(cur_track - head);
  
        // Increase the total count
        seek_count += distance;
  
        // Accessed track is now the new head
        head = cur_track;
      }
    } else if (direction == "down") {
      for (let i = 0; i < down.length; i++) {
        cur_track = down[i];
  
        // Appending current track
        // to seek sequence
        seek_sequence.push(cur_track);
  
        // Calculate absolute distance
        distance = Math.abs(cur_track - head);
  
        // Increase the total count
        seek_count += distance;
  
        // Accessed track is now new head
        head = cur_track;
      }
  
      // Once reached the up end
      // jump to the last track that
      // is needed to be serviced in
      // up direction
      seek_count += Math.abs(head - up[0]);
      head = up[0];
  
      // Now service the requests again
      // which are up
      for (let i = 0; i < up.length; i++) {
        cur_track = up[i];
  
        // Appending current track to
        // seek sequence
        seek_sequence.push(cur_track);
  
        // Calculate absolute distance
        distance = Math.abs(cur_track - head);
  
        // Increase the total count
        seek_count += distance;
  
        // Accessed track is now the new head
        head = cur_track;
      }
    }
  
    return {
      seek_count,
      seek_sequence,
    };
  }