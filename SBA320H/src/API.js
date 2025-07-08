import md5 from 'md5'

export async function getComic(query = ''){
    let timeStamp = Date.now
    const PublicKey = process.env.REACT_APP_PUBLIC_KEY
    const PrivateKey = process.env.REACT_APP_PRIVATE_KEY
    const hash = md5(timeStamp + PrivateKey + PublicKey)

    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${PublicKey}&hash=${hash}&titleStartsWith=${query}`

    const response = await fetch(url)
    const data = await response.json
    return data
}