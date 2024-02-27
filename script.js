class PokedexInit {
  constructor() {
    this.typeColors = {
      normal: "919AA2",
      bug: "91C12F",
      electric: "F4D23C",
      fighting: "CE416B",
      ghost: "5269AD",
      psychic: "FA7179",
      flying: "8FA9DE",
      steel: "5A8EA2",
      ice: "73CEC0",
      poison: "AA6BC8",
      fire: "FF9D55",
      dragon: "0B6DC3",
      ground: "D97845",
      water: "5090D6",
      dark: "5A5465",
      rock: "C5B78C",
      grass: "63BC5A",
      fairy: "EC8FE6",
    };
  }

  async getPokeData(
    pokeNumber,
    pokeNumbox,
    pokeName,
    pokeSprite,
    pokeHeight,
    pokeWeight,
    typeContainer
  ) {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + pokeNumber
      );
      const data = await response.json();

      let heightRaw = data.height * 0.3280839895;
      let weightRaw = data.weight / 4.536;
      let typeCount = 1;

      pokeSprite.src =
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/" +
        String(pokeNumber).padStart(3, "0") +
        ".png";
      pokeNumbox.textContent = "No. " + String(pokeNumber).padStart(3, "0");
      pokeName.textContent =
        data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1);
      pokeHeight.textContent = heightRaw.toFixed(1) + " ft";
      pokeWeight.textContent = weightRaw.toFixed(2) + " lbs";

      typeContainer.innerHTML = "";

      data.types.forEach((type) => {
        let typeName = type.type.name;

        let typeDiv = document.createElement("div");
        typeDiv.setAttribute("class", "type" + typeCount);

        let typeFrame = document.createElement("div");
        typeFrame.setAttribute("class", "type" + typeCount + "-frame");
        typeFrame.style.backgroundColor = "#" + this.typeColors[typeName];

        let typeImg = document.createElement("img");
        typeImg.setAttribute("class", "type" + typeCount + "-image");
        typeImg.setAttribute(
          "src",
          "./images/pokemon_types/Pokemon_Type_Icon_" + typeName + ".svg"
        );

        let typeText = document.createElement("span");
        typeText.setAttribute("class", "type" + typeCount + "-text");
        typeText.textContent = typeName.toUpperCase();

        typeFrame.appendChild(typeImg);
        typeDiv.appendChild(typeFrame);
        typeDiv.appendChild(typeText);
        typeContainer.appendChild(typeDiv);

        // typeElement.textContent = type.type.name + " ";
        // typeOf.appendChild(typeElement);
        typeCount += 1;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getPokeDescription(
    pokeNumber,
    speciesDesc,
    pokeDescription,
    pokeCatchRate
  ) {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species/" + pokeNumber
      );
      const data = await response.json();

      pokeCatchRate.textContent =
        Math.round((data.capture_rate / 255) * 100) + "%";
      let pokemonDescription = "Description not found.";
      let speciesDescription = "Description not found.";
      let foundDescription = false;
      let foundSpeciesDesc = false;

      for (
        let i = 0;
        i < data.flavor_text_entries.length && !foundDescription;
        i++
      ) {
        const entry = data.flavor_text_entries[i];
        if (entry.language.name === "en") {
          pokemonDescription = entry.flavor_text;
          foundDescription = true;
        }
      }

      for (let i = 0; i < data.genera.length && !foundSpeciesDesc; i++) {
        const entry = data.genera[i];
        if (entry.language.name === "en") {
          speciesDescription = entry.genus;
          foundSpeciesDesc = true;
        }
      }
      speciesDesc.textContent = speciesDescription;
      pokeDescription.textContent = pokemonDescription;
    } catch (error) {
      console.log(error);
    }
  }
}

let pokeNum = 1;
const pokeEntry = new PokedexInit();

const pokeNumbox = document.querySelector(".number");
const pokeName = document.querySelector(".name");
const pokeSprite = document.querySelector(".sprite");
const pokeHeight = document.querySelector(".height-text");
const pokeWeight = document.querySelector(".weight-text");
const speciesDesc = document.querySelector(".species-class");
const pokeDescription = document.querySelector(".desc-span");
const pokeCatchRate = document.querySelector(".catch-rate-text");
const typeContainer = document.querySelector(".type-container");

function addPokeNum() {
  if (pokeNum < 1026) {
    pokeNum += 1;
  }
  pokeEntry.getPokeData(
    pokeNum,
    pokeNumbox,
    pokeName,
    pokeSprite,
    pokeHeight,
    pokeWeight,
    typeContainer
  );
  pokeEntry.getPokeDescription(
    pokeNum,
    speciesDesc,
    pokeDescription,
    pokeCatchRate
  );
}

function minusPokeNum() {
  if (pokeNum > 1) {
    pokeNum -= 1;
  }
  pokeEntry.getPokeData(
    pokeNum,
    pokeNumbox,
    pokeName,
    pokeSprite,
    pokeHeight,
    pokeWeight,
    typeContainer
  );
  pokeEntry.getPokeDescription(
    pokeNum,
    speciesDesc,
    pokeDescription,
    pokeCatchRate
  );
}

//   upButton.addEventListener("click", addPokeNum);
//   downButton.addEventListener("click", minusPokeNum);

document.addEventListener("keydown", (event) => {
  // Check if the pressed key is the one you're interested in
  if (event.key === "ArrowUp") {
    // Do something when the Enter key is pressed
    minusPokeNum();
  }
});

document.addEventListener("keydown", (event) => {
  // Check if the pressed key is the one you're interested in
  if (event.key === "ArrowDown") {
    // Do something when the Enter key is pressed
    addPokeNum();
  }
});
