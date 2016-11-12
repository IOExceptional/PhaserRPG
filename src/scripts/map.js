define(['settings'], function (settings) {
    var layerNames = [
        'collision',
        'floor',
        'stall-area-floor',
        'stall-depot',
        'stall-depot-detail',
        'stall-depot-roof',
        'stalls-detail',
        'stalls',
        'stall-area-lamp'
    ];

    var layers = [];

    var preload = function (game) {
        game.load.tilemap('city', 'assets/maps/city.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('city_tiles', 'assets/city_t.png');
    };

    var create = function (game) {
        map = game.add.tilemap('city');
        map.addTilesetImage('city_t', 'city_tiles');

        for(var layerI = 0; layerI < layerNames.length; layerI++) {
            layers[layerI] = map.createLayer(layerNames[layerI]);
            layers[layerI].resizeWorld();
            if(layerNames[layerI] == 'collision') {
                layers[layerI].collisionLayer = true;
                layers[layerI].debug = settings.debug.collision;
            }
        }

        map.setCollision(37);
    };

    var update = function (game, player) {
        for(var layerI = 0; layerI < layers.length; layerI++) {
            game.physics.arcade.collide(player.getPlayerSprite(), layers[layerI]);
        }

    };

    return {
        'preload': preload,
        'create': create,
        'update': update
    }
});