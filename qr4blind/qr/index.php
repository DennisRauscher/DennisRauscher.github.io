<?php
    header('Access-Control-Allow-Origin: http://dennisrauscher.de', false);
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: *");

    if(isset($_POST['req']) && isset($_POST['text']) && isset($_POST['url']) && $_POST['req'] == 'PUT')
    {
        $salt = "xl9a7_lawd";

        $text       =   $_POST['text'];
        $websiteURL =   $_POST['url'];
        $hash       =   md5($_POST['text'].$salt);

        storeToDB($websiteURL, $hash, $text);

        //echo "http://".getHostByName(php_uname('n')).":8080/qr/?hash=".$hash;
	echo "http://dennisrauscher.de/qr4blind/qr/?hash=".$hash;
        return;
    }
    elseif(isset($_GET['hash']))
    {
        getFromDB($_GET['hash']);
        return;
    }
    else
    {
        echo -1;
        return;
    }

    function getConnection()
    {
        try {
           return new PDO('mysql:host=vweb12.nitrado.net;dbname=ni82997_2sql1', "ni82997_2sql1", "demo199713");
        } catch (PDOException $e) {
            echo -2;
            return;
        }
    }

    function storeToDB($url, $hash, $text)
    {
        $con = getConnection();

        $query = "SELECT COUNT(*) as cnt FROM hashes WHERE websiteURL = ? AND hash = ?";
        $statement = $con->prepare($query);
        $statement->bindParam(1, $url);
        $statement->bindParam(2, $hash);

        $statement->execute ();

        $res = $statement->fetch()['cnt'];

        if($res == 0)
        {
            $query = "INSERT INTO hashes (websiteURL, hash, text) VALUES (?, ?, ?)";
            $statement = $con->prepare($query);
            $statement->bindParam(1, $url);
            $statement->bindParam(2, $hash);
            $statement->bindParam(3, $text);
            $statement->execute();
        }
    }

    function getFromDB($hash)
    {
         $con = getConnection();

        $query = "SELECT text, COUNT(*) as cnt FROM hashes WHERE hash = ? LIMIT 1";
        $statement = $con->prepare($query);
        $statement->bindParam(1, $hash);

        $statement->execute ();

        $res = $statement->fetch();

        if($res['cnt'] > 0)
        {
            $text = trim( preg_replace('/\s+/', ' ', $res['text']));

            include('textOut.php');
        }
        else
        {
            ?>
                <b>No text for this hash!</b>
            <?php
        }
    }
?>
