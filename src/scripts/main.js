requirejs(['map', 'ui', 'player'], function (map, ui, player) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'main', { preload: preload, create: create, update: update, render: render });

    function preload() {
        map.preload(game);
        player.preload(game);
    }

    function create() {
        game.stage.backgroundColor = '#00CCFF';
        game.world.setBounds(0, 0, 64*16, 64*16);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        map.create(game);
        player.create(game);

        ui.create();
    }

    function update() {
        player.update(game);
        try {
            ui.update();
        }
        catch(e) {
            console.error(e);
        }
    }

    function render() {
        player.render(game);
    }
});