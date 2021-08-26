class FontAwesomeIcons {
    constructor(iconArray) {
        this.icons = iconArray || [
            "fa-atom",
            "fa-bacon",
            "fa-binoculars",
            "fa-biohazard",
            "fa-bone",
            "fa-book-dead",
            "fa-brain",
            "fa-bread-slice",
            "fa-burn",
            "fa-campground",
            "fa-candy-cane",
            "fa-caravan",
            "fa-carrot",
            "fa-cat",
            "fa-certificate",
            "fa-cheese",
            "fa-cloud",
            "fa-cloud-meatball",
            "fa-cloud-sun",
            "fa-comment",
            "fa-compass",
            "fa-cookie",
            "fa-crow",
            "fa-dice-d20",
            "fa-dice-d6",
            "fa-disease",
            "fa-dna",
            "fa-dog",
            "fa-dove",
            "fa-dragon",
            "fa-drumstick-bite",
            "fa-dungeon",
            "fa-egg",
            "fa-eye-dropper",
            "fa-faucet",
            "fa-feather-alt",
            "fa-fire",
            "fa-fire-alt",
            "fa-first-aid",
            "fa-fish",
            "fa-fist-raised",
            "fa-flask",
            "fa-football-ball",
            "fa-frog",
            "fa-hamburger",
            "fa-hat-wizard",
            "fa-heart",
            "fa-heart-broken",
            "fa-hiking",
            "fa-hippo",
            "fa-horse",
            "fa-horse-head",
            "fa-hotdog",
            "fa-ice-cream",
            "fa-kiwi-bird",
            "fa-leaf",
            "fa-lemon",
            "fa-magnet",
            "fa-map",
            "fa-map-marked-alt",
            "fa-map-marker",
            "fa-map-signs",
            "fa-microscope",
            "fa-mortar-pestle",
            "fa-mountain",
            "fa-otter",
            "fa-paw",
            "fa-pepper-hot",
            "fa-pizza-slice",
            "fa-radiation",
            "fa-radiation-alt",
            "fa-ring",
            "fa-route",
            "fa-scroll",
            "fa-seedling",
            "fa-shapes",
            "fa-skull-crossbones",
            "fa-spider",
            "fa-square",
            "fa-star",
            "fa-stroopwafel",
            "fa-temperature-high",
            "fa-toilet-paper",
            "fa-tractor",
            "fa-trailer",
            "fa-tree",
            "fa-vial",
            "fa-vials",
            "fa-wine-bottle",
            "fa-dollar-sign",
            "fa-euro-sign",
            "fa-pound-sign",
            "fa-yen-sign",
            "fa-ruble-sign",
            "fa-rupee-sign",
            "fa-lira-sign",
            "fa-hryvnia",
            "fa-shekel-sign",
            "fa-tenge",
            "fa-won-sign",
        ];
    }

    getRandomIcon = () => {
        const randomIndex = Math.floor(Math.random() * this.icons.length);
        return this.icons[randomIndex];
    };

    generateSetOfIcons = (numberOfIcons) => {
        let arrayLengthLimit = numberOfIcons;
        if (numberOfIcons > this.icons.length) {
            arrayLengthLimit = this.icons.length;
        }

        const randomIconArray = [];
        while (randomIconArray.length < arrayLengthLimit) {
            const randomIcon = this.getRandomIcon();
            if (!randomIconArray.includes(randomIcon)) {
                randomIconArray.push(randomIcon);
            }
        }

        return randomIconArray;
    };
}
