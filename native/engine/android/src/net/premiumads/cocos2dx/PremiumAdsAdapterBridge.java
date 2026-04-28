package net.premiumads.cocos2dx;

import net.premiumads.sdk.adapter.PremiumAdsAdapter;

/**
 * JNI peer for the Cocos Creator TS plugin {@code PremiumAdsAdapter.setDebug}.
 * Invoked from JS via {@code jsb.reflection.callStaticMethod}.
 */
public final class PremiumAdsAdapterBridge {
    private PremiumAdsAdapterBridge() {}

    public static void setDebug(boolean enabled) {
        PremiumAdsAdapter.setDebug(enabled);
    }
}
