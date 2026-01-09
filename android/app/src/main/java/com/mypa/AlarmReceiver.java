package com.mypa;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import java.util.Date;

public class AlarmReceiver extends BroadcastReceiver {

    private static final String TAG = "MyPA-ALARM";

    @Override                       
    public void onReceive(Context context, Intent intent) {
        String id = intent.getStringExtra("id");
        String title = intent.getStringExtra("title");
        String mode = intent.getStringExtra("mode");

        Log.d(TAG, "🚨 ALARM FIRED");
        Log.d(TAG, "ID    : " + id);
        Log.d(TAG, "TITLE : " + title);
        Log.d(TAG, "MODE  : " + mode);
        Log.d(TAG, "TIME  : " + new Date());

        // 🔊 Play sound if required
        if ("ring".equals(mode) || "both".equals(mode)) {
            Log.d(TAG, "🔊 PLAYING ALARM SOUND");
            AlarmSoundPlayer.play(context);
        } else {
            Log.d(TAG, "🔕 SOUND SKIPPED (MODE = notify)");
        }

        // ❗ Notifications are handled in JS (Notifee)
    }
}
