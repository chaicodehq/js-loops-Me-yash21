/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if(!Array.isArray(matches) || matches.length ===0){
    return []
  }

  let scoreObj = {}

  for (const match of matches) {
    const team1 = match.team1;
    const team2 = match.team2
    if(!scoreObj[team1]){
      scoreObj[team1] = {
        team: team1, played:0, won:0, lost:0, tied:0, noResult:0, points:0
      }
    }
    if(!scoreObj[team2]){
      scoreObj[team2] = {
        team: team2, played:0, won:0, lost:0, tied:0, noResult:0, points:0
      }
    }

    if(match.result === "win"){
      const winnerTeam = match.winner;
      const lostTeam = (winnerTeam === team1) ? team2 : team1;
      scoreObj[winnerTeam]["played"] += 1;
      scoreObj[winnerTeam]["won"] += 1;
      scoreObj[winnerTeam]["points"] += 2;
      
      scoreObj[lostTeam]["played"] += 1;
      scoreObj[lostTeam]["lost"] += 1;

    }else if(match.result === "tie"){
      scoreObj[team1]["played"] += 1 
      scoreObj[team1]["tied"] += 1;
      scoreObj[team1]["points"] += 1;
      
      scoreObj[team2]["played"] += 1 
      scoreObj[team2]["tied"] += 1;
      scoreObj[team2]["points"] += 1;
      
    }else if(match.result === "no_result"){
      scoreObj[team1]["played"] += 1 
      scoreObj[team1]["noResult"] += 1;
      scoreObj[team1]["points"] += 1;
      
      scoreObj[team2]["played"] += 1 
      scoreObj[team2]["noResult"] += 1;
      scoreObj[team2]["points"] += 1;
      
    }
  }

  let arrayOfMatchScores = Object.values(scoreObj);

  arrayOfMatchScores.sort((a,b)=>{
    // Rule 1: Sort by points (descending)
    // Rule 2: If points are equal, sort by team name (alphabetical)
    return (b.points - a.points) || a.team.localeCompare(b.team)
  })

  return arrayOfMatchScores;
}
