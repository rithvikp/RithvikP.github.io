const MAX_GITHUB_SHOWN = 7;
sendRequest({
  method: 'GET',
  url: `https://api.github.com/users/RithvikP/events`,
})
.then((res) => {
  let content = document.getElementById('github-card-content');
  let count = 0;
  console.log(res)

  for(let i=0; i<res.length; i++) {
    
    r = res[i];
    let link = document.createElement('a');
    link.href = r.repo.url;

    let container = document.createElement('div');
    container.classList.add('card-content-row');

    if(r.type === 'PushEvent') {
      let title = document.createElement('div');
      title.classList.add('card-content-title');

      if(r.payload.commits.length > 1) 
        title.appendChild(document.createTextNode(`${r.payload.commits[0].message} and more...`));
      else if(r.payload.commits.length===1)
        title.appendChild(document.createTextNode(r.payload.commits[0].message));
      else
        continue;

      let subText = document.createTextNode(`Rithvik pushed a commit to ${r.repo.name}`)
      container.appendChild(title);
      container.appendChild(subText);
      
      if(count > MAX_GITHUB_SHOWN) break;
      count++;
    }

    link.appendChild(container);
    content.appendChild(link);
  }
})
.catch((error) => {
  
})