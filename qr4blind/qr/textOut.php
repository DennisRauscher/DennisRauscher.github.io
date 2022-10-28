<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <script src="http://code.responsivevoice.org/responsivevoice.js"></script>
        <script>
            var text = "<?php echo $text; ?>";
        </script>
        <script src="js/textOut.js"></script>
        <link rel="stylesheet" href="css/textOut.css"/>
    </head>
    <body>
        <div class="header">QR-Code für Blinde <li onclick="read();">></li></div>
        <div class="text"><?php echo $text; ?></div>
    </body>
</html>