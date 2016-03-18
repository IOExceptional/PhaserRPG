define(['settings', 'player'], function (settings, plr) {
    var healthbar = document.getElementById('healthbar');
    var healthbarContent = document.getElementById('healthbarContent');
    var healthbarText = document.getElementById('healthbarText');

    var attStat = document.getElementById('statAttack');
    var defStat = document.getElementById('statDefence');
    var hpStat = document.getElementById('statHealth');

    var preload = function () {
    };

    var create = function () {
        healthbar.style.width = settings.healthbar.width + 'px';
        healthbarContent.style.width = settings.healthbar.width + 'px';
        healthbarText.style.width = settings.healthbar.width + 'px';

        healthbar.style.height = settings.healthbar.height + 'px';
        healthbarContent.style.height = settings.healthbar.height + 'px';
        healthbarText.style.height = settings.healthbar.height + 'px';
    };

    var update = function () {
        var max = plr.getMaxHealth();
        var curr = plr.getHealth();

        healthbarContent.style.width = settings.healthbar.width * (curr/max) + 'px';
        healthbarText.innerText = curr + "/" + max;

        attStat.innerText = plr.getSkillLevel(0);
        defStat.innerText = plr.getSkillLevel(1);
        hpStat.innerText = plr.getSkillLevel(2);
    };

    return {
        'preload': preload,
        'create': create,
        'update': update
    }
});