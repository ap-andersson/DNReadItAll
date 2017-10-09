
var paywallWaitCounter = 0;
var waitForPaywall = setInterval (checkForPaywall, 500);

var adblockWindowWaitCounter = 0;
var waitForAdblockWindow = setInterval (checkAndCloseAdblockWindow, 500);

function checkAndCloseAdblockWindow() {
	adblockWindowWaitCounter++;
	var adblockWindowExit = document.getElementById("adblk-close"); //.click();
	if(adblockWindowExit) {
		console.log("DNReadItAll - Closing adblock window");
		adblockWindowExit.click();
		clearInterval(waitForAdblockWindow);
	}
	else if(adblockWindowWaitCounter >= 20) {
		console.log("DNReadItAll - Check for adblock window, giving up after 20 tries");
		clearInterval(waitForAdblockWindow);
	}
}

function checkForPaywall () 
{
	paywallWaitCounter++;

	var articleBodyMask = document.getElementsByClassName('article__body article__body--mask');
	var klarna = document.getElementById('klanaStep2');
	var paywallContent = document.getElementsByClassName('paywall-content');
    if (articleBodyMask.length || paywallContent.length) 
    {
		console.log("DNReadItAll - Removing paywall");
        removePayWall();
        clearInterval(waitForPaywall);
    } 
    else if(paywallWaitCounter >= 20) 
    {
		console.log("DNReadItAll - Check for paywall, giving up after 20 tries");
    	clearInterval(waitForPaywall);
    }
}

function removePayWall() 
{
	var articleBodyMask = document.getElementsByClassName('article__body article__body--mask')[0];
	if(articleBodyMask)
		articleBodyMask.className = articleBodyMask.className.replace( /(?:^|\s)article__body--mask(?!\S)/ , '' );

	var payWall = document.getElementsByClassName('js-paywall paywall paywall--pad paywall--active')[0];
	if(payWall) 
		payWall.setAttribute("style", "display:none;");

	var klarna = document.getElementById('klanaStep2');
	if(klarna)
		klarna.setAttribute("style", "visibility:hidden;");

	var paywallContent = document.getElementsByClassName('paywall-content')[0];
	if(paywallContent)
		paywallContent.setAttribute('style', '');

}