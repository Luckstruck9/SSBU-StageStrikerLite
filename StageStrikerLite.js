
var w = window.innerWidth;
var h = window.innerHeight;
var p1;
var p2;
var rps_tog;
var p1_score = 0;
var p2_score = 0;
var stage_sources = [];
var p1_won_stages = [];
var p2_won_stages = [];
var dsr1 = [];
var dsr2 = [];
var gamewinner= [0, 0, 0, 0, 0, 0, 0];
var games = 0;
var BOX = 0;
var current_stages = [];
var strikes=0;
var stages = ['battlefield', 'finaldestination', 'smashville', 'townandcity', 'pokemonstadium2', 'lylatcruise', 'yoshisstory','kalospokemonleague'];
var pick = 0;
var bans=0;
var ruleset=0;
var dsr = 0;
var chosen_stage="";

var result_p1_images = ["p1_g1c","p1_g2c","p1_g3c","p1_g4c","p1_g5c","p1_g6c","p1_g7c"];
var result_p2_images = ["p2_g1c","p2_g2c","p2_g3c","p2_g4c","p2_g5c","p2_g6c","p2_g7c"];
var result_game_images = ["stage_g1","stage_g2","stage_g3","stage_g4","stage_g5","stage_g6","stage_g7"];

function dsr_toggle()
{
    dsr=(dsr+1)%2;
    if (dsr==0)
    {
        document.getElementById("dsr").innerHTML="No DSR"
        var opacity=0.5;
    }
    if (dsr==1)
    {
        document.getElementById("dsr").innerHTML="Automatic DSR"
        var opacity=1;
    }
    document.getElementById("dsr").style.opacity = opacity;
}

function enter_rules(num)
{
    ruleset = num;
    if (ruleset==1)
    {
        document.getElementById("tbh9").disabled = true;
        document.getElementById("evo2020").disabled = false;
    }
    else if (ruleset==2)
    {
        document.getElementById("tbh9").disabled = false;
        document.getElementById("evo2020").disabled = true;
    }
}

function PlayerEntry()
{
    p1 = document.getElementById('Player1').value;
    p2 = document.getElementById('Player2').value;
    if(p1=="" || p2=="")
    {
        alert("One or more of the Player Entries has been left blank. Please fill in the blank fields and click submit!");
        return;
    }
    else if (BOX==0)
    {
        alert("Please select a game count before continuing!");
        return;
    }
    else if (ruleset==0)
    {
        alert("Please select a ruleset before continuing!")
        return
    }

    document.getElementById('p1_rps').innerHTML = p1;
    document.getElementById('p2_rps').innerHTML = p2;
    document.getElementById("RPS").style.display= 'block';
    document.getElementById("player_entry").style.display = 'none';
    document.getElementById('p1_name').innerHTML = p1;
    document.getElementById('p2_name').innerHTML = p2;
    document.getElementById('p1W').innerHTML = p1+" wins";
    document.getElementById('p2W').innerHTML = p2+" wins";
}

function BO(games)
{
    BOX = games;
    if (games==3)
    {
        document.getElementById('BO3').disabled = true;
        document.getElementById('BO5').disabled = false;
        document.getElementById('BO7').disabled = false;
    }
    else if (games==5)
    {
        document.getElementById('BO3').disabled = false;
        document.getElementById('BO5').disabled = true;
        document.getElementById('BO7').disabled = false;
    }
    else if (games==7)
    {
        document.getElementById('BO3').disabled = false;
        document.getElementById('BO5').disabled = false;
        document.getElementById('BO7').disabled = true;
    }
}

function RPS(player)
{
    if (player==1)
    {
        rps_tog = 1;
    }
    else
    {
        rps_tog = 2;
    }
    document.getElementById("RPS").style.display='none';
    document.getElementById("Stages").style.display='block';
    stage_prompter(rps_tog);
    strikes = 4;
    current_stages = ['battlefield', 'finaldestination', 'smashville', 'townandcity', 'pokemonstadium2'];
}

function stage_prompter(player_num)
{
    if (player_num==1)
    {
        document.getElementById("stage_prompt").innerHTML =  (p1+", please pick a stage to strike:");
    }
    else if (player_num==2)
    {
        document.getElementById("stage_prompt").innerHTML =  (p2+", please pick a stage to strike:");
    }
}

function updatescore()
{
    document.getElementById('curr_score').innerHTML = p1_score+" - "+p2_score;
    document.getElementById('game_num').innerHTML = "Game: "+(games+1);
}

function ResetStages()
{
    document.getElementById('battlefield').style.display="inline-block";
    document.getElementById('finaldestination').style.display="inline-block";
    document.getElementById('smashville').style.display="inline-block";
    document.getElementById('townandcity').style.display="inline-block";
    document.getElementById('pokemonstadium2').style.display="inline-block";
    document.getElementById('lylatcruise').style.display="inline-block";
    document.getElementById('kalospokemonleague').style.display="inline-block";
    document.getElementById('yoshisstory').style.display="inline-block";
    if (ruleset==2)
    {
        document.getElementById('unovapokemonleague').style.display="inline-block";
    }
}

function Strike(stage)
{
    if (games>0)
    {
        ban(stage);
        return;
    }
    //alert("STRIKE: "+stage+" "+strikes);
    document.getElementById(stage).style.display="none";
    current_stages.splice(current_stages.indexOf(stage), 1);
    if (strikes==4 || strikes==2)
    {
        rps_tog=(rps_tog%2)+1;
    }
    stage_prompter(rps_tog);
    strikes--;
    if (strikes==0)
    {
        //Next Phase
        document.getElementById('Stages').style.display='none';
        chosen_stage=current_stages.pop();
        document.getElementById('chosen_stage').src = document.getElementById(chosen_stage).src;
        document.getElementById('score_report').style.display="block";
        updatescore();
        document.getElementById('Scoreboard').style.display='block';
        document.getElementById('Character Selection').style.display="block";
    }
}

function ban(stage)
{
    if (pick==1 && bans==0)
    {
        var c = true;
        if (p1_won_stages.includes(document.getElementById(stage).src))
        {
            c = confirm(p1+" has already won on this stage. "+p2+", do you consent?\n(Dave's Stupid Rule)");
        }
        if (c)
        {
            document.getElementById('chosen_stage').src = document.getElementById(stage).src;
            document.getElementById('Stages').style.display='none';
            document.getElementById('Character Selection').style.display="block";
            document.getElementById('chosen_stage').style.display="block";
            document.getElementById('score_report').style.display="block";
            pick=0;
            chosen_stage=stage;
        }
    }
    else if(pick==2 && bans==0)
    {
        var c = true;
        if (p2_won_stages.includes(document.getElementById(stage).src))
        {
            c = confirm(p2+" has already won on this stage. "+p1+", do you consent?\n(Dave's Stupid Rule)");

        }
        if (c)
        {
            document.getElementById('chosen_stage').src = document.getElementById(stage).src;
            document.getElementById('Stages').style.display='none';
            document.getElementById('Character Selection').style.display="block";
            document.getElementById('chosen_stage').style.display="block";
            document.getElementById('score_report').style.display="block";
            pick=0;
            chosen_stage=stage;
        }
    }
    else if (gamewinner[games]==1)
    {
        document.getElementById(stage).style.display="none";
        pick=2;
        bans--;
        if (bans==0)
        {
            document.getElementById("stage_prompt").innerHTML= p2+", please pick a stage to play on:";
        }
    }
    else if (gamewinner[games]==2)
    {
        document.getElementById(stage).style.display="none";
        pick=1;
        bans--;
        if (bans==0)
        {
            document.getElementById("stage_prompt").innerHTML= p1+", please pick a stage to play on:";
        }
    }
}

function reportWinner(player)
{
    ResetStages();
    if (BOX>3)
    {
        bans=1;
    }
    else if (BOX==3)
    {
        bans=2;
    }
    stage_sources.push(document.getElementById('chosen_stage').src);
    if (player==1)
    {
        p1_score++;
        games++;
        document.getElementById('score_report').style.display="none";
        gamewinner[games]=1;
        p1_won_stages.push(document.getElementById("chosen_stage").src);
        document.getElementById("stage_prompt").innerHTML= p1+", please pick a stage to ban:";
        dsr1.push(chosen_stage);
        //alert("Chosen Stage: "+chosen_stage);
        if (dsr==1)
        {
            //alert(dsr2);
            var i=0;
            for (i=0; i<dsr2.length; i++)
            {
                document.getElementById(dsr2[i]).style.display="none";
            }
        }
    }
    else if (player==2)
    {
        p2_score++;
        games++;
        document.getElementById('score_report').style.display="none";
        gamewinner[games]=2;
        p2_won_stages.push(document.getElementById("chosen_stage").src);
        document.getElementById("stage_prompt").innerHTML= p2+", please pick a stage to ban:";
        dsr2.push(chosen_stage);
        //alert("Chosen Stage: "+chosen_stage);
        if (dsr==1)
        {
            //alert(dsr1);
            var i=0;
            for (i=0; i<dsr1.length; i++)
            {
                document.getElementById(dsr1[i]).style.display="none";
            }
        }
    }
    updatescore();
    if (p1_score>(BOX/2) || p2_score>(BOX/2))
    {
        //FINISHED
        finish();
        return;
    }
    pick=0;
    document.getElementById('Stages').style.display="block";
    //document.getElementById('chosen_stage').style.display="none";
}

function finish()
{
    document.getElementById('game_num').innerHTML="Total Games: "+games;
    document.getElementById('Character Selection').style.display="none";
    document.getElementById('results').style.display="block";
    //alert(stage_sources);
    var space = h*0.8;
    var itemheight = space/games;
    var insertsize = itemheight+"px";
    var i;
    for (i=games; i>0; i--)
    {
        var winner = gamewinner[i];
        if (winner==1)
        {
            document.getElementById(result_p1_images[i]).src = "win.png";
            document.getElementById(result_p2_images[i]).src = "lose.png";
        }
        if (winner==2)
        {
            document.getElementById(result_p1_images[i]).src = "lose.png";
            document.getElementById(result_p2_images[i]).src = "win.png";
        }
        document.getElementById(result_game_images[i]).src = stage_sources.pop();

        document.getElementById(result_p1_images[i]).style.height=insertsize;
        document.getElementById(result_game_images[i]).style.height=insertsize;
        document.getElementById(result_p2_images[i]).style.height=insertsize;

        document.getElementById(result_p1_images[i]).style.maxWidth='33%';
        document.getElementById(result_game_images[i]).style.maxWidth='33%';
        document.getElementById(result_p2_images[i]).style.maxWidth='33%';

        document.getElementById(result_p1_images[i]).style.display="inline-block";
        document.getElementById(result_game_images[i]).style.display="inline-block";
        document.getElementById(result_p2_images[i]).style.display="inline-block";

    }
}
