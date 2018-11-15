export function format(time, opt) { // time format
  let ans;
  if (opt === 2) {
    if (time < 10) {
      ans = '0' + time;
    }  else {
      ans = time;
    } 
  } else if (opt === 3) {
    if(time < 10) {
       ans = '00' + time;
    } else if (  time >= 10 && time < 100) {
       ans  = '0' + time;
    } else {
       ans = time;
    }
  }
  return ans;
}

export function display(tsmall, option) { // time decimal
  let big = 0;
  let small = tsmall; 
  if (small > option) {
    big = Math.floor(small/option);
    small = (small % option);
  }
  return {
    tbig: big,
    tsmall: small,
  }
}

export function transms(k) { // string to ms
  let ta = k.split(':');
  let tsum = 0;
  for (let i = 0; i < 4; i++) { // string type to number type
    ta[i] = +(ta[i]);
  }
  ta[0] = ta[0] === 0 ? 0 : ta[0] * 3600000;
  ta[1] = ta[1] === 0 ? 0 : ta[1] * 60000;
  ta[2] = ta[2] === 0 ? 0 : ta[2] * 1000;
  tsum = (ta[0] + ta[1] + ta[2] + ta[3]);
  return tsum;
}

export function transstr(ms) { // ms to string
  let th, tm, ts, tss, str, _ms;
  _ms = ms;
  th = Math.floor(_ms/3600000);
  _ms = (_ms % 3600000);
  tm = Math.floor(_ms/60000);
  _ms = (_ms%60000);
  ts = Math.floor(_ms/1000);
  tss = (_ms%1000);
  str = format(th, 2) + ':' + format(tm, 2) + ':' + format(ts, 2)+ ':' + format(tss, 3);
  return str;
}

export function reduce(l, s) { // calculate time difference
  const lsum = transms(l);
  const ssum = transms(s);
  const rel = (lsum - ssum);
  const ans = transstr(rel); 
  return ans; 
}