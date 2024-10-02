const API_KEY = ""

const url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=47.5763831,-122.4211769&fov=80&heading=70&pitch=0&key=' + API_KEY

const response = await fetch(url)

const buffer = await response.arrayBuffer()

await Deno.writeFile("streetview.jpg", new Uint8Array(buffer))

