$(document).ready(function () {
    var param = {
        obj: "#svgJug",
        color: "yellow",
        pct: 0
    };
    pctJug(param);

    setTimeout(function () {
        param.pct = 10;
        pctJug(param);
    }, 1000);
    setTimeout(function () {
        param.pct = 20;
        pctJug(param);
    }, 2000);
    setTimeout(function () {
        param.pct = 30;
        pctJug(param);
    }, 3000);
    setTimeout(function () {
        param.pct = 40;
        pctJug(param);
    }, 4000);
    setTimeout(function () {
        param.pct = 50;
        pctJug(param);
    }, 5000);
});

function pctJug(p) {
    var html = "";
    var iPct = 10 + (170 * (1 - (p.pct / 100)));
    var tPct = 20 + (160 * (1 - (p.pct / 100)));

    // OPEN SVG
    html += "<svg width='150px' height='200px' viewBox='0, 0, 150 200'>\n";

    // Background Grid
    html += "<pattern id='hatch00' patternUnits='userSpaceOnUse' x='0' y='0' width='10' height='10'>\n";
    html += "<g style='fill:none; stroke:black; stroke-width:1'>\n";
    html += "<path d='M 0 0 l 10 10'/>\n";
    html += "<path d='M 10 0 l -10 10'/>\n";
    html += "</g>\n";
    html += "</pattern>\n";

    // Background Percentage
    html += "<g fill='" + p.color + "' stroke='#999999' stroke-width='1'>\n";
    html += "<path d='M 5 " + iPct + " Q 55 " + (iPct + 25) + " 105 " + iPct + " L 105 200";
    html += "           L 5 200 z' />\n";
    html += "</g>\n";

    // Background Pattern hatch00
    html += "<g stroke='#999999' stroke-width='1' style='fill:url(#hatch00)'>\n";
    html += "<path d='M 5 " + iPct + " Q 55 " + (iPct + 25) + " 105 " + iPct + " L 105 200";
    html += "           L 5 200 z' />\n";
    html += "</g>\n";

    // White Outer with Jug Shaped Inner Cleared
    html += "<g fill-rule='evenodd' fill='white' stroke='white' stroke-width='0'>\n";
    html += "<path d='M 0 0 L 150 0 L 150 200 L 0 200 L 0 0 z\n";
    html += "         M 30 20 L 80 20 L 80 50 Q 90 70 100 80 L 100 180 Q 55 200 10 180 L 10 80\n";
    html += "           Q 20 70 30 50 z' />\n";
    html += "</g>\n";

    // Black Jug Border with Transparent Center
    html += "<g stroke='black' stroke-width='3' fill-opacity='0.0'>\n";
    html += "<path d='M 30 20 L 80 20 L 80 50 Q 90 70 100 80 L 100 180 Q 55 200 10 180 L 10 80";
    html += "           Q 20 70 30 50 z' />\n";
    html += "</g>\n";

    // Upper Ellipse
    html += "<ellipse cx='55' cy='20' rx='25' ry='5' style='fill:#aaaaaa; stroke:black;";
    html += "         stroke-width:3'/>\n";

    // Upper Dash
    html += "<path d='M 30 50 Q 55 58 80 50' stroke='#555555' stroke-dasharray='3,3' stroke-width='2'";
    html += "fill='none' />\n";

    // Lower Dash
    html += "<path d='M 10 80 Q 55 100 100 80' stroke='#555555' stroke-dasharray='3,3' stroke-width='2'";
    html += "fill='none' />\n";

    // Text Percentage
    if (p.pct < 80) {
        html += "<text x='105' y='" + tPct + "' fill='black' class='svgText'>" + p.pct + "%</text>\n";
    } else {
        html += "<text x='85' y='" + tPct + "' fill='black' class='svgText'>" + p.pct + "%</text>\n";
    }

    // CLOSE SVG
    html += "</svg>\n";

    $(p.obj).html(html);
}

/*
    <svg width="150px" height="200px" viewBox="0 0 150 200">
      <g fill="yellow">
          <path d="M 5 70 L 145 70  L  145 200 L 5 200 z" />
      </g>
      <g fill-rule="evenodd" fill="white" stroke="white" stroke-width="0" >
          <path d="M 0 0   L 150 0 L 150 200 L 0 200  L 0 0   z
                   M 50 20   L 100 20  L 100 50  
                             Q 110 70 140 80  
                             L 140 180 Q 75 200 10 180  
                             L 10 80   Q 40 70 50 50 z" />
      </g>
      <g stroke="black" stroke-width="3" fill-opacity="0.0">
          <path d="M 50 20   L 100 20  L 100 50  
                             Q 110 70 140 80  
                             L 140 180 Q 75 200 10 180
                             L 10 80   Q 40 70 50 50 z" />
      </g>
      <ellipse cx="75" cy="20" rx="25" ry="5" style="fill:#aaaaaa;stroke:black;stroke-width:3"/>
      <path d="M 50 50 Q 75 58 100 50" stroke="#555555" stroke-dasharray="3,3" stroke-width="2" fill="none" />
      <path d="M 10 80 Q 75 100 140 80" stroke="#555555" stroke-dasharray="3,3" stroke-width="2" fill="none" />
    </svg>
*/