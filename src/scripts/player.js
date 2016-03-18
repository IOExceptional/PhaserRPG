define(['settings'], function (settings) {
    var player, cursors;

    var width = 16;
    var height = 16;

    var char = {
        attributes: {
            velocity: {
                min: 50,
                max: 150
            },
            health: {
                min: 0,
                max: 50
            }
        },
        modifiers: {
            velocity: 100,
            health: 50
        },
        skills: [
            'attack',
            'defence',
            'health'
        ],
        xp: [
            0,          //attack
            0,          //defence
            0      //health
        ]
    };

    var preload = function(game) {
        game.load.image('char_sheet', 'assets/char.png');

        var cacheXP = localStorage.getItem('playerXP');

        if(cacheXP !== undefined && cacheXP !== null) {
            char.xp = cacheXP;
        }
    };

    var create = function (game) {
        player = game.add.sprite(game.world.centerX - (width/2), game.world.centerY - (height/2), 'char_sheet');

        cursors = game.input.keyboard.createCursorKeys();

        game.physics.arcade.enable(player);
        game.camera.follow(player);
    };

    var update = function (game) {
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;

        var velocity = char.modifiers.velocity;

        if (cursors.up.isDown) {
            takeDamage(1);
            player.body.velocity.y = -velocity;
        } else if (cursors.down.isDown) {
            player.body.velocity.y = velocity;
        }

        if (cursors.left.isDown) {
            player.body.velocity.x = -velocity;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = velocity;
        }
    };

    var render = function (game) {
        //game.debug.body(player);
    };

    var getHealth = function () {
        return char.modifiers.health;
    };

    var getMaxHealth = function () {
        return char.attributes.health.max;
    };

    var takeDamage = function (amount) {
        var health = char.modifiers.health;

        health -= amount;

        if(health < char.attributes.health.min) {
            var xpAmount = amount - health;
            addSkillXp('defence', xpAmount * settings.damageDefenceXpModifier);
            health = char.attributes.health.min;
        } else if (health > char.attributes.health.max) {
            health = char.attributes.health.max;
        } else {
            addSkillXp('defence', amount * settings.damageDefenceXpModifier);
        }

        char.modifiers.health = health;
    };

    var getSkillLevel = function (skillIndex) {
        var xp = getSkillXp(skillIndex);

        return 1 + Math.floor(settings.levelConstant * Math.sqrt(xp));
    };

    var getSkillXp = function (skillIndex) {
        var xp = null;

        skillIndex = getSkillIndexFromNameOrIndex(skillIndex);
        if(skillIndex > -1) {
            xp = char.xp[skillIndex];
        }

        if(xp === null) {
            return -1;
        }

        return xp;
    };

    var getSkillIndexFromNameOrIndex = function (skillIndex) {
        if(!isNaN(parseFloat(skillIndex)) && isFinite(skillIndex)) {
            return skillIndex;
        } else {
            for (var i = 0; i < char.skills.length; i++) {
                if (char.skills[i] == skillIndex) {
                    return i;
                }
            }
        }

        return -1;
    };

    var addSkillXp = function (skillIndex, addedXp) {
        skillIndex = getSkillIndexFromNameOrIndex(skillIndex);

        if(skillIndex > 0) {
            char.xp[skillIndex] += addedXp;
        }
    };

    return {
        'preload': preload,
        'create': create,
        'update': update,
        'render': render,
        'getMaxHealth': getMaxHealth,
        'getHealth': getHealth,
        'takeDamage': takeDamage,
        'getSkillLevel': getSkillLevel,
        'getSkillXp': getSkillXp,
        'addSkillXp': addSkillXp
    }
});