<?php
require("DatabaseCreds.php");
echo $_POST["method"]();
function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}
function getCharacterInfo() {
    $dbConn = mysqli_connect(server(), username(), password(), db());
    $query = "select CharacterName, Class, Level, Player_Names from CharacterInfo,
Players where CharacterInfo.Id = Players.Id ";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $Character = array();
    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 4; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($Character, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->Character = $Character;
    $return->querystring = $query;
    return json_encode($return);
}
function getPlayers() {
    $dbConn = mysqli_connect(server(), username(), password(), db());
    $query = "SELECT * FROM Players";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $Players = array();
    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 2; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($Players, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->Players = $Players;
    $return->querystring = $query;
    return json_encode($return);
}
function insertCharactersInfo() {
    if (isset($_POST['Level'])) {
        $Level = json_decode(sanitize($_POST['Level']));
    }
    if (isset($_POST['Id'])) {
        $Id = json_decode(sanitize($_POST['Id']));
    }
    if (isset($_POST['CharacterName'])) {
        $CharacterName = json_decode(sanitize($_POST['CharacterName']));
    }
    if (isset($_POST['Class'])) {
        $Class = json_decode(sanitize($_POST['Class']));
    }
    $dbConn = mysqli_connect(server(), username(), password(), db());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "INSERT INTO CharacterInfo ( CharacterName, Class, Level, Id ) " .
        "VALUES ( " .
        "'" . $CharacterName . "', " .
        "'" . $Class . "', " .
        "'" . $Level . "', " .
        "'" . $Id . "');";
    $result = $dbConn->query($query);
    $return = new stdClass;
    $return->querystring = (string) $query;
    if ($result) {
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}