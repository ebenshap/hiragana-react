export const UPDATE_GAMEINFO = 'UPDATE_GAMEINFO'


export function updateGameInfo (gameInfo) {
  return {
    type: UPDATE_GAMEINFO,
    gameInfo
  }
}
