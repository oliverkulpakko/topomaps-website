<?php
  $url = "https://eaststudios.net/api/TopoMaps/GetMapType";
  $data = file_get_contents($url);
  $map_types = json_decode($data, true);

  $country_codes = json_decode(file_get_contents("http://country.io/names.json"), true);
  $country_codes['WW'] = 'Worldwide';
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Map Preview</title>
  <link rel="stylesheet" href="/style.css">
</head>

<body>
  <div id="content">
    <h1>Map Preview</h1>

    <p>Here is a full list of all map types available in the app:</p>
    <ol>

    <?php
      foreach ($map_types as $map_type) {
          $id = $map_type['id'];
          $name = $map_type['name'];
          $country = $country_codes[$map_type['country']] ?? $map_type['country'];

          echo "<li><a href=\"map/?id=$id\">$country - $name</a>";

          if ($map_type['inAppPurchaseId']) {
              echo " <b>(requires an In App Purchase)</b></li>";
          } else {
              echo "</li>";
          }
      }
     ?>
   </ol>
  </div>
</body>

</html>
