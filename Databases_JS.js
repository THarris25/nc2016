/**
 * Created by Remlu on 4/13/2016.
 */
var Players;
var Character;

function onLoad() {
    getCharacterInfo(false);
    getPlayers(false);

}

function insertCharacter() {
   // alert("in insertCharacter");
    var CharacterName,
        Id,
        Level,
        Class;
    CharacterName = JSON.stringify($('#CharacterName').val());
    Id = JSON.stringify($('#Id option:selected').val());
    Level = JSON.stringify($('#Level').val());
    Class = JSON.stringify($('#Class').val());
    //alert(CharacterName);
   // alert(Id);
    //alert(Level);
    //alert(Class);
    ajax = ajaxinsertCharactersInfo("insertCharactersInfo", Level, Id, CharacterName, Class);
    ajax.done(insertCharactersCallback);
    ajax.fail(function() {
        alert("Failure");
    });
}

function ajaxinsertCharactersInfo(method, Level, Id, CharacterName, Class) {
    return $.ajax({
        url : 'Database.php',
        type : 'POST',
        data : {
            method : method,
            Level : Level,
            Id : Id,
            CharacterName : CharacterName,
            Class : Class
        }
    });
}

function insertCharactersCallback(response_in) {
    response = JSON.parse(response_in);

    if (!response['success']) {
        $("#results").html("");
        alert("Insert failed on query:" + '\n' + response['querystring']);
        getPlayers(false);
        getCharacterInfo(false);
    } else {
        $("results").html(response['querystring'] + '<br>' + response['success'] + '<br>');
        getPlayers(false);
        getCharacterInfo(false);
    }
}

function showCharacters(Character) {
    //alert("In showCharacters()");
   // alert(Character);
    var CharacterList = "";
    $.each(Character, function(key, value) {
        var itemString = "";
        $.each(value, function(key, item) {
            itemString += item + "\t | \t | \t";
        });
        CharacterList += itemString + '<br>';
    });
    $("#results").html(CharacterList);
}

function getCharacterInfo() {
   // alert("In getCharacterInfo()");
    ajax = ajaxgetCharacterInfo("getCharacterInfo");
    ajax.done(getCharacterInfoCallback);
    ajax.fail(function() {
        alert("Failure");
    });
}

function ajaxgetCharacterInfo(method) {
    //alert("In ajaxgetCharacterInfo()");
    return $.ajax({
        url : 'Database.php',
        type : 'POST',
        data : {
            method : method
        }
    });
}

function getCharacterInfoCallback(response_in) {
   // alert(response_in);
    var response = JSON.parse(response_in);
    Character = response["Character"];

    if (!response['success']) {
        $("#results").html("getCharacterInfo() failed");
    }
    else {
        showCharacters(Character);
    }
}

function getPlayers() {
   // alert("In getPlayers()");
    ajax = ajaxgetPlayers("getPlayers");
    ajax.done(getPlayersCallback);
    ajax.fail(function() {
        alert("Failure");
    });
}

function ajaxgetPlayers(method) {
   // alert("In ajaxgetPlayers()");
    return $.ajax({
        url : 'Database.php',
        type : 'POST',
        data : {
            method : method
        }
    });
}

function getPlayersCallback(response_in) {
    //alert("In getPlayersCallback()");
   // alert(response_in);
    response = JSON.parse(response_in);
    $Players = response["Players"];
   // alert($Players);
    if (!response['success']) {
        alert('Failed in getPlayersCallback');
        $("#results").html("getPlayers failed");
    } else {
        $('#Id').find('option').remove();
        //alert($Players);
        $.each($Players, function(key, columns) {
            $("#Id").append($('<option>', {
                value : columns[0].toString(),
                text : columns[1].toString()
            }));
        });
    }
}