import CryptoJS from 'crypto-js'

const PRIV_KEY = 'e78116e2895bf97f29633c5805b59b39a5091e59'
export const PUBLIC_KEY = 'b6c374444c6d92929a68fbdfd48bedd2'

export const getTimeStamp = () => new Date().getTime()

export const getHash = () => {
  return CryptoJS.MD5(getTimeStamp() + PRIV_KEY + PUBLIC_KEY).toString()
}
