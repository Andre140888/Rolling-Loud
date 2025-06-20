<?php
// You can add server-side logic here if needed
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rolling Loud</title>
    <link rel="icon" type="image/x-icon" href="../images/logo.png" />
    <!-- Link font -->
    <link
      href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
    <!-- simple body styling -->
  </head>
  <body>
    <div id="header_container">
      <h1>Rolling Loud</h1>
    </div>

    <div id="middle_contianer">
      <div id="city_container"></div>
    </div>

    <div id="building_info" style="position: absolute; display: none"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
    <script src="main.js"></script>
  </body>
</html>
