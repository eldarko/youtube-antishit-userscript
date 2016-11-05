// ==UserScript==
// @name YoutubeAntishit
// @description Blocks youtube videos with specific words
// @author Eldar Kononov
// @license MIT
// @version 1.0
// @include *://*youtube.com/*
// ==/UserScript==

(function (window, undefined) {  // [2] нормализуем window
	
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }

    if (w.self != w.top) {
        return;
    }
    
    console.log(w.location.href)
    
    if (/youtube.com/.test(w.location.href)) {
 		var re = new RegExp("(__BLOCK_REGEXP__)", "i")		
		
		var searchFun = function(parentId)
		{
			console.log('Search ' + parentId)
			var parent = document.getElementById(parentId)
			
			if(!parent) {
				console.log('Not parent found')
				return false
			}
			
			var all = parent.getElementsByTagName('*')
			
			for (var i=0, max=all.length; i < max; i++)
			{
				if(re.test(all[i].text))
					return true

				var attrs = all[i].attributes;
					
				for(var j = 0, attrslen = attrs.length; j < attrslen; j++)
					if(re.test(attrs[j].value))
						return true
			}
			return false
		}
		
		setInterval(
			function(){
				if(!(this.lastLocation === w.location.search)) {
					this.lastLocation = w.location.search
				
					var fun1 = function() {
						if(searchFun('watch-description') || searchFun('watch-header')) {
							w.location.search = ''
						}
					}
				
					fun1()
					setTimeout(fun1, 3000) // not all DOM could be set now
				}
			},
			1000)
    }
})(window);

