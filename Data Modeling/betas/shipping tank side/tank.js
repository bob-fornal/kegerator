$(document).ready(function() {
    var param = {
        slices:			6,
        center_x:		200,
        center_y:		200,
        outer_radius:	180,
        inner_radius:	100
    };
    
    var html = svgSlices(param);
    $("#test").html(html);
    
    $("#slice-1").click(function() {
        alert("1");
    });
    $("#slice-2").click(function() {
        alert("2");
    });
    $("#slice-3").click(function() {
        alert("3");
    });
    $("#slice-4").click(function() {
        alert("4");
    });
    $("#slice-5").click(function() {
        alert("5");
    });
    $("#slice-6").click(function() {
        alert("6");
    });
});

function svgSlices(param) {
	var self = this;
	
	var html = "";

    var rad2deg = 180/Math.PI;
	var total_arc = 360;
    var split1 = parseInt(Math.random() * 100, 10);
    var split2 = parseInt(Math.random() * 100, 10);
    if (split1 > split2) {
        var temp = split1;
        split1 = split2;
        split2 = temp;
    }
    $(".output").append("Split 1: " + split1 + "%<br/>");
    $(".output").append("Split 2: " + split2 + "%<br/>");

    // GENERATE CIRCLE
    var circle_radius = param.inner_radius - 10;

    // GENERATE DEFINITIONS FOR CIRCLE
    html += "<defs>\n";
    html += "<clipPath id='g-clip-filled'>\n";
    html += "<rect id='g-clip-filled-rect' ";
    html += "x='0' y='0' width='150' height='400'></rect>\n";
    html += "</clipPath>\n";
    html += "<clipPath id='g-clip-recommend'>\n";
    html += "<rect id='g-clip-recommend-rect' ";
    html += "x='150' y='0' width='50' height='400'></rect>\n";
    html += "</clipPath>\n";
    html += "</defs>\n";
    
    // BACKGROUND
    html += "<circle ";
    html += "cx='" + param.center_x + "' ";
    html += "cy='" + param.center_y + "' ";
    html += "r='" + circle_radius + "' ";
    html += "fill='tan' />\n";
    
    // FILLED
    html += "<circle ";
    html += "cx='" + param.center_x + "' ";
    html += "cy='" + param.center_y + "' ";
    html += "r='" + circle_radius + "' ";
    html += "fill='gray' ";
    html += "clip-path='url(#g-clip-filled)' />\n";
    // RECOMMEND
    html += "<circle ";
    html += "cx='" + param.center_x + "' ";
    html += "cy='" + param.center_y + "' ";
    html += "r='" + circle_radius + "' ";
    html += "fill='yellow' ";
    html += "clip-path='url(#g-clip-recommend)' />\n";
    
    // BORDER
    html += "<circle ";
    html += "cx='" + param.center_x + "' ";
    html += "cy='" + param.center_y + "' ";
    html += "r='" + circle_radius + "' ";
    html += "stroke='black' ";
    html += "stroke-width='3' ";
    html += "fill='transparent' />\n";

    var inner_arc_gap = Math.round(Math.asin((5/2)/param.inner_radius)*rad2deg*2);
	var inner_arc_slice = Math.round((total_arc-(param.slices*inner_arc_gap))/param.slices);
	
	var outer_arc_gap = Math.round(Math.asin((5/2)/param.outer_radius)*rad2deg*2);
	var outer_arc_slice = Math.round((total_arc-(param.slices*outer_arc_gap))/param.slices);
	
	for(var i=0, len=param.slices; i<len; i++) {
		var slice_id = "slice-" + (i+1);
	
		var inner_arc_start =	(inner_arc_slice + inner_arc_gap) * i;
 		var inner_arc_end =		inner_arc_start + inner_arc_slice;
		
		var outer_arc_start =	(outer_arc_slice + outer_arc_gap) * i;
 		var outer_arc_end =		outer_arc_start + outer_arc_slice;

        var inner_arc_mid1 = (inner_arc_start + inner_arc_end) * (split1/100);
        var outer_arc_mid1 = (outer_arc_start + outer_arc_end) * (split1/100);
        
        var inner_arc_mid2 = (inner_arc_start + inner_arc_end) * (split2/100);
        var outer_arc_mid2 = (outer_arc_start + outer_arc_end) * (split2/100);        
        
        // BACKGROUND
        arcParam = {
            x: param.center_x,
            y: param.center_y,
            inner_r: param.inner_radius,
            outer_r: param.outer_radius,
            inner_angle1: inner_arc_start,
            inner_angle2: inner_arc_end,
            outer_angle1: outer_arc_start,
            outer_angle2: outer_arc_end
        };
            
        var d = describeArc(arcParam);
        html += "<path id='" + slice_id + "' ";
        html += "d='" + d + "' "
        html += "stroke='black' ";
		html += "stroke-width='1' ";
        html += "fill='tan'/>\n";

        if (i==0) {
            // FILLED
            var arcParam = {
                x: param.center_x,
                y: param.center_y,
                inner_r: param.inner_radius,
                outer_r: param.outer_radius,
                inner_angle1: inner_arc_start,
                inner_angle2: inner_arc_mid1,
                outer_angle1: outer_arc_start,
                outer_angle2: outer_arc_mid1
            };
                
            var d = describeArc(arcParam);
            html += "<path id='" + slice_id + "-filled' ";
            html += "d='" + d + "' "
            html += "fill='gray'/>\n";
        
            // RECOMMEND
            var arcParam = {
                x: param.center_x,
                y: param.center_y,
                inner_r: param.inner_radius,
                outer_r: param.outer_radius,
                inner_angle1: inner_arc_mid1,
                inner_angle2: inner_arc_mid2,
                outer_angle1: outer_arc_mid1,
                outer_angle2: outer_arc_mid2
            };
                
            var d = describeArc(arcParam);
            html += "<path id='" + slice_id + "-recommended' ";
            html += "d='" + d + "' "
            html += "fill='yellow'/>\n";
        }
        
        // BORDER
        arcParam = {
            x: param.center_x,
            y: param.center_y,
            inner_r: param.inner_radius,
            outer_r: param.outer_radius,
            inner_angle1: inner_arc_start,
            inner_angle2: inner_arc_end,
            outer_angle1: outer_arc_start,
            outer_angle2: outer_arc_end
        };
            
        var d = describeArc(arcParam);
        html += "<path id='" + slice_id + "' ";
        html += "d='" + d + "' "
        html += "stroke='black' ";
		html += "stroke-width='3' "
        html += "fill='transparent' />\n";
	}

	return html;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: Math.floor(centerX + (radius * Math.cos(angleInRadians))),
        y: Math.floor(centerY + (radius * Math.sin(angleInRadians)))
    };
}

function describeArc(param) {
    var inner_start = polarToCartesian(param.x, param.y, param.inner_r, param.inner_angle1);
    var inner_end = polarToCartesian(param.x, param.y, param.inner_r, param.inner_angle2);
    var outer_start = polarToCartesian(param.x, param.y, param.outer_r, param.outer_angle1);
    var outer_end = polarToCartesian(param.x, param.y, param.outer_r, param.outer_angle2);

    var inner_arcSweep = Math.abs(param.inner_angle2 - param.inner_angle1) <= 180 ? "0" : "1";
    var outer_arcSweep = Math.abs(param.outer_angle2 - param.outer_angle1) <= 180 ? "0" : "1";

    var d = [
        "M", inner_start.x, inner_start.y,
        "A", param.inner_r, param.inner_r, 0, inner_arcSweep, 1, inner_end.x, inner_end.y,
        "L", outer_end.x, outer_end.y,
        "A", param.outer_r, param.outer_r, 0, outer_arcSweep, 0, outer_start.x, outer_start.y,
//        "L", inner_end.x, inner_end.y,
        "z"
    ].join(" ");

    return d;
}