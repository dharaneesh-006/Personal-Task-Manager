package com.mypa;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AlarmModule extends ReactContextBaseJavaModule {

    private final AlarmManager alarmManager;

    public AlarmModule(ReactApplicationContext context) {
        super(context);
        alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    }

    @Override
    public String getName() {
        return "AlarmModule";
    }

    @ReactMethod
public void scheduleAlarm(String id, double time, String title, String mode) {
    Intent intent = new Intent(getReactApplicationContext(), AlarmReceiver.class);
    intent.putExtra("title", title);
    intent.putExtra("mode", mode);

    PendingIntent pi = PendingIntent.getBroadcast(
        getReactApplicationContext(),
        id.hashCode(),
        intent,
        PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
    );

    alarmManager.setExactAndAllowWhileIdle(
        AlarmManager.RTC_WAKEUP,
        (long) time,
        pi
    );
}


    @ReactMethod
    public void cancelAlarm(String id) {
        Intent intent = new Intent(getReactApplicationContext(), AlarmReceiver.class);
        PendingIntent pi = PendingIntent.getBroadcast(
                getReactApplicationContext(),
                id.hashCode(),
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        alarmManager.cancel(pi);
    }
}
