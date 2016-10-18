var htmlTemplate = function(){/*
	<html>
		<head></head>
		<body>
			<div class="g">
				<ul class="ulClass">
					<li class="random">{{rd01}}</li>
					<li class="random">{{rd02}}</li>
					<li class="random">{{rd03}}</li>					
				</ul>
			</div>
		</body>
	</html>
*/};

// extract html from comment
var beginBrace = /function\s+\(\)\{\/\*/;
var endBrace = /\*\//;
html = htmlTemplate.toString().replace(beginBrace, '').replace(endBrace, '');

// replace variables
html = html.replace(/{{rd01}}/g, 'rd_val_01');
html = html.replace(/{{rd02}}/g, 'rd_val_02');
html = html.replace(/{{rd03}}/g, 'rd_val_03');

console.log(html);