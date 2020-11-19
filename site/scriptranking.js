window.onload = function(){
    const players = JSON.parse(sessionStorage.getItem("Player"))
    //Ordenação do array. Ordernação em ordem decrescente.
    players.sort((a,b) => b.score - a.score)
    if(players != null){
        let table = document.getElementById("rankingTable")
        
        for(let i = 0; i < players.length; i++){

            let tr = document.createElement("tr")
            let th = document.createElement("th")
            th.innerHTML = (i + 1)
            tr.appendChild(th)
            
            let tdUsername = document.createElement("td")
            tdUsername.innerHTML = players[i].username
            tr.appendChild(tdUsername)
            
            let tdScore = document.createElement("td")
            tdScore.innerHTML = players[i].score
            tr.appendChild(tdScore)
                        
            table.appendChild(tr)
        }
    }
}