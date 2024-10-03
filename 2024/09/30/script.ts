import { ensureDir } from "https://deno.land/std/fs/mod.ts";

const API_KEY = ""

// top 50 locations in Amsterdam according to ChatGPT
// prompt:
// "can you provide me with a list of 100 popular lat lon coordinates in Amsterdam?"
const top_50_locations = [
  ["dam_square", 52.37403, 4.88969],
  ["rijksmuseum", 52.36000, 4.88517],
  ["heineken_experience", 52.35996, 4.89199],
  ["van_gogh_museum", 52.36234, 4.88327],
  ["anne_frank_house", 52.37308, 4.89260],
  ["artis_zoo", 52.36564, 4.91193],
  ["royal_palace", 52.37022, 4.89517],
  ["nemo_science_museum", 52.37627, 4.91203],
  ["bloemenmarkt", 52.37293, 4.90211],
  ["the_nine_streets", 52.37124, 4.90029],
  ["museumplein", 52.36629, 4.90117],
  ["westerkerk", 52.37845, 4.90031],
  ["kalverstraat", 52.37498, 4.89731],
  ["leidseplein", 52.36753, 4.88652],
  ["hortus_botanicus", 52.36485, 4.91285],
  ["vondelpark", 52.36828, 4.88379],
  ["the_jordaan", 52.37578, 4.90204],
  ["rembrandt_house_museum", 52.37099, 4.90708],
  ["stedelijk_museum", 52.36262, 4.87881],
  ["prinsengracht", 52.37942, 4.89964],
  ["the_national_maritime_museum", 52.37686, 4.90901],
  ["westerpark", 52.37919, 4.89998],
  ["concertgebouw", 52.36562, 4.88627],
  ["de_pijp", 52.38154, 4.88578],
  ["beurs_van_berlage", 52.37427, 4.89584],
  ["moco_museum", 52.36701, 4.88945],
  ["foam_photography_museum", 52.37232, 4.90402],
  ["nieuwmarkt", 52.37412, 4.89385],
  ["spui_square", 52.37793, 4.90025],
  ["oude_kerk", 52.37191, 4.91116],
  ["ndsm_wharf", 52.37911, 4.90257],
  ["eye_film_museum", 52.37919, 4.91841],
  ["p_c_hooftstraat", 52.37688, 4.88137],
  ["red_light_district", 52.37207, 4.89612],
  ["museum_of_prostitution", 52.37153, 4.90868],
  ["leidse_square_theatre", 52.37443, 4.88677],
  ["amsterdam_dungeon", 52.37161, 4.89467],
  ["hermitage_amsterdam", 52.36844, 4.90492],
  ["magere_brug", 52.37129, 4.90564],
  ["houseboat_museum", 52.36485, 4.89917],
  ["begijnhof", 52.37065, 4.89711],
  ["madame_tussauds", 52.37383, 4.89471],
  ["national_monument", 52.37453, 4.89128],
  ["museum_het_schip", 52.36012, 4.88671],
  ["de_negen_straatjes", 52.37717, 4.88944],
  ["rembrandtplein", 52.37214, 4.89748],
  ["allard_pierson_museum", 52.37418, 4.89957],
  ["sarphatipark", 52.38088, 4.88349],
  ["maritime_heritage_museum", 52.36360, 4.90241],
  ["jewish_historical_museum", 52.36712, 4.90724],
]

await ensureDir("./pics");

for (const location of top_50_locations) {
  const [name, lat, lng] = location

  const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=${API_KEY}`

  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  const filename = `./pics/${name}.jpg`
  await Deno.writeFile(filename, new Uint8Array(buffer));

  // now resize the image
  const p = Deno.run({
    cmd: ["convert", filename, "-resize", "100x100", filename],
  });

  await p.status();
  p.close()
}

