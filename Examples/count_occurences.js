let count_occurences = (v, l) => {
    let sum = 0;
    for (let value of l) {
      if(v === value) {
          sum++;
      }
    }
    return sum;
};