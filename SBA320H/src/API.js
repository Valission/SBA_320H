import md5 from 'md5'

export async function fetchComic(query = ''){
    let timeStamp = Date.now().toString()
    const PublicKey = "8479f9c35a3fa0c6bbd2192eb7dd60e6"
    const PrivateKey = "5ec1a2baa353d79019b70efe24b46bf1902bb7bb"
    const hash = md5(timeStamp + PrivateKey + PublicKey)

    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${PublicKey}&hash=${hash}&titleStartsWith=${query}`
    console.log('fetching:', url)
    const response = await fetch(url)
    const data = await response.json()
    console.log('api data:', data)
    return data
}