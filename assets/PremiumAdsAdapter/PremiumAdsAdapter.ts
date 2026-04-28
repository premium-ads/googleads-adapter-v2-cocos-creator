/**
 * PremiumAds AdMob mediation adapter v2 — Cocos Creator plugin.
 *
 * The adapter is invoked by Google Mobile Ads SDK behind-the-scene when
 * the AdMob console maps an ad unit to the PremiumAds custom event class.
 * Publishers do NOT call PremiumAds APIs to load ads — they call GMA SDK
 * (via the `cocos/cocos-google-admob` Cocos Store extension), and GMA's
 * waterfall picks PremiumAds when configured.
 *
 * This module exposes a single optional helper: `setDebug(enabled)` to
 * turn on verbose adapter logging, tagged `[PremiumAdsAdapter]` in:
 * - Android Logcat: filter `tag:PremiumAdsAdapter`
 * - iOS Xcode console: prefix `[PremiumAdsAdapter]`
 *
 * Custom event class names (configure in AdMob console):
 * - Android: `net.premiumads.sdk.adapter.PremiumAdsAdapter`
 * - iOS:     `PremiumAdsAdapter`
 */

declare const jsb: any;

export class PremiumAdsAdapter {
    /** Toggle verbose adapter logging. No-op on web/editor. */
    static setDebug(enabled: boolean): void {
        if (typeof jsb === 'undefined' || !jsb.reflection) return;

        try {
            // sys.Platform check — minimize import noise; jsb.reflection only exists on native targets.
            // Android: jsb.reflection.callStaticMethod(className, methodName, sig, ...args)
            // iOS:     jsb.reflection.callStaticMethod(className, selector, ...args)
            // We try both; whichever is unavailable throws, swallowed.
            const isAndroid = (typeof globalThis !== 'undefined') &&
                ((globalThis as any).cc?.sys?.platform === ((globalThis as any).cc?.sys?.Platform?.ANDROID));

            if (isAndroid) {
                jsb.reflection.callStaticMethod(
                    'net/premiumads/cocos2dx/PremiumAdsAdapterBridge',
                    'setDebug',
                    '(Z)V',
                    enabled);
            } else {
                jsb.reflection.callStaticMethod(
                    'PACPremiumAdsAdapter',
                    'setDebug:',
                    enabled);
            }
        } catch (e) {
            console.warn('[PremiumAdsAdapter] setDebug failed:', e);
        }
    }
}
