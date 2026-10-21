package de.memoryzoo.app;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public final class MainActivity extends Activity {
    private WebView game;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        game = new WebView(this);
        WebSettings settings = game.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        game.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return true; // This children's game never navigates to external sites.
            }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                String path = request.getUrl().getPath();
                if ("https".equals(request.getUrl().getScheme())
                    && "appassets.androidplatform.net".equals(request.getUrl().getHost())
                    && path != null && path.startsWith("/assets/") && !path.contains("..")) {
                    String file = path.substring(8);
                    String mime = file.endsWith(".html") ? "text/html" : file.endsWith(".js") ? "application/javascript"
                        : file.endsWith(".css") ? "text/css" : file.endsWith(".svg") ? "image/svg+xml" : "image/png";
                    try { return new WebResourceResponse(mime, "UTF-8", getAssets().open(file)); }
                    catch (IOException ignored) { }
                }
                return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found", null, new ByteArrayInputStream(new byte[0]));
            }
        });
        setContentView(game);
        game.loadUrl("https://appassets.androidplatform.net/assets/index.html");
    }
    @Override protected void onPause() {
        game.evaluateJavascript("if(typeof audio!=='undefined'&&audio){audio.suspend();}", null);
        game.onPause();
        super.onPause();
    }
    @Override protected void onResume() { super.onResume(); if(game!=null)game.onResume(); }
    @Override protected void onDestroy() { if(game!=null){game.destroy();game=null;}super.onDestroy(); }
}
