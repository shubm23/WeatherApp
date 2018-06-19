let somePromise = new Promise((results,reject)=>{
    setTimeout(()=>{
      results('Working!!!');
      reject('Not Working');
    },1000);
})

somePromise.then((msg)=>{
  console.log(msg);
},(errmsg)=>{
  console.log(errmsg);
})
