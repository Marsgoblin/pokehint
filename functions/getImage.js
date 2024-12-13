// Load the JSON files once when the module is loaded
const images = require("../data/images/images.json");
const forms = require("../data/images/forms.json");
const events = require("../data/images/events.json");

/**
 * Retrieves the image URL for a given Pokémon.
 * @param {string} pokemon - The name of the Pokémon.
 * @param {boolean} [shiny=false] - Whether to get the shiny version of the Pokémon.
 * @returns {Promise<string>} The URL of the Pokémon image.
 * @throws {Error} If no Pokémon name is specified or if no image is found.
 */
function getImage(pokemon, shiny = false) {
  if (typeof pokemon !== 'string' || !pokemon.trim()) {
    throw new Error("[PokeHint] Invalid or empty Pokémon name specified.");
  }
  

  const pokemonName = pokemon.toLowerCase();

  // Access the preloaded image data
  const imageOptions = [
    images[pokemonName],
    forms[pokemonName],
    events[pokemonName]
  ];

  // Find the first valid image
  const image = imageOptions.find(img => img !== undefined);

  if (!image) {
    console.log(`[PokeHint] Unable to find an image for the Pokémon: ${pokemon}`);
    return null;
  }

  // Replace 'images' with 'shiny' in the URL if shiny version is requested
  return shiny ? image.replace("images", "shiny") : image;
}

module.exports = getImage;
