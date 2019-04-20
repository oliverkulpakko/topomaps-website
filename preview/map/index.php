<?php
    $url = "https://eaststudios.net/api/TopoMaps/GetMapType";
    $data = file_get_contents($url);
    $map_types = json_decode($data, true);
    $map_type = $map_types[array_search($_GET['id'], array_column($map_types, 'id'))];
?>

<!DOCTYPE html>
<html>

<head>
  <title><?php echo $map_type['country'] . " - " . $map_type['name']; ?></title>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin="">
  <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js" integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==" crossorigin=""></script>

  <style>
    html,
    body {
      height: 100%;
      margin: 0;
    }

    #map {
      height: 100%;
      width: 100vw;
    }
  </style>
</head>

<body>

  <div id='map'></div>

  <script>
    <?php
    if ($map_type['showcaseLatitude'] && $map_type['showcaseLongitude']) {
        $latitude = doubleval($map_type['showcaseLatitude']);
        $longitude = doubleval($map_type['showcaseLongitude']);
        $zoom = intval($map_type['maxZoom']) - 3;

        echo "var map = L.map('map', {
              center: [$latitude, $longitude],
              zoom: $zoom
            });";
    } else {
        echo "var map = L.map('map');";
    }

      $urls = array();

      if (count($map_type['urls']) > 0) {
          $urls = $map_type['urls'];
      } else {
          if ($map_type['customMapUrl']) {
              $urls[0] = array(
                "template" => $map_type['customMapUrl'],
                "minZoom" => intval($map_type['minZoom']),
                "maxZoom" => intval($map_type['maxZoom'])
              );
          } else {
              $id = $map_type['id'];

              $urls[0] = array(
              "template" => "https://eaststudios.net/api/TopoMapsV2/Map/?mapType=$id&zoom={z}&x={x}&y={y}",
              "minZoom" => intval($map_type['minZoom']),
              "maxZoom" => intval($map_type['maxZoom'])
            );
          }
      }

      foreach ($urls as $url) {
          $template = $url['template'];
          $copyright = $map_type['copyright'];
          $minZoom = intval($url['minZoom']);
          $maxZoom = intval($url['maxZoom']);

          echo "L.tileLayer('$template', {
              minZoom: $minZoom,
              maxZoom: $maxZoom,
              attribution: '$copyright'
            }).addTo(map);";
      }
    ?>
  </script>
</body>
</html>
