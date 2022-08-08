/*const name = document.getElementById("name").innerHTML="Name: "+data.result[0].firstName+" "+data.result[0].lastName
const handle = document.getElementById("userid").innerHTML="Handle: "+data.result[0].handle
const rating = document.getElementById("rating").innerHTML="Rating: "+data.result[0].rating
const maxRaing = document.getElementById("max-rating").innerHTML="Max Rating: "+data.result[0].maxRating
const itle = document.getElementById("title").innerHTML="Title: "+data.result[0].rank
const maxTitle = document.getElementById("max-title").innerHTML="Max Title: "+data.result[0].maxRank
const friends = document.getElementById("friends").innerHTML="No of Friends: "+data.result[0].friendOfCount
const org = document.getElementById("org").innerHTML="Organization: "+data.result[0].organization*/
const search=document.querySelector(".search")
const main=document.querySelector(".main")
const box1=document.querySelector(".box1")
const box2=document.querySelector(".box2")
const box11=document.querySelector("#box11")
const box12=document.querySelector("#box12")
var val
var myChart=-1
document.querySelector('#tag').style.cursor="pointer"
function getdata()
{
     val=document.querySelector("#search-bar")
    
  
    if(typeof val.value == "string" && val.value.indexOf(';') > -1)    return window.alert("Invalid Handle");

    
    fetch(`https://codeforces.com/api/user.info?handles=${val.value}`
    ).then( (res) =>{
    res.json().then(renderPro)

    .catch(error => console.log("Error"))
    //console.log(data)
    })
}
function renderPro(data)
{
  
    search.innerHTML="";
    search.style.display="none";
    let res=data.result[0];
    main.style.display='block';
    const a=document.createElement('div');
    a.classList='box11-title'
    a.innerHTML="Profile"
    box11.appendChild(a);


    const a1=document.createElement("div");
    a1.classList='box11-item';
    a1.innerHTML="Name: "+res.firstName+" "+res.lastName
    box11.appendChild(a1);

    const a2=document.createElement("div");
    a2.classList='box11-item'
    a2.innerHTML="Handle: "+res.handle;
    box11.appendChild(a2);

    const a3=document.createElement("div");
    a3.classList='box11-item'
    a3.innerHTML="Rating: "+res.rating;
    box11.appendChild(a3);

    const a4=document.createElement("div");
    a4.classList='box11-item'
    a4.innerHTML="Title: "+res.rank;
    box11.appendChild(a4);

    const a5=document.createElement("div");
    a5.classList='box11-item'
    a5.innerHTML="Max-Rating: "+res.maxRating;
    box11.appendChild(a5);

    const a6=document.createElement("div");
    a6.classList='box11-item'
    a6.innerHTML="Max-Title: "+res.maxRank;
    box11.appendChild(a6);

    /*const a7=document.createElement("div");
    a7.classList='box11-item'
    a7.innerHTML="Friends: "+res.friendOfCount;
    box11.appendChild(a7);

    const a8=document.createElement("div");
    a8.classList='box11-item'
    a8.innerHTML="Organization: "+res.organization;
    box11.appendChild(a8);*/
}
var searchbar=document.querySelector("#search-bar")
searchbar.addEventListener('keydown',e =>
{
    console.log("In Press")
    if(e.key=='Enter') {
         getdata()
         starter()
         forbox12()
         
    }
})
function diff(a,b)
{
    var s=new Set();
    a.forEach(i =>
        {
            if(!b.has(i)) s.add(i);
        })
        return s;
}
function forbox12()
{
    fetch(`https://codeforces.com/api/user.rating?handle=${val.value}`)
    .then(res =>
        {
            res.json().then(renderbox12)
        })

        
        
}
function renderbox12(data)
{
    let res=data.result
    let bestRank=1000000000,worstRank=-1,maxUp=0,maxdown=0,no=res.length
    res.forEach(res=>
        {
            bestRank=Math.min(bestRank,res.rank)
            worstRank=Math.max(worstRank,res.rank)
            maxUp=Math.max(res.newRating-res.oldRating,maxUp)
            maxdown=Math.min(res.newRating-res.oldRating,maxdown)
        })
        if(worstRank==-1) worstRank="undefined"
        if(bestRank==1000000000) bestRank="undefined"
        const a1=document.createElement("div");
        const a3=document.createElement("div");
    a3.classList='box12-item'
    a3.innerHTML="No. of Contest: "+no;
    box12.appendChild(a3);
    a1.classList='box12-item'
    a1.innerHTML="Best Rank: "+bestRank;
    box12.appendChild(a1);
    const a2=document.createElement("div");
    a2.classList='box12-item'
    a2.innerHTML="worst Rank: "+worstRank;
    box12.appendChild(a2);
    
    const a4=document.createElement("div");
    a4.classList='box12-item'
    a4.innerHTML="Max Up: "+maxUp;
    box12.appendChild(a4);
    const a5=document.createElement("div");
    a5.classList='box12-item'
    a5.innerHTML="Max down: "+maxdown;
    box12.appendChild(a5);
    get_status()
    

}
function get_status()
{
    let m = new Map();
    let lan= new Map();
    let solved = new Set();
    let unsolved = new Set();
    let total = new Set();
    let l
    fetch(`https://codeforces.com/api/user.status?handle=${val.value}`)
    .then( (res)  =>{
        res.json().then(data => {
            console.log(data)
            l=data.result.length
            data.result.forEach((element,i) =>
            {
                total.add(element.contestId+" "+element.problem.index)
                if(element.verdict=='OK' && !solved.has(element.contestId+" "+element.problem.index)) {
                    solved.add(element.contestId+" "+element.problem.index)
                    if(m.has(element.problem.index))
                    {
                        var t=m.get(element.problem.index);
                        m.delete(element.problem.index)
                        m.set(element.problem.index,t+1)
                    }
                    else m.set(element.problem.index,1)
                }
              
            })
            var unsolved=diff(total,solved)
            console.log(lan)
            console.log(solved.size)
            console.log(unsolved.size)
            console.log(m)
            const a6=document.createElement("div");
    a6.classList='box12-item'
    a6.innerHTML="Solved Problem: "+solved.size;
    box12.appendChild(a6);

    const a7=document.createElement("div");
    a7.classList='box12-item'
    a7.innerHTML="Unsolved Problem: "+unsolved.size;
    box12.appendChild(a7);
    var x=l/solved.size
    const a8=document.createElement("div");
    a8.classList='box12-item'
    a8.innerHTML="Average Submission: "+(x).toPrecision(3);
    box12.appendChild(a8);
    
        })
    })
}
function starter()
{
    
    let v=new Map();
    fetch(`https://codeforces.com/api/user.status?handle=${val.value}`)
    .then( (res)  =>{
        res.json().then(data => {
            data.result.forEach((element) =>
            {
                if(v.has(element.verdict)){
                    var t=v.get(element.verdict);
                    v.delete(element.verdict)
                    v.set(element.verdict,t+1)
                }
                else v.set(element.verdict,1)
            })
            let ver=[]
    let ans=[]
    v.forEach((i,j)=>
    {
        ver.push(i)
        ans.push(j)
    })
    console.log(ver,ans)
    document.querySelector('#chart').setAttribute('width',"550px")
    //document.querySelector('#chart').style.pad
   const d= {
    labels: ans,
    datasets: [{
        label: '# of Votes',
        offset: 1,
        hoverOffset: 10,
        data: ver,
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        hoverBorderWidth: 10,
        hoverBorderColor: [
            'rgba(255, 99, 132, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 206, 86, 0.3)',
            'rgba(75, 192, 192, 0.3)',
            'rgba(153, 102, 255, 0.3)',
            'rgba(255, 159, 64, 0.3)'
        ]
    }]
}
const opt={
    color:['#fff'],
    responsive:false,
    layout: {
        padding: 15
    },
    plugins:
    {
        legend:{
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 14,
                    weight:1.5,
                    family:"'Noto Sans TC', sans-serif"
                }
            }
        }
    }
    
}
document.querySelector('.chart').style.padding="0 120px"
    var ctx = document.querySelector('#chart').getContext('2d');
     myChart = new Chart(ctx, {
        type: 'pie',
        data:d,
        options: opt
    });
    myChart.options.plugins.legend.labels.usePointStyle= true
    myChart.options.plugins.legend.position = 'right';  myChart.update();
    myChart.update();
        })
        
    })
}
function getVerdict()
{
    console.log(typeof myChart === "object")
    document.querySelector("#verdict").classList.add('active')
    document.querySelector("#lan").classList.remove('active')
    document.querySelector("#tag").classList.remove('active')
    document.querySelector("#level").classList.remove('active')
    document.querySelector("#rating").classList.remove('active')
   
    let v=new Map();
    fetch(`https://codeforces.com/api/user.status?handle=${val.value}`)
    .then( (res)  =>{
        res.json().then(data => {
            data.result.forEach((element) =>
            {
                if(v.has(element.verdict)){
                    var t=v.get(element.verdict);
                    v.delete(element.verdict)
                    v.set(element.verdict,t+1)
                }
                else v.set(element.verdict,1)
            })
            let ver=[]
    let ans=[]
    v.forEach((i,j)=>
    {
        ver.push(i)
        ans.push(j)
    })
    console.log(ver,ans)
    if(myChart) myChart.destroy()
    const dt= {
        labels: ans,
        datasets: [{
            label: '# of Votes',
            offset: 1,
            hoverOffset: 10,
            data: ver,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            hoverBorderWidth: 10,
            hoverBorderColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(255, 159, 64, 0.3)'
            ]
        }]
    }
    const opt={
        color:['#fff'],
        responsive:false,
        layout: {
            padding: 15
        },
        plugins:
        {
            legend:{
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                        weight:1.5,
                        family:"'Noto Sans TC', sans-serif"
                    }
                }
            }
        },
        
        
    }
    var ctx = document.querySelector('#chart').getContext('2d');
    let config={
        type:'pie',
        data:dt,
        options:opt
    }
    document.querySelector('#chart').setAttribute('width',"550px")
    document.querySelector('.chart').style.padding="0 120px"
    myChart=new Chart(ctx,config)
    myChart.options.plugins.legend.position = 'right';  myChart.update();
    myChart.options.plugins.legend.labels.usePointStyle= true
    myChart.update();
        })
        
    })
    
}
function handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    });
    legend.chart.update();
  }
  // Append '4d' to the colors (alpha channel), except for the hovered index
function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
  }
  function getlan()
{
    document.querySelector("#lan").classList.add('active')
    document.querySelector("#verdict").classList.remove('active')
    document.querySelector("#tag").classList.remove('active')
    document.querySelector("#level").classList.remove('active')
    document.querySelector("#rating").classList.remove('active')
    console.log(typeof myChart)
   console.log(myChart)
   let cnt=0
    let v=new Map();
    fetch(`https://codeforces.com/api/user.status?handle=${val.value}`)
    .then( (res)  =>{
        res.json().then(data => {
            data.result.forEach((element) =>
            {
                if(v.has(element.programmingLanguage)){
                    let t=v.get(element.programmingLanguage);
                    v.delete(element.programmingLanguage)
                    v.set(element.programmingLanguage,t+1)
                }
                else 
                {
                    v.set(element.programmingLanguage,1)
                    cnt++
                }
                
            })
            let ver=[]
    let ans=[]
    v.forEach((i,j)=>
    {
        ver.push(i)
        ans.push(j)
    })
    console.log(ver,ans)
    if(myChart) myChart.destroy()
    const dt= {
        labels: ans,
        datasets: [{
            label: '# of Votes',
            offset: 1,
            hoverOffset: 10,
            data: ver,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            hoverBorderWidth: 10,
            hoverBorderColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(255, 159, 64, 0.3)'
            ]
        }]
    }
    const opt={
        color:['#fff'],
        responsive:false,
        layout: {
            padding: 15
        },
        plugins:
        {
            legend:{
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                        weight:1.5,
                        family:"'Noto Sans TC', sans-serif"
                    }
                }
            }
        },
        
    }
    var ctx = document.querySelector('#chart').getContext('2d');
    let config={
        type:'pie',
        data:dt,
        options:opt
    }
   console.log(`cnt:${cnt}`)
    if(cnt>=19)
    {
        document.querySelector('.chart').style.padding="0 150px"
        document.querySelector('#chart').setAttribute('width',"650px")
    }
    else{
        document.querySelector('.chart').style.padding="0 150px"
        document.querySelector('#chart').setAttribute('width',"450px")
    }
    myChart=new Chart(ctx,config)
    myChart.options.plugins.legend.position = 'right';  myChart.update();
    myChart.options.plugins.legend.labels.usePointStyle= true
    myChart.update();
        })
        
    })
    
}
function getlevel()
{
    Chart.defaults.color='white';
    let level={}
    let solved = new Set();
    document.querySelector("#level").classList.add('active')
    document.querySelector("#verdict").classList.remove('active')
    document.querySelector("#tag").classList.remove('active')
    document.querySelector("#lan").classList.remove('active')
    document.querySelector("#rating").classList.remove('active')
    console.log(typeof myChart)
   console.log(myChart)
    fetch(`https://codeforces.com/api/user.status?handle=${val.value}`)
    .then( (res)  =>{
        res.json().then(data => {
            data.result.forEach((element) =>
            {
                if(element.verdict=='OK' && !solved.has(element.contestId+" "+element.problem.index)) {
                    solved.add(element.contestId+" "+element.problem.index)
                if(level[`${element.problem.index}`[0]]==undefined)
                    {
                        level[`${element.problem.index}`[0]]=1;
                    }
                    else level[`${element.problem.index}`[0]]++
                //console.log(level)
                }
            })
    let d=[]
    let l=['A','B','C','D','E','F','G','H','I','J','K','L','M','N']
    console.log(level)
    l.forEach((x)=>{
        if(level[`${x}`] == undefined) 
        {
            l.splice(l.indexOf(x),1)
            
        }
        else d.push(level[`${x}`])
    })
    console.log(d)
    //console.log(level)
   // console.log(myChart)
    if(myChart) myChart.destroy()
    const dt= {
        labels: l,
        datasets: [{
            label:'No of Problems Solved',
            offset: 1,
            hoverOffset: 2,
            data: d,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                 'rgba(54, 162, 235, 0.8)',
                 'rgba(255, 206, 86, 0.8)',
                 'rgba(75, 192, 192, 0.8)',
                 'rgba(153, 102, 255, 0.8)',
                 'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            hoverBorderWidth: 4,
            hoverBorderColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(255, 159, 64, 0.3)'
            ]
        }]
    }
    const opt={
        color:['#fff'],
        responsive:false,
        layout: {
            padding: 15
        },
        plugins:
        {
            legend:{
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                        weight:1.5,
                        family:"'Noto Sans TC', sans-serif"
                    }
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend:{
            display:false
        },
        title:{
            display:true,
            text:'Number of solved problems',
            fontColor:'rgb(51, 122, 241)'
        }
        
    }
    var ctx = document.querySelector('#chart').getContext('2d');
    let config={
        type:'bar',
        data:dt,
        options:opt
    }
    document.querySelector('.chart').style.padding="0 70px"
    document.querySelector('#chart').setAttribute('width',"700px")
    myChart.options.plugins.legend.labels.usePointStyle= true
    myChart=new Chart(ctx,config)
    // myChart.update();
    console.log(myChart.options.scales)
    Chart.defaults.fontFamily="'Noto Sans TC', sans-serif"
    Chart.defaults.fontSize=20;
    //Chart.defaults.defaultFontColor='white';
   // myChart.options.plugins.legend.position = 'right';  myChart.update();
    myChart.update();
        })
        
    })
}
function getRating()
{
    let level={}
    let solved = new Set();
    
    Chart.defaults.color='white';
    document.querySelector("#rating").classList.add('active')
    document.querySelector("#verdict").classList.remove('active')
    document.querySelector("#tag").classList.remove('active')
    document.querySelector("#lan").classList.remove('active')
    document.querySelector("#level").classList.remove('active')
    fetch(`https://codeforces.com/api/user.status?handle=${val.value}`)
    .then( (res)  =>{
        res.json().then(data => {
            data.result.forEach((element) =>
            {
                if(element.verdict=='OK' && !solved.has(element.contestId+" "+element.problem.index)) {
                    solved.add(element.contestId+" "+element.problem.index)
                if(level[`${element.problem.rating}`]==undefined)
                    {
                        level[`${element.problem.rating}`]=1;
                        
                    }
                    else level[`${element.problem.rating}`]++
                //console.log(level)
                }
            })
    let d=[]
    let l=['800','900','1000','1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200','2300','2400','2500','2600','2700','2800','2900','3000','3100','3200','3300','3400','3500']
    console.log(level)
    let nerArr=[]
    l.forEach((x)=>{
        if(level[`${x}`] == undefined) 
        {
            d.push(0)
            
        }
        else d.push(level[`${x}`])
    })
    for(let j=0;j<d.length;j++)
    for(let i=0;i<d.length;i++)
    {
        if(d[i]==0)
        {
            d.splice(i,1);
            l.splice(i,1);
            break;
        }
    }
    console.log(d,l)
    //console.log(level)
   // console.log(myChart)
    if(myChart) myChart.destroy()
    const dt= {
        labels: l,
        datasets: [{
            label:'No of Problems Solved',
            offset: 1,
            hoverOffset: 2,
            data: d,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                 'rgba(54, 162, 235, 0.8)',
                 'rgba(255, 206, 86, 0.8)',
                 'rgba(75, 192, 192, 0.8)',
                 'rgba(153, 102, 255, 0.8)',
                 'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            hoverBorderWidth: 2,
            hoverBorderColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(255, 159, 64, 0.3)'
            ]
        }]
    }
    const opt={
        color:['#fff'],
        responsive:false,
        layout: {
            padding: 15
        },
        plugins:
        {
            legend:{
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                        weight:1.5,
                        family:"'Noto Sans TC', sans-serif"
                    }
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend:{
            display:false
        },
        title:{
            display:true,
            text:'Number of solved problems',
            fontColor:'rgb(51, 122, 241)'
        }
        
    }
    var ctx = document.querySelector('#chart').getContext('2d');
    let config={
        type:'bar',
        data:dt,
        options:opt
    }
    document.querySelector('.chart').style.padding="0 70px"
    document.querySelector('#chart').setAttribute('width',"700px")
    myChart.options.plugins.legend.labels.usePointStyle= true
    myChart=new Chart(ctx,config)
    // myChart.update();
    // console.log(myChart.options.scales)
    // Chart.defaults.fontFamily="'Noto Sans TC', sans-serif"
    // Chart.defaults.fontSize=20;
    //Chart.defaults.defaultFontColor='white';
   // myChart.options.plugins.legend.position = 'right';  myChart.update();
    myChart.update();
        })
        
    })
}
function getTags()
{
    let tag={}
    let solved = new Set();
    let all= new Set();
    let cnt=0
    Chart.defaults.color='white';
    document.querySelector("#tag").classList.add('active')
    document.querySelector("#verdict").classList.remove('active')
    document.querySelector("#rating").classList.remove('active')
    document.querySelector("#lan").classList.remove('active')
    document.querySelector("#level").classList.remove('active')
    fetch(`https://codeforces.com/api/user.status?handle=${val.value}`).
    then(res =>
        {
            res.json().then(data =>
                {
                    data.result.forEach(element =>
                        {
                            if(element.verdict=='OK' && !solved.has(element.contestId+" "+element.problem.index)) {
                                solved.add(element.contestId+" "+element.problem.index)
                               element.problem.tags.forEach(x=>
                                {
                                    if(tag[`${x}`] == undefined) 
                                    {
                                        cnt++;
                                        tag[`${x}`]=1;
                                        all.add(`${x}`)
                                    }
                                    else tag[`${x}`]++;
                                })
                            }

                        })
                        let ver=[]
                        let ans=[]
                        all.forEach(i=>
                        {
                            ver.push(i)
                            ans.push(tag[`${i}`])
                        })
                        
                        if(myChart) myChart.destroy()
                        const dt= {
                            labels: ver,
                            datasets: [{
                                label: '# of Votes',
                                offset: 1,
                                hoverOffset: 10,
                                data: ans,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.8)',
                                    'rgba(54, 162, 235, 0.8)',
                                    'rgba(255, 206, 86, 0.8)',
                                    'rgba(75, 192, 192, 0.8)',
                                    'rgba(153, 102, 255, 0.8)',
                                    'rgba(255, 159, 64, 0.8)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1,
                                hoverBorderWidth: 10,
                                hoverBorderColor: [
                                    'rgba(255, 99, 132, 0.3)',
                                    'rgba(54, 162, 235, 0.3)',
                                    'rgba(255, 206, 86, 0.3)',
                                    'rgba(75, 192, 192, 0.3)',
                                    'rgba(153, 102, 255, 0.3)',
                                    'rgba(255, 159, 64, 0.3)'
                                ]
                            }]
                        }
                        const opt={
                            color:['#fff'],
                            responsive:false,
                            layout: {
                                padding: 15
                            },
                            plugins:
                            {
                                legend:{
                                    labels: {
                                        // This more specific font property overrides the global property
                                        font: {
                                            size: 14,
                                            weight:1.5,
                                            family:"'Noto Sans TC', sans-serif"
                                        }
                                    }
                                }
                            }
                            
                        }
                        var ctx = document.querySelector('#chart').getContext('2d');
                        let config={
                            type:'doughnut',
                            data:dt,
                            options:opt
                        }
                        console.log(`cnt:${cnt}`)
                        if(cnt<=19)
                        {
                            document.querySelector('.chart').style.padding="0 120px"
                            document.querySelector('#chart').setAttribute('width',"550px")
                        }
                        else{
                            document.querySelector('.chart').style.padding="0 70px"
                        document.querySelector('#chart').setAttribute('width',"750px")
                        }
                        myChart=new Chart(ctx,config)
                        myChart.options.plugins.legend.labels.usePointStyle= true
                        myChart.options.plugins.legend.position = 'right';  myChart.update();
                        myChart.update();   

                }
            )
        })
}