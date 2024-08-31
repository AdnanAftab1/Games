
var board=[];
var o=[];
let r;
let c;
let flag;
let fl;
let fn=[];

function Seter(a){
    if(a==='Try')
        {
        r=5;
        c=5;
    }
    if(a==='Easy')
        {
        r=10;
        c=10;
    }
    if(a==='Medium')
        {
        r=16;
        c=16;
    }
    if(a==='Hard')
        {
        r=24;
        c=24;
    }
    IDgiver();
    Ranom();
    Integ();
}
function Ranom() {
    board.length=0;
    var row=[];
    let m=0;
    for (let index1 = 0; index1 < r; index1++) {
        for (let index = 0; index < c; index++) {
            var a=Math.random();
            a=a*8;
            if(a<=1)
                {
                row.push("M");
                m++;
            }
            else{
                row.push("E");
            }
        }
        board.push(row);
        row=[];
        
    }
    console.log(board);
    console.log(m);
    
    flag=m;
    fl=document.getElementById("Flags");
    fl.innerHTML=flag;
}
function gameover()
{
    document.getElementById('hightable').disabled=true;
    alert("Game Over");
}
function updateBoard(a,b){
    let ele=document.getElementById(`${a}#${b}`);
    ele.className="btn";
    
    if(ele.innerHTML==="")
        {
        if(flag==0){
            alert("No more flag");
            return;
        }
        else{
            ele.innerHTML='<i class="fa fa-flag" style="font-size:12px; justify:center;"></i>';
            
            flag--;
        }
        fl.innerHTML=flag;
        fn[a][b]=1;
        return;
    }
    flag++;
    fn[a][b]=0;
    fl.innerHTML=flag;
    if(board[a][b]=='M')
        {
        ele.innerText='X';
        gameover();
        return;
    }
    else if(o[a][b]>0)
        { 
        ele.innerText=o[a][b];
        return;
    }
    else{
        bfs(a,b);
    }
}
function bfs(x,y) {
    let ele=document.getElementById(`${x}#${y}`)
    if(o[x][y]>0){
        ele.innerText=o[x][y];
        ele.className="btn";
        return;
    }
    else{
        ele.innerText= "   " ;
        ele.className="btn";
    }
    
    for(let i=-1;i<2;i++)
        {
        for(let j=-1;j<2;j++)
            {
            if(x+i>=0 && y+j>=0 && x+i<board.length && y+j<board[0].length && !(i==0 && j==0) && board[x+i][y+j]=='E')
                {
                board[x+i][y+j]='B';
                bfs((x+i),(y+j));
                
            }
            
        }
        
    }
    return;
}
function IDgiver(){
    let f="";
    // for (let index = 0; index <= c; index++) {
    //     f=f+`<th scope="col">${index}</th>
    //     `;
    
    // }
    //ele.innerHTML=f;
    f=``;
    let ele=document.getElementById(`hightable`)
    for (let i = 0; i <r; i++) {
        f=f+`
            <tr id="Row${i}">
            `;
        for (let j = 0; j < c; j++) {
            f=f+`<td><button type="button" class="button3" id="${i}#${j}" onclick="updateBoard(${i},${j})"></button></td>
            `;
            
        }
        f=f+`</tr>`;
        
    }
    console.log(f);
    ele.innerHTML=f;
}
function Integ()
{  
    o.length=0;
    fn.length=0;
    for (let x = 0; x < board.length; x++) {
        o.push([]);
        fn.push([]);
        for (let y = 0; y < board[0].length; y++) {
            o[x].push(0);
            fn[x].push(0);
        }
    }
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[0].length; y++) {
            if(board[x][y]=='M'){
                for(let i=-1;i<2;i++)
                    {
                    for(let j=-1;j<2;j++)
                        {
                        if(x+i>=0 && y+j>=0 && x+i<board.length && y+j<board[0].length && !(i==0 && j==0))
                            {
                            o[x+i][y+j]++;
                        }
                        
                    }
                    
                }
            }
            
        }
    }
    console.log(o);
}
function Finished() {
    console.log(fn);
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[0].length; y++) {
            if(board[x][y]=="M")
                {
                if(fn[x][y]==1)
                    continue;
                else{
                    alert("You lose");
                    return;
                }
            }
        }
    }
    alert('You Won');   
    
}